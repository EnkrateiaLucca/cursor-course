"use client";

import dynamic from "next/dynamic";

export const Editor = dynamic(
  () => import("@/components/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading editor…
      </div>
    ),
  }
);
