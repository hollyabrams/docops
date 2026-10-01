"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./TableOfContents.module.scss";

type Heading = {
  id: string;
  text: string;
};

function createId(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-docs-content] h2"
        )
      );

      const generatedHeadings = elements.map((heading) => {
        const text = heading.textContent?.trim() ?? "";
        const id = heading.id || createId(text);

        heading.id = id;

        return {
          id,
          text,
        };
      });

      setHeadings(generatedHeadings);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={styles.navigation} aria-label="On this page">
      {headings.map((heading) => (
        <a key={heading.id} href={`#${heading.id}`}>
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
