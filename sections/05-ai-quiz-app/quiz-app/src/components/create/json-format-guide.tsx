"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EXAMPLE_JSON = `[
  {
    "type": "multiple-choice",
    "question": "What is the capital of France?",
    "options": ["London", "Paris", "Berlin", "Madrid"],
    "correctAnswer": 1,
    "explanation": "Paris is the capital and largest city of France."
  },
  {
    "type": "open-ended",
    "question": "Name the process by which plants make food.",
    "acceptedAnswers": ["photosynthesis"],
    "explanation": "Photosynthesis converts light energy into chemical energy."
  }
]`;

export function JsonFormatGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors rounded-xl"
      >
        <Code className="size-4 text-muted-foreground" />
        <span>Expected JSON Format</span>
        {isOpen ? (
          <ChevronDown className="ml-auto size-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="ml-auto size-4 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t px-4 py-3 space-y-3">
              <p className="text-sm text-muted-foreground">
                Upload a JSON file containing an array of questions, or an object
                with a <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">questions</code> property.
                Two question types are supported:
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">multiple-choice</span>
                  <span className="text-muted-foreground"> — 2-10 options, correctAnswer is the 0-based index</span>
                </div>
                <div>
                  <span className="font-medium">open-ended</span>
                  <span className="text-muted-foreground"> — one or more accepted answers (case-insensitive matching)</span>
                </div>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs font-mono leading-relaxed">
                {EXAMPLE_JSON}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
