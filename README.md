# DocOps

**Documentation engineered.**

A documentation engineering application for building, operating, validating,
and maintaining documentation as code.

[View DocOps live →](https://hollyabrams.github.io/docops/)

DocOps is an open-source demonstration of documentation engineering in
practice. It explores what happens when documentation is treated as an
engineered system rather than simply a collection of pages.

![DocOps homepage](docs/assets/docops-home.png)

## About the project

Documentation is more than content.

Modern documentation systems depend on source control, structured content,
APIs, automated validation, CI/CD, governance, and processes that keep
information reliable as products change.

DocOps brings those practices together in a working Next.js application.

The project follows the documentation lifecycle:

**Intake → Draft → Review → Validate → Publish → Maintain**

## What DocOps demonstrates

- Docs-as-code architecture and workflows
- Documentation standards and governance
- Documentation operations and lifecycle management
- API documentation and OpenAPI
- Automated documentation health checks
- Structural, route, link, and configuration validation
- OpenAPI validation in CI
- CI/CD for documentation
- Developer documentation
- AI-ready documentation and discovery resources
- Documentation engineering practices

## Documentation Health

DocOps includes an automated Documentation Health system that evaluates the
repository at build time.

Health checks inspect documentation structure, section content, internal
routes, external URLs, OpenAPI structure, and AI discovery resources. Results
are combined into an overall documentation health score.

The checks are designed to fail when documentation or configuration no longer
meets expected requirements, making documentation quality observable rather
than assumed.

## API and OpenAPI

DocOps includes an API reference backed by an OpenAPI 3.1 contract.

The OpenAPI specification is validated with Redocly as part of the CI pipeline,
demonstrating how an API contract can participate in documentation validation
and publishing workflows.

## AI-ready documentation

DocOps explores documentation for both human and machine consumption.

The project includes structured documentation, a generated sitemap, crawler
configuration, and an `llms.txt` resource. Documentation Health validates that
these discovery resources are present and correctly configured.

AI-assisted documentation workflows are an area of continued development, with
human review and deterministic validation remaining part of the documentation
lifecycle.

## Technology

DocOps is built with:

- Next.js
- React
- TypeScript
- SCSS
- MDX
- OpenAPI 3.1
- Redocly CLI
- GitHub Actions
- GitHub Pages

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
just run
```

Open:

```bash
http://localhost:3000
```

## Validation

Run the project checks locally:

```bash
npm run lint
npm run validate:openapi
npm run build
```

The GitHub Actions workflow runs these checks before deploying DocOps to
GitHub Pages.

## Project status

DocOps is actively being developed.
Current functionality includes documentation architecture, governance and
standards, automated Documentation Health, API documentation, an OpenAPI
contract, CI/CD, and AI discovery resources.

Planned work includes additional API endpoints, Python SDK examples,
release-note and changelog workflows, deeper documentation health checks, and
AI-assisted documentation operations.

## Author

Designed and engineered by Holly Abrams.

- [Portfolio](https://hollyabrams.github.io/portfolio/)
- [LinkedIn](https://www.linkedin.com/in/hollyabrams/)
- [GitHub](https://github.com/hollyabrams)
