"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button className="mt-8" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
