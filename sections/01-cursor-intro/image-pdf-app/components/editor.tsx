"use client";

import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { MARGIN, PAGE_DIMS } from "@/lib/constants";
import { DropZone } from "@/components/drop-zone";
import { ImageTray } from "@/components/image-tray";
import { PageWorkspace } from "@/components/page-workspace";
import { Toolbar } from "@/components/toolbar";
import { useEditorState } from "@/hooks/use-editor-state";
import { useKeyboardNudge, usePointerInteraction } from "@/hooks/use-pointer-interaction";
import { processImageFiles } from "@/lib/image-utils";

export function Editor() {
  const { state, dispatch, addImages, placeImage, hasContent, placedImageIds } =
    useEditorState();
  const { startInteraction } = usePointerInteraction(state, dispatch);
  useKeyboardNudge(state, dispatch);

  useEffect(() => {
    const dims = PAGE_DIMS[state.pageSize];
    const root = document.documentElement;
    root.style.setProperty("--page-w", `${dims.w}mm`);
    root.style.setProperty("--page-h", `${dims.h}mm`);
    root.style.setProperty("--page-size", state.pageSize);
    root.style.setProperty("--margin", `${MARGIN}mm`);
  }, [state.pageSize]);

  const handleFiles = useCallback(
    async (files: FileList | File[], pageIndex?: number) => {
      const list = Array.from(files);
      const { images, errors } = await processImageFiles(list, (msg) =>
        toast.loading(msg, { id: "heic-convert" })
      );

      toast.dismiss("heic-convert");

      if (images.length) {
        addImages(images, pageIndex);
        toast.success(`Added ${images.length} image${images.length > 1 ? "s" : ""}`);
      }

      errors.forEach((err) => toast.error(err));
    },
    [addImages]
  );

  const handlePlaceImage = useCallback(
    (imageId: string, pageId?: string, x?: number, y?: number) => {
      const targetPageId = pageId ?? state.focusedPageId ?? state.pages[0]?.id;
      if (!targetPageId) return;
      placeImage(imageId, targetPageId, x, y);
    },
    [placeImage, state.focusedPageId, state.pages]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Toolbar
        state={state}
        dispatch={dispatch}
        hasContent={hasContent}
        onAddImages={handleFiles}
      />

      {!hasContent && <DropZone onFiles={handleFiles} />}

      {hasContent && (
        <p className="hint mx-auto max-w-2xl px-4 text-center text-sm text-muted-foreground print:hidden">
          Click an image to select it. Drag to move, corner handles to resize. Arrow keys nudge
          (Shift for 5mm). Press Delete to remove.
        </p>
      )}

      <div className="flex flex-1">
        <ImageTray
          state={state}
          placedImageIds={placedImageIds}
          onPlaceImage={(imageId) => handlePlaceImage(imageId)}
        />

        <PageWorkspace
          state={state}
          dispatch={dispatch}
          onFiles={handleFiles}
          onPlaceImage={handlePlaceImage}
          startInteraction={startInteraction}
        />
      </div>
    </div>
  );
}
