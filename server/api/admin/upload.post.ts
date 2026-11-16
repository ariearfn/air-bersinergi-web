export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const file = parts?.find(p => p.name === 'file' && p.filename)
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'File tidak ditemukan' })
  }

  const url = await saveUpload({ type: file.type, data: file.data })
  return { url }
})
