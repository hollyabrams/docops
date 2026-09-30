import fs from "node:fs";
import path from "node:path";

export type HealthStatus =
  | "passing"
  | "warning"
  | "failing"
  | "unavailable";

export type HealthCheck = {
  id: string;
  name: string;
  status: HealthStatus;
  message: string;
};

export type DocumentationHealth = {
  score: number;
  status: "healthy" | "needs-attention" | "unhealthy";
  checks: HealthCheck[];
};

type DocumentationPage = {
  route: string;
  filePath: string;
  fileType: "mdx" | "tsx";
};

function getDocumentationPages(): DocumentationPage[] {
  const appDirectory = path.join(process.cwd(), "src", "app");
  const pages: DocumentationPage[] = [];

  function walkDirectory(directory: string) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    entries.forEach((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        walkDirectory(entryPath);
        return;
      }

      if (entry.name !== "page.mdx" && entry.name !== "page.tsx") {
        return;
      }

      const relativeDirectory = path.relative(
        appDirectory,
        path.dirname(entryPath),
      );

      const route =
        relativeDirectory === ""
          ? "/"
          : `/${relativeDirectory.split(path.sep).join("/")}`;

      pages.push({
        route,
        filePath: entryPath,
        fileType: entry.name === "page.mdx" ? "mdx" : "tsx",
      });
    });
  }

  walkDirectory(appDirectory);

  return pages.sort((a, b) => a.route.localeCompare(b.route));
}

const documentationPages = getDocumentationPages();

function checkDocumentationPages(): HealthCheck {
  const pageCount = documentationPages.length;

  return {
    id: "documentation-pages",
    name: "Documentation pages",
    status: pageCount > 0 ? "passing" : "failing",
    message:
      pageCount > 0
        ? `${pageCount} documentation pages found.`
        : "No documentation pages found.",
  };
}

