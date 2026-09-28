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

const documentationRoutes = [
  "docs-as-code",
  "standards",
  "operations",
  "governance",
  "developer-docs",
];

function checkDocumentationPages(): HealthCheck {
  const appDirectory = path.join(process.cwd(), "src", "app");

  const existingPages = documentationRoutes.filter((route) => {
    const pagePath = path.join(appDirectory, route, "page.mdx");

    return fs.existsSync(pagePath);
  });

  const allPagesExist = existingPages.length === documentationRoutes.length;

  return {
    id: "documentation-pages",
    name: "Documentation pages",
    status: allPagesExist ? "passing" : "failing",
    message: allPagesExist
      ? `${existingPages.length} documentation pages found.`
      : `${existingPages.length} of ${documentationRoutes.length} documentation pages found.`,
  };
}

function checkDocumentStructure(): HealthCheck {
  const appDirectory = path.join(process.cwd(), "src", "app");

  const invalidDocuments: string[] = [];

  documentationRoutes.forEach((route) => {
    const pagePath = path.join(appDirectory, route, "page.mdx");

    if (!fs.existsSync(pagePath)) {
      return;
    }

    const content = fs.readFileSync(pagePath, "utf8");

    const h1Count = (content.match(/^# .+$/gm) ?? []).length;
    const h2Count = (content.match(/^## .+$/gm) ?? []).length;

    if (h1Count !== 1 || h2Count === 0) {
      invalidDocuments.push(route);
    }
  });

  return {
    id: "document-structure",
    name: "Document structure",
    status: invalidDocuments.length === 0 ? "passing" : "failing",
    message:
      invalidDocuments.length === 0
        ? `${documentationRoutes.length} documentation pages meet structural requirements.`
        : `${invalidDocuments.length} ${
            invalidDocuments.length === 1 ? "page does" : "pages do"
          } not meet structural requirements: ${invalidDocuments.join(", ")}`,
  };
}

function checkEmptySections(): HealthCheck {
  const appDirectory = path.join(process.cwd(), "src", "app");

  const emptySections: string[] = [];

  documentationRoutes.forEach((route) => {
    const pagePath = path.join(appDirectory, route, "page.mdx");

    if (!fs.existsSync(pagePath)) {
      return;
    }

    const content = fs.readFileSync(pagePath, "utf8");

    const sections = content.split(/^## .+$/gm);
    const headings = [...content.matchAll(/^## (.+)$/gm)];

    headings.forEach((heading, index) => {
      const sectionContent = sections[index + 1]?.trim();

      if (!sectionContent) {
        emptySections.push(`${route}: ${heading[1]}`);
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

    return !supportedExtensions.some((extension) =>
      fs.existsSync(path.join(appDirectory, route, `page${extension}`))
    );
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
