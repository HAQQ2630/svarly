import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    // Let the SDK use its bundled default API version.
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}
