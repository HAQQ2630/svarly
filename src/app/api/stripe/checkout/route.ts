import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

// GET /api/stripe/checkout?billing=monthly|yearly
// Creates a Stripe Checkout session with 14-day trial and redirects to it.
// If the user is not logged in, redirects to login first.

export async function GET(request: NextRequest) {
  const { origin } = request.nextUrl;
  const billing = request.nextUrl.searchParams.get("billing") ?? "monthly";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      `${origin}/login?next=/api/stripe/checkout?billing=${billing}`
    );
  }

  const priceId =
    billing === "yearly"
      ? process.env.STRIPE_PRICE_YEARLY_ID
      : process.env.STRIPE_PRICE_MONTHLY_ID;

  if (!priceId) {
    return NextResponse.json({ error: "Stripe price not configured" }, { status: 500 });
  }

  const stripe = getStripe();

  // Reuse existing Stripe customer if one exists.
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  let customerId = sub?.stripe_customer_id ?? undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_collection: "if_required",
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: { trial_period_days: 14 },
    metadata: { supabase_user_id: user.id },
    success_url: `${origin}/dashboard?checkout=success`,
    cancel_url: `${origin}/priser?checkout=canceled`,
    locale: "da",
  });

  return NextResponse.redirect(session.url!);
}
