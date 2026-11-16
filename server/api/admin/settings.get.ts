import { eq } from 'drizzle-orm'
import { getDb } from '../../db'
import { siteSettings } from '../../db/schema'

export default defineEventHandler(async () => {
  const [row] = await getDb().select().from(siteSettings).where(eq(siteSettings.id, 1))
  return row ?? null
})
