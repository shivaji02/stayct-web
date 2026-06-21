# Error Handling

## Ownership

- `src/app/error.tsx` owns the global application error boundary.
- `src/app/not-found.tsx` owns the global 404 state.
- Route-local error boundaries can be added later for specific route groups or sections.
- API routes own their own status codes and JSON error payloads.

## Flow

1. Route or component throws.
2. The nearest framework error boundary handles the failure.
3. Monitoring hooks can record the event through the abstraction layer.
4. Users receive a safe message that does not expose internals.

## Error Types

### Global Errors

- Application-wide rendering failures.
- Unexpected runtime exceptions during route rendering.

### Route Errors

- Page-specific failures.
- Dynamic route data failures.

### Component Errors

- Client-side interactions and browser-only rendering failures once client components exist.

### API Errors

- Route handlers should return structured HTTP errors.
- APIs should avoid leaking stack traces or backend internals.

## Monitoring Hooks

- Error tracking integrations should be called from centralized adapters only.
- Route components should not talk to vendors directly.

## User-Safe Messaging

- User-facing error text should be short and neutral.
- Details should go to logs or monitoring systems, not the UI.
