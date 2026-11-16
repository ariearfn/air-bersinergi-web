import { z } from 'zod'
import { getDb } from '../db'
import { contactMessages } from '../db/schema'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  phone: z.string().trim().max(40).optional().default(''),
  serviceInterest: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(10).max(5000),
  /** Honeypot: hidden from people, bots tend to fill it. */
  website: z.string().optional()
})

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const recentByIp = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const hits = (recentByIp.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  hits.push(now)
  recentByIp.set(ip, hits)
  return hits.length > MAX_PER_WINDOW
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (isRateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Terlalu banyak pesan. Coba lagi beberapa menit lagi.' })
  }

  const body = await parseBody(event, contactSchema)
  if (body.website) {
    return { ok: true }
  }

  await getDb().insert(contactMessages).values({
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    serviceInterest: body.serviceInterest || null,
    message: body.message
  })

  return { ok: true }
})
