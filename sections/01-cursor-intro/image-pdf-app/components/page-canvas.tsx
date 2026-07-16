"use client";

import { PlacedImage } from "@/components/placed-image";
import { Button } from "@/components/ui/button";
import { MARGIN, PAGE_DIMS } from "@/lib/constants";
import { mmFromEvent } from "@/lib/layout-utils";
import { cn } from "@/lib/utils";
import type { EditorAction, EditorState } from "@/types/editor";

type PageCanvasProps = {
  state: EditorState;
  pageId: string;
  pageIndex: number;
  dispatch: React.Dispatch<EditorAction>;
  onFiles: (files: File[], pageIndex: number) => void;
  onPlaceImage: (imageId: string, pageId: string, x?: number, y?: number) => void;
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
  canRemove: boolean;
};

export function PageCanvas({
  state,
  pageId,
  pageIndex,
  dispatch,
  onFiles,
  onPlaceImage,
  startInteraction,
  canRemove,
}: PageCanvasProps) {
  const page = state.pages.find((p) => p.id === pageId);
  if (!page) return null;

  const dims = PAGE_DIMS[state.pageSize];

  return (
    <div className="page-wrap mx-auto mb-8" style={{ width: `${dims.w}mm` }}>
      <div className="page-label mb-1.5 flex items-center gap-2 text-xs text-muted-foreground print:hidden">
        <span>Page {pageIndex + 1}</span>
        {canRemove && (
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-2 text-[11px]"
            onClick={() => dispatch({ type: "REMOVE_PAGE", pageId })}
          >
            Remove page
          </Button>
        )}
      </div>

      <div
        className="page bg-white shadow-lg"
        style={{ width: `${dims.w}mm`, height: `${dims.h}mm` }}
      >
        <div
          className={cn(
            "page-content absolute overflow-hidden",
            state.showGuides && "guides"
          )}
          data-page-id={pageId}
          style={{
            left: `${MARGIN}mm`,
            top: `${MARGIN}mm`,
            right: `${MARGIN}mm`,
            bottom: `${MARGIN}mm`,
          }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) {
              dispatch({ type: "SELECT", pageId: null, itemId: null });
              dispatch({ type: "SET_FOCUSED_PAGE", pageId });
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add("drag-target");
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove("drag-target");
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("drag-target");
            dispatch({ type: "SET_FOCUSED_PAGE", pageId });

            const imageId = e.dataTransfer.getData("application/x-image-id");
            if (imageId) {
              const pt = mmFromEvent(
                e.currentTarget,
                e.clientX,
                e.clientY,
                state.pageSize
              );
              onPlaceImage(imageId, pageId, pt.x, pt.y);
              return;
            }

            if (e.dataTransfer.files?.length) {
              onFiles(Array.from(e.dataTransfer.files), pageIndex);
            }
          }}
        >
          {page.items.map((item) => (
            <PlacedImage
              key={item.id}
              item={item}
              image={state.images[item.imageId]}
              pageId={pageId}
              selected={
                state.selection?.pageId === pageId &&
                state.selection?.itemId === item.id
              }
              onSelect={() => dispatch({ type: "SELECT", pageId, itemId: item.id })}
              onDelete={() => dispatch({ type: "DELETE_ITEM", pageId, itemId: item.id })}
              startInteraction={startInteraction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
