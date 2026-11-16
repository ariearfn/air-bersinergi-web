import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export type Database = PostgresJsDatabase<typeof schema>

let client: postgres.Sql | null = null
let db: Database | null = null

export function getDb(): Database {
  if (db) {
    return db
  }

  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }

  client = postgres(url, { max: 10 })
  db = drizzle(client, { schema, casing: 'snake_case' })
  return db
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.end()
    client = null
    db = null
  }
}

export { schema }
