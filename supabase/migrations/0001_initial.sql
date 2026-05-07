-- Svarly — initial schema
-- Apply by pasting into Supabase Dashboard → SQL editor → Run.
--
-- ⚠ DESTRUCTIVE: drops existing `businesses` and `reviews` tables (and any data
--   in them) so we start from a known-clean state. Safe to run on a fresh
--   project. Do NOT run if you have data to preserve.
--
-- Idempotent after the first successful run.

-- ─────────────────────────────────────────────────────────────
-- 0. Clean slate
-- ─────────────────────────────────────────────────────────────

drop table if exists public.reviews    cascade;
drop table if exists public.businesses cascade;

-- ─────────────────────────────────────────────────────────────
-- 1. Tables
-- ─────────────────────────────────────────────────────────────

create table public.businesses (
  id              uuid primary key default gen_random_uuid(),
  owner_user_id   uuid not null references auth.users(id) on delete cascade,
  name            text not null,
  signature       text,
  brand_voice     text,
  created_at      timestamptz not null default now()
);

create index businesses_owner_idx
  on public.businesses (owner_user_id);

create table public.reviews (
  id                 uuid primary key default gen_random_uuid(),
  business_id        uuid not null references public.businesses(id) on delete cascade,
  platform           text not null check (
    platform in ('google', 'yelp', 'facebook', 'tripadvisor', 'trustpilot')
  ),
  reviewer_name      text not null,
  reviewer_initials  text,
  rating             smallint not null check (rating between 1 and 5),
  content            text not null,
  status             text not null default 'new' check (
    status in ('new', 'pending', 'replied')
  ),
  ai_reply           text,
  posted_at          timestamptz not null,
  replied_at         timestamptz,
  created_at         timestamptz not null default now()
);

create index reviews_business_status_idx
  on public.reviews (business_id, status);

create index reviews_business_posted_idx
  on public.reviews (business_id, posted_at desc);

-- ─────────────────────────────────────────────────────────────
-- 2. Row Level Security
-- ─────────────────────────────────────────────────────────────

alter table public.businesses enable row level security;
alter table public.reviews    enable row level security;

-- businesses: owner controls everything

create policy "businesses_owner_select" on public.businesses
  for select using (owner_user_id = auth.uid());

create policy "businesses_owner_insert" on public.businesses
  for insert with check (owner_user_id = auth.uid());

create policy "businesses_owner_update" on public.businesses
  for update using (owner_user_id = auth.uid())
              with check (owner_user_id = auth.uid());

create policy "businesses_owner_delete" on public.businesses
  for delete using (owner_user_id = auth.uid());

-- reviews: only visible/editable if you own the parent business

create policy "reviews_via_business_select" on public.reviews
  for select using (
    business_id in (
      select id from public.businesses where owner_user_id = auth.uid()
    )
  );

create policy "reviews_via_business_insert" on public.reviews
  for insert with check (
    business_id in (
      select id from public.businesses where owner_user_id = auth.uid()
    )
  );

create policy "reviews_via_business_update" on public.reviews
  for update using (
    business_id in (
      select id from public.businesses where owner_user_id = auth.uid()
    )
  ) with check (
    business_id in (
      select id from public.businesses where owner_user_id = auth.uid()
    )
  );

create policy "reviews_via_business_delete" on public.reviews
  for delete using (
    business_id in (
      select id from public.businesses where owner_user_id = auth.uid()
    )
  );
