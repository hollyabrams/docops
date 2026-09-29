import DocsLayout from "@/components/DocsLayout/DocsLayout";

export default function AiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocsLayout title="AI">{children}</DocsLayout>;
}
