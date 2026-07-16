import type { PageSize } from "@/types/editor";

export const MARGIN = 8;

export const PAGE_DIMS: Record<PageSize, { w: number; h: number }> = {
  A4: { w: 210, h: 297 },
  Letter: { w: 216, h: 279 },
};

export const IMAGE_EXT =
  /\.(jpe?g|png|gif|webp|heic|heif|bmp|svg|tiff?|avif)$/i;

export const GRID_SIZE = 5;

export const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25] as const;

export const ACCEPTED_IMAGE_TYPES = {
  "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".avif", ".tiff", ".heic", ".heif"],
};
