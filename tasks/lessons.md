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
