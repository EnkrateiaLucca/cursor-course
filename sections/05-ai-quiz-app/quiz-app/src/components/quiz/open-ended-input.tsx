"use client";

import { Textarea } from "@/components/ui/textarea";

interface OpenEndedInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function OpenEndedInput({
  value,
  onChange,
  disabled,
}: OpenEndedInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        Your Answer
      </label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer here..."
        className="min-h-[100px] resize-none"
      />
    </div>
  );
}
