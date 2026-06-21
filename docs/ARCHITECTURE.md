# Architecture

## Purpose

This repository is the public website foundation for STAYCT. It is intentionally separate from the legacy static site and from the mobile/backend repositories.

## Layering

- `src/app` owns routing, layouts, metadata routes, loading states, error boundaries, and route grouping.
- `src/components` owns shared presentational building blocks only.
- `src/config` owns runtime-independent configuration, navigation, and SEO defaults.
- `src/content` owns page/route registries used by metadata and sitemap generation.
- `src/seo` owns metadata and sitemap helpers.
- `src/services` owns API boundaries and contracts.
- `src/types` owns shared domain contracts for future property, city, search, and lead workflows.
- `src/lib` owns pure utilities.
- `src/providers` is reserved for root providers and cross-cutting app wrappers.
- `src/hooks` is reserved for future client hooks.

## Rendering Model

- Server Components are the default.
- Client Components should only be introduced when browser state, effects, or event handlers require them.
- Pages should remain thin orchestration layers that compose config, content, and SEO helpers.

## Data Flow

1. Route files read configuration and content registries.
2. Metadata is generated through shared SEO utilities.
3. Future data access happens through the services layer, not directly from route files.
4. Domain types remain centralized in `src/types`.

## Ownership Boundaries

- Routing lives in `src/app`.
- Presentation lives in `src/components`.
- Contract definitions live in `src/types` and `src/services/public-api/contracts.ts`.
- No feature logic should be embedded in config or docs.

## Extension Model

- Add new public routes by extending the route registry and creating a matching route file.
- Add new page metadata through the SEO utility layer.
- Add new public API surfaces through `src/services/public-api/contracts.ts` first, then implement clients later if approved.
