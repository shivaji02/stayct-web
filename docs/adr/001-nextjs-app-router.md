# ADR 001: Next.js App Router

## Status

Accepted

## Context

The public website needs nested routes, route-local metadata, dynamic segments, and a server-first rendering model.

## Decision

Use Next.js App Router as the primary routing and rendering system.

## Consequences

- Server Components become the default.
- Metadata routes such as robots and sitemap can live alongside the application.
- Route groups can isolate public website concerns without changing URLs.
