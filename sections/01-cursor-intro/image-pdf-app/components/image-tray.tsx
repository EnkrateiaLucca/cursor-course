"use client";

import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EditorState } from "@/types/editor";

type ImageTrayProps = {
  state: EditorState;
  placedImageIds: Set<string>;
  onPlaceImage: (imageId: string) => void;
};

export function ImageTray({ state, placedImageIds, onPlaceImage }: ImageTrayProps) {
  const [collapsed, setCollapsed] = useState(false);
  const images = Object.values(state.images);

  if (!images.length) return null;

  return (
    <aside
      className={cn(
        "image-tray sticky top-[60px] h-[calc(100vh-60px)] shrink-0 border-r border-border bg-card print:hidden",
        collapsed ? "w-12" : "w-52"
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        {!collapsed && (
          <div className="flex items-center gap-2 text-sm font-medium">
            <ImageIcon className="size-4" />
            Images ({images.length})
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label={collapsed ? "Expand tray" : "Collapse tray"}
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      {!collapsed && (
        <div className="flex flex-col gap-2 overflow-y-auto p-3">
          {images.map((img) => {
            const isPlaced = placedImageIds.has(img.id);
            return (
              <button
                key={img.id}
                type="button"
                draggable
                onClick={() => onPlaceImage(img.id)}
                onDragStart={(e) => {
                  e.dataTransfer.setData("application/x-image-id", img.id);
                  e.dataTransfer.effectAllowed = "copy";
                }}
                className={cn(
                  "group relative overflow-hidden rounded-md border bg-background text-left transition-colors hover:border-primary",
                  isPlaced ? "border-primary/40" : "border-border"
                )}
                title={img.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.name}
                  className="aspect-square w-full object-cover"
                  draggable={false}
                />
                <div className="truncate px-2 py-1 text-xs text-muted-foreground">{img.name}</div>
                {isPlaced && (
                  <span className="absolute top-1 right-1 rounded bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                    placed
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </aside>
  );
}
