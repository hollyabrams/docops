"use client";

import { useState } from "react";

import styles from "./ApiRequest.module.scss";

type ApiRequestProps = {
  method: "GET";
  path: string;
};

export default function ApiRequest({
  method,
  path,
}: ApiRequestProps) {
  const [status, setStatus] = useState<number | null>(null);
  const [response, setResponse] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function sendRequest() {
    setIsLoading(true);
    setStatus(null);
    setResponse(null);
    setError(null);

    try {
      const result = await fetch(path);

      setStatus(result.status);

      const data = await result.json();
      setResponse(data);
    } catch {
      setError("The request could not be completed.");
    } finally {
      setIsLoading(false);
    }
  }

  function resetRequest() {
    setStatus(null);
    setResponse(null);
    setError(null);
  }

  function getCurlCommand() {
    return `curl ${window.location.origin}${path}`;
  }

  async function copyCurlCommand() {
    const curlCommand = getCurlCommand();

    await navigator.clipboard.writeText(curlCommand);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className={styles.apiRequest}>
      <div className={styles.requestBar}>
        <div className={styles.request}>
          <span className={styles.method}>{method}</span>
          <code>{path}</code>
        </div>

        <div className={styles.actions}>
          {response !== null && (
            <button
              className={styles.resetButton}
              type="button"
              onClick={resetRequest}
            >
              Reset
            </button>
          )}

          <button
            className={styles.sendButton}
            type="button"
            onClick={sendRequest}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send request"}
          </button>
        </div>
      </div>

      <div className={styles.curlRow}>
        <span className={styles.curlLabel}>cURL</span>

        <code className={styles.curlCommand}>
          curl {path}
        </code>

        <button
          className={styles.copyButton}
          type="button"
          onClick={copyCurlCommand}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className={styles.response}>
        <div className={styles.responseHeader}>
          <p className={styles.responseLabel}>Response</p>

          {status !== null && (
            <p className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              {status}
            </p>
          )}
        </div>

        <pre className={styles.responseBody}>
          <code>
            {response !== null ? JSON.stringify(response, null, 2) : ""}
          </code>
        </pre>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
