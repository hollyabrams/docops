import type { ReactNode } from "react";
import TableOfContents from "@/components/TableOfContents/TableOfContents";
import styles from "./ApiLayout.module.scss";

type ApiLayoutProps = {
  children: ReactNode;
};

export default function ApiLayout({ children }: ApiLayoutProps) {
  return (
    <main className={styles.apiLayout}>
      <aside className={styles.sidebar}>
        <p className={styles.sidebarTitle}>API Reference</p>
        <TableOfContents />
      </aside>

      <article className={styles.content} data-docs-content>
        {children}
      </article>
    </main>
  );
}
