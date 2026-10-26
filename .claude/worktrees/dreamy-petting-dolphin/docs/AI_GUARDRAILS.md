# AI Guardrails

These rules are mandatory for any AI agent working in this repository.

## Architecture Rules

- AI must not create duplicate architectures.
- AI must not create alternate routing systems.
- AI must not bypass the established folder structure.
- AI must extend existing systems instead of replacing them.

## SEO Rules

- AI must use the metadata utilities.
- AI must not hardcode metadata.
- AI must not create routes outside the approved hierarchy.
- AI must keep sitemap and robots logic centralized.

## Code Rules

- AI must not introduce unnecessary client components.
- AI must prefer Server Components by default.
- AI must not create dead code.
- AI must not create placeholder utilities that are unused.
- AI must not introduce a new state library without approval.

## Dependency Rules

- AI must not install new dependencies without justification.
- AI must document every dependency addition.
- AI must prefer existing platform and framework capabilities first.

## Design Rules

- AI must not redesign pages unless explicitly instructed.
- AI must separate architecture from presentation.
- AI must not make visual design decisions when the task is structural.

## Security Rules

- AI must never expose secrets.
- AI must never commit environment values.
- AI must use the environment abstraction.
- AI must avoid unsafe HTML rendering.

## Scalability Rules

- AI must optimize for future city pages.
- AI must optimize for property listing growth.
- AI must optimize for future marketplace expansion.

## Public API Rules

- AI must keep API access behind the services layer.
- AI must define contracts before implementation.
- AI must not call backend APIs directly from routes or components.
