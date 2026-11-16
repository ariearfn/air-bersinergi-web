import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import type { H3Event } from 'h3'
import { getDb } from '../db'
import * as schema from '../db/schema'

function createAuth() {
  const baseURL = process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'

  return betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL,
    trustedOrigins: [baseURL],
    database: drizzleAdapter(getDb(), {
      provider: 'pg',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification
      }
    }),
    // Admin accounts are created by the seed script; nobody can register from the site.
    emailAndPassword: {
      enabled: true,
      disableSignUp: true
    }
  })
}

let authInstance: ReturnType<typeof createAuth> | null = null

export function getAuth() {
  if (!authInstance) {
    authInstance = createAuth()
  }
  return authInstance
}

export async function requireAdmin(event: H3Event) {
  const session = await getAuth().api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return session
}
