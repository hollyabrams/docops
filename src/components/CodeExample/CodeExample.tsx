"use client";

import { useState } from "react";
import styles from "./CodeExample.module.scss";

type CodeExampleProps = {
  title: string;
  language: string;
  code: string;
};

export default function CodeExample({
  title,
  language,
  code,
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className={styles.example}>
      <div className={styles.header}>
        <div>
          <p className={styles.title}>{title}</p>
          <span className={styles.language}>{language}</span>
        </div>

        <button
          className={styles.copy}
          type="button"
          onClick={copyCode}
          aria-label={`Copy ${title} code`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
