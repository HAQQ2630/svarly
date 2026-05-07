# API setup — phased rollout

Goal: take Svarly from "mock data + auth only" to "real backend that actually replies to reviews and bills customers."

## Phase 1 — Supabase schema (no external keys needed) ← starting here

**What it does:** creates the database tables that everything else needs to live on top of.

- [ ] Design schema: `businesses`, `reviews` (with embedded ai_reply for v1 simplicity)
- [ ] Write `supabase/migrations/0001_initial.sql`
- [ ] User pastes SQL into Supabase Dashboard → SQL editor → run
- [ ] User confirms tables created
- [ ] Replace `src/lib/mock-data.ts` with Supabase queries (reads only for now)
- [ ] Verify: dashboard + reviews page render from DB instead of constants

**Schema (v1, intentionally minimal):**
```
auth.users                  ← Supabase manages this
businesses                  ← owner_user_id, name, signature, brand_voice
reviews                     ← business_id, platform, reviewer info, rating, content,
                              status (new/pending/replied), ai_reply, replied_at
```
Reply lives on the review row — one reply per review. Simpler than a separate `replies` table.

**RLS policies:**
- A user can only see/edit `businesses` where `owner_user_id = auth.uid()`
- A user can only see/edit `reviews` whose `business_id` belongs to one of their `businesses`

## Phase 2 — Google OAuth on login button

**Blocker:** I need confirmation that **Google provider is enabled in Supabase Dashboard → Authentication → Providers** (with Client ID + Secret from a Google Cloud OAuth client). Once enabled, I wire `supabase.auth.signInWithOAuth({ provider: 'google' })` to the button — ~5 min.

- [ ] Wait for user confirmation that Google provider is enabled in Supabase
- [ ] Replace placeholder onClick with `signInWithOAuth`
- [ ] Add `/auth/callback/route.ts` to handle the OAuth code exchange
- [ ] Verify: Google button signs in and redirects to dashboard

## Phase 3 — OpenAI API (review reply generation)

**Blocker:** need `OPENAI_API_KEY` in `.env.local`.

User has confirmed OpenAI key — will plug it in before this phase starts.

- [ ] User pastes `OPENAI_API_KEY=sk-...` into `.env.local` (and Vercel env when deploying)
- [ ] `npm install openai`
- [ ] Build `/api/generate-reply/route.ts` (POST, takes review id, calls `gpt-4o-mini` with Danish system prompt, saves to DB)
- [ ] Wire dashboard's "Generer svar" button to call it
- [ ] Reply gets saved to DB as `ai_reply` with status `pending`
- [ ] Verify: clicking Generer svar on a `new` review produces a Danish reply, status flips to `pending`

**Model choice:** starting with `gpt-4o-mini` (fast, cheap, ~$0.15/M input tokens, handles Danish well). Can upgrade to `gpt-4o` if reply quality is insufficient.

## Phase 4+ (deferred, will plan separately when ready)

- Stripe (149 DKK/mo subscription)
- Resend (email notifications when new reviews arrive)
- Google Business Profile API (real review fetching + posting)
- Trustpilot API (same)

## Notes

- Phase 1 unlocks Phase 3 (need real DB rows to update with AI replies).
- Phase 2 is independent — can be done any time.
- Phases 5–7 are days of work each (real OAuth, real platforms). Defer.
