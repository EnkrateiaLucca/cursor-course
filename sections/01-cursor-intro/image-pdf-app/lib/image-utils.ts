import { IMAGE_EXT } from "@/lib/constants";
import { uid } from "@/lib/utils";
import type { ImageAsset } from "@/types/editor";

export function isImageFile(file: File) {
  return (file.type && file.type.startsWith("image/")) || IMAGE_EXT.test(file.name);
}

export function isHeic(file: File) {
  return (
    /\.heic$/i.test(file.name) ||
    /\.heif$/i.test(file.name) ||
    file.type === "image/heic" ||
    file.type === "image/heif"
  );
}

export async function normalizeFile(file: File): Promise<File> {
  if (!isHeic(file)) return file;

  const heic2any = (await import("heic2any")).default;
  const blob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
  const jpegBlob = Array.isArray(blob) ? blob[0] : blob;
  return new File([jpegBlob], file.name.replace(/\.heic?f?$/i, ".jpg"), {
    type: "image/jpeg",
  });
}

export function readImage(file: File): Promise<ImageAsset> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        resolve({
          id: uid(),
          name: file.name,
          src: reader.result as string,
          w: img.naturalWidth,
          h: img.naturalHeight,
        });
      };
      img.onerror = () => reject(new Error(`Could not decode ${file.name}`));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

export async function processImageFiles(
  files: File[],
  onStatus?: (message: string) => void
): Promise<{ images: ImageAsset[]; errors: string[] }> {
  const list = files.filter(isImageFile);
  const images: ImageAsset[] = [];
  const errors: string[] = [];

  for (const raw of list) {
    try {
      if (isHeic(raw)) {
        onStatus?.(`Converting ${raw.name}…`);
      }
      const file = await normalizeFile(raw);
      const img = await readImage(file);
      images.push(img);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      errors.push(`${raw.name}: ${message}`);
    }
  }

  return { images, errors };
}
