import Link from "next/link";
import styles from "./docs.module.scss";

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
    <div className={styles.docsLayout}>
      <aside className={styles.sidebar}>
        <p className={styles.sidebarTitle}>Docs as Code</p>

        <nav aria-label="Docs as Code">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <article className={styles.content}>{children}</article>
    </div>
  );
}
