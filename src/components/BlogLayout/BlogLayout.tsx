import type { ReactNode } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog/blogPosts";
import styles from "./BlogLayout.module.scss";

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <main className={styles.blogLayout}>
      <aside className={styles.sidebar}>
        <p className={styles.sidebarTitle}>Blog</p>

        <nav aria-label="Blog posts">
          {blogPosts.map((post) => (
            <Link key={post.href} href={post.href}>
              {post.title}
            </Link>
          ))}
        </nav>
      </aside>

      <article className={styles.content}>{children}</article>
    </main>
  );
}
