# Deployment

## Environment Strategy

### Development

- Local developer machine or preview branch.
- Canonical site URL should point to `http://localhost:3000` or the preview host.
- Use local `.env.local` values only.

### Staging

- Staging should mirror production structure and environment variables.
- Staging should be used for PR validation, content QA, and SEO inspection.

### Production

- Production is the canonical public site.
- Public-facing URLs must resolve to the production domain.

## Domains

### Current

- `stayct.in` for the public website.
- `app.stayct.in` for the application login/experience boundary.
- `api.stayct.in` for future API exposure.

### Future

- `cities.stayct.in`
- `partners.stayct.in`
- `marketplace.stayct.in`

## Deployment Flow

Developer -> Pull Request -> CI -> Staging -> Approval -> Production

## Required Environment Variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_BASE_URL` when a public API is exposed through the website
- `API_BASE_URL` for server-side API integration if needed later

## Build Process

1. Install dependencies with `npm ci` in CI or `npm install` locally when the lockfile changes.
2. Run lint and build checks before merge.
3. Build the Next.js standalone output for production.
4. Deploy the artifact to the target environment.

## Rollback Process

- Roll back by redeploying the previously known-good commit or build artifact.
- Keep environment variables and domains stable during rollback.
- Avoid emergency edits to source and runtime configuration simultaneously.

## Cache Invalidation Strategy

- Prefer content-addressed static assets so asset changes invalidate naturally.
- Use canonical path-based invalidation for page updates.
- Regenerate sitemap and robots artifacts when route topology changes.

## CDN Strategy

- Serve static assets through the platform edge/CDN layer.
- Cache immutable assets aggressively.
- Keep HTML/page caching conservative until revalidation rules are defined.

## Image Optimization Strategy

- Use the Next.js image pipeline for future optimized imagery.
- Keep source images in `public/` only when they are intentionally static.
- Add remote image host allowlists before consuming dynamic image sources.
