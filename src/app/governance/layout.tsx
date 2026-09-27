import DocsLayout from "@/components/DocsLayout/DocsLayout";

const navigation = [
  { label: "Overview", href: "#overview" },
  { label: "Principles", href: "#principles" },
  { label: "Roles", href: "#roles" },
  { label: "Ownership", href: "#ownership" },
  { label: "Review requirements", href: "#review-requirements" },
  { label: "Content lifecycle", href: "#content-lifecycle" },
  { label: "Exceptions", href: "#exceptions" },
];

export default function GovernanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DocsLayout title="Governance" navigation={navigation}>
      {children}
    </DocsLayout>
  );
}
