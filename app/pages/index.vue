<script setup lang="ts">
const { settings, content } = useSite()
const hero = computed(() => content.value.hero)
const about = computed(() => content.value.about)

const [{ data: services }, { data: groups }, { data: products }] = await Promise.all([
  useFetch('/api/services', { key: 'services', default: () => [] }),
  useFetch('/api/portfolio', { key: 'portfolio', default: () => [] }),
  useFetch('/api/products', { key: 'products', default: () => [] })
])

const featured = computed(() =>
  groups.value
    .flatMap(g => g.photos.filter(p => p.isFeatured).map(p => ({ ...p, category: g.category, slug: g.slug })))
    .slice(0, 5)
)

const projectCount = computed(() => groups.value.reduce((n, g) => n + g.photos.length, 0))

const stats = computed(() => [
  { value: `${projectCount.value}+`, label: 'Proyek & Pekerjaan' },
  { value: `${services.value.length}`, label: 'Bidang Keahlian' },
  { value: '20+', label: 'Klien Korporat' },
  { value: '100%', label: 'Komitmen K3' }
])

const highlights = [
  { icon: 'i-lucide-badge-check', title: 'Kualitas Terjamin', text: 'Produk dan pekerjaan sesuai spesifikasi dan standar industri.' },
  { icon: 'i-lucide-hard-hat', title: 'Mengutamakan K3', text: 'Keselamatan dan kesehatan kerja di setiap lokasi proyek.' },
  { icon: 'i-lucide-users', title: 'Tim Profesional', text: 'Tenaga ahli yang terampil, cermat, dan berpengalaman.' }
]

const productGroups = computed(() =>
  (Object.keys(productGroupLabels) as ProductGroup[]).map(group => ({
    group,
    label: productGroupLabels[group],
    titles: products.value.filter(p => p.group === group).map(p => p.title)
  }))
)

const aboutPhotos = computed(() =>
  groups.value
    .filter(g => g.category === 'project')
    .flatMap(g => g.photos)
    .filter(p => p.caption && !p.isFeatured)
    .slice(0, 2)
)

useSeoMeta({
  title: () => settings.value?.siteName ?? 'PT. Anugerah Insan Ridho Bersinergi',
  description: () => settings.value?.siteDescription ?? undefined
})

