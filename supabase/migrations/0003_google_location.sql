-- Link a Svarly business to a specific Google Business Profile location.
-- Apply in Supabase Dashboard → SQL editor → Run.

alter table public.businesses
  add column if not exists google_location_name text,
  add column if not exists google_account_name  text;
