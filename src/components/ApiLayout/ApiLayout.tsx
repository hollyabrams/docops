import type { ReactNode } from "react";
import Link from "next/link";
import { apiPages } from "@/data/api/apiPages";
import styles from "./ApiLayout.module.scss";

type ApiLayoutProps = {
  children: ReactNode;
};

export default function ApiLayout({ children }: ApiLayoutProps) {
  return (
    <main className={styles.apiLayout}>
      <aside className={styles.sidebar}>
        <p className={styles.sidebarTitle}>API Reference</p>

        <nav aria-label="API reference">
          {apiPages.map((page) => (
            <Link key={page.href} href={page.href}>
              {page.title}
            </Link>
          ))}
        </nav>
      </aside>

      <article className={styles.content}>{children}</article>
    </main>
  );
}
