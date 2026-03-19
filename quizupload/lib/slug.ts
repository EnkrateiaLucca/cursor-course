import { nanoid } from "nanoid"

export function generateSlug(): string {
  return nanoid(10)
}
