import { relations } from 'drizzle-orm'
import { boolean, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const portfolioCategory = pgEnum('portfolio_category', ['project', 'service', 'pengadaan'])
export const productGroup = pgEnum('product_group', ['machinery', 'materials', 'safety-tools'])

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
}

const ordering = {
  isVisible: boolean().notNull().default(true),
  sortOrder: integer().notNull().default(0)
}

/** Single row (id = 1). */
export const siteSettings = pgTable('site_settings', {
  id: integer().primaryKey().default(1),
  siteName: text().notNull().default('PT. Anugerah Insan Ridho Bersinergi'),
  siteDescription: text(),
  contactEmail: text(),
  contactPhone: text(),
  whatsappNumber: text(),
  address: text(),
  mapsUrl: text(),
  socialInstagram: text(),
  socialFacebook: text(),
  socialLinkedin: text(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
})

/** Editable copy blocks keyed by `section` (hero, about, cta, ...). */
export const siteContent = pgTable('site_content', {
  id: uuid().primaryKey().defaultRandom(),
  section: text().notNull().unique(),
  title: text(),
  subtitle: text(),
  body: text(),
  ctaText: text(),
  ctaLink: text(),
  ...ordering,
  ...timestamps
})

export const services = pgTable('services', {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  description: text(),
  longDescription: text(),
  icon: text(),
  isFeatured: boolean().notNull().default(false),
  ...ordering,
  ...timestamps
})

export const teamMembers = pgTable('team_members', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  role: text(),
  bio: text(),
  photoUrl: text(),
  email: text(),
  phone: text(),
  whatsapp: text(),
  /** Listed as a contact person on the Kontak page. */
  isContact: boolean().notNull().default(false),
  ...ordering,
  ...timestamps
})

export const clients = pgTable('clients', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  logoUrl: text().notNull(),
  ...ordering,
  ...timestamps
})

export const portfolioGroups = pgTable('portfolio_groups', {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  description: text(),
  category: portfolioCategory().notNull(),
  ...ordering,
  ...timestamps
})

export const portfolioPhotos = pgTable('portfolio_photos', {
  id: uuid().primaryKey().defaultRandom(),
  groupId: uuid()
    .notNull()
    .references(() => portfolioGroups.id, { onDelete: 'cascade' }),
  imageUrl: text().notNull(),
  caption: text(),
  alt: text(),
  /** Shown in the homepage "Proyek Terbaru" grid. */
  isFeatured: boolean().notNull().default(false),
  sortOrder: integer().notNull().default(0),
  ...timestamps
})

export const productCategories = pgTable('product_categories', {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  subtitle: text(),
  summary: text(),
  intro: text(),
  group: productGroup().notNull(),
  catalogImage: text(),
  ...ordering,
  ...timestamps
})

export const productItems = pgTable('product_items', {
  id: uuid().primaryKey().defaultRandom(),
  categoryId: uuid()
    .notNull()
    .references(() => productCategories.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  model: text(),
  description: text(),
  imageUrl: text(),
  highlights: jsonb().$type<string[]>().notNull().default([]),
  sortOrder: integer().notNull().default(0),
  ...timestamps
})

export const portfolioGroupsRelations = relations(portfolioGroups, ({ many }) => ({
  photos: many(portfolioPhotos)
}))

export const portfolioPhotosRelations = relations(portfolioPhotos, ({ one }) => ({
  group: one(portfolioGroups, { fields: [portfolioPhotos.groupId], references: [portfolioGroups.id] })
}))

export const productCategoriesRelations = relations(productCategories, ({ many }) => ({
  items: many(productItems)
}))

export const productItemsRelations = relations(productItems, ({ one }) => ({
  category: one(productCategories, { fields: [productItems.categoryId], references: [productCategories.id] })
}))

export const contactMessages = pgTable('contact_messages', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull(),
  phone: text(),
  serviceInterest: text(),
  message: text().notNull(),
  source: text().notNull().default('website'),
  isRead: boolean().notNull().default(false),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})
