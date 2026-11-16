import { and, asc, desc, eq, type SQL } from 'drizzle-orm'
import { getDb } from '../../../db'

export default defineEventHandler(async (event) => {
  const resource = getAdminResource(getRouterParam(event, 'resource'))
  const query = getQuery(event)

  const conditions: SQL[] = []
  for (const [key, column] of Object.entries(resource.filters ?? {})) {
    const value = query[key]
    if (typeof value === 'string' && value) {
      conditions.push(eq(column, value))
    }
  }

  const { table } = resource
  const order = resource.newestFirst || !table.sortOrder
    ? desc(table.createdAt!)
    : asc(table.sortOrder)

  return getDb()
    .select()
    .from(table)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(order)
})
