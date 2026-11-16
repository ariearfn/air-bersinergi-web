import { count, desc, eq } from 'drizzle-orm'
import type { PgTable } from 'drizzle-orm/pg-core'
import { getDb } from '../../db'
import { clients, contactMessages, portfolioPhotos, productItems, services } from '../../db/schema'

export default defineEventHandler(async () => {
  const db = getDb()
  const total = async (table: PgTable) => {
    const [row] = await db.select({ n: count() }).from(table)
    return Number(row?.n ?? 0)
  }

  const [unread] = await db.select({ n: count() }).from(contactMessages).where(eq(contactMessages.isRead, false))
  const recentMessages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt))
    .limit(5)

  return {
    services: await total(services),
    clients: await total(clients),
    portfolioPhotos: await total(portfolioPhotos),
    productItems: await total(productItems),
    unreadMessages: Number(unread?.n ?? 0),
    recentMessages
  }
})
