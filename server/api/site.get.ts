import { asc, eq } from 'drizzle-orm'
import { getDb } from '../db'
import { siteContent, siteSettings } from '../db/schema'

/** Settings and editable copy blocks, keyed by section. */
export default defineEventHandler(async () => {
  const db = getDb()
  const [settings] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1))
  const blocks = await db
    .select()
    .from(siteContent)
    .where(eq(siteContent.isVisible, true))
    .orderBy(asc(siteContent.sortOrder))

  return {
    settings: settings ?? null,
    content: Object.fromEntries(blocks.map(b => [b.section, b]))
  }
})
