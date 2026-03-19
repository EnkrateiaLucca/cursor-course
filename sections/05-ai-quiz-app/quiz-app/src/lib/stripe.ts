import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const PLANS = {
  pro: {
    name: "Pro",
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: [
      "Unlimited AI quiz generation",
      "Full results analytics",
      "Priority support",
    ],
  },
} as const;
