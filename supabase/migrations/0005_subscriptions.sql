-- Stripe subscription state, one row per user.
-- Apply in Supabase Dashboard → SQL editor → Run.

create table public.subscriptions (
  user_id                uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  status                 text not null default 'trialing' check (
    status in ('trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid')
  ),
  trial_end              timestamptz,
  current_period_end     timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "subscriptions_owner" on public.subscriptions
  for select using (user_id = auth.uid());
