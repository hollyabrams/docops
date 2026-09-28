import DocsLayout from "@/components/DocsLayout/DocsLayout";

export default function StandardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocsLayout title="Standards">{children}</DocsLayout>;
}
