import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
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
    </div>
  );
}
