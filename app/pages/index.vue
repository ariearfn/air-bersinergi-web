<script setup lang="ts">
import { categoryLabel, featuredPortfolioProjects } from '~/data/portfolio-sections'

const client = useSupabaseClient()

const { data: settings } = await useAsyncData('site-settings', async () => {
  const { data } = await client.from('site_settings').select('*').single()
  return data
})

const { data: services } = await useAsyncData('services', async () => {
  const { data } = await client.from('services').select('*').eq('is_visible', true).order('sort_order')
  return data || []
})

const { data: content } = await useAsyncData('site-content', async () => {
  const { data } = await client.from('site_content').select('*').eq('is_visible', true).order('sort_order')
  return data || []
})

const heroContent = computed(() => content.value?.find((c: any) => c.section === 'hero'))
const aboutContent = computed(() => content.value?.find((c: any) => c.section === 'about'))

const clients = [
  { name: 'Combiphar', logo: '/clients/combiphar.png' },
  { name: 'KAI Services', logo: '/clients/kai-services.png' },
  { name: 'Meditap', logo: '/clients/meditap.png' },
  { name: 'Mbiz', logo: '/clients/mbiz.png' },
  { name: 'NHTS', logo: '/clients/nhts.png' },
  { name: 'DDT', logo: '/clients/ddt.png' },
  { name: 'Revass', logo: '/clients/revass.png' },
  { name: 'Adhi', logo: '/clients/adhi.png' },
  { name: 'Kaho', logo: '/clients/kaho.png' },
  { name: 'AM/NS Indonesia', logo: '/clients/amns-indonesia.png' },
  { name: 'Tekpak Indonesia', logo: '/clients/tekpak.png' },
  { name: 'Multifacade', logo: '/clients/multifacade.png' },
  { name: 'HK', logo: '/clients/hk.png' },
  { name: 'SPU', logo: '/clients/spu.png' },
  { name: 'Total Bangun Persada', logo: '/clients/total-bangun-persada.png' },
  { name: 'Shin Sam-Plus', logo: '/clients/shin-sam-plus.png' },
  { name: 'Angkasa Bumi Cemerlang', logo: '/clients/angkasa-bumi.png' },
  { name: 'Busana Apparel Group', logo: '/clients/busana-apparel.png' },
  { name: 'Sika', logo: '/clients/sika.png' },
  { name: 'PT. Inti Polymeta', logo: '/clients/inti-polymeta.png' },
  { name: 'Unilever', logo: '/clients/unilever.png' },
  { name: 'PT. Karya Inti Karton', logo: '/clients/karya-inti-karton.png' },
]

useSeoMeta({
  title: settings.value?.site_name || 'PT. Air Bersinergi',
  description: settings.value?.site_description,
})

useHead({
  link: [
    { rel: 'preload', as: 'image', href: '/hero-hd.jpg', fetchpriority: 'high' },
  ],
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[80vh] lg:min-h-[92vh] flex items-center text-primary-foreground overflow-hidden isolate">
      <img
        src="/hero-hd.jpg"
        alt="Kompleks industri dengan perpipaan dan infrastruktur pabrik"
        class="absolute inset-0 h-full w-full object-cover object-[center_42%] scale-105 saturate-[0.85] contrast-[1.05]"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-black/25" />
      <div class="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/30" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      <div class="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />

      <div class="container relative z-10 py-24 lg:py-32">
        <div class="max-w-3xl">
          <UiBadge variant="secondary" class="mb-5 shadow-lg">General Contractor & Supplier</UiBadge>
          <h1 class="text-4xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 drop-shadow-md">
            {{ heroContent?.title || 'Solusi Terpercaya untuk Kebutuhan Industri Anda' }}
          </h1>
          <p class="text-lg lg:text-xl text-primary-foreground/95 mb-9 leading-relaxed max-w-2xl drop-shadow-sm">
            {{ heroContent?.subtitle || 'PT. Anugerah Insan Ridho Bersinergi bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanikal, elektrikal, dan engineering.' }}
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/kontak">
              <UiButton size="lg" variant="secondary" class="shadow-lg">Hubungi Kami</UiButton>
            </NuxtLink>
            <NuxtLink to="/layanan">
              <UiButton size="lg" variant="ghost" class="border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white">
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
          <SectionsAboutHighlights />
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
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          <SectionsServiceExpertiseCard
            v-for="(service, index) in services"
            :key="service.id"
            :service="service"
            :index="index"
          />
        </div>
        <div class="text-center mt-8">
          <NuxtLink to="/layanan">
            <UiButton variant="outline">Lihat Semua Layanan</UiButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <SectionsProductCatalog />

    <!-- Portfolio -->
    <section class="py-20 bg-muted/30">
      <div class="container">
        <div class="text-center mb-12">
          <UiBadge class="mb-4">Portofolio</UiBadge>
          <h2 class="text-3xl md:text-4xl font-bold">Proyek Terbaru</h2>
          <p class="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Dokumentasi pekerjaan proyek, service, dan pengadaan yang telah kami kerjakan
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 scroll-fade-stagger">
          <NuxtLink
            v-for="project in featuredPortfolioProjects"
            :key="`${project.slug}-${project.title}`"
            :to="`/portofolio#${project.slug}`"
            class="group block rounded-2xl border bg-card shadow-md ring-1 ring-border/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 hover:ring-primary/25"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                :src="project.image"
                :alt="project.alt"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <UiBadge
                :class="project.category === 'service' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'"
                class="absolute top-3 left-3 shadow-md"
              >
                {{ categoryLabel(project.category) }}
              </UiBadge>
              <div class="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <h3 class="text-white font-semibold text-sm md:text-base leading-snug line-clamp-2">
                  {{ project.title }}
                </h3>
                <div
                  :class="project.category === 'service' ? 'bg-secondary' : 'bg-primary'"
                  class="mt-3 h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-14"
                />
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-10">
          <NuxtLink to="/portofolio">
            <UiButton size="lg" variant="outline">Lihat Semua Proyek</UiButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Clients -->
    <section class="py-14 md:py-16 bg-background overflow-hidden">
      <div class="container">
        <div class="text-center mb-8 md:mb-10">
          <UiBadge class="mb-4">Klien Kami</UiBadge>
          <h2 class="text-3xl font-bold">Dipercaya Oleh</h2>
          <p class="text-muted-foreground mt-2">Perusahaan-perusahaan yang telah bekerja sama dengan kami</p>
        </div>
        <SectionsClientLogoMarquee :clients="clients" />
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
