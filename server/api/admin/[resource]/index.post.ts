import { getDb } from '../../../db'

export default defineEventHandler(async (event) => {
  const resource = getAdminResource(getRouterParam(event, 'resource'))
  if (resource.readOnly) {
    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  }

  const values = await parseBody(event, resource.schema)
  const [row] = await getDb()
    .insert(resource.table)
    .values(values)
    .returning()
    .catch(rethrowDbError)

  setResponseStatus(event, 201)
  return row
})
