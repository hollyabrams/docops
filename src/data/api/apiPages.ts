export type ApiPage = {
  title: string;
  href: string;
};

export const apiPages: ApiPage[] = [
  {
    title: "Introduction",
    href: "/api",
  },
  {
    title: "Get documentation health",
    href: "/api/get-documentation-health",
  },
];
