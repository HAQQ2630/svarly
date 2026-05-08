# Svarly — remaining gaps to ship

## Task 1 — Signup flow ✅
- [x] Create `src/app/signup/page.tsx`
- [x] Create `src/components/sign-up-form.tsx`
- [x] Update login page "Opret gratis" link → `/signup`
- [x] Update `/priser` Gratis card CTA → `/signup`

## Task 2 — Settings: save business profile ✅
- [x] Add `saveBusinessProfile` server action
- [x] Wrap Virksomhedsprofil card in `<form>`
- [x] Add save button + success flash
- [x] Fix query bug (no longer filters by google_location_name)

## Task 3 — Sign out ✅
- [x] `signOut` server action wired to "Log ud" button

## Task 4 — Delete workspace ✅
- [x] `DeleteWorkspaceButton` client component with confirm()
- [x] Server action: delete business, sign out

## Task 5 — Password reset ✅
- [x] `/forgot-password` page
- [x] `/reset-password` page
- [x] "Glemt adgangskode?" link wired

## Task 6 — Middleware auth redirect ✅
- [x] Logged-in users redirected from /login and /signup → /dashboard

## Task 7 — "Vis på platform" button ✅
- [x] Replaced dead button with "Svar sendt ✓" text

## Remaining — needs your action
- [ ] Stripe: create product + 2 prices (199 DKK/mo, 1990 DKK/yr) in Stripe Dashboard
  → add STRIPE_SECRET_KEY, STRIPE_PRICE_MONTHLY_ID, STRIPE_PRICE_YEARLY_ID, STRIPE_WEBHOOK_SECRET to .env.local
- [ ] Resend: get API key, verify svarly.dk sender domain
  → add RESEND_API_KEY to .env.local
- [ ] Deploy to Vercel: connect repo, add all env vars
