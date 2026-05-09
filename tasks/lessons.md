# Lessons

Record patterns learned from user corrections. Each entry: the mistake, the rule, when it applies.

## Format
```
### [Date] — [Short title]
**Mistake:** what went wrong
**Rule:** what to do instead
**When:** the condition that triggers this rule
```

---

### 2026-05-05 — Don't run `next build` while `next dev` is running
**Mistake:** Ran `next build` to verify a fix while the dev server was still up. Both write to `.next/`; the production build clobbered the dev server's HMR manifests, causing 500s and `ENOENT` errors on `_buildManifest.js.tmp.*` and `app-build-manifest.json`.
**Rule:** Stop the dev server (or use a separate `.next-build/` distDir) before running `next build`. If only the dev server is needed, use `npx tsc --noEmit` and `npx next lint` for verification instead of a full build.
**When:** Verifying changes during a session where `next dev` is running in the background.

### 2026-05-06 — `create table if not exists` silently skips when the table exists with different columns
**Mistake:** Wrote a Supabase migration with `create table if not exists public.businesses (...)`. The user's project already had a `businesses` table (from a prior attempt or template) without my `owner_user_id` column. The `if not exists` clause skipped my definition entirely, but later `create policy ... using (owner_user_id = auth.uid())` failed with PG error 42703 ("column does not exist") because the existing table didn't have it.
**Rule:** For initial-schema migrations on a project where state isn't guaranteed clean, lead with `drop table if exists ... cascade` so the recreate is authoritative. `if not exists` is for upserts on tables you fully own — not for setting up tables that may have been touched by templates or older migrations. If preserving data matters, use `alter table ... add column if not exists` per column instead.
**When:** Writing the FIRST migration of a project, or any migration where the table's column shape isn't certain.

### 2026-05-09 — Never display raw third-party API errors to users
**Mistake:** `/api/google/locations` caught a `GBP API error 429: { "error": { "code": 429, "message": "Quota exceeded...", "status": "RESOURCE_EXHAUSTED", ... } }` and returned the raw `err.message` to the client. The client then rendered the full Google JSON dump in destructive-red styling on `/settings`. Users saw an unbranded technical error.
**Rule:** Wrap external API calls (Google, Stripe, OpenAI, Resend, etc.) with a structured error class that exposes (a) a stable `code: "quota_exhausted" | "unauthorized" | ...` for client routing and (b) the raw body for `console.error`-only logging. The API route returns `{ error: { code } }`, never the raw body. Client components map the code to a brand-voice Danish message rendered in beige-card surface, never destructive-red. Include a "Prøv igen" or "Kontakt support" affordance.
**When:** Any time a server route or API helper hits a third-party HTTP API. Audit the catch block: if `error.message` contains anything from the upstream service, that's a leak waiting to ship.

### 2026-05-09 — Don't auto-fetch quota-sensitive APIs on component mount
**Mistake:** `GoogleLocationPicker` had `useEffect(() => fetch("/api/google/locations"), [])`. Every settings-page render after Google OAuth fired a request against Google Business Profile's `accounts` endpoint. With a low-quota Cloud project (default 0/min), every page-load reproduced the 429 and made it look like a constant fail rather than a one-time call.
**Rule:** For third-party APIs with strict per-minute quotas, require an explicit user action (button click, route push) before fetching. Initial render shows an "idle" state with a "Hent data" button; the fetch only fires on click. Retry buttons are also explicit. No `useEffect`-on-mount, no focus listeners, no tab-visibility refetch. The quota error then only appears when the user took action, which makes the support story honest ("you tried, Google said no").
**When:** Wiring any third-party API call from a Client Component, especially when the upstream has documented per-minute quotas (Google Business Profile, Maps, Places; YouTube; some Twitter/X endpoints; OpenAI tier-1 quotas; etc.).
