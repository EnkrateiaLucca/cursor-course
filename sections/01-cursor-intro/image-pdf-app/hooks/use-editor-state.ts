"use client";

import { useCallback, useReducer } from "react";
import {
  autoArrangePage,
  clampItem,
  defaultPlacement,
  getContentDims,
  snapItem,
} from "@/lib/layout-utils";
import { uid } from "@/lib/utils";
import type { EditorAction, EditorState, ImageAsset } from "@/types/editor";

/** Stable ID for SSR — avoids hydration mismatch from Math.random() on first paint */
const INITIAL_PAGE_ID = "page-initial";

function createInitialState(): EditorState {
  return {
    pages: [{ id: INITIAL_PAGE_ID, items: [] }],
    images: {},
    selection: null,
    pageSize: "A4",
    showGuides: true,
    snapToGrid: false,
    zoom: 1,
    focusedPageId: INITIAL_PAGE_ID,
  };
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_IMAGES": {
      const images = { ...state.images };
      action.images.forEach((img) => {
        images[img.id] = img;
      });

      const pages = state.pages.map((p) => ({ ...p, items: [...p.items] }));
      const pageIndex = action.pageIndex ?? pages.length - 1;
      const page = pages[pageIndex] ?? pages[pages.length - 1];
      const content = getContentDims(state.pageSize);

      action.images.forEach((img) => {
        const layout = defaultPlacement(img, page.items.length, content);
        page.items.push({ id: uid(), imageId: img.id, ...layout });
      });

      return { ...state, pages, images, focusedPageId: page.id };
    }

    case "PLACE_IMAGE": {
      const img = state.images[action.imageId];
      if (!img) return state;

      const pages = state.pages.map((p) => ({ ...p, items: [...p.items] }));
      const page = pages.find((p) => p.id === action.pageId);
      if (!page) return state;

      const content = getContentDims(state.pageSize);
      const { w, h } = defaultPlacement(img, page.items.length, content);
      const x = action.x ?? (content.w - w) / 2;
      const y = action.y ?? (content.h - h) / 2;

      page.items.push({
        id: uid(),
        imageId: action.imageId,
        x,
        y,
        w,
        h,
      });

      return { ...state, pages, focusedPageId: page.id };
    }

    case "ADD_PAGE": {
      const pageId = uid();
      return {
        ...state,
        pages: [...state.pages, { id: pageId, items: [] }],
        focusedPageId: pageId,
      };
    }

    case "REMOVE_PAGE": {
      if (state.pages.length <= 1) return state;
      const pages = state.pages.filter((p) => p.id !== action.pageId);
      const selection =
        state.selection?.pageId === action.pageId ? null : state.selection;
      const focusedPageId =
        state.focusedPageId === action.pageId
          ? pages[pages.length - 1]?.id ?? null
          : state.focusedPageId;
      return { ...state, pages, selection, focusedPageId };
    }

    case "MOVE_ITEM": {
      const pages = state.pages.map((p) => ({ ...p, items: [...p.items] }));
      const page = pages.find((p) => p.id === action.pageId);
      const item = page?.items.find((i) => i.id === action.itemId);
      if (!item) return state;

      item.x = action.x;
      item.y = action.y;
      clampItem(item, state.pageSize);
      snapItem(item, state.pageSize, state.snapToGrid);

      return { ...state, pages };
    }

    case "RESIZE_ITEM": {
      const pages = state.pages.map((p) => ({ ...p, items: [...p.items] }));
      const page = pages.find((p) => p.id === action.pageId);
      const item = page?.items.find((i) => i.id === action.itemId);
      if (!item) return state;

      item.x = action.x;
      item.y = action.y;
      item.w = action.w;
      item.h = action.h;
      clampItem(item, state.pageSize);
      snapItem(item, state.pageSize, state.snapToGrid);

      return { ...state, pages };
    }

    case "SELECT":
      return {
        ...state,
        selection:
          action.pageId && action.itemId
            ? { pageId: action.pageId, itemId: action.itemId }
            : null,
      };

    case "DELETE_SELECTED": {
      if (!state.selection) return state;
      const { pageId, itemId } = state.selection;
      const pages = state.pages.map((p) =>
        p.id === pageId
          ? { ...p, items: p.items.filter((i) => i.id !== itemId) }
          : p
      );
      return { ...state, pages, selection: null };
    }

    case "DELETE_ITEM": {
      const pages = state.pages.map((p) =>
        p.id === action.pageId
          ? { ...p, items: p.items.filter((i) => i.id !== action.itemId) }
          : p
      );
      const selection =
        state.selection?.itemId === action.itemId ? null : state.selection;
      return { ...state, pages, selection };
    }

    case "AUTO_ARRANGE": {
      const pages = state.pages.map((p) => {
        const copy = { ...p, items: p.items.map((i) => ({ ...i })) };
        autoArrangePage(copy, state.images, state.pageSize);
        return copy;
      });
      return { ...state, pages };
    }

    case "CLEAR_ALL": {
      const pageId = uid();
      return {
        ...createInitialState(),
        pageSize: state.pageSize,
        showGuides: state.showGuides,
        snapToGrid: state.snapToGrid,
        zoom: state.zoom,
        pages: [{ id: pageId, items: [] }],
        focusedPageId: pageId,
      };
    }

    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.pageSize };

    case "SET_SHOW_GUIDES":
      return { ...state, showGuides: action.showGuides };

    case "SET_SNAP_TO_GRID":
      return { ...state, snapToGrid: action.snapToGrid };

    case "SET_ZOOM":
      return { ...state, zoom: action.zoom };

    case "SET_FOCUSED_PAGE":
      return { ...state, focusedPageId: action.pageId };

    case "BRING_TO_FRONT": {
      const pages = state.pages.map((p) => ({ ...p, items: [...p.items] }));
      const page = pages.find((p) => p.id === action.pageId);
      if (!page) return state;
      const idx = page.items.findIndex((i) => i.id === action.itemId);
      if (idx < 0) return state;
      const [item] = page.items.splice(idx, 1);
      page.items.push(item);
      return { ...state, pages };
    }

    default:
      return state;
  }
}

export function useEditorState() {
  const [state, dispatch] = useReducer(editorReducer, undefined, createInitialState);

  const addImages = useCallback(
    (images: ImageAsset[], pageIndex?: number) => {
      dispatch({ type: "ADD_IMAGES", images, pageIndex });
    },
    []
  );

  const placeImage = useCallback(
    (imageId: string, pageId: string, x?: number, y?: number) => {
      dispatch({ type: "PLACE_IMAGE", imageId, pageId, x, y });
    },
    []
  );

  const hasContent = state.pages.some((p) => p.items.length > 0);

  const placedImageIds = new Set(
    state.pages.flatMap((p) => p.items.map((i) => i.imageId))
  );

  return {
    state,
    dispatch,
    addImages,
    placeImage,
    hasContent,
    placedImageIds,
  };
}
