import { eq } from 'drizzle-orm'
import { getDb } from '../../../db'

export default defineEventHandler(async (event) => {
  const resource = getAdminResource(getRouterParam(event, 'resource'))
  const id = adminId(event)

  const [row] = await getDb()
    .delete(resource.table)
    .where(eq(resource.table.id, id))
    .returning({ id: resource.table.id })

  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return { ok: true }
})
