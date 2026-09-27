import Link from "next/link";
import styles from "./DocsLayout.module.scss";

type NavigationItem = {
  label: string;
  href: string;
};

type DocsLayoutProps = {
  title: string;
  navigation: NavigationItem[];
  children: React.ReactNode;
};

export default function DocsLayout({
  title,
  navigation,
  children,
}: DocsLayoutProps) {
  return (
    <div className={styles.docsLayout}>
      <aside className={styles.sidebar}>
        <p className={styles.sidebarTitle}>{title}</p>

        <nav aria-label={title}>
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
