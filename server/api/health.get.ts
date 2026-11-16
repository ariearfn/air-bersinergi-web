import { sql } from 'drizzle-orm'
import { getDb } from '../db'

export default defineEventHandler(async (event) => {
  try {
    await getDb().execute(sql`select 1`)
    return { ok: true, database: 'connected' }
  } catch {
    setResponseStatus(event, 503)
    return { ok: false, database: 'disconnected' }
  }
})
