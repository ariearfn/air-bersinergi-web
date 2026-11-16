import { z } from 'zod'
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core'
import {
  clients,
  contactMessages,
  portfolioGroups,
  portfolioPhotos,
  productCategories,
  productItems,
  services,
  siteContent,
  teamMembers
} from '../db/schema'

const optionalText = z.string().trim().max(5000).nullish().transform(v => v || null)
const slug = z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Gunakan huruf kecil, angka, dan tanda hubung')
const sortOrder = z.coerce.number().int().min(0).default(0)
const isVisible = z.boolean().default(true)

interface AdminResource {
  table: PgTable & { id: PgColumn, sortOrder?: PgColumn, createdAt?: PgColumn }
  schema: z.ZodObject
  /** Query-string filters allowed on list, mapped to columns. */
  filters?: Record<string, PgColumn>
  /** Newest first instead of by sort order. */
  newestFirst?: boolean
  /** Create is not allowed from the admin (e.g. contact messages). */
  readOnly?: boolean
}

export const adminResources: Record<string, AdminResource> = {
  'services': {
    table: services,
    schema: z.object({
      slug,
      title: z.string().trim().min(1).max(200),
      description: optionalText,
      longDescription: optionalText,
      icon: optionalText,
      isFeatured: z.boolean().default(false),
      isVisible,
      sortOrder
    })
  },
  'team': {
    table: teamMembers,
    schema: z.object({
      name: z.string().trim().min(1).max(120),
      role: optionalText,
      bio: optionalText,
      photoUrl: optionalText,
      email: optionalText,
      phone: optionalText,
      whatsapp: z.string().trim().max(30).nullish().transform(v => v ? v.replace(/\D/g, '') : null),
      isContact: z.boolean().default(false),
      isVisible,
      sortOrder
    })
  },
  'clients': {
    table: clients,
    schema: z.object({
      name: z.string().trim().min(1).max(200),
      logoUrl: z.string().trim().min(1).max(500),
      isVisible,
      sortOrder
    })
  },
  'content': {
    table: siteContent,
    schema: z.object({
      section: slug,
      title: optionalText,
      subtitle: optionalText,
      body: optionalText,
      ctaText: optionalText,
      ctaLink: optionalText,
      isVisible,
      sortOrder
    })
  },
  'portfolio-groups': {
    table: portfolioGroups,
    schema: z.object({
      slug,
      title: z.string().trim().min(1).max(200),
      description: optionalText,
      category: z.enum(['project', 'service', 'pengadaan']),
      isVisible,
      sortOrder
    })
  },
  'portfolio-photos': {
    table: portfolioPhotos,
    filters: { groupId: portfolioPhotos.groupId },
    schema: z.object({
      groupId: z.uuid(),
      imageUrl: z.string().trim().min(1).max(500),
      caption: optionalText,
      alt: optionalText,
      isFeatured: z.boolean().default(false),
      sortOrder
    })
  },
  'product-categories': {
    table: productCategories,
    filters: { group: productCategories.group },
    schema: z.object({
      slug,
      title: z.string().trim().min(1).max(200),
      subtitle: optionalText,
      summary: optionalText,
      intro: optionalText,
      group: z.enum(['machinery', 'materials', 'safety-tools']),
      catalogImage: optionalText,
      isVisible,
      sortOrder
    })
  },
  'product-items': {
    table: productItems,
    filters: { categoryId: productItems.categoryId },
    schema: z.object({
      categoryId: z.uuid(),
      name: z.string().trim().min(1).max(200),
      model: optionalText,
      description: optionalText,
      imageUrl: optionalText,
      highlights: z.array(z.string().trim().min(1).max(200)).max(12).default([]),
      sortOrder
    })
  },
  'messages': {
    table: contactMessages,
    newestFirst: true,
    readOnly: true,
    schema: z.object({
      isRead: z.boolean()
    })
  }
}

export function getAdminResource(name: string | undefined) {
  const resource = name ? adminResources[name] : undefined
  if (!resource) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown resource' })
  }
  return resource
}

export function adminId(event: Parameters<typeof getRouterParam>[0]) {
  const parsed = z.uuid().safeParse(getRouterParam(event, 'id'))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  }
  return parsed.data
}
