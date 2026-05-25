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
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <SectionsServiceExpertiseCard
            v-for="(service, index) in services"
            :key="service.id"
            :service="service"
            :index="index"
            detailed
          />
        </div>

        <div v-if="!services || services.length === 0" class="text-center py-12">
          <p class="text-muted-foreground">Belum ada layanan yang ditampilkan.</p>
        </div>
      </div>
    </section>

    <SectionsProductDetailsExplorer />
  </div>
</template>
