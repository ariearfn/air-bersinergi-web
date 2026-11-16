import { asc, eq } from 'drizzle-orm'
import { getDb } from '../db'
import { services } from '../db/schema'

export default defineEventHandler(() => {
  return getDb()
    .select()
    .from(services)
    .where(eq(services.isVisible, true))
    .orderBy(asc(services.sortOrder))
})
