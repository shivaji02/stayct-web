# Public API

## Boundary

The public website keeps the API boundary explicit. This repository currently defines contracts only.

## Future Endpoints

- `GET /public/properties`
- `GET /public/properties/:slug`
- `GET /public/cities`
- `GET /public/search`
- `POST /public/enquiry`

## Contract Ownership

- Request and response types live in `src/types`.
- Endpoint contract definitions live in `src/services/public-api/contracts.ts`.
- Route files must not call backend APIs directly.
- Any future client implementation should live in the services layer.

## Contract Goals

- Keep property list and property detail models stable.
- Keep city discovery and search models separate from property detail models.
- Keep lead capture isolated from listing/read APIs.

## Future Integration Notes

- Public API responses should be versioned or otherwise stability-gated before UI consumers depend on them.
- Pagination, filtering, and search semantics should be explicit in the contract before implementation begins.
