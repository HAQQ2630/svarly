-- Google Business Profile OAuth tokens, one row per Svarly user.
-- Apply in Supabase Dashboard → SQL editor → Run.

create table public.google_connections (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  access_token  text not null,
  refresh_token text,
  expires_at    timestamptz not null,
  google_email  text,
  connected_at  timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.google_connections enable row level security;

-- Users can only read/write their own row.
create policy "google_connections_owner" on public.google_connections
  for all
  using  (user_id = auth.uid())
  with check (user_id = auth.uid());
