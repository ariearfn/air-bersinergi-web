<script setup lang="ts">
import { catalogGroups, productsByGroup } from '~/data/catalog-products'

const route = useRoute()

function productLink(slug?: string) {
  if (!slug) return null
  return route.path === '/layanan' ? `#${slug}` : `/layanan#${slug}`
}
</script>

<template>
  <section class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.06),transparent_50%)]" />

    <div class="container relative">
      <div class="max-w-3xl mx-auto text-center mb-14">
        <UiBadge class="mb-4">Katalog Produk</UiBadge>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight">Product Catalog</h2>
        <p class="text-muted-foreground mt-4 leading-relaxed">
          PT. Anugerah Insan Ridho Bersinergi sebagai General Contractor and Supplier yang bergerak
          dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanik, elektrik,
          dan engineering. Kami siap memberikan produk dan jasa sesuai bidang yang kami tekuni
          maupun kebutuhan customer.
        </p>
      </div>

      <div class="space-y-12">
        <div v-for="group in catalogGroups" :key="group.id">
          <p class="text-sm font-semibold uppercase tracking-wide text-primary mb-1">{{ group.title }}</p>
          <p class="text-sm text-muted-foreground mb-5">{{ group.description }}</p>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <UiCard
              v-for="product in productsByGroup(group.id)"
              :key="product.title"
              class="group relative p-6 border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div
                :class="[
                  'absolute top-0 left-0 w-1 h-full transition-all duration-300 group-hover:w-1.5',
                  product.accent === 'secondary' ? 'bg-secondary' : 'bg-primary',
                ]"
              />
              <div class="pl-3">
                <div class="flex items-start justify-between gap-3 mb-3">
                  <h3
                    :class="[
                      'font-bold text-base uppercase tracking-wide',
                      product.accent === 'secondary' ? 'text-secondary' : 'text-primary',
                    ]"
                  >
                    {{ product.title }}
                  </h3>
                  <div
                    :class="[
                      'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                      product.accent === 'secondary'
                        ? 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground'
                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-muted-foreground leading-relaxed">{{ product.description }}</p>
                <NuxtLink
                  v-if="product.detailSlug && productLink(product.detailSlug)"
                  :to="productLink(product.detailSlug)!"
                  class="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:underline"
                >
                  Lihat detail produk
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </UiCard>
          </div>
        </div>
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
