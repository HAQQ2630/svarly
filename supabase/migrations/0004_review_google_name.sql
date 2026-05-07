-- Store the GBP review resource name so we can post replies back to Google.
-- Apply in Supabase Dashboard → SQL editor → Run.

alter table public.reviews
  add column if not exists google_review_name text;
