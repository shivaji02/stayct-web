# STAYCT Discovery Platform Audit

Date: 2026-06-23

## Scope

This audit compares the pre-change website implementation against the requested discovery-first accommodation brief and records the implementation now present in this repository.

## Audit Summary

### Before implementation

1. Navigation orientation failed.
   - `src/app/(site)/layout.tsx` returned children only.
   - Header and footer were manually rendered on the homepage only.
   - Inner pages had no shared header, no shared footer, no breadcrumbs, and no active navigation state.

2. Dead-end and duplicate routes existed.
   - `help` and `contact` duplicated the same support outcome.
   - `operators`, `owners`, `managers`, `tenants`, and `app-login` split the operator journey into unnecessary branches.
   - `features`, `pricing`, and placeholder routes were non-conversion content surfaces.
   - `/property/[slug]` and `/cities/[city]` were still framed as sample or placeholder-led routes.

3. Discovery hierarchy was wrong.
   - Homepage copy and section order still behaved like a SaaS landing page.
   - Search was guidance-heavy instead of inventory-first.
   - City pages mixed explanation with listings instead of leading with inventory.

4. Mobile and accessibility gaps were structural.
   - Mobile navigation lacked a clear current-page indicator.
   - No shared breadcrumb semantics existed.
   - No site-wide skip link existed.
   - Current-route state was not exposed with `aria-current`.

## Route Matrix

### Production ready now

- `/`
- `/search`
- `/cities`
- `/cities/[city]`
- `/categories`
- `/categories/[category]`
- `/stays/[slug]`
- `/list-property`
- `/manage-property`
- `/resources`
- `/support`
- `/about`
- `/privacy`
- `/terms`

### Redirect now

- `/contact` -> `/support`
- `/help` -> `/support`
- `/pricing` -> `/resources`
- `/features` -> `/resources`
- `/operators` -> `/list-property`
- `/operators/owners` -> `/list-property`
- `/operators/managers` -> `/manage-property`
- `/operators/tenants` -> `/support`
- `/app-login` -> `/manage-property`
- `/property/:slug` -> `/stays/:slug`
- `/cities/mumbai` -> `/cities`

### Removed from active IA

- Mumbai as a promoted city destination
- Help/Contact split
- Owners/Managers/Tenants branch split
- Pricing/Features placeholder marketing surfaces
- Placeholder route pattern

## Navigation Audit

### Required

- Global header
- Global footer
- Breadcrumbs on every inner page
- Active menu state
- Current page indication

### Implemented

- Shared shell added in `src/app/(site)/layout.tsx`
- Active desktop and mobile navigation in `src/components/layout/navigation.tsx`
- Breadcrumb component in `src/components/layout/breadcrumbs.tsx`
- Shared footer in `src/components/layout/footer.tsx`
- Mobile menu now exposes current location text
- `aria-current="page"` now used for active header links and final breadcrumb items

## Information Architecture Audit

### Required structure

- Home
- Search Stays
- Cities
- Categories
- Stay Details
- List Your Property
- Manage Property
- Resources
- Support
- About
- Privacy
- Terms

### Implemented structure

- Matches the required structure exactly
- City detail pages now exist for:
  - Hyderabad
  - Bengaluru
  - Vijayawada
  - Pune
  - Chennai
  - Delhi NCR
- Category detail pages now exist for:
  - PG
  - Hostel
  - Co-Living
  - Shared Flat
  - Rental Room

## Dead-End Audit

### Findings before implementation

- City promotion included unsupported paths.
- Search relied on explanatory blocks instead of real results.
- Operators were split across overlapping pages.
- Several pages existed only to route the user elsewhere.

### Remediation now in code

- Search is inventory-first and URL-driven.
- City pages lead with listings and quick filters.
- Support consolidates help/contact into one destination.
- Legacy routes now redirect instead of lingering as duplicate experiences.
- Stay detail pages now include related properties, back-to-search recovery, and direct contact actions.

## CTA and Conversion Audit

### Primary CTA model

- Home: `Find a stay`
- Search: `Update search`
- City pages: `Search {City}`
- Category pages: `Search {Category}`
- Stay detail: `Contact this stay`
- List Your Property: `Start by email`
- Manage Property: `Open STAYCT app`
- Support: `Email support`
- Resources/About/Privacy/Terms: clear route-specific primary action or recovery path

### Conversion changes implemented

- Listings now appear before explanatory content.
- Search state survives refresh and browser back through query params.
- City, category, and stay pages all expose recovery links instead of dead ends.
- Operator funnel reduced to `List Your Property` and `Manage Property`.

## Mobile UX Audit

### Fixes implemented

- Mobile header shows current location text.
- Mobile menu exposes the same IA as desktop.
- Search filters stack correctly on small screens.
- Cards and CTA groups wrap cleanly.
- No page depends on hidden desktop-only navigation for recovery.

## Accessibility Audit

### Fixes implemented

