<script setup lang="ts">
const client = useSupabaseClient()

const { data: services } = await useAsyncData('all-services', async () => {
  const { data } = await client.from('services').select('*').eq('is_visible', true).order('sort_order')
  return data || []
})

useSeoMeta({
  title: 'Layanan - PT. Air Bersinergi',
  description: 'Layanan dan produk kami di bidang industri, kontruksi, mekanikal, elektrikal, dan engineering',
})
</script>

<template>
  <div>
    <section class="bg-gradient-to-br from-primary/95 to-primary text-primary-foreground py-16">
      <div class="container">
        <UiBadge variant="secondary" class="mb-4">Layanan & Produk</UiBadge>
        <h1 class="text-4xl font-bold">Katalog Layanan</h1>
        <p class="text-primary-foreground/80 mt-2 max-w-2xl">
          Kami siap memberikan produk dan jasa berdasarkan bidang yang kami tekuni maupun sesuai kebutuhan customer
        </p>
      </div>
    </section>

    <section class="py-16">
      <div class="container">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard v-for="service in services" :key="service.id" class="p-6 hover:shadow-lg transition-shadow">
            <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ service.title }}</h3>
            <p class="text-muted-foreground text-sm leading-relaxed mb-4">{{ service.description }}</p>
            <p v-if="service.long_description" class="text-muted-foreground text-sm leading-relaxed">{{ service.long_description }}</p>
          </UiCard>
        </div>

        <div v-if="!services || services.length === 0" class="text-center py-12">
          <p class="text-muted-foreground">Belum ada layanan yang ditampilkan.</p>
        </div>
      </div>
    </section>

    <SectionsProductDetailsExplorer />
  </div>
</template>
