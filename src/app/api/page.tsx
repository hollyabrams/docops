import CodeExample from "@/components/CodeExample/CodeExample";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import Endpoint from "@/components/Endpoint/Endpoint";
import { healthResponseParameters } from "@/data/api/health";
import styles from "./page.module.scss";

const responseExample = `{
  "score": 100,
  "status": "healthy",
  "checks": [
    {
      "id": "internal-routes",
      "name": "Internal routes",
      "status": "passing",
      "message": "7 internal routes checked. No broken routes found."
    },
    {
      "id": "openapi-specification",
      "name": "OpenAPI specification",
      "status": "passing",
      "message": "OpenAPI contract found with required top-level structure."
    }
  ]
}`;

export default function ApiReferencePage() {
  return (
    <DocsLayout title="API Reference">
      <p className="eyebrow">API Reference</p>

      <h1>Get documentation health</h1>

      <p>
        Returns the current health of the documentation system and the
        individual checks used to calculate the overall score.
      </p>

      <h2>Request</h2>

      <Endpoint method="GET" path="/health" />

      <p>This operation does not require authentication or parameters.</p>

      <h2>Response</h2>

      <p>
        A successful request returns a documentation health object containing
        the overall score, status, and individual health checks.
      </p>

      <h3>200</h3>

      <p>
        <code>application/json</code>
      </p>

      <div className={styles.responseSchema}>
        {healthResponseParameters.map((parameter) => (
          <div className={styles.responseProperty} key={parameter.name}>
            <div>
              <code>{parameter.name}</code>
              <span>{parameter.type}</span>
            </div>

            <p>{parameter.description}</p>
          </div>
        ))}
      </div>

      <CodeExample
        title="200 response"
        language="JSON"
        code={responseExample}
      />
    </DocsLayout>
  );
}
