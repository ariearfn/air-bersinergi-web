import { randomUUID } from 'node:crypto'
import { count, eq } from 'drizzle-orm'
import type { PgTable } from 'drizzle-orm/pg-core'
import { hashPassword } from 'better-auth/crypto'
import { closeDb, getDb } from './index'
import {
  account,
  clients,
  portfolioGroups,
  portfolioPhotos,
  productCategories,
  productItems,
  services,
  siteContent,
  siteSettings,
  teamMembers,
  user
} from './schema'
import { clientsSeed, servicesSeed, siteContentSeed, siteSettingsSeed, teamSeed } from './seed/site'
import { featuredPortfolioProjects, portfolioSections } from './seed/portfolio'
import { catalogProducts } from './seed/catalog'
import { productCategoryDetails } from './seed/product-details'

const db = getDb()

async function isEmpty(table: PgTable) {
  const [row] = await db.select({ n: count() }).from(table)
  return Number(row?.n ?? 0) === 0
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    console.log('· admin: ADMIN_EMAIL / ADMIN_PASSWORD not set, skipped')
    return
  }

  const [existing] = await db.select({ id: user.id }).from(user).where(eq(user.email, email))
  if (existing) {
    console.log(`· admin: ${email} already exists`)
    return
  }

  const userId = randomUUID()
  await db.insert(user).values({ id: userId, name: process.env.ADMIN_NAME ?? 'Admin', email, emailVerified: true })
  await db.insert(account).values({
    id: randomUUID(),
    accountId: userId,
    providerId: 'credential',
    userId,
    password: await hashPassword(password)
  })
  console.log(`✓ admin: ${email}`)
}

async function seedSite() {
  await db.insert(siteSettings).values({ id: 1, ...siteSettingsSeed }).onConflictDoNothing()

  if (await isEmpty(siteContent)) {
    await db.insert(siteContent).values(siteContentSeed)
    console.log(`✓ site_content: ${siteContentSeed.length}`)
  }
  if (await isEmpty(services)) {
    await db.insert(services).values(servicesSeed.map((s, i) => ({ ...s, sortOrder: i + 1 })))
    console.log(`✓ services: ${servicesSeed.length}`)
  }
  if (await isEmpty(teamMembers)) {
    await db.insert(teamMembers).values(teamSeed.map((t, i) => ({ ...t, sortOrder: i + 1 })))
    console.log(`✓ team_members: ${teamSeed.length}`)
  }
  if (await isEmpty(clients)) {
    await db.insert(clients).values(clientsSeed.map((c, i) => ({ ...c, sortOrder: i + 1 })))
    console.log(`✓ clients: ${clientsSeed.length}`)
  }
}

async function seedPortfolio() {
  if (!(await isEmpty(portfolioGroups))) return

  const featured = new Set(featuredPortfolioProjects.map(p => p.image))
  let photoCount = 0

  for (const [i, section] of portfolioSections.entries()) {
    const [group] = await db
      .insert(portfolioGroups)
      .values({
        slug: section.slug,
        title: section.title,
        description: section.description,
        category: section.category,
        sortOrder: i + 1
      })
      .returning({ id: portfolioGroups.id })

    await db.insert(portfolioPhotos).values(
      section.images.map((img, j) => ({
        groupId: group!.id,
        imageUrl: img.src,
        caption: img.caption ?? null,
        alt: img.alt,
        isFeatured: featured.has(img.src),
        sortOrder: j + 1
      }))
    )
    photoCount += section.images.length
  }
  console.log(`✓ portfolio: ${portfolioSections.length} groups, ${photoCount} photos`)
}

async function seedProducts() {
  if (!(await isEmpty(productCategories))) return

  let itemCount = 0
  for (const [i, product] of catalogProducts.entries()) {
    const detail = product.detailSlug
      ? productCategoryDetails.find(d => d.slug === product.detailSlug)
      : undefined
    const slug = product.detailSlug ?? product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const [category] = await db
      .insert(productCategories)
      .values({
        slug,
        title: product.title,
        subtitle: detail?.subtitle,
        summary: product.description,
        intro: detail?.intro,
        group: product.group,
        catalogImage: detail?.catalogImage ?? product.coverImage,
        sortOrder: i + 1
      })
      .returning({ id: productCategories.id })

    if (detail?.items.length) {
      await db.insert(productItems).values(
        detail.items.map((item, j) => ({
          categoryId: category!.id,
          name: item.name,
          model: item.model,
          description: item.description,
          imageUrl: item.image,
          highlights: item.highlights ?? [],
          sortOrder: j + 1
        }))
      )
      itemCount += detail.items.length
    }
  }
  console.log(`✓ products: ${catalogProducts.length} categories, ${itemCount} items`)
}

try {
  await seedAdmin()
  await seedSite()
  await seedPortfolio()
  await seedProducts()
  console.log('Seed complete')
} finally {
  await closeDb()
}
