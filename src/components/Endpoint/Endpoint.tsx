import styles from "./Endpoint.module.scss";

type EndpointProps = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
};

export default function Endpoint({ method, path }: EndpointProps) {
  return (
    <div className={styles.endpoint}>
      <span className={styles.method}>{method}</span>
      <code className={styles.path}>{path}</code>
    </div>
  );
}
