import { z } from 'zod'
import { getDb } from '../../db'
import { siteSettings } from '../../db/schema'

const optionalText = z.string().trim().max(2000).nullish().transform(v => v || null)

const settingsSchema = z.object({
  siteName: z.string().trim().min(1).max(200),
  siteDescription: optionalText,
  contactEmail: optionalText,
  contactPhone: optionalText,
  whatsappNumber: z.string().trim().max(30).nullish().transform(v => v ? v.replace(/\D/g, '') : null),
  address: optionalText,
  mapsUrl: optionalText,
  socialInstagram: optionalText,
  socialFacebook: optionalText,
  socialLinkedin: optionalText
})

export default defineEventHandler(async (event) => {
  const values = await parseBody(event, settingsSchema)
  const [row] = await getDb()
    .insert(siteSettings)
    .values({ id: 1, ...values })
    .onConflictDoUpdate({ target: siteSettings.id, set: values })
    .returning()
  return row
})
