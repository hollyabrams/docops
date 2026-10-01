"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [apiOpen, setApiOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
    setApiOpen(false);
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
          <Link href="/ai">AI</Link>

          <div className={styles.dropdown}>
            <button
              className={styles.dropdownButton}
              type="button"
              aria-expanded={apiOpen}
              aria-haspopup="true"
              onClick={() => setApiOpen((open) => !open)}
            >
              API
              <span aria-hidden="true">⌄</span>
            </button>

            {apiOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/api" onClick={closeMenu}>
                  Overview
                </Link>
                <Link href="/api/health" onClick={closeMenu}>
                  Documentation Health
                </Link>
                <Link href="/api/sdks" onClick={closeMenu}>
                  SDKs
                </Link>
              </div>
            )}
          </div>

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
        <Link href="/ai" onClick={closeMenu}>
          AI
        </Link>

        <div className={styles.mobileApi}>
          <button
            className={styles.mobileApiButton}
            type="button"
            aria-expanded={apiOpen}
            onClick={() => setApiOpen((open) => !open)}
          >
            API
            <span aria-hidden="true">{apiOpen ? "−" : "+"}</span>
          </button>

          {apiOpen && (
            <div className={styles.mobileApiLinks}>
              <Link href="/api" onClick={closeMenu}>
                Overview
              </Link>
              <Link href="/api/health" onClick={closeMenu}>
                Documentation Health
              </Link>
              <Link href="/api/sdks" onClick={closeMenu}>
                SDKs
              </Link>
            </div>
          )}
        </div>

        <Link href="/blog" onClick={closeMenu}>
          Blog
        </Link>
      </nav>
    </header>
  );
}