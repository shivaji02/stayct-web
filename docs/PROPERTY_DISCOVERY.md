# Property Discovery

## Purpose

This document defines the future shape of the public property discovery system without implementing it.

## Future Models

### PropertyListing

- Canonical public representation of a property.
- Includes slug, category, location, summary, pricing hints, and publish status.

### PropertyAmenity

- Canonical amenity label/code pair.
- Must remain stable across listings and UI surfaces.

### PropertyPhoto

- Represents an ordered photo asset with alt text and usage metadata.

### City

- Canonical city object for discovery, SEO, and routing.

### Area

- Optional neighborhood or locality grouping under a city.

### VacancySummary

- Aggregate availability shape for property discovery and future marketplace flows.

## Future Routes

- `/cities/[city]`
- `/property/[slug]`
- `/search`

## SEO Implications

- City pages should eventually have canonical metadata generated from stable city records.
- Property pages should use stable slugs and canonical property identifiers.
- Search pages should remain carefully controlled for indexing and duplicate-content risk.

## Public API Boundaries

- Discovery data should be served through the public API boundary, not through page-local ad hoc requests.
- Search, list, and detail endpoints should remain separate contracts.

## Search Considerations

- Queries should support city, area, category, and full-text matching.
- Result ranking should be deterministic and explainable.
- Search should remain decoupled from presentation.