useHead({
  link: [{ rel: 'preload', as: 'image', href: '/hero-hd.jpg', fetchpriority: 'high' }]
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative isolate flex min-h-svh items-end overflow-hidden bg-ink-950 text-white">
      <img
        src="/hero-hd.jpg"
        alt="Kompleks industri dengan perpipaan dan infrastruktur pabrik"
        class="absolute inset-0 -z-20 size-full object-cover object-[center_40%]"
        fetchpriority="high"
      >
      <div class="absolute inset-0 -z-10 bg-linear-to-r from-ink-950 via-ink-950/85 to-ink-950/20" />
      <div class="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-transparent to-ink-950/60" />
      <div class="absolute inset-0 -z-10 bg-blueprint opacity-60" />

      <UContainer class="w-full pt-40 pb-12 md:pb-16">
        <div class="max-w-4xl">
          <div class="flex items-center gap-3">
            <span class="h-0.5 w-10 bg-secondary" />
            <p class="font-display text-sm font-semibold tracking-[0.3em] text-white/80 uppercase">
              General Contractor & Supplier
            </p>
          </div>
          <h1 class="mt-6 font-display text-5xl leading-[0.92] font-bold tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl">
            {{ hero?.title || 'Solusi Terpercaya untuk Kebutuhan Industri Anda' }}
          </h1>
          <p class="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            {{ hero?.subtitle }}
          </p>
          <div class="mt-10 flex flex-wrap gap-3">
            <UButton to="/kontak" color="secondary" size="xl" trailing-icon="i-lucide-arrow-right">
              Minta Penawaran
            </UButton>
            <UButton
              to="/portofolio"
              size="xl"
              color="neutral"
              variant="outline"
              class="bg-white/5 text-white ring-white/30 backdrop-blur-sm hover:bg-white/15"
            >
              Lihat Proyek
            </UButton>
          </div>
        </div>

        <dl class="mt-16 grid grid-cols-2 border-t border-white/15 md:mt-24 md:grid-cols-4">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="py-6 pr-4 md:py-8"
            :class="i > 0 && 'md:border-l md:border-white/15 md:pl-8'"
          >
            <dt class="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              {{ stat.label }}
            </dt>
            <dd class="mt-2 font-display text-4xl font-bold md:text-5xl">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </UContainer>
    </section>

    <!-- About -->
    <section class="py-24 md:py-32">
      <UContainer class="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow="Tentang Kami" :title="about?.title || 'Perusahaan yang Produktif, Tangguh dan Terpercaya'" />
          <p class="reveal mt-6 text-lg leading-relaxed text-slate-600">
            {{ about?.body }}
          </p>
          <ul class="mt-10 space-y-6">
            <li v-for="h in highlights" :key="h.title" class="reveal flex gap-5">
              <span class="flex size-12 shrink-0 items-center justify-center border-2 border-primary text-primary">
                <UIcon :name="h.icon" class="size-6" />
              </span>
              <div>
                <p class="font-display text-xl font-bold tracking-wide text-slate-900 uppercase">
                  {{ h.title }}
                </p>
                <p class="mt-1 text-slate-600">
                  {{ h.text }}
                </p>
              </div>
            </li>
          </ul>
          <UButton to="/tentang-kami" variant="link" class="reveal mt-8 px-0 text-base" trailing-icon="i-lucide-arrow-right">
            Selengkapnya tentang kami
          </UButton>
        </div>

        <div class="reveal relative grid grid-cols-2 gap-4">
          <img
            v-for="(photo, i) in aboutPhotos"
            :key="photo.id"
            :src="photo.imageUrl"
            :alt="photo.alt || ''"
            loading="lazy"
            class="aspect-[3/4] w-full object-cover"
            :class="i === 1 && 'mt-16'"
          >
          <div class="absolute -bottom-6 left-6 bg-secondary px-6 py-5 text-white shadow-xl md:left-10">
            <p class="font-display text-4xl leading-none font-bold">
              6
            </p>
            <p class="mt-1 text-xs font-semibold tracking-widest uppercase">
              Bidang usaha terintegrasi
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Services -->
    <section class="bg-slate-50 py-24 md:py-32">
      <UContainer>
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Layanan Kami"
            title="Bidang Keahlian"
            description="Produk dan jasa sesuai bidang yang kami tekuni maupun kebutuhan spesifik customer."
          />
          <UButton to="/layanan" variant="outline" trailing-icon="i-lucide-arrow-right" class="reveal shrink-0">
            Semua Layanan
          </UButton>
        </div>
        <div class="mt-12 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            v-for="(service, i) in services"
            :key="service.id"
            :index="i"
            :title="service.title"
            :description="service.description"
            :icon="service.icon"
            class="border-0"
          />
        </div>
      </UContainer>
    </section>

    <!-- Products -->
    <section class="relative isolate overflow-hidden bg-ink-950 py-24 text-white md:py-32">
      <div class="absolute inset-0 -z-10 bg-blueprint" />
      <UContainer>
        <SectionHeading
          eyebrow="Pengadaan"
          title="Katalog Produk"
          description="Mesin, material, dan perlengkapan K3 untuk operasional pabrik dan proyek konstruksi."
          dark
        />
        <div class="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
          <NuxtLink
            v-for="(g, i) in productGroups"
            :key="g.group"
            :to="`/layanan#katalog`"
            class="reveal group flex flex-col bg-ink-950 p-8 transition-colors hover:bg-primary"
          >
            <span class="font-display text-sm font-semibold tracking-widest text-secondary group-hover:text-white">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <h3 class="mt-4 font-display text-3xl leading-none font-bold uppercase">
              {{ g.label }}
            </h3>
            <ul class="mt-6 space-y-2 text-sm text-slate-400 group-hover:text-cobalt-100">
              <li v-for="t in g.titles" :key="t" class="flex items-center gap-2">
                <UIcon name="i-lucide-chevron-right" class="size-3.5 text-secondary group-hover:text-white" />
                {{ t }}
              </li>
            </ul>
            <span class="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold">
              Lihat katalog
              <UIcon name="i-lucide-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- Featured projects -->
    <section class="py-24 md:py-32">
      <UContainer>
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Portofolio"
            title="Proyek Terbaru"
            description="Dokumentasi pekerjaan proyek, service, dan pengadaan yang telah kami selesaikan."
          />
          <UButton to="/portofolio" variant="outline" trailing-icon="i-lucide-arrow-right" class="reveal shrink-0">
            Semua Proyek
          </UButton>
        </div>
        <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="(project, i) in featured"
            :key="project.id"
            to="/portofolio"
            class="reveal group relative block overflow-hidden bg-slate-200"
            :class="i === 0 ? 'aspect-square sm:col-span-2 sm:aspect-[2/1] lg:row-span-2 lg:aspect-auto' : 'aspect-square'"
          >
            <img
              :src="project.imageUrl"
              :alt="project.alt || project.caption || ''"
              loading="lazy"
              class="size-full object-cover transition-transform duration-700 group-hover:scale-110"
            >
            <div class="absolute inset-0 bg-linear-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <span class="bg-secondary px-2 py-0.5 font-display text-xs font-semibold tracking-widest text-white uppercase">
                {{ portfolioCategoryLabels[project.category] }}
              </span>
              <h3
                class="mt-3 font-display leading-tight font-bold text-white uppercase"
                :class="i === 0 ? 'text-2xl md:text-4xl' : 'text-lg'"
              >
                {{ project.caption || project.alt }}
              </h3>
            </div>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- Clients -->
    <section class="border-t border-slate-200 bg-white py-20">
      <UContainer>
        <SectionHeading eyebrow="Klien Kami" title="Dipercaya Oleh" align="center" />
      </UContainer>
      <div class="mt-12">
        <ClientMarquee />
      </div>
    </section>

    <CtaBand />
  </div>
</template>
