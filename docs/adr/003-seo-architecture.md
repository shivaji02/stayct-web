# ADR 003: SEO Architecture

## Status

Accepted

## Context

The website needs canonical URLs, sitemap generation, robots control, and route-specific metadata with minimal duplication.

## Decision

Centralize SEO logic in reusable utilities and config objects, and derive sitemap entries from the route/content registry.

## Consequences

- Metadata stays consistent across routes.
- Robots and sitemap behavior are easy to audit.
- Search can remain noindex until it has a stable product definition.
