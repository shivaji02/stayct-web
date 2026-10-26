# CTA & Navigation Integrity Audit

Repository: `stayct-web`

Audit goal: no clickable element should lead to a dead end, 404, blank page, unimplemented page, or broken route.

## Result

Primary CTA destinations now provide immediate value instead of route-overview content.

Secondary informational and dynamic routes still need another pass where they remain thin route shells.

## Audited destinations

| Destination | CTA labels found | Status | Fix applied |
| --- | --- | --- | --- |
| `/` | STAYCT logo | VALID | Home route already existed and remains a content page. |
| `/search` | Find Stay, Find a Stay, Browse Stays, Browse Accommodation, Browse all, Find Stay, All 8 categories | VALID | Replaced route-shell content with search input, category chips, city suggestions, accommodation paths, and a real empty state. |
| `/operators` | For Operators, List Your Property, List Your Property, For Operators | VALID | Replaced route-shell content with operator value, workflow areas, and clear next-step CTAs. |
| `/app-login` | App Login, Go to App | VALID | Existing route kept and upgraded into a meaningful login bridge page. |
| `https://app.stayct.in/login` | Open App Login | VALID | Verified the external login target responds `200 OK`. |
| `/about` | About | VALID | Replaced route-shell content with company story, mission, and what STAYCT does. |
| `/resources` | Resources | VALID | Replaced route-shell content with resource categories, guides, FAQ, and route-forwarding content. |
| `/help` | Help, Support | WEAK | Still a thin route shell; useful next steps exist but the page is not yet a real support experience. |
| `/contact` | Contact | WEAK | Still a thin route shell; it needs a concrete contact experience. |
| `/pricing` | Pricing | WEAK | Still a thin route shell; it needs actual pricing guidance or decision support. |
| `/features` | Features | WEAK | Still a thin route shell; it needs feature-level substance. |
| `/cities` | Cities | VALID | Replaced route-shell content with sample city grid, destination themes, and city-browse actions. |
| `/cities/[city]` | City detail routes | WEAK | Dynamic city pages still rely on the generic route shell. |
| `/property/[slug]` | Property detail routes | WEAK | Dynamic property pages still rely on the generic route shell. |
| `/operators/owners` | Owners | WEAK | Still a route shell with next-step links only. |
| `/operators/managers` | Managers | WEAK | Still a route shell with next-step links only. |
| `/operators/tenants` | Tenants | WEAK | Still a route shell with next-step links only. |
| `/privacy` | Privacy | VALID | Missing route created. |
| `/terms` | Terms | VALID | Missing route created. |
| `/search?category=pg` | PG / Paying Guest | VALID | Category cards and footer links now use real links into search. |
| `/search?category=hostel` | Hostel | VALID | Category cards and footer links now use real links into search. |
| `/search?category=co-living` | Co-living | VALID | Category cards and footer links now use real links into search. |
| `/search?category=shared-flat` | Shared Flat | VALID | Category cards and footer links now use real links into search. |
| `/search?category=student-housing` | Student Housing | VALID | Category cards now use real links into search. |
| `/search?category=workforce-housing` | Workforce Housing | VALID | Category cards now use real links into search. |
| `/search?category=corporate-housing` | Corporate Housing | VALID | Category cards now use real links into search. |
| `/search?category=rental-community` | Rental Community | VALID | Category cards now use real links into search. |
## Fix summary

- Replaced non-functional CTA spans with actual links.
- Added missing `/privacy` and `/terms` pages.
- Replaced the main user-facing route shells for `/search`, `/cities`, `/operators`, `/resources`, and `/about` with concise, goal-oriented page content.
- Normalized route constants so header/footer targets stay aligned.
- Made the search page support direct user action with a search input and filter-led discovery choices.
- Verified the external app login target returns `200 OK`.

## Remaining concerns

- `/help`, `/contact`, `/pricing`, `/features`, `/operators/owners`, `/operators/managers`, `/operators/tenants`, `/cities/[city]`, and `/property/[slug]` are still `WEAK` because they remain route shells.
- The browse/search experience is still lightweight and does not yet render real property results.
- Production build requires `NEXT_PUBLIC_SITE_URL`; this is expected for this repo and must be set in the environment.

## Validation

- `npm run lint` ✅
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000 npm run build` ✅

## Files modified

- `src/app/(site)/search/page.tsx`
- `src/app/(site)/cities/page.tsx`
- `src/app/(site)/operators/page.tsx`
- `src/app/(site)/resources/page.tsx`
- `src/app/(site)/about/page.tsx`
- `docs/CTA_AUDIT.md`
