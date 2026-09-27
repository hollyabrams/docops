import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          DocOps
        </Link>

        <nav className={styles.navigation} aria-label="Main navigation">
          <Link href="/docs-as-code">Docs as Code</Link>
          <Link href="/standards">Standards</Link>
          <Link href="/operations">Operations</Link>
          <Link href="/governance">Governance</Link>
          <Link href="/developer-docs">Developer Docs</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
