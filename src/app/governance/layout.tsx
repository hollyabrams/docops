import DocsLayout from "@/components/DocsLayout/DocsLayout";

export default function GovernanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocsLayout title="Governance">{children}</DocsLayout>;
}
