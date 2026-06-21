# ADR 002: Route Architecture

## Status

Accepted

## Context

The site needs a stable public route hierarchy for marketing, cities, property detail pages, and operator entry points.

## Decision

Use a config-driven route registry plus App Router route files, with one approved hierarchy and a public route group.

## Consequences

- Route definitions remain centralized.
- Dynamic routes can be added without duplicating navigation semantics.
- Future subdomains can reuse the same route taxonomy without changing core structure.
