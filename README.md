# DocOps

**Documentation engineered.**

A documentation engineering application for building, validating, publishing,
and maintaining documentation as code.

[View DocOps live →](https://docops-gamma.vercel.app/)

DocOps is an open-source project that demonstrates documentation engineering
in practice. It treats documentation as a system to build and maintain, not
just a collection of pages.

![DocOps homepage](docs/assets/docops-home.png)

## About the project

Modern documentation depends on more than good writing. It also needs source
control, structured content, APIs, automated checks, CI/CD, standards, and
clear processes for keeping information accurate as products change.

DocOps brings those pieces together in a working Next.js application.

The project follows the documentation lifecycle:

**Intake → Draft → Review → Validate → Publish → Maintain**

## What DocOps demonstrates

- Docs-as-code architecture and workflows
- Documentation standards and governance
- Documentation lifecycle management
- API and developer documentation
- OpenAPI 3.1
- Automated documentation health checks
- Content, route, link, and configuration validation
- CI/CD for documentation
- AI-ready documentation and discovery resources

## Documentation Health

DocOps includes an automated Documentation Health system that checks the
documentation and reports its current health.

Checks cover documentation structure, empty sections, internal routes,
external URLs, the OpenAPI specification, and AI discovery resources. The
results are combined into an overall health score.

The same health engine powers the Documentation Health dashboard and the
DocOps API.

## API and OpenAPI

DocOps includes a working API with a human-readable API reference backed by
an OpenAPI 3.1 contract.

The `GET /api/v1/health` endpoint returns the current Documentation Health
score and its individual checks.

The API reference includes an interactive request console for sending a live
request and viewing the JSON response. The OpenAPI specification is validated
with Redocly as part of CI.

## AI-ready documentation

DocOps includes resources that make documentation easier for both people and
machines to discover and use.

The project includes structured documentation, a generated sitemap, crawler
configuration, and an `llms.txt` resource. Documentation Health checks that
these resources are present and configured.

AI-assisted documentation workflows are planned, with human review and
automated validation remaining part of the process.

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
- Vercel

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

```text
http://localhost:3000
```

## Validation

Run the project checks locally:

```bash
npm run lint
npm run validate:openapi
npm run build
```

GitHub Actions runs the same checks on pushes to `main` and pull requests.

## Deployment

DocOps is deployed to Vercel and connected to the GitHub repository.

GitHub Actions handles CI by running linting, OpenAPI validation, and a
production build. Vercel automatically deploys changes from `main`.

This keeps validation and deployment separate while supporting server-side
features such as the DocOps API.

## Project status

DocOps is actively being developed.

Current functionality includes documentation architecture and standards,
Documentation Health, a working API and interactive API reference, OpenAPI
validation, CI/CD, and AI discovery resources.

Planned work includes additional API endpoints, a Python SDK, release-note and
changelog workflows, deeper health checks, and AI-assisted documentation
operations.

## Author

Designed and engineered by Holly Abrams.

- [Portfolio](https://hollyabrams.github.io/portfolio/)
- [LinkedIn](https://www.linkedin.com/in/hollyabrams/)
- [GitHub](https://github.com/hollyabrams)
