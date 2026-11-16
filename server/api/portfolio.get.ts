import { asc, eq } from 'drizzle-orm'
import { getDb } from '../db'
import { portfolioGroups } from '../db/schema'

/** Visible groups with their photos. */
export default defineEventHandler(() => {
  return getDb().query.portfolioGroups.findMany({
    where: eq(portfolioGroups.isVisible, true),
    orderBy: asc(portfolioGroups.sortOrder),
    with: {
      photos: { orderBy: (p, { asc }) => asc(p.sortOrder) }
    }
  })
})
