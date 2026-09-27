import DocsLayout from "@/components/DocsLayout/DocsLayout";

const navigation = [
  { label: "Overview", href: "#overview" },
  { label: "Voice and tone", href: "#voice-and-tone" },
  { label: "Structure", href: "#structure" },
  { label: "Procedures", href: "#procedures" },
  { label: "Links", href: "#links" },
  { label: "Code examples", href: "#code-examples" },
  { label: "API documentation", href: "#api-documentation" },
];

export default function StandardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DocsLayout title="Standards" navigation={navigation}>
      {children}
    </DocsLayout>
  );
}
