<script setup lang="ts">
import type { CatalogGroupId, CatalogProduct } from '~/data/catalog-products'
import { catalogGroups, productsByGroup } from '~/data/catalog-products'
import { getCategoryDetail } from '~/data/product-details'

const route = useRoute()
const router = useRouter()

const activeGroup = ref<CatalogGroupId>('machinery')
const activeSlug = ref<string | null>(null)
const activeCatalogProduct = ref<CatalogProduct | null>(null)

const activeDetail = computed(() => (activeSlug.value ? getCategoryDetail(activeSlug.value) : null))

function slugFromHash(hash: string) {
  return hash.replace(/^#/, '')
}

function syncFromHash() {
  const slug = slugFromHash(route.hash)
  const detail = slug ? getCategoryDetail(slug) : null

  if (detail) {
    activeSlug.value = detail.slug
    activeGroup.value = detail.group
    activeCatalogProduct.value = null
    return
  }

  activeSlug.value = null
}

function selectGroup(groupId: CatalogGroupId) {
  activeGroup.value = groupId
  activeSlug.value = null
  activeCatalogProduct.value = null
  router.replace({ hash: '' })
}

function selectProduct(product: CatalogProduct) {
  activeGroup.value = product.group

  if (product.detailSlug) {
    activeSlug.value = product.detailSlug
    activeCatalogProduct.value = null
    router.replace({ hash: `#${product.detailSlug}` })
    nextTick(() => {
      document.getElementById('katalog-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return
  }

  activeSlug.value = null
  activeCatalogProduct.value = product
  router.replace({ hash: '' })
  nextTick(() => {
    document.getElementById('katalog-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function isProductActive(product: CatalogProduct) {
  if (product.detailSlug) return activeSlug.value === product.detailSlug
  return activeCatalogProduct.value?.title === product.title
}

onMounted(syncFromHash)
watch(() => route.hash, syncFromHash)
</script>

<template>
  <section id="katalog-produk" class="py-20 relative overflow-hidden scroll-mt-24">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.06),transparent_50%)]" />

    <div class="container relative">
      <div class="max-w-3xl mx-auto text-center mb-10">
        <UiBadge class="mb-4">Katalog Produk</UiBadge>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight">Product Catalog</h2>
        <p class="text-muted-foreground mt-4 leading-relaxed">
          Pilih grup dan kategori produk untuk melihat spesifikasi lengkap. Kami siap menyediakan
          barang dan jasa sesuai kebutuhan proyek industri, konstruksi, dan engineering Anda.
        </p>
      </div>

      <div class="sticky top-20 z-20 -mx-4 px-4 py-3 mb-8 bg-background/95 backdrop-blur border-y">
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="group in catalogGroups"
            :key="group.id"
            type="button"
            :class="[
              'rounded-full px-4 py-2 text-sm font-medium border transition-colors',
              activeGroup === group.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground hover:text-foreground hover:border-primary/40',
            ]"
            @click="selectGroup(group.id)"
          >
            {{ group.title }}
          </button>
        </div>
      </div>

      <div class="mb-6">
        <p class="text-sm text-muted-foreground text-center">
          {{ catalogGroups.find(group => group.id === activeGroup)?.description }}
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <button
          v-for="product in productsByGroup(activeGroup)"
          :key="product.title"
          type="button"
          :class="[
            'text-left rounded-xl border p-5 transition-all duration-200',
            isProductActive(product)
              ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
              : 'bg-card hover:border-primary/30 hover:shadow-sm',
          ]"
          @click="selectProduct(product)"
        >
          <h3
            :class="[
              'font-bold text-sm uppercase tracking-wide mb-2',
              product.accent === 'secondary' ? 'text-secondary' : 'text-primary',
            ]"
          >
            {{ product.title }}
          </h3>
          <p class="text-sm text-muted-foreground leading-relaxed line-clamp-3">{{ product.description }}</p>
          <span class="inline-flex items-center gap-1 mt-3 text-xs font-medium text-primary">
            {{ product.detailSlug ? 'Lihat produk' : 'Info kategori' }}
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

      <div id="katalog-detail" class="scroll-mt-28 min-h-[120px]">
        <SectionsProductCategoryDetail
          v-if="activeDetail"
          :key="activeDetail.slug"
          :category="activeDetail"
        />

        <UiCard v-else-if="activeCatalogProduct" class="p-8 md:p-10 border shadow-sm">
          <UiBadge class="mb-4">{{ activeCatalogProduct.title }}</UiBadge>
          <h3 class="text-2xl font-bold tracking-tight mb-3">{{ activeCatalogProduct.title }}</h3>
          <p class="text-muted-foreground leading-relaxed max-w-3xl">{{ activeCatalogProduct.description }}</p>
          <p class="text-sm text-muted-foreground mt-4">
            Detail spesifik produk tersedia sesuai permintaan. Hubungi tim kami untuk katalog lengkap dan penawaran harga.
          </p>
          <NuxtLink to="/kontak" class="inline-block mt-6">
            <UiButton>Minta Penawaran</UiButton>
          </NuxtLink>
        </UiCard>

        <UiCard v-else class="p-8 md:p-10 border-dashed border-2 bg-muted/20 text-center">
          <p class="text-muted-foreground">
            Pilih salah satu kategori di atas untuk melihat detail produk.
          </p>
        </UiCard>
      </div>

      <div class="mt-14 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/85 p-8 md:p-12 text-center">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.3),transparent_60%)]" />
        <div class="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/5 blur-2xl" />
        <div class="relative">
          <h3 class="text-xl md:text-2xl font-bold text-primary-foreground">
            Butuh Produk Sesuai Kebutuhan?
          </h3>
          <p class="mt-3 text-primary-foreground/80 leading-relaxed max-w-xl mx-auto">
            Info lebih lanjut mengenai produk sesuai permintaan customer, hubungi melalui email dan kontak resmi kami.
          </p>
          <NuxtLink to="/kontak" class="inline-block mt-6">
            <UiButton size="lg" variant="secondary" class="font-semibold shadow-lg hover:shadow-xl transition-shadow">
              Hubungi Kami
              <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
