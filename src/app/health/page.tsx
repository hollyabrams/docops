import DocumentationHealth from "@/components/DocumentationHealth/DocumentationHealth";
import { getDocumentationHealth } from "@/lib/documentationHealth";

export default function HealthPage() {
  const health = getDocumentationHealth();

  return (
    <main className="container health-page">
      <section>
        <p className="eyebrow">Documentation Health</p>

        <h1>Know when your documentation needs attention.</h1>

        <p>
          Documentation health combines automated checks and repository
          signals to identify content that may need review.
        </p>

        <DocumentationHealth health={health} />
      </section>
    </main>
  );
}
