import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe() {
  if (!_stripe) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set")
    }
    _stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-05-28.basil",
      appInfo: {
        name: "QuizUpload",
        version: "1.0.0"
      }
    })
  }
  return _stripe
}

// Lazy proxy — only throws when actually used
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as Record<string | symbol, unknown>)[prop]
  }
})
