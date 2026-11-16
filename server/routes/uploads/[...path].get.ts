import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname } from 'node:path'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
}

export default defineEventHandler(async (event) => {
  const path = resolveUploadPath(getRouterParam(event, 'path') ?? '')
  const type = path ? MIME[extname(path)] : undefined
  if (!path || !type) {
    throw createError({ statusCode: 404 })
  }

  const info = await stat(path).catch(() => null)
  if (!info?.isFile()) {
    throw createError({ statusCode: 404 })
  }

  setResponseHeaders(event, {
    'Content-Type': type,
    'Content-Length': String(info.size),
    'Cache-Control': 'public, max-age=31536000, immutable',
    // SVGs are user-supplied; keep any embedded script from running.
    'Content-Security-Policy': 'default-src \'none\'; style-src \'unsafe-inline\'; sandbox'
  })
  return sendStream(event, createReadStream(path))
})
