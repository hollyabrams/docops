import DocsLayout from "@/components/DocsLayout/DocsLayout";

const navigation = [
  { label: "Overview", href: "#overview" },
  { label: "Audience", href: "#audience" },
  { label: "Getting started", href: "#getting-started" },
  { label: "Concepts", href: "#concepts" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Troubleshooting", href: "#troubleshooting" },
  { label: "Maintenance", href: "#maintenance" },
];

export default function DeveloperDocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DocsLayout title="Developer Docs" navigation={navigation}>
      {children}
    </DocsLayout>
  );
}
