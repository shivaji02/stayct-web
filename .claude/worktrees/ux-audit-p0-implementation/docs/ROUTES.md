# Routes

## Approved Hierarchy

- `/`
- `/about`
- `/contact`
- `/pricing`
- `/features`
- `/resources`
- `/help`
- `/cities`
- `/cities/[city]`
- `/property/[slug]`
- `/search`
- `/operators`
- `/operators/owners`
- `/operators/managers`
- `/operators/tenants`
- `/app-login`
- `/privacy`
- `/terms`

## Route Groups

- `(site)` groups the public website routes without affecting the URL path.
- Shared layout behavior belongs in the route group layout or root layout, not in page files.

## Dynamic Routes

- `/cities/[city]` is reserved for city discovery pages.
- `/property/[slug]` is reserved for property detail pages.
- Both routes should derive metadata from shared SEO utilities and shared slug formatting helpers.

## Navigation Rules

- Navigation must be sourced from `src/config/navigation.ts`.
- Pages must not hardcode navigation structures.
- New navigation items should be added to the config first and then consumed by UI.

## Indexing Rules

- `/search` is intentionally noindex.
- All approved public routes should be represented in the sitemap registry unless explicitly excluded.
