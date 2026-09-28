import type {
  DocumentationHealth as DocumentationHealthData,
  HealthStatus,
} from "@/lib/documentationHealth";
import styles from "./DocumentationHealth.module.scss";

type DocumentationHealthProps = {
  health: DocumentationHealthData;
};

function getStatusLabel(status: HealthStatus) {
  switch (status) {
    case "passing":
      return "Passing";
    case "warning":
      return "Warning";
    case "failing":
      return "Failing";
    case "unavailable":
      return "Not configured";
  }
}

function getHealthLabel(status: DocumentationHealthData["status"]) {
  switch (status) {
    case "healthy":
      return "Healthy";
    case "needs-attention":
      return "Needs attention";
    case "unhealthy":
      return "Unhealthy";
  }
}

export default function DocumentationHealth({
  health,
}: DocumentationHealthProps) {
  return (
    <section className={styles.health}>
      <div className={styles.summary}>
        <p className={styles.score}>{health.score}</p>
        <p className={styles.status}>{getHealthLabel(health.status)}</p>
      </div>

      <div className={styles.checks}>
        {health.checks.map((check) => (
          <div className={styles.check} key={check.id}>
            <div>
              <p className={styles.checkName}>{check.name}</p>
              <p className={styles.message}>{check.message}</p>
            </div>

            <p
              className={`${styles.checkStatus} ${styles[check.status]}`}
            >
              {getStatusLabel(check.status)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
