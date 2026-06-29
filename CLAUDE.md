# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (pinned via `packageManager`). All scripts force `LANG=en_US.UTF-8`.

- `pnpm dev` — Next.js dev server (port 3000)
- `pnpm build` — production build + `prepare-standalone` step that copies `public/` and `.next/static` into `.next/standalone` (the deploy artifact)
- `pnpm start` — runs the standalone server (`node .next/standalone/server.js`); re-runs `prepare-standalone` first
- `pnpm lint` — ESLint over the repo (flat config in `eslint.config.mjs`)
- `pnpm test` — runs `tsx --test "src/**/*.test.ts"` (Node's built-in test runner, not Jest/Vitest)
- Run a single test file: `pnpm exec tsx --test src/lib/pricing-engine.test.ts`
- Run a single test by name: `pnpm exec tsx --test --test-name-pattern "weekend" src/lib/pricing-engine.test.ts`

There is no typecheck script — `pnpm build` is the typecheck (Next.js runs `tsc` during build). `tsconfig.tsbuildinfo` is committed/cached.

## Environment

Required env vars (see `.env.example`):
- `RESEND_API_KEY`, `RECIPIENT_EMAIL` — contact/reservation emails
- `RESEND_INVOICE_FROM_EMAIL` — verified-domain sender for admin invoice/devis emails to prospects
- Supabase: either server-only (`SUPABASE_URL` + `SUPABASE_ANON_KEY`) **or** public (`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`). `resolveSupabaseEnv()` in `src/lib/supabase.ts` prefers the server-only pair if either is present; this is intentional for Vercel diagnostics — do not "simplify" it.

## Architecture

Next.js 14 App Router, TypeScript, Tailwind v3. Standalone output target for Vercel.

### Booking & pricing domain (the load-bearing part of the codebase)

All booking logic lives in `src/lib/` and is pure, server-callable, and unit-tested. Keep it that way — do not move business logic into components or API handlers.

- **`bookable-properties.ts`** — single source of truth for the two properties (`penthouse-jacuzzi`, `cozy-studio`). Maps property IDs ↔ `listingId` used by Supabase ↔ display titles ↔ Airbnb iCal URLs. Legacy label aliases (`Penthouse`, `Studio`) are preserved here on purpose for backwards-compatible form payloads.
- **`booking-dates.ts`** — ISO date arithmetic (`YYYY-MM-DD` strings only, never `Date` across boundaries). All date math in the booking flow goes through this.
- **`pricing-date-helpers.ts`** — classifies each night as `weekday` or `weekend`. The mapping (Sun=0…Sat=6) is `[weekday, weekday, weekday, weekday, weekend, weekend, weekday]` → **Thu + Fri are weekend; Sat–Wed are weekday**. The night is keyed by the check-in date of that night.
- **`pricing-seasons.ts`** — resolves a `SeasonType` (`current` | `low` | `high`) per date. Priority is fixed and must be preserved:
  1. `season_date_overrides` (single-day overrides)
  2. `season_periods` (date ranges)
  3. fallback `current`
- **`pricing-engine.ts`** — `getPricingBreakdown({ listingId, checkIn, checkOut })`. Fetches the listing, all active tiers, and season rules in one pass, then for each night picks the tier matching `(seasonType, dayType, nights)` where `nights` falls in `[min_nights, max_nights]`. Returns a per-night breakdown plus totals and cleaning fee. Errors are typed (`PricingListingNotFoundError`, `PricingTierNotFoundError`, `PricingDataFetchError`, `MissingSupabaseEnvError` in `pricing-errors.ts`) — the API route maps them to HTTP codes.
- **`airbnb-calendar.ts`** — server-only iCal fetcher with in-memory cache (TTL 30 min) and request coalescing. Parses `DTSTART`/`DTEND` (date-only, half-open ranges) into a set of blocked ISO date strings. Status is `ready | stale | error`.
- **`reservation-requests.ts`** — wraps `getPricingBreakdown` + insert into Supabase `reservations` table with `status: 'pending'`. The pricing is **re-computed server-side** at submit time; never trust prices from the client.

### Supabase tables (referenced, not migrated from this repo)

`listings`, `pricing_tiers`, `season_periods`, `season_date_overrides`, `reservations`. Schema is implicit from the row types in the `*.ts` files above. There are no migration files in this repo.

### API surface

`src/app/api/calculate-price/route.ts` is the only API route. `runtime = 'nodejs'`, `dynamic = 'force-dynamic'`. Validates input with Zod (strict, refuses past dates and `check_out <= check_in`), then delegates to `pricing-engine`. Error → HTTP mapping is centralized via `getPricingErrorCode` / `getPriceCalculationFailureError` in `pricing-errors.ts`.

### Frontend

App Router pages in `src/app/*`. Mostly server components; client-only pieces (calendars, forms, carousels) live in `src/components/`. `BookingRangeCalendar` and `BookingSingleDateCalendar` consume the iCal blocked-dates output and the `/api/calculate-price` endpoint. Email sending uses Resend via server actions in `src/actions/` (`contact.ts`, `email.ts`).

`src/middleware.ts` only 301-redirects legacy `/rentals` and `/short-term-rentals` paths to `/properties` — keep the matcher narrow; don't broaden it without reason.

## Conventions worth knowing before changing anything

- **Dates are ISO strings end-to-end.** Don't introduce `Date` objects across module boundaries or you'll reintroduce timezone bugs the helpers exist to prevent.
- **Pricing is recomputed server-side** on every quote and every reservation insert. The client display is informational only.
- **Property identity has three layers** (`BookablePropertyId`, `listingId`, display title). When adding a property, update `BOOKABLE_PROPERTIES` once — the derived maps/arrays flow from it.
- **Tests use `node:test` + `tsx`**, not Jest. Use `describe`/`it` from `node:test` and `node:assert/strict`.
- Lint config is flat ESLint (`eslint.config.mjs`); Prettier config is in `.prettierrc`.

## Branch policy
- **Always develop on the `dev` branch.** Never commit directly to `main`.
- Before starting any task, ensure you are on `dev` (checkout if needed).
- All pushes go to `origin/dev`, which triggers a Vercel **preview** deployment only.
- `main` is the production branch; only merge `dev` → `main` when the user explicitly asks to publish to production.
