# SEO

## Strategy

SEO is config-driven and centralized.

## Metadata

- Page metadata must be generated through shared utilities in `src/seo`.
- Canonical URLs must come from the configured site URL.
- Search pages should remain noindex until a business decision says otherwise.

## Sitemap

- Sitemap entries are derived from the content registry.
- Only approved public routes should appear in the sitemap.
- Dynamic routes can be added later when they have stable source data.

## Robots

- `robots.txt` should allow the site by default.
- The sitemap URL should point at the canonical site domain.

## Open Graph and Social

- Open Graph and Twitter metadata should be produced through shared utilities.
- Shared metadata defaults belong in `src/config/seo.ts`.

## Future SEO Expansion

- City landing pages should become indexable only when city data is stable.
- Property detail pages should receive unique metadata from canonical property records.
- Resources and blog-like content should use a structured content source, not hardcoded page files.
