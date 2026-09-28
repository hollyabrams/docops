import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">DocOps</p>

          <h1>Documentation engineered.</h1>

          <p className="hero-copy">
            A practical approach to building, operating, and scaling
            documentation as code.
          </p>

          <Link className="health-badge" href="/health">
            <span className="health-badge-dot" aria-hidden="true" />
            Documentation health: 100 · Healthy
            <span aria-hidden="true">→</span>
          </Link>

          <a className="hero-link" href="#explore">
            Explore DocOps <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="principles" id="explore">
        <div className="container">
          <p className="section-label">The practice</p>

          <h2>Treat documentation like software.</h2>

          <p className="section-intro">
            Version it. Review it. Test it. Automate it. Measure it.
            Improve it.
          </p>

          <div className="principle-grid">
            <article>
              <h3>Docs as Code</h3>
              <p>
                Build and maintain documentation using the same tools and
                workflows used to build software.
              </p>
              <Link href="/docs-as-code">Explore →</Link>
            </article>

            <article>
              <h3>Operations</h3>
              <p>
                Create repeatable workflows for intake, review, publishing,
                maintenance, and governance.
              </p>
              <Link href="/operations">Explore →</Link>
            </article>

            <article>
              <h3>Standards</h3>
              <p>
                Establish the conventions that make documentation consistent,
                usable, and scalable.
              </p>
              <Link href="/standards">Explore →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="workflow">
        <div className="container">
          <p className="section-label">The workflow</p>

          <h2>Documentation, operationalized.</h2>

          <p className="section-intro">
            A repeatable lifecycle turns documentation from a deliverable into a
            maintained product.
          </p>

          <div className="workflow-steps">
            <div className="workflow-step">
              <span>01</span>
              <h3>Intake</h3>
              <p>Define the request, audience, scope, priority, and owner.</p>
            </div>

            <div className="workflow-step">
              <span>02</span>
              <h3>Draft</h3>
              <p>Create content in source control using established standards.</p>
            </div>

            <div className="workflow-step">
              <span>03</span>
              <h3>Review</h3>
              <p>Validate technical accuracy, usability, and editorial quality.</p>
            </div>

            <div className="workflow-step">
              <span>04</span>
              <h3>Validate</h3>
              <p>Run automated checks before documentation reaches production.</p>
            </div>

            <div className="workflow-step">
              <span>05</span>
              <h3>Publish</h3>
              <p>Ship documentation through a controlled delivery workflow.</p>
            </div>

            <div className="workflow-step">
              <span>06</span>
              <h3>Maintain</h3>
              <p>Measure health, identify stale content, and continuously improve.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="health-feature">
        <div className="container">
          <p className="section-label">Documentation health</p>

          <h2>Know when your documentation needs attention.</h2>

          <p className="section-intro">
            DocOps evaluates repository and content signals to surface
            documentation issues before they become maintenance problems.
          </p>

          <div className="health-feature-summary">
            <div>
              <p className="health-feature-number">100</p>
              <p className="health-feature-status">Healthy</p>
            </div>

            <div className="health-feature-action">
              <p>6 automated checks</p>

              <Link href="/health">
                View documentation health <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
