import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

// Uses the service role key so we can write outside of RLS.
function adminClient() {
  return createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function upsertSubscription(
  supabase: ReturnType<typeof adminClient>,
  userId: string,
  sub: Stripe.Subscription,
  customerId: string
) {
  // cancel_at is the period end in the new Stripe API (v22+).
  const periodEnd = sub.cancel_at
    ? new Date(sub.cancel_at * 1000).toISOString()
    : null;

  await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id,
      status: sub.status,
      trial_end: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
      current_period_end: periodEnd,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = adminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== "subscription" || !session.subscription) break;

      const userId = session.metadata?.supabase_user_id;
      if (!userId) break;

      const sub = await getStripe().subscriptions.retrieve(
        session.subscription as string
      );
      await upsertSubscription(supabase, userId, sub, session.customer as string);
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      // Look up our user via the existing subscription row.
      const { data: existing } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", sub.id)
        .maybeSingle();
      if (!existing?.user_id) break;
      await upsertSubscription(supabase, existing.user_id, sub, sub.customer as string);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