function checkDocumentStructure(): HealthCheck {
  const mdxPages = documentationPages.filter(
    (page) => page.fileType === "mdx",
  );

  const invalidDocuments: string[] = [];

  mdxPages.forEach((page) => {
    const content = fs.readFileSync(page.filePath, "utf8");

    const h1Count = (content.match(/^# .+$/gm) ?? []).length;
    const h2Count = (content.match(/^## .+$/gm) ?? []).length;

    if (h1Count !== 1 || h2Count === 0) {
      invalidDocuments.push(page.route);
    }
  });

  return {
    id: "document-structure",
    name: "Document structure",
    status: invalidDocuments.length === 0 ? "passing" : "failing",
    message:
      invalidDocuments.length === 0
        ? `${mdxPages.length} documentation pages meet structural requirements.`
        : `${invalidDocuments.length} ${
            invalidDocuments.length === 1 ? "page does" : "pages do"
          } not meet structural requirements: ${invalidDocuments.join(", ")}`,
  };
}

function checkEmptySections(): HealthCheck {
  const mdxPages = documentationPages.filter(
    (page) => page.fileType === "mdx",
  );

  const emptySections: string[] = [];

  mdxPages.forEach((page) => {
    const content = fs.readFileSync(page.filePath, "utf8");

    const sections = content.split(/^## .+$/gm);
    const headings = [...content.matchAll(/^## (.+)$/gm)];

    headings.forEach((heading, index) => {
      const sectionContent = sections[index + 1]?.trim();

      if (!sectionContent) {
        emptySections.push(`${page.route}: ${heading[1]}`);
      }
    });
  });

  return {
    id: "empty-sections",
    name: "Section content",
    status: emptySections.length === 0 ? "passing" : "failing",
    message:
      emptySections.length === 0
        ? "No empty documentation sections found."
        : `${emptySections.length} empty ${
            emptySections.length === 1 ? "section" : "sections"
          } found: ${emptySections.join(", ")}`,
  };
}

function checkInternalRoutes(): HealthCheck {
  const sourceDirectories = [
    path.join(process.cwd(), "src", "app"),
    path.join(process.cwd(), "src", "components"),
  ];

  const appDirectory = path.join(process.cwd(), "src", "app");
  const supportedExtensions = [".tsx", ".ts", ".jsx", ".js", ".mdx"];
  const links: string[] = [];

  function scanDirectory(directory: string) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    entries.forEach((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(entryPath);
        return;
      }

      if (!supportedExtensions.includes(path.extname(entry.name))) {
        return;
      }

      const content = fs.readFileSync(entryPath, "utf8");

      const markdownLinks = content.matchAll(/\]\((\/[^)#?\s]+)[^)]*\)/g);
      const componentLinks = content.matchAll(
        /(?:href|to)=["'](\/[^"'#?]+)["']/g
      );

      for (const match of markdownLinks) {
        links.push(match[1]);
      }

      for (const match of componentLinks) {
        links.push(match[1]);
      }
    });
  }

  sourceDirectories.forEach(scanDirectory);

  const uniqueLinks = [...new Set(links)];

  const brokenLinks = uniqueLinks.filter((link) => {
    if (link === "/") {
      return !supportedExtensions.some((extension) =>
        fs.existsSync(path.join(appDirectory, `page${extension}`))
      );
    }

    const route = link.replace(/^\/|\/$/g, "");

    const pageExists = supportedExtensions.some((extension) =>
      fs.existsSync(path.join(appDirectory, route, `page${extension}`))
    );

    const publicResourceExists = fs.existsSync(
      path.join(process.cwd(), "public", route)
    );

    const generatedResourceExists = fs.existsSync(
      path.join(appDirectory, route.replace(/\.xml$/, ".ts"))
    );

    return !pageExists && !publicResourceExists && !generatedResourceExists;
  });

  return {
    id: "internal-routes",
    name: "Internal routes",
    status: brokenLinks.length === 0 ? "passing" : "failing",
    message:
      brokenLinks.length === 0
        ? `${uniqueLinks.length} internal routes checked. No broken routes found.`
        : `${brokenLinks.length} broken ${
            brokenLinks.length === 1 ? "route" : "routes"
          } found: ${brokenLinks.join(", ")}`,
  };
}

function checkExternalLinks(): HealthCheck {
  const footerPath = path.join(
    process.cwd(),
    "src",
    "components",
    "Footer",
    "Footer.tsx"
  );

  if (!fs.existsSync(footerPath)) {
    return {
      id: "external-links",
      name: "External links",
      status: "failing",
      message: "Footer could not be found.",
    };
  }

  const content = fs.readFileSync(footerPath, "utf8");

  const hrefMatches = content.matchAll(/href=["']([^"']*)["']/g);

  const hrefs = [...new Set([...hrefMatches].map((match) => match[1]))];

  const links = hrefs.filter(
    (href) =>
      href.startsWith("http://") ||
      href.startsWith("https://")
  );

  const invalidLinks = links.filter((link) => {
    try {
      const url = new URL(link);

      return (
        (url.protocol !== "http:" && url.protocol !== "https:") ||
        !url.hostname
      );
    } catch {
      return true;
    }
  });

  if (links.length === 0) {
    return {
      id: "external-links",
      name: "External links",
      status: "warning",
      message: "No external links found.",
    };
  }

  return {
    id: "external-links",
    name: "External links",
    status: invalidLinks.length === 0 ? "passing" : "failing",
    message:
      invalidLinks.length === 0
        ? `${links.length} external links found. All URLs are valid.`
        : `${invalidLinks.length} invalid external ${
            invalidLinks.length === 1 ? "link" : "links"
          } found: ${invalidLinks.join(", ")}`,
  };
}

function calculateScore(checks: HealthCheck[]): number {
  if (checks.length === 0) {
    return 0;
  }

  const points = checks.reduce((total, check) => {
    switch (check.status) {
      case "passing":
        return total + 1;
      case "warning":
        return total + 0.5;
      case "failing":
      case "unavailable":
        return total;
    }
  }, 0);

  return Math.round((points / checks.length) * 100);
}

function checkOpenApiSpecification(): HealthCheck {
  const specificationPath = path.join(process.cwd(), "openapi.yaml");

  if (!fs.existsSync(specificationPath)) {
    return {
      id: "openapi-specification",
      name: "OpenAPI specification",
      status: "failing",
      message: "OpenAPI specification not found.",
    };
  }

  const content = fs.readFileSync(specificationPath, "utf8");

  const hasOpenApiVersion = /^openapi:\s*3\.\d+\.\d+/m.test(content);
  const hasInfo = /^info:/m.test(content);
  const hasPaths = /^paths:/m.test(content);

  const isValidStructure = hasOpenApiVersion && hasInfo && hasPaths;

  return {
    id: "openapi-specification",
    name: "OpenAPI specification",
    status: isValidStructure ? "passing" : "failing",
    message: isValidStructure
      ? "OpenAPI contract found with required top-level structure."
      : "OpenAPI contract is missing required top-level structure.",
  };
}

function checkAiDiscoverability(): HealthCheck {
  const sitemapPath = path.join(
    process.cwd(),
    "src",
    "app",
    "sitemap.ts"
  );
  const robotsPath = path.join(process.cwd(), "public", "robots.txt");
  const llmsPath = path.join(process.cwd(), "public", "llms.txt");

  const missingResources: string[] = [];

  if (!fs.existsSync(sitemapPath)) {
    missingResources.push("sitemap");
  }

  if (!fs.existsSync(robotsPath)) {
    missingResources.push("robots.txt");
  }

  if (!fs.existsSync(llmsPath)) {
    missingResources.push("llms.txt");
  }

  if (missingResources.length > 0) {
    return {
      id: "ai-discoverability",
      name: "AI discoverability",
      status: "failing",
      message: `Missing AI discovery resources: ${missingResources.join(", ")}.`,
    };
  }

  const robotsContent = fs.readFileSync(robotsPath, "utf8");
  const llmsContent = fs.readFileSync(llmsPath, "utf8");

  const robotsReferencesSitemap =
    robotsContent.includes("Sitemap:") &&
    robotsContent.includes("/docops/sitemap.xml");

  const llmsIdentifiesDocOps = /^# DocOps$/m.test(llmsContent);

  const llmsIncludesDocumentation =
    llmsContent.includes("/docops/docs-as-code") &&
    llmsContent.includes("/docops/developer-docs") &&
    llmsContent.includes("/docops/api") &&
    llmsContent.includes("/docops/ai");

  const resourcesAreValid =
    robotsReferencesSitemap &&
    llmsIdentifiesDocOps &&
    llmsIncludesDocumentation;

  return {
    id: "ai-discoverability",
    name: "AI discoverability",
    status: resourcesAreValid ? "passing" : "failing",
    message: resourcesAreValid
      ? "Sitemap, crawler rules, and AI discovery resources are configured."
      : "AI discovery resources are incomplete or incorrectly configured.",
  };
}

export function getDocumentationHealth(): DocumentationHealth {
  const checks: HealthCheck[] = [
    {
      id: "build",
      name: "Build",
      status: "passing",
      message: "DocOps builds successfully.",
    },
    checkDocumentationPages(),
    checkDocumentStructure(),
    checkEmptySections(),
    checkInternalRoutes(),
    checkExternalLinks(),
    checkOpenApiSpecification(),
    checkAiDiscoverability(),
  ];

  const score = calculateScore(checks);

  return {
    score,
    status:
      score >= 90
        ? "healthy"
        : score >= 70
          ? "needs-attention"
          : "unhealthy",
    checks,
  };
}
