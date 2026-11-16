/** Turns Postgres constraint violations into 409/400 responses instead of 500s. */
export function rethrowDbError(error: unknown): never {
  const pg = (error as { cause?: { code?: string, constraint_name?: string } })?.cause ?? (error as { code?: string, constraint_name?: string })

  if (pg?.code === '23505') {
    throw createError({ statusCode: 409, statusMessage: 'Data dengan slug/kunci yang sama sudah ada' })
  }
  if (pg?.code === '23503') {
    throw createError({ statusCode: 400, statusMessage: 'Data induk tidak ditemukan' })
  }
  throw error
}
