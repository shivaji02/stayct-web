# Foundation Freeze

## Architecture Version

v1

## Foundation Status

Frozen

## Protected Areas

- `src/config`
- `src/services`
- `src/types`
- `src/seo`
- `docs`
- deployment architecture

## Change Policy

- Future design work must not modify foundation architecture without explicit approval.
- Feature work must consume the existing contracts, routes, and SEO utilities instead of replacing them.
- Any new cross-cutting system must be justified against the frozen baseline.

## Team Boundaries

### Architecture Team

- Owns route topology, contracts, config, security, SEO, deployment, and observability foundations.

### Design Team

- Owns presentation, layout, visual polish, and content styling only.

### Feature Team

- Owns business logic, API implementations, listings, search behavior, and user workflows built on top of the frozen foundation.
