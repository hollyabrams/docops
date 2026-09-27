import DocsLayout from "@/components/DocsLayout/DocsLayout";

const navigation = [
  { label: "Overview", href: "#overview" },
  { label: "Intake", href: "#intake" },
  { label: "Prioritization", href: "#prioritization" },
  { label: "Service levels", href: "#service-levels" },
  { label: "Lifecycle", href: "#lifecycle" },
  { label: "Ownership", href: "#ownership" },
  { label: "Maintenance", href: "#maintenance" },
];

export default function OperationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DocsLayout title="Operations" navigation={navigation}>
      {children}
    </DocsLayout>
  );
}
