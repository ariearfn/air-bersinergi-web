<script setup lang="ts">
const { data: services } = await useFetch('/api/services', { key: 'services', default: () => [] })

const steps = [
  { icon: 'i-lucide-message-square-text', title: 'Konsultasi', text: 'Diskusikan kebutuhan, spesifikasi, dan lokasi pekerjaan bersama tim kami.' },
  { icon: 'i-lucide-clipboard-list', title: 'Survey & Penawaran', text: 'Kami melakukan survey bila diperlukan dan menyusun penawaran yang transparan.' },
  { icon: 'i-lucide-hard-hat', title: 'Pelaksanaan', text: 'Pekerjaan dan pengadaan dilaksanakan tenaga ahli dengan standar K3.' },
  { icon: 'i-lucide-clipboard-check', title: 'Serah Terima', text: 'Hasil pekerjaan diperiksa bersama dan diserahterimakan sesuai kesepakatan.' }
]

useSeoMeta({
  title: 'Layanan & Katalog — PT. Anugerah Insan Ridho Bersinergi',
  description: 'Jasa konstruksi, mekanikal, elektrikal, engineering, serta pengadaan mesin, material, dan peralatan K3 untuk industri.'
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Layanan"
      title="Jasa & Pengadaan Industri"
      description="Produk dan jasa sesuai bidang yang kami tekuni maupun kebutuhan spesifik customer — dari konstruksi hingga suplai peralatan."
      image="/portfolio/projects/air-compressor-piping-installation.webp"
    >
      <div class="mt-10 flex flex-wrap gap-3">
        <UButton to="#katalog" size="xl" color="secondary" trailing-icon="i-lucide-arrow-down">
          Lihat Katalog Produk
        </UButton>
        <UButton to="/kontak" size="xl" color="neutral" variant="outline" class="bg-white/5 text-white ring-white/30 backdrop-blur-sm hover:bg-white/15">
          Minta Penawaran
        </UButton>
      </div>
    </PageHero>

    <!-- Services -->
    <section class="py-24 md:py-32">
      <UContainer>
        <SectionHeading eyebrow="Bidang Keahlian" title="Apa yang Kami Kerjakan" />
        <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            v-for="(service, i) in services"
            :key="service.id"
            :index="i"
            :title="service.title"
            :description="service.description"
            :long-description="service.longDescription"
            :icon="service.icon"
            detailed
          />
        </div>
      </UContainer>
    </section>

    <!-- Process -->
    <section class="relative isolate overflow-hidden bg-ink-950 py-24 text-white md:py-32">
      <div class="absolute inset-0 -z-10 bg-blueprint" />
      <UContainer>
        <SectionHeading eyebrow="Alur Kerja" title="Dari Konsultasi hingga Serah Terima" dark />
        <ol class="mt-14 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          <li v-for="(s, i) in steps" :key="s.title" class="reveal relative bg-ink-950 p-8">
            <span class="font-display text-6xl leading-none font-bold text-white/10">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <UIcon :name="s.icon" class="mt-6 block size-8 text-signal-400" />
            <h3 class="mt-4 font-display text-2xl font-bold tracking-wide uppercase">
              {{ s.title }}
            </h3>
            <p class="mt-2 leading-relaxed text-slate-400">
              {{ s.text }}
            </p>
          </li>
        </ol>
      </UContainer>
    </section>

    <!-- Catalog -->
    <section id="katalog" class="scroll-mt-20 bg-slate-50 py-24 md:py-32">
      <UContainer>
        <SectionHeading
          eyebrow="Pengadaan"
          title="Katalog Produk"
          description="Mesin, material, dan perlengkapan K3 untuk operasional pabrik dan proyek konstruksi. Pilih kategori untuk melihat contoh produk."
        />
        <div class="mt-12">
          <ProductCatalog />
        </div>
      </UContainer>
    </section>

    <CtaBand />
  </div>
</template>
