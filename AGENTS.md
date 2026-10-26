# StayCT Public Website — Agent Guide

## 1. Repository Purpose

Public marketing/discovery website for StayCT. **Next.js 15 (App Router, standalone output) + React 19 + TypeScript + Tailwind CSS 3.** Mostly static/SEO-focused pages with light API integration to the StayCT backend. No auth or admin; existing Node test-runner tests execute through tsx.

## 2. Essential Commands

```bash
npm run dev        # next dev
npm run lint       # eslint, --max-warnings=0 (warnings fail)
npm run typecheck  # tsc --noEmit
npm run build      # next build (expensive)
npm start          # runs .next/standalone/server.js (needs build first)
```

Node >= 20.11.0. `npm test` runs the existing Node/tsx tests. Routine verification includes lint, typecheck, and tests; build remains a separate release-sensitive check.

## 3. Repository Map

```
src/
  app/
    (site)/        # All public routes: about, pricing, features, search, stays,
                   # cities, categories, property, list-property, help, support,
                   # contact, privacy, terms, app-login, …
    api/health/    # Only API route
    layout.tsx, error.tsx, loading.tsx, not-found.tsx, robots.ts, sitemap.ts
  components/      # ui/, layout/, sections/ — import via src/components/index.ts
  content/         # Static/mock content (site-pages.ts, mock-stays.ts, support.ts)
  services/public-api/  # Backend API calls
  lib/             # url.ts, strings.ts, discovery.ts, monitoring/
  seo/  providers/  hooks/  config/  constants/  types/
```

## 4. Conventions

- New pages go under `src/app/(site)/<route>/page.tsx`; shared layout in `(site)/layout.tsx`. Update `sitemap.ts` for new indexed pages.
- Page copy and structured content live in `src/content/`, not inline in components.
- Backend calls go through `src/services/public-api/` — never fetch directly in components.
- Styling is Tailwind (config in `tailwind.config.ts`); reuse `src/components/ui` primitives before adding new ones.
- Env vars: `NEXT_PUBLIC_API_BASE_URL` (backend), `NEXT_PUBLIC_SITE_URL` (canonical URLs/SEO). No secrets belong in this repo — everything `NEXT_PUBLIC_*` ships to the browser.
- Deploys via Docker/`railway.toml` using the standalone server.

## 5. Validation Matrix

| Change type | Minimum validation |
|---|---|
| Docs/content only | none |
| Component/page change | `npm run lint` + `npm run typecheck` |
| Routing/SEO change | above + check `sitemap.ts`/`robots.ts` |
| Config/deploy-sensitive | above + `npm run build` |

## 6. Agent Workflow

1. Inspect the target page and one neighboring `(site)` page as the pattern.
2. Smallest coherent change; keep content in `src/content/`.
3. Run lint + typecheck; review diff for unrelated changes.
4. Report files changed and validation run. No whole-repo audits unless asked.

## 7. Common Failure Modes

- Lint warnings (build gate is `--max-warnings=0`).
- Hardcoding copy in components instead of `src/content/`.
- Fetching the backend outside `src/services/public-api/`.
- Forgetting `sitemap.ts` for new public pages.
- Treating `NEXT_PUBLIC_*` vars as secret — they are public.

## 8. Definition of Done

- Lint and typecheck pass; build passes when config/deploy-sensitive.
- Content, SEO entries, and service-layer boundaries respected.
- Final report accurate.

## Token Efficiency Rules

1. Read only files relevant to the requested task.
2. Do not scan the entire repository by default.
3. Prefer targeted searches over full-file reads.
4. Avoid repeating previously completed analysis.
5. Do not launch subagents unless necessary.
6. Run focused tests before considering full suites.
7. Keep terminal output concise.
8. Do not generate unnecessary documentation.
9. Preserve existing working functionality.
10. Ask before expanding the task scope.

## Verification policy

- Run `npm run verify` after relevant code changes and before reporting completion. It runs the configured TypeScript, lint, and unit-test checks once, without native builds or dev servers. Existing change-specific checks still apply.
- Inspect the concise failure summary, fix the specific issue, then use `npm run verify -- --check typecheck`, `--check lint`, or `--check test` to rerun only that check. Avoid equivalent duplicate commands; finish with one full `npm run verify`.
- `npm run verify:native` is only for native-impacting changes; `npm run verify:release` is only for explicitly requested release verification. `-- --plan` inspects commands without executing them; never describe a plan as a pass.
- Results and redacted failure logs are stored under ignored `.verification/<run>/`; `summary.json` provides check IDs, statuses, exit codes, and timings. Exit 0 = all selected configured checks passed, 1 = failure, 2 = unavailable/incomplete or invalid arguments. Unavailable tools fail rather than silently skip. Existing test-runner skips are shown in the output/logs.
- Verification reuses built-in TypeScript/ESLint caches where available; generated caches remain ignored. Tests run once with bounded workers; mobile Jest has a five-minute process timeout, and fails promptly on Jest's explicit open-handle warning. No forced passing exit is used.
- Never claim verification passed without execution. Report unavailable, excluded, and unexecuted checks, and existing failures honestly. No dependency installation, cache deletion, database migration, version sync, or publishing is performed by the runner.
