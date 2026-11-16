import { asc, eq } from 'drizzle-orm'
import { getDb } from '../db'
import { teamMembers } from '../db/schema'

export default defineEventHandler(() => {
  return getDb()
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.isVisible, true))
    .orderBy(asc(teamMembers.sortOrder))
})
