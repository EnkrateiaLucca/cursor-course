import { GRID_SIZE, MARGIN, PAGE_DIMS } from "@/lib/constants";
import type { ImageAsset, Page, PageSize, PlacedItem } from "@/types/editor";

export function getContentDims(pageSize: PageSize) {
  const dims = PAGE_DIMS[pageSize];
  return { w: dims.w - MARGIN * 2, h: dims.h - MARGIN * 2 };
}

export function fitBox(img: Pick<ImageAsset, "w" | "h">, maxW: number, maxH: number) {
  let w = maxW;
  let h = w * (img.h / img.w);
  if (h > maxH) {
    h = maxH;
    w = h * (img.w / img.h);
  }
  return { w, h };
}

export function defaultPlacement(
  img: ImageAsset,
  index: number,
  content: { w: number; h: number }
) {
  const slotW = content.w * 0.42;
  const slotH = content.h * 0.42;
  const { w, h } = fitBox(img, slotW, slotH);
  const cols = 2;
  const gap = 6;
  const col = index % cols;
  const row = Math.floor(index / cols);
  return {
    x: 4 + col * (slotW + gap),
    y: 4 + row * (slotH + gap),
    w,
    h,
  };
}

export function autoArrangePage(
  page: Page,
  images: Record<string, ImageAsset>,
  pageSize: PageSize
) {
  const content = getContentDims(pageSize);
  const items = page.items
    .map((it) => ({ ...it, img: images[it.imageId] }))
    .filter((it) => it.img);

  if (!items.length) return;

  const cols = Math.ceil(Math.sqrt(items.length));
  const rows = Math.ceil(items.length / cols);
  const gap = 4;
  const cellW = (content.w - gap * (cols - 1)) / cols;
  const cellH = (content.h - gap * (rows - 1)) / rows;

  items.forEach((it, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const { w, h } = fitBox(it.img!, cellW, cellH);
    const item = page.items.find((x) => x.id === it.id);
    if (!item) return;
    item.x = col * (cellW + gap) + (cellW - w) / 2;
    item.y = row * (cellH + gap) + (cellH - h) / 2;
    item.w = w;
    item.h = h;
  });
}

export function clampItem(item: PlacedItem, pageSize: PageSize) {
  const content = getContentDims(pageSize);
  const minSize = 8;
  item.w = Math.max(minSize, Math.min(item.w, content.w));
  item.h = Math.max(minSize, Math.min(item.h, content.h));
  item.x = Math.max(0, Math.min(item.x, content.w - item.w));
  item.y = Math.max(0, Math.min(item.y, content.h - item.h));
}

export function snapValue(value: number, gridSize: number) {
  return Math.round(value / gridSize) * gridSize;
}

export function snapItem(item: PlacedItem, pageSize: PageSize, enabled: boolean) {
  if (!enabled) return;
  item.x = snapValue(item.x, GRID_SIZE);
  item.y = snapValue(item.y, GRID_SIZE);
  item.w = Math.max(GRID_SIZE, snapValue(item.w, GRID_SIZE));
  item.h = Math.max(GRID_SIZE, snapValue(item.h, GRID_SIZE));
  clampItem(item, pageSize);
}

export function mmFromEvent(
  pageContentEl: HTMLElement,
  clientX: number,
  clientY: number,
  pageSize: PageSize
) {
  const rect = pageContentEl.getBoundingClientRect();
  const content = getContentDims(pageSize);
  const x = ((clientX - rect.left) / rect.width) * content.w;
  const y = ((clientY - rect.top) / rect.height) * content.h;
  return { x, y, pxPerMm: rect.width / content.w };
}

export function applyResize(
  item: PlacedItem,
  corner: "nw" | "ne" | "sw" | "se",
  orig: PlacedItem,
  dx: number,
  dy: number,
  aspect: number
) {
  if (corner === "se") {
    item.w = orig.w + dx;
    item.h = item.w / aspect;
  } else if (corner === "sw") {
    item.w = orig.w - dx;
    item.h = item.w / aspect;
    item.x = orig.x + (orig.w - item.w);
  } else if (corner === "ne") {
    item.w = orig.w + dx;
    item.h = item.w / aspect;
    item.y = orig.y + (orig.h - item.h);
  } else if (corner === "nw") {
    item.w = orig.w - dx;
    item.h = item.w / aspect;
    item.x = orig.x + (orig.w - item.w);
    item.y = orig.y + (orig.h - item.h);
  }
}
