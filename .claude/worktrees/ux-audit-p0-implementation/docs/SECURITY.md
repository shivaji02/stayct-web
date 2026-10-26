# Security

## Production Headers

The repository applies production security headers in `next.config.ts` so every route and metadata response gets the same baseline.

### Header Values

- `Content-Security-Policy`: `default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: blob:; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests`
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload` in production only
- `X-Frame-Options`: `DENY`
- `X-Content-Type-Options`: `nosniff`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), payment=(), usb=()`

## Header Policy Targets

### Content Security Policy

- Define a restrictive CSP before any unsafe HTML or third-party scripts are introduced.
- Prefer allowlists over wildcards.
- Current CSP is intentionally conservative for a foundation repo and may be tightened further when vendor scripts are introduced.

### HSTS

- Enable HSTS in production once HTTPS is enforced consistently.
- The current baseline enables HSTS in production only.

### X-Frame-Options

- Prevent framing unless there is a documented business requirement.

### Referrer Policy

- Use a conservative referrer policy to avoid leaking sensitive URL state.

### Permissions Policy

- Disable browser features that the site does not require.

## Future CSP Expansion Strategy

- Start from the current allowlist-based policy.
- Add only the minimum host or directive required by an approved integration.
- Prefer nonce-based or hash-based script allowances before relaxing to broader inline permissions.
- Review CSP changes alongside any new analytics, media, or authentication integrations.

## Future Security Requirements

### Authentication

- Authentication must be isolated from the public marketing surface.
- Shared login patterns should not leak secrets into the website.

### Public APIs

- Public API endpoints must validate inputs and enforce rate limits.
- Public API contracts should not expose internal identifiers unnecessarily.

### Lead Capture

- Lead forms must validate and sanitize input.
- Lead payloads should avoid collecting unnecessary personal data.

### Marketplace

- Any future marketplace flows must define authorization and abuse controls before launch.
- Sensitive actions should require stronger verification and audit trails.
