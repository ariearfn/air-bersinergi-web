import { eq } from 'drizzle-orm'
import { getDb } from '../../../db'

export default defineEventHandler(async (event) => {
  const resource = getAdminResource(getRouterParam(event, 'resource'))
  const id = adminId(event)

  const values = await parseBody(event, resource.schema.partial())
  const [row] = await getDb()
    .update(resource.table)
    .set(values)
    .where(eq(resource.table.id, id))
    .returning()
    .catch(rethrowDbError)

  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return row
})
