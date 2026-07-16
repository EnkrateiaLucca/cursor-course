"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  applyResize,
  clampItem,
  mmFromEvent,
  snapItem,
} from "@/lib/layout-utils";
import type { Dispatch } from "react";
import type { EditorAction, EditorState, InteractionState } from "@/types/editor";

export function usePointerInteraction(
  state: EditorState,
  dispatch: Dispatch<EditorAction>
) {
  const interactionRef = useRef<InteractionState | null>(null);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const interaction = interactionRef.current;
      if (!interaction) return;

      const pageContentEl = document.querySelector(
        `.page-content[data-page-id="${interaction.pageId}"]`
      ) as HTMLElement | null;
      if (!pageContentEl) return;

      const page = state.pages.find((p) => p.id === interaction.pageId);
      const item = page?.items.find((i) => i.id === interaction.itemId);
      if (!item) return;

      const img = state.images[item.imageId];
      const aspect = img ? img.w / img.h : 1;
      const pt = mmFromEvent(pageContentEl, e.clientX, e.clientY, state.pageSize);

      if (interaction.type === "move") {
        dispatch({
          type: "MOVE_ITEM",
          pageId: interaction.pageId,
          itemId: interaction.itemId,
          x: (interaction.origX ?? item.x) + (pt.x - interaction.startX),
          y: (interaction.origY ?? item.y) + (pt.y - interaction.startY),
        });
        return;
      }

      if (interaction.type === "resize" && interaction.corner && interaction.orig) {
        const dx = pt.x - interaction.startX;
        const dy = pt.y - interaction.startY;
        const next = { ...item };
        applyResize(next, interaction.corner, interaction.orig, dx, dy, aspect);
        clampItem(next, state.pageSize);
        snapItem(next, state.pageSize, state.snapToGrid);
        dispatch({
          type: "RESIZE_ITEM",
          pageId: interaction.pageId,
          itemId: interaction.itemId,
          x: next.x,
          y: next.y,
          w: next.w,
          h: next.h,
        });
      }
    },
    [dispatch, state.images, state.pageSize, state.pages, state.snapToGrid]
  );

  const onPointerUp = useCallback(() => {
    interactionRef.current = null;
  }, []);

  useEffect(() => {
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  const startInteraction = useCallback(
    (
      type: "move" | "resize",
      pageId: string,
      itemId: string,
      clientX: number,
      clientY: number,
      pageContentEl: HTMLElement,
      corner?: "nw" | "ne" | "sw" | "se",
      orig?: { x: number; y: number; w: number; h: number }
    ) => {
      dispatch({ type: "BRING_TO_FRONT", pageId, itemId });
      dispatch({ type: "SELECT", pageId, itemId });

      const pt = mmFromEvent(pageContentEl, clientX, clientY, state.pageSize);
      const page = state.pages.find((p) => p.id === pageId);
      const item = page?.items.find((i) => i.id === itemId);

      if (type === "move") {
        interactionRef.current = {
          type: "move",
          pageId,
          itemId,
          startX: pt.x,
          startY: pt.y,
          origX: item?.x,
          origY: item?.y,
        };
      } else if (corner && orig) {
        interactionRef.current = {
          type: "resize",
          pageId,
          itemId,
          corner,
          startX: pt.x,
          startY: pt.y,
          orig: { ...orig, id: itemId, imageId: item?.imageId ?? "" },
        };
      }
    },
    [dispatch, state.pageSize, state.pages]
  );

  return { startInteraction };
}

export function useKeyboardNudge(
  state: EditorState,
  dispatch: Dispatch<EditorAction>
) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        state.selection &&
        !/input|textarea|select/i.test(document.activeElement?.tagName ?? "")
      ) {
        e.preventDefault();
        dispatch({ type: "DELETE_SELECTED" });
        return;
      }

      if (!state.selection) return;
      if (/input|textarea|select/i.test(document.activeElement?.tagName ?? "")) {
        return;
      }

      const step = e.shiftKey ? 5 : 1;
      const { pageId, itemId } = state.selection;
      const page = state.pages.find((p) => p.id === pageId);
      const item = page?.items.find((i) => i.id === itemId);
      if (!item) return;

      let dx = 0;
      let dy = 0;
      if (e.key === "ArrowLeft") dx = -step;
      else if (e.key === "ArrowRight") dx = step;
      else if (e.key === "ArrowUp") dy = -step;
      else if (e.key === "ArrowDown") dy = step;
      else return;

      e.preventDefault();
      dispatch({
        type: "MOVE_ITEM",
        pageId,
        itemId,
        x: item.x + dx,
        y: item.y + dy,
      });
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dispatch, state.pages, state.selection]);
}
