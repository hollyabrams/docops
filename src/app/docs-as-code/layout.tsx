import DocsLayout from "@/components/DocsLayout/DocsLayout";

export default function DocsAsCodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocsLayout title="Docs as Code">{children}</DocsLayout>;
}
