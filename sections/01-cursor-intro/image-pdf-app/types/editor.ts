export type PageSize = "A4" | "Letter";

export type ImageAsset = {
  id: string;
  name: string;
  src: string;
  w: number;
  h: number;
};

export type PlacedItem = {
  id: string;
  imageId: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Page = {
  id: string;
  items: PlacedItem[];
};

export type Selection = {
  pageId: string;
  itemId: string;
};

export type EditorState = {
  pages: Page[];
  images: Record<string, ImageAsset>;
  selection: Selection | null;
  pageSize: PageSize;
  showGuides: boolean;
  snapToGrid: boolean;
  zoom: number;
  focusedPageId: string | null;
};

export type EditorAction =
  | { type: "ADD_IMAGES"; images: ImageAsset[]; pageIndex?: number }
  | { type: "PLACE_IMAGE"; imageId: string; pageId: string; x?: number; y?: number }
  | { type: "ADD_PAGE" }
  | { type: "REMOVE_PAGE"; pageId: string }
  | { type: "MOVE_ITEM"; pageId: string; itemId: string; x: number; y: number }
  | { type: "RESIZE_ITEM"; pageId: string; itemId: string; x: number; y: number; w: number; h: number }
  | { type: "SELECT"; pageId: string | null; itemId: string | null }
  | { type: "DELETE_SELECTED" }
  | { type: "DELETE_ITEM"; pageId: string; itemId: string }
  | { type: "AUTO_ARRANGE" }
  | { type: "CLEAR_ALL" }
  | { type: "SET_PAGE_SIZE"; pageSize: PageSize }
  | { type: "SET_SHOW_GUIDES"; showGuides: boolean }
  | { type: "SET_SNAP_TO_GRID"; snapToGrid: boolean }
  | { type: "SET_ZOOM"; zoom: number }
  | { type: "SET_FOCUSED_PAGE"; pageId: string | null }
  | { type: "BRING_TO_FRONT"; pageId: string; itemId: string };

export type InteractionState = {
  type: "move" | "resize";
  pageId: string;
  itemId: string;
  corner?: "nw" | "ne" | "sw" | "se";
  startX: number;
  startY: number;
  origX?: number;
  origY?: number;
  orig?: PlacedItem;
};
