import { requireAdmin } from '../utils/auth'

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api/admin')) {
    event.context.admin = await requireAdmin(event)
  }
})