- Skip link added in `src/app/(site)/layout.tsx`
- Breadcrumb nav uses `aria-label="Breadcrumb"`
- Active navigation uses `aria-current`
- Focus-visible styling reinforced in `src/app/globals.css`
- 404 page now has recovery links instead of a generic dead end

### Residual recommendation

- Add automated axe/playwright accessibility checks when the real backend-driven listing layer replaces mock content.

## Proposed Sitemap

- `/`
- `/search`
- `/cities`
- `/cities/hyderabad`
- `/cities/bengaluru`
- `/cities/vijayawada`
- `/cities/pune`
- `/cities/chennai`
- `/cities/delhi-ncr`
- `/categories`
- `/categories/pg`
- `/categories/hostel`
- `/categories/co-living`
- `/categories/shared-flat`
- `/categories/rental-room`
- `/stays/[slug]`
- `/list-property`
- `/manage-property`
- `/resources`
- `/support`
- `/about`
- `/privacy`
- `/terms`

## Proposed Component Architecture

### Shared shell

- `src/components/layout/navigation.tsx`
- `src/components/layout/footer.tsx`
- `src/components/layout/breadcrumbs.tsx`

### Discovery UI

- `src/components/ui/city-card.tsx`
- `src/components/ui/stay-card.tsx`
- `src/components/ui/support-contact-card.tsx`

### Data and route model

- `src/content/mock-stays.ts`
- `src/content/site-pages.ts`
- `src/lib/discovery.ts`
- `src/constants/routes.ts`

## Priority Matrix

### Critical

- Shared navigation shell
- Breadcrumb system
- Support merge
- Operator funnel simplification
- Search inventory-first rewrite
- Redirect cleanup for obsolete routes

### High

- City page rewrite
- Category page system
- Stay detail rewrite
- Sitemap and metadata update

### Medium

- About/Resources/Privacy/Terms rewrite
- 404 recovery experience

### Low

- Removing unused legacy section components that are no longer imported

## Exact Files Modified

- `next.config.ts`
- `src/app/(site)/about/page.tsx`
- `src/app/(site)/cities/page.tsx`
- `src/app/(site)/cities/[city]/page.tsx`
- `src/app/(site)/layout.tsx`
- `src/app/(site)/page.tsx`
- `src/app/(site)/privacy/page.tsx`
- `src/app/(site)/resources/page.tsx`
- `src/app/(site)/search/page.tsx`
- `src/app/(site)/terms/page.tsx`
- `src/app/globals.css`
- `src/app/not-found.tsx`
- `src/components/index.ts`
- `src/components/layout/footer.tsx`
- `src/components/layout/index.ts`
- `src/components/layout/navigation.tsx`
- `src/components/ui/index.ts`
- `src/components/ui/support-contact-card.tsx`
- `src/config/index.ts`
- `src/config/navigation.ts`
- `src/config/seo.ts`
- `src/config/site.ts`
- `src/constants/routes.ts`
- `src/content/index.ts`
- `src/content/mock-stays.ts`
- `src/content/site-pages.ts`
- `src/lib/index.ts`

## Exact Files Added

- `src/app/(site)/categories/page.tsx`
- `src/app/(site)/categories/[category]/page.tsx`
- `src/app/(site)/list-property/page.tsx`
- `src/app/(site)/manage-property/page.tsx`
- `src/app/(site)/stays/[slug]/page.tsx`
- `src/app/(site)/support/page.tsx`
- `src/components/layout/breadcrumbs.tsx`
- `src/components/ui/city-card.tsx`
- `src/components/ui/stay-card.tsx`
- `src/lib/discovery.ts`

## Exact Files Removed

- `src/app/(site)/app-login/page.tsx`
- `src/app/(site)/contact/page.tsx`
- `src/app/(site)/features/page.tsx`
- `src/app/(site)/help/page.tsx`
- `src/app/(site)/operators/page.tsx`
- `src/app/(site)/operators/owners/page.tsx`
- `src/app/(site)/operators/managers/page.tsx`
- `src/app/(site)/operators/tenants/page.tsx`
- `src/app/(site)/pricing/page.tsx`
- `src/app/(site)/property/[slug]/page.tsx`
- `src/components/placeholder-page.tsx`

## Exact Redirects Required

Configured in `next.config.ts`:

- `/contact` -> `/support`
- `/help` -> `/support`
- `/pricing` -> `/resources`
- `/features` -> `/resources`
- `/operators` -> `/list-property`
- `/operators/owners` -> `/list-property`
- `/operators/managers` -> `/manage-property`
- `/operators/tenants` -> `/support`
- `/app-login` -> `/manage-property`
- `/property/:slug` -> `/stays/:slug`
- `/cities/mumbai` -> `/cities`

## Final Production-Ready Recommendations

1. Keep the current IA stable and resist adding parallel public routes that split discovery again.
2. Replace mock stay data with real inventory through a single public contract instead of screen-local fetch logic.
3. Add automated accessibility checks and a mobile screenshot pass to CI once live data wiring begins.
4. When backend search arrives, preserve the current URL filter contract so browser back and deep links continue to work.
