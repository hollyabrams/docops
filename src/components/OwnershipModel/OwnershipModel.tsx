import styles from "./OwnershipModel.module.scss";

const roles = [
  {
    title: "Documentation",
    owner: "Documentation owner",
    responsibility:
      "Owns content quality, structure, standards, and lifecycle.",
  },
  {
    title: "Technical accuracy",
    owner: "Subject matter expert",
    responsibility:
      "Validates product behavior, implementation details, and technical claims.",
  },
  {
    title: "Product direction",
    owner: "Product owner",
    responsibility:
      "Confirms scope, intended behavior, terminology, and release context.",
  },
  {
    title: "Delivery",
    owner: "Engineering",
    responsibility:
      "Provides implementation context and coordinates documentation dependencies.",
  },
];

export default function OwnershipModel() {
  return (
    <div className={styles.model}>
      {roles.map((role) => (
        <div className={styles.role} key={role.title}>
          <p className={styles.area}>{role.title}</p>
          <h3>{role.owner}</h3>
          <p>{role.responsibility}</p>
        </div>
      ))}
    </div>
  );
}
