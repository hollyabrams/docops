"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" onClick={closeMenu}>
          DocOps
        </Link>

        <nav className={styles.navigation} aria-label="Main navigation">
          <Link href="/docs-as-code">Docs as Code</Link>
          <Link href="/standards">Standards</Link>
          <Link href="/operations">Operations</Link>
          <Link href="/governance">Governance</Link>
          <Link href="/developer-docs">Developer Docs</Link>
          <Link href="/api">API</Link>
          <Link href="/ai">AI</Link>
          <Link href="/blog">Blog</Link>
        </nav>

        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileNavigation} ${
          menuOpen ? styles.mobileNavigationOpen : ""
        }`}
        aria-label="Mobile navigation"
      >
        <Link href="/docs-as-code" onClick={closeMenu}>
          Docs as Code
        </Link>
        <Link href="/standards" onClick={closeMenu}>
          Standards
        </Link>
        <Link href="/operations" onClick={closeMenu}>
          Operations
        </Link>
        <Link href="/governance" onClick={closeMenu}>
          Governance
        </Link>
        <Link href="/developer-docs" onClick={closeMenu}>
          Developer Docs
        </Link>
        <Link href="/api" onClick={closeMenu}>
          API
        </Link>
        <Link href="/ai" onClick={closeMenu}>
          AI
        </Link>
        <Link href="/blog" onClick={closeMenu}>
          Blog
        </Link>
      </nav>
    </header>
  );
}
