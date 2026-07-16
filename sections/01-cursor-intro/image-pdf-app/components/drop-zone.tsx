"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type DropZoneProps = {
  onFiles: (files: File[]) => void;
  compact?: boolean;
};

export function DropZone({ onFiles, compact = false }: DropZoneProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length) onFiles(accepted);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    multiple: true,
  });

  if (compact) {
    return (
      <div {...getRootProps()} className="hidden">
        <input {...getInputProps()} />
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "drop-zone mx-auto mt-8 mb-4 max-w-xl cursor-pointer rounded-xl border-2 border-dashed border-border bg-card p-9 text-center transition-colors print:hidden",
        isDragActive && "border-primary bg-accent"
      )}
    >
      <input {...getInputProps()} />
      <p className="text-base font-semibold text-foreground">Drop images here or click to choose</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Drag images onto pages. Resize from corners. JPG, PNG, WebP, HEIC supported.
      </p>
    </div>
  );
}
