# Observability

## Goals

The site should be observable before public launch, even if implementations are added later.

## Abstraction Layer

The repository includes future-facing monitoring adapters in `src/lib/monitoring`:

- `analytics.ts`
- `error-tracking.ts`
- `performance.ts`

These files define the integration boundary only and do not bind the project to any vendor.

## Standards to Prepare For

### Error Tracking

- Capture runtime exceptions from the web app and production server.
- Tag events with route, environment, and release metadata.

### Analytics

- Track page views, CTA clicks, and navigation behavior.
- Keep analytics configuration outside route files.

### Lead Tracking

- Track enquiry submission flows separately from page views.
- Preserve the source page and source route in the event payload.

### Search Tracking

- Track search queries, filter use, and result selection.
- Avoid collecting unnecessary personal data.

### SEO Monitoring

- Monitor indexed pages, sitemap reachability, and canonical integrity.
- Track robots and sitemap changes as part of release validation.

## Health Endpoint

- `GET /api/health` returns a lightweight uptime response.
- Use it for load balancer checks, uptime monitoring, and basic deployment verification.
- It must not access databases or external APIs.

## Future Implementation Notes

- Choose one observability stack and keep it consistent.
- Prefer server-side logging for operational events.
- Keep client analytics minimal and explicit.
- Sentry, PostHog, Plausible, and GA4 should all plug into the monitoring abstraction rather than into page code.
