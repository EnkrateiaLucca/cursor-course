import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  Sparkles,
  BarChart3,
  Download,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Any Content",
    description:
      "Drop in PDFs, notes, or text — we handle the rest.",
  },
  {
    icon: Sparkles,
    title: "AI-Generated Quizzes",
    description:
      "Claude AI creates smart questions from your content in seconds.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "See your scores over time and identify knowledge gaps.",
  },
  {
    icon: Download,
    title: "Export Results",
    description:
      "Download as CSV, LLM review markdown, or Anki flashcards.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your quizzes are private by default. Share only when you choose to.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Get explanations for every answer immediately after submitting.",
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Unlimited quiz uploads",
      "Full quiz-taking experience",
      "3 AI generations / month",
      "CSV & Anki export",
    ],
    cta: "Get Started",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/ month",
    features: [
      "Everything in Free",
      "Unlimited AI generations",
      "Results analytics",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    href: "/sign-up",
    highlighted: true,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Learn Smarter with
          <br />
          <span className="text-primary">AI-Powered Quizzes</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Upload any content — PDFs, notes, articles — and generate interactive
          quizzes with AI. Track your progress and master any topic.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Show
            when="signed-in"
            fallback={
              <>
                <Link href="/sign-up">
                  <Button size="lg">Get Started Free</Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </>
            }
          >
            <Link href="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          </Show>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
          Everything you need to learn effectively
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardContent className="pt-6">
                <f.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
          Simple pricing
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.highlighted ? "border-primary border-2" : ""}
            >
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground text-sm">
                    {tier.period}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className="block mt-6">
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
