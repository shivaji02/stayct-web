# Dependency Audit

## Current Direct Dependencies

- `next`
- `react`
- `react-dom`

## Current Direct Dev Dependencies

- `@eslint/eslintrc`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `autoprefixer`
- `eslint`
- `eslint-config-next`
- `prettier`
- `postcss`
- `tailwindcss`
- `typescript`

## Findings

- The dependency surface is intentionally small and appropriate for a foundation repo.
- No unnecessary runtime packages are present.
- Dev dependencies are standard for a Next.js 15 App Router foundation.

## Moderate Vulnerabilities

- `npm install` reported 2 moderate vulnerabilities.
- The vulnerable package is transitive under `next` through `postcss`.
- The automated fix path reported by npm would require a semver-major downgrade that is not appropriate for this foundation.
- This is best handled by monitoring the Next.js release line for an upstream dependency refresh rather than forcing a risky package change now.

## Recommended Remediation

- Review `npm audit` output before any dependency bump.
- Recheck vulnerability status after the next safe Next.js patch/minor update.
- Avoid `npm audit fix --force` because the reported fix path is not architecture-safe.
