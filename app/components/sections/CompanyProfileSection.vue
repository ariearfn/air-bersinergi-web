<script setup lang="ts">
const companyFacts = [
  {
    label: 'Nama Perusahaan',
    value: 'PT. Anugerah Insan Ridho Bersinergi',
    accent: 'primary' as const,
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    label: 'Akta Notaris',
    value: '6 / 3 Juni 2024',
    accent: 'secondary' as const,
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    label: 'NPWP',
    value: '206691917470000',
    accent: 'primary' as const,
    icon: 'M9 14l6-6m-5.5.5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2v-5.5M9 9h.01',
  },
  {
    label: 'Bidang Usaha',
    value: 'Industry, Construction, Mechanical, Electrical, Safety, Engineering',
    accent: 'secondary' as const,
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
]

const businessAreas = [
  'Industry',
  'Construction',
  'Mechanical',
  'Electrical',
  'Safety',
  'Engineering',
]
</script>

<template>
  <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
    <div>
      <UiBadge variant="outline" class="mb-4">Profil</UiBadge>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Profil Perusahaan
      </h2>
      <div class="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-primary to-secondary" />
      <p class="mt-6 text-muted-foreground leading-relaxed">
        PT. Anugerah Insan Ridho Bersinergi merupakan perusahaan General Contractor and Supplier yang bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanikal, elektrikal, dan engineering.
      </p>
      <p class="mt-4 text-muted-foreground leading-relaxed">
        Perusahaan kami menawarkan kerja sama dengan berbagai perusahaan nasional, dan instansi pemerintah berdasarkan bidang keahlian perusahaan.
      </p>
      <div class="mt-8 flex flex-wrap gap-2">
        <span
          v-for="area in businessAreas"
          :key="area"
          class="inline-flex rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
        >
          {{ area }}
        </span>
      </div>
    </div>

    <div class="space-y-3">
      <div
        v-for="fact in companyFacts"
        :key="fact.label"
        class="group flex items-start gap-4 rounded-xl border border-border/50 bg-card px-5 py-4 transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
      >
        <div
          :class="[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
            fact.accent === 'secondary'
              ? 'bg-secondary/10 text-secondary'
              : 'bg-primary/10 text-primary',
          ]"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="fact.icon" />
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            {{ fact.label }}
          </p>
          <p class="mt-0.5 text-sm font-medium text-foreground">
            {{ fact.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
