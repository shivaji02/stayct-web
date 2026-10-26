# ADR 004: Public API Boundary

## Status

Accepted

## Context

The website will eventually consume public property, city, search, and lead endpoints.

## Decision

Define public API contracts in a dedicated services boundary and keep route files free from direct backend calls.

## Consequences

- Request and response shapes are explicit before implementation.
- Future API clients can be added without changing route topology.
- UI work remains decoupled from backend transport concerns.
