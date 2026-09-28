import type { ReactNode } from "react";
import TableOfContents from "@/components/TableOfContents/TableOfContents";
import styles from "./DocsLayout.module.scss";

type DocsLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function DocsLayout({
  title,
  children,
}: DocsLayoutProps) {
  return (
    <main className={styles.docsLayout}>
      <aside className={styles.sidebar}>
        <p className={styles.sidebarTitle}>{title}</p>
        <TableOfContents />
      </aside>

      <article className={styles.content} data-docs-content>
        {children}
      </article>
    </main>
  );
}
