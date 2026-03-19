import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, CheckCircle, BarChart3, Share2 } from "lucide-react"

export default function MarketingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center gap-8 px-4 py-24 text-center">
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Turn any file into an{" "}
          <span className="text-blue-600">interactive quiz</span>
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground">
          Upload a .json or .md file and instantly get a polished quiz with
          scoring, explanations, and shareable links. No account needed.
        </p>

        <div className="flex gap-4">
          <Link href="/upload">
            <Button size="lg" className="gap-2">
              <Upload className="h-5 w-5" />
              Upload a Quiz
            </Button>
          </Link>
          <Link href="/quiz/sample">
            <Button variant="outline" size="lg">
              Try a Sample
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-4 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
          <Feature
            icon={<Upload className="h-8 w-8 text-blue-600" />}
            title="Upload & Parse"
            description="Drop a .json or .md file. We validate and parse it instantly — see a preview before you start."
          />
          <Feature
            icon={<CheckCircle className="h-8 w-8 text-green-600" />}
            title="Interactive Feedback"
            description="Multiple-choice, yes/no, and open-ended questions with instant green/red feedback and explanations."
          />
          <Feature
            icon={<Share2 className="h-8 w-8 text-purple-600" />}
            title="Share & Track"
            description="Every quiz gets a unique link. Sign in to save quizzes, track scores, and see analytics."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-12 text-3xl font-bold">How it works</h2>
          <div className="grid gap-8 text-left md:grid-cols-3">
            <Step number={1} title="Upload" description="Drag and drop your quiz file (.json or .md format)" />
            <Step number={2} title="Play" description="Answer questions one by one with instant feedback" />
            <Step number={3} title="Review" description="See your score, review answers, and share the link" />
          </div>
        </div>
      </section>
    </main>
  )
}

function Feature({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="space-y-3">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function Step({
  number,
  title,
  description
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
        {number}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
