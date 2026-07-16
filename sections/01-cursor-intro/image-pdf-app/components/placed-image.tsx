"use client";

import { cn } from "@/lib/utils";
import type { ImageAsset, PlacedItem } from "@/types/editor";

const HANDLES = ["nw", "ne", "sw", "se"] as const;

type PlacedImageProps = {
  item: PlacedItem;
  image?: ImageAsset;
  pageId: string;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  startInteraction: (
    type: "move" | "resize",
    pageId: string,
    itemId: string,
    clientX: number,
    clientY: number,
    pageContentEl: HTMLElement,
    corner?: "nw" | "ne" | "sw" | "se",
    orig?: { x: number; y: number; w: number; h: number }
  ) => void;
};

export function PlacedImage({
  item,
  image,
  pageId,
  selected,
  onSelect,
  onDelete,
  startInteraction,
}: PlacedImageProps) {
  if (!image) return null;

  return (
    <div
      className={cn(
        "placed-item absolute cursor-grab touch-none select-none active:cursor-grabbing",
        selected && "selected z-10 outline-2 outline-primary"
      )}
      style={{
        left: `${item.x}mm`,
        top: `${item.y}mm`,
        width: `${item.w}mm`,
        height: `${item.h}mm`,
      }}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        const corner = (e.target as HTMLElement).dataset.corner as
          | "nw"
          | "ne"
          | "sw"
          | "se"
          | undefined;
        e.stopPropagation();
        onSelect();

        const pageContentEl = (e.currentTarget as HTMLElement).parentElement;
        if (!pageContentEl) return;

        if (corner) {
          startInteraction(
            "resize",
            pageId,
            item.id,
            e.clientX,
            e.clientY,
            pageContentEl,
            corner,
            { x: item.x, y: item.y, w: item.w, h: item.h }
          );
        } else {
          startInteraction(
            "move",
            pageId,
            item.id,
            e.clientX,
            e.clientY,
            pageContentEl
          );
        }

        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        e.preventDefault();
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.name}
        className="pointer-events-none block h-full w-full object-contain"
        draggable={false}
      />

      {HANDLES.map((corner) => (
        <div
          key={corner}
          data-corner={corner}
          className={cn(
            "handle absolute hidden size-2.5 rounded-sm border-[1.5px] border-white bg-primary",
            selected && "block",
            corner === "nw" && "top-[-5px] left-[-5px] cursor-nwse-resize",
            corner === "ne" && "top-[-5px] right-[-5px] cursor-nesw-resize",
            corner === "sw" && "bottom-[-5px] left-[-5px] cursor-nesw-resize",
            corner === "se" && "bottom-[-5px] right-[-5px] cursor-nwse-resize"
          )}
        />
      ))}

      <button
        type="button"
        className={cn(
          "item-delete absolute top-[-10px] right-[-10px] hidden size-5 cursor-pointer items-center justify-center rounded-full bg-red-600 text-sm leading-none text-white print:hidden",
          selected && "flex"
        )}
        title="Remove"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        ×
      </button>
    </div>
  );
}
