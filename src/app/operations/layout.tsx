import DocsLayout from "@/components/DocsLayout/DocsLayout";

export default function OperationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocsLayout title="Operations">{children}</DocsLayout>;
}
