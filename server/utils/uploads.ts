import { mkdir, writeFile } from 'node:fs/promises'
import { join, normalize, sep } from 'node:path'
import { randomUUID } from 'node:crypto'

export const UPLOAD_ROOT = join(process.cwd(), '.data', 'uploads')

const MAX_BYTES = 8 * 1024 * 1024

export const ALLOWED_UPLOAD_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/svg+xml': '.svg'
}

/** Saves an image under a random name and returns its public `/uploads/...` URL. */
export async function saveUpload(file: { type?: string, data: Buffer }) {
  const ext = file.type ? ALLOWED_UPLOAD_TYPES[file.type] : undefined
  if (!ext) {
    throw createError({ statusCode: 415, statusMessage: 'Hanya gambar JPG, PNG, WEBP, atau SVG' })
  }
  if (file.data.length > MAX_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Ukuran gambar maksimal 8 MB' })
  }

  // The client filename never reaches the filesystem path.
  const month = new Date().toISOString().slice(0, 7)
  const key = `${month}/${randomUUID()}${ext}`

  await mkdir(join(UPLOAD_ROOT, month), { recursive: true })
  await writeFile(join(UPLOAD_ROOT, key), file.data)

  return `/uploads/${key}`
}

/** Resolves a request path inside UPLOAD_ROOT, or null if it escapes it. */
export function resolveUploadPath(key: string) {
  const full = normalize(join(UPLOAD_ROOT, key))
  return full.startsWith(UPLOAD_ROOT + sep) ? full : null
}
