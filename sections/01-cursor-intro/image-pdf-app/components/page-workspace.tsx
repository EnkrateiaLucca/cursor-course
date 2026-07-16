"use client";

import { PageCanvas } from "@/components/page-canvas";
import type { EditorAction, EditorState } from "@/types/editor";

type PageWorkspaceProps = {
  state: EditorState;
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
};

export function PageWorkspace({
  state,
  dispatch,
  onFiles,
  onPlaceImage,
  startInteraction,
}: PageWorkspaceProps) {
  return (
    <div
      id="workspace"
      className="workspace flex-1 px-4 py-2 pb-16"
      style={{ transform: `scale(${state.zoom})`, transformOrigin: "top center" }}
    >
      {state.pages.map((page, index) => (
        <PageCanvas
          key={page.id}
          state={state}
          pageId={page.id}
          pageIndex={index}
          dispatch={dispatch}
          onFiles={onFiles}
          onPlaceImage={onPlaceImage}
          startInteraction={startInteraction}
          canRemove={state.pages.length > 1}
        />
      ))}
    </div>
  );
}
