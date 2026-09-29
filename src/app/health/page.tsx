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
          Documentation Health runs automated checks against the DocOps repository to identify content and configuration that may need attention.
        </p>

        <p>
          <strong>Generated from the repository at build time,</strong> these
          results are calculated from DocOps source files, routes,
          configuration, and documentation resources. Statuses are not
          manually assigned.
        </p>

        <DocumentationHealth health={health} />
      </section>
    </main>
  );
}
