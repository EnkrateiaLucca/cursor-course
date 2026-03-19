"use client";

import Link from "next/link";
import { Show, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">QuizApp</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Show
            when="signed-in"
            fallback={
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <Link href="/sign-up">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            }
          >
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/quiz/create">
              <Button variant="ghost" size="sm">
                Create Quiz
              </Button>
            </Link>
            <UserButton />
          </Show>
        </nav>
      </div>
    </header>
  );
}
