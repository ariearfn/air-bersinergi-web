import { asc, eq } from 'drizzle-orm'
import { getDb } from '../db'
import { clients } from '../db/schema'

export default defineEventHandler(() => {
  return getDb()
    .select({ id: clients.id, name: clients.name, logoUrl: clients.logoUrl })
    .from(clients)
    .where(eq(clients.isVisible, true))
    .orderBy(asc(clients.sortOrder))
})
