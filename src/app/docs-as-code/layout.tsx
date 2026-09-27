import DocsLayout from "@/components/DocsLayout/DocsLayout";

const navigation = [
  { label: "Overview", href: "#overview" },
  { label: "Architecture", href: "#architecture" },
  { label: "Repository", href: "#repository" },
  { label: "Local development", href: "#local-development" },
  { label: "Git workflow", href: "#git-workflow" },
  { label: "Validation", href: "#validation" },
  { label: "Publishing", href: "#publishing" },
];

export default function DocsAsCodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DocsLayout title="Docs as Code" navigation={navigation}>
      {children}
    </DocsLayout>
  );
}
