import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

// GET /api/stripe/portal
// Opens the Stripe Customer Portal so users can manage/cancel their subscription.

export async function GET(request: NextRequest) {
  const { origin } = request.nextUrl;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!sub?.stripe_customer_id) {
    return NextResponse.redirect(`${origin}/priser`);
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${origin}/settings`,
  });

  return NextResponse.redirect(session.url);
}
