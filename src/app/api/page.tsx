export default function ApiReferencePage() {
  return (
    <>
      <p className="eyebrow">API Reference</p>

      <h1>DocOps API</h1>

      <p>
        The DocOps API provides programmatic access to documentation system
        data and health information.
      </p>

      <h2>API operations</h2>

      <p>
        Explore available API operations, including request details, response
        properties, and example responses.
      </p>

      <h2>Documentation Health</h2>

      <p>
        Retrieve the current Documentation Health score, overall status, and
        individual health checks.
      </p>

      <p>
        <a href="/api/health">View Documentation Health</a>
      </p>

      <h2>SDKs</h2>

      <p>
        Use the DocOps API from TypeScript, Python, or JavaScript with the
        DocOps SDKs.
      </p>

      <p>
        <a href="/api/sdks">View the SDKs</a>
      </p>
    </>
  );
}
