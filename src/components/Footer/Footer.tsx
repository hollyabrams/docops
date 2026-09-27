import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          DocOps. Documentation engineered.
        </p>

        <div className={styles.links}>
          <a
            href="https://github.com/hollyabrams"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/hollyabrams/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="https://hollyabrams.github.io/portfolio/"
            target="_blank"
            rel="noreferrer"
          >
            Portfolio
          </a>
        </div>

        <p className={styles.credit}>
          Designed and engineered by Holly Abrams.
        </p>
      </div>
    </footer>
  );
}
