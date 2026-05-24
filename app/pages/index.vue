<script setup lang="ts">
const client = useSupabaseClient()

const { data: settings } = await useAsyncData('site-settings', async () => {
  const { data } = await client.from('site_settings').select('*').single()
  return data
})

const { data: services } = await useAsyncData('services', async () => {
  const { data } = await client.from('services').select('*').eq('is_visible', true).order('sort_order')
  return data || []
})

const { data: portfolio } = await useAsyncData('portfolio-featured', async () => {
  const { data } = await client.from('portfolio').select('*').eq('is_visible', true).eq('is_featured', true).order('sort_order').limit(6)
  return data || []
})

const { data: content } = await useAsyncData('site-content', async () => {
  const { data } = await client.from('site_content').select('*').eq('is_visible', true).order('sort_order')
  return data || []
})

const heroContent = computed(() => content.value?.find((c: any) => c.section === 'hero'))
const aboutContent = computed(() => content.value?.find((c: any) => c.section === 'about'))

useSeoMeta({
  title: settings.value?.site_name || 'PT. Air Bersinergi',
  description: settings.value?.site_description,
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary/95 to-primary text-primary-foreground py-24 lg:py-32">
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div class="container relative">
        <div class="max-w-3xl">
          <UiBadge variant="secondary" class="mb-4">General Contractor & Supplier</UiBadge>
          <h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            {{ heroContent?.title || 'Solusi Terpercaya untuk Kebutuhan Industri Anda' }}
          </h1>
          <p class="text-lg lg:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
            {{ heroContent?.subtitle || 'PT. Anugerah Insan Ridho Bersinergi bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanikal, elektrikal, dan engineering.' }}
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/kontak">
              <UiButton size="lg" variant="secondary">Hubungi Kami</UiButton>
            </NuxtLink>
            <NuxtLink to="/layanan">
              <UiButton size="lg" variant="outline" class="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Lihat Layanan
              </UiButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 border-b">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p class="text-3xl font-bold text-primary">17+</p>
            <p class="text-sm text-muted-foreground mt-1">Proyek Selesai</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary">6+</p>
            <p class="text-sm text-muted-foreground mt-1">Bidang Keahlian</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary">10+</p>
            <p class="text-sm text-muted-foreground mt-1">Klien Puas</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary">100%</p>
            <p class="text-sm text-muted-foreground mt-1">Komitmen K3</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Preview -->
    <section class="py-20">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <UiBadge class="mb-4">Tentang Kami</UiBadge>
            <h2 class="text-3xl font-bold mb-4">{{ aboutContent?.title || 'Perusahaan yang Produktif, Tangguh dan Terpercaya' }}</h2>
            <p class="text-muted-foreground leading-relaxed mb-6">
              {{ aboutContent?.body || 'PT. Anugerah Insan Ridho Bersinergi merupakan perusahaan General Contractor and Supplier yang bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanikal, elektrikal, dan engineering.' }}
            </p>
            <NuxtLink to="/tentang-kami">
              <UiButton variant="outline">Selengkapnya</UiButton>
            </NuxtLink>
          </div>
          <div class="bg-muted rounded-2xl p-8 space-y-4">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">Kualitas Terjamin</h4>
                <p class="text-sm text-muted-foreground">Komitmen kuat menghasilkan produk berkualitas</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">Keselamatan Kerja</h4>
                <p class="text-sm text-muted-foreground">Mengedepankan K3 di setiap proyek</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">Tim Profesional</h4>
                <p class="text-sm text-muted-foreground">Tenaga kerja terampil, cermat dan santun</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-20 bg-muted/50">
      <div class="container">
        <div class="text-center mb-12">
          <UiBadge class="mb-4">Layanan Kami</UiBadge>
          <h2 class="text-3xl font-bold">Bidang Keahlian</h2>
          <p class="text-muted-foreground mt-2 max-w-2xl mx-auto">Kami siap memberikan produk dan jasa berdasarkan bidang yang kami tekuni</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard v-for="service in services" :key="service.id" class="p-6 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="font-semibold text-lg mb-2">{{ service.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ service.description }}</p>
          </UiCard>
        </div>
        <div class="text-center mt-8">
          <NuxtLink to="/layanan">
            <UiButton variant="outline">Lihat Semua Layanan</UiButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Portfolio -->
    <section class="py-20">
      <div class="container">
        <div class="text-center mb-12">
          <UiBadge class="mb-4">Portofolio</UiBadge>
          <h2 class="text-3xl font-bold">Proyek Terbaru</h2>
          <p class="text-muted-foreground mt-2">Beberapa proyek yang sudah kami kerjakan</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard v-for="project in portfolio" :key="project.id" class="overflow-hidden group">
            <div class="aspect-video bg-muted relative overflow-hidden">
              <img
                v-if="project.cover_image"
                :src="project.cover_image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-muted-foreground">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold mb-1">{{ project.title }}</h3>
              <p v-if="project.client_name" class="text-sm text-muted-foreground">{{ project.client_name }}</p>
            </div>
          </UiCard>
        </div>
        <div class="text-center mt-8">
          <NuxtLink to="/portofolio">
            <UiButton variant="outline">Lihat Semua Proyek</UiButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-primary text-primary-foreground">
      <div class="container text-center">
        <h2 class="text-3xl font-bold mb-4">Siap Bekerja Sama?</h2>
        <p class="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Hubungi kami untuk konsultasi dan penawaran terbaik untuk kebutuhan proyek Anda
        </p>
        <NuxtLink to="/kontak">
          <UiButton size="lg" variant="secondary">Hubungi Kami Sekarang</UiButton>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
