<script setup lang="ts">
import {
  imageCountByCategory,
  portfolioCategories,
  portfolioImageCount,
  portfolioIntro,
  sectionsByCategory,
} from '~/data/portfolio-sections'

const totalPhotos = portfolioImageCount()

const stats = [
  { label: 'Proyek', value: String(imageCountByCategory('project')) },
  { label: 'Service', value: String(imageCountByCategory('service')) },
  { label: 'Pengadaan', value: String(imageCountByCategory('pengadaan')) },
]

const activeCategory = ref<string | null>(null)

function scrollToCategory(categoryId: string) {
  activeCategory.value = categoryId
  document.getElementById(`portfolio-${categoryId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

useSeoMeta({
  title: 'Portofolio - PT. Air Bersinergi',
  description: 'Proyek, layanan service, dan pengadaan yang telah kami kerjakan di bidang konstruksi, industri, mekanikal, dan engineering',
})
</script>

<template>
  <div>
    <section class="relative bg-gradient-to-br from-primary/95 to-primary text-primary-foreground py-20 md:py-24 overflow-hidden">
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />
      <div class="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

      <div class="container relative">
        <div class="max-w-3xl">
          <UiBadge variant="secondary" class="mb-4">Portofolio</UiBadge>
          <h1 class="text-4xl md:text-5xl font-bold uppercase tracking-wide leading-tight">
            Portofolio Project
          </h1>
          <p class="text-primary-foreground/80 mt-4 text-lg leading-relaxed max-w-2xl">
            Dokumentasi pekerjaan proyek, layanan service, dan pengadaan material untuk industri dan konstruksi.
          </p>
        </div>

        <div class="mt-10 grid grid-cols-3 gap-4 max-w-xl">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-xl border border-white/15 bg-white/10 backdrop-blur px-4 py-3 text-center"
          >
            <p class="text-2xl md:text-3xl font-bold">{{ stat.value }}</p>
            <p class="text-xs md:text-sm text-primary-foreground/75 mt-1">{{ stat.label }}</p>
          </div>
        </div>
        <p class="text-sm text-primary-foreground/70 mt-3 max-w-xl">
          Total {{ totalPhotos }}+ foto dokumentasi
        </p>
      </div>
    </section>

    <section class="py-12 md:py-16">
      <div class="container max-w-6xl">
        <UiCard class="p-6 md:p-8 border-0 shadow-md bg-gradient-to-br from-card to-muted/30 mb-10 md:mb-12">
          <div class="flex gap-4">
            <div class="hidden sm:block w-1 shrink-0 rounded-full bg-gradient-to-b from-primary to-secondary" />
            <div>
              <p class="text-muted-foreground leading-relaxed text-justify md:text-left">
                <span class="font-semibold text-foreground">PT. Anugerah Insan Ridho Bersinergi</span>
                sebagai perusahaan
                <span class="font-medium text-secondary">General Contractor and Supplier</span>
                yang bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanik, elektrik, dan engineering.
                Maka kami siap memberikan produk dan jasa berdasarkan dengan bidang yang kami tekuni maupun sesuai kebutuhan customer.
              </p>
              <p class="mt-5 text-base font-semibold text-foreground flex items-center gap-2">
                <span class="inline-block w-2 h-2 rounded-full bg-secondary" />
                {{ portfolioIntro.lead }}
              </p>
            </div>
          </div>
        </UiCard>

        <div class="sticky top-20 z-20 -mx-4 px-4 py-3 mb-8 md:mb-10 bg-background/95 backdrop-blur border-y">
          <div class="flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="category in portfolioCategories"
              :key="category.id"
              type="button"
              :class="[
                'shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold border transition-colors',
                category.accent === 'secondary'
                  ? activeCategory === category.id
                    ? 'bg-secondary text-secondary-foreground border-secondary'
                    : 'bg-background text-muted-foreground hover:text-secondary hover:border-secondary/40'
                  : activeCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground hover:text-primary hover:border-primary/40',
              ]"
              @click="scrollToCategory(category.id)"
            >
              {{ category.title }}
            </button>
          </div>
        </div>

        <div class="space-y-16 md:space-y-20">
          <SectionsPortfolioGroup
            v-for="category in portfolioCategories"
            :key="category.id"
            :category="category"
            :sections="sectionsByCategory(category.id)"
          />
        </div>
      </div>
    </section>

    <section class="py-14 md:py-16 bg-primary text-primary-foreground">
      <div class="container max-w-4xl text-center">
        <h2 class="text-2xl md:text-3xl font-bold">Butuh Mitra untuk Proyek Berikutnya?</h2>
        <p class="text-primary-foreground/80 mt-3 leading-relaxed">
          Konsultasikan kebutuhan proyek, service maintenance, atau pengadaan material dengan tim kami.
        </p>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <NuxtLink to="/kontak">
            <UiButton size="lg" variant="secondary">Hubungi Kami</UiButton>
          </NuxtLink>
          <NuxtLink to="/layanan">
            <UiButton size="lg" variant="ghost" class="border border-white/30 text-white hover:bg-white/10 hover:text-white">
              Lihat Layanan
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
