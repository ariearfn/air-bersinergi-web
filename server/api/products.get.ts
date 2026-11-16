import { asc, eq } from 'drizzle-orm'
import { getDb } from '../db'
import { productCategories } from '../db/schema'

/** Visible product categories with their items. */
export default defineEventHandler(() => {
  return getDb().query.productCategories.findMany({
    where: eq(productCategories.isVisible, true),
    orderBy: asc(productCategories.sortOrder),
    with: {
      items: { orderBy: (i, { asc }) => asc(i.sortOrder) }
    }
  })
})
