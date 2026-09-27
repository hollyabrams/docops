import styles from "./Lifecycle.module.scss";

const stages = [
  {
    number: "01",
    title: "Intake",
    description: "Capture the request, audience, scope, priority, and owner.",
  },
  {
    number: "02",
    title: "Plan",
    description: "Define requirements, dependencies, reviewers, and delivery.",
  },
  {
    number: "03",
    title: "Create",
    description: "Develop documentation using established standards.",
  },
  {
    number: "04",
    title: "Review",
    description: "Validate technical accuracy, usability, and editorial quality.",
  },
  {
    number: "05",
    title: "Publish",
    description: "Ship approved documentation through the delivery pipeline.",
  },
  {
    number: "06",
    title: "Maintain",
    description: "Measure health, resolve gaps, and retire stale content.",
  },
];

export default function Lifecycle() {
  return (
    <div className={styles.lifecycle}>
      {stages.map((stage) => (
        <div className={styles.stage} key={stage.number}>
          <span>{stage.number}</span>
          <h3>{stage.title}</h3>
          <p>{stage.description}</p>
        </div>
      ))}
    </div>
  );
}
