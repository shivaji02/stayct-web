# Contributing

## Architectural Principles

- No business logic inside UI components.
- No direct API calls from pages.
- Services layer required for external data access.
- Strong typing is required for shared contracts.
- No hardcoded URLs.
- No hardcoded metadata.
- No duplicated route definitions.
- Centralized navigation config is mandatory.

## Folder Ownership

- `src/app` owns routing and route-local concerns.
- `src/components` owns reusable view primitives only.
- `src/config` owns site, navigation, SEO, and environment configuration.
- `src/content` owns page registries and sitemap inputs.
- `src/seo` owns metadata and sitemap helpers.
- `src/services` owns public API contracts and later clients.
- `src/types` owns domain contracts.
- `src/lib` owns pure helpers.
- `docs` owns architectural records and operating guidance.
- `public` owns static assets only.

## Working Rules

- Extend existing systems instead of introducing parallel ones.
- Prefer server components by default.
- Keep route files thin.
- Add new route entries to the route registry before building UI around them.
- Add new public API surfaces as contracts first.
