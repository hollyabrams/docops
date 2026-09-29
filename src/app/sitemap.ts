import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://hollyabrams.github.io/docops";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/docs-as-code",
    "/standards",
    "/operations",
    "/governance",
    "/developer-docs",
    "/api",
    "/ai",
    "/blog",
    "/blog/more-than-the-words",
    "/health",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
  }));
}
