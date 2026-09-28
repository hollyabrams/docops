import DocsLayout from "@/components/DocsLayout/DocsLayout";

export default function DeveloperDocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocsLayout title="Developer Docs">{children}</DocsLayout>;
}
