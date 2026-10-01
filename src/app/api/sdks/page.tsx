export default function SdkPage() {
  return (
    <>
      <p className="eyebrow">API</p>

      <h1>SDKs</h1>

      <p>
        Use the DocOps API with TypeScript, Python, or JavaScript. Each SDK provides
        a reusable client, examples, and tests for the same API.
      </p>

      <h2>TypeScript</h2>

      <p>
        A TypeScript SDK with typed API models, a reusable client, configurable
        API URLs, and Vitest tests.
      </p>

      <p>
        <a
          href="https://github.com/hollyabrams/docops-sdks/tree/main/typescript"
          target="_blank"
          rel="noreferrer"
        >
          View the TypeScript SDK
        </a>
      </p>

      <h2>Python</h2>

      <p>
        A Python SDK with reusable API models, a client, configurable API URLs,
        and pytest tests.
      </p>

      <p>
        <a
          href="https://github.com/hollyabrams/docops-sdks/tree/main/python"
          target="_blank"
          rel="noreferrer"
        >
          View the Python SDK
        </a>
      </p>

      <h2>JavaScript</h2>

      <p>
        A JavaScript SDK using modern ES modules, a reusable API client,
        configurable API URLs, and Jest tests.
      </p>

      <p>
        <a
          href="https://github.com/hollyabrams/docops-sdks/tree/main/javascript"
          target="_blank"
          rel="noreferrer"
        >
          View the JavaScript SDK
        </a>
      </p>

      <h2>API compatibility</h2>

      <p>
        Each SDK targets the same DocOps API and follows the same core behavior,
        including successful requests, API error handling, and configurable
        base URLs.
      </p>
    </>
  );
}
