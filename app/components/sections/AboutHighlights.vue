<script setup lang="ts">
const highlights = [
  {
    title: 'Kualitas Terjamin',
    description: 'Komitmen kuat menghasilkan produk berkualitas',
    accent: 'primary' as const,
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Keselamatan Kerja',
    description: 'Mengedepankan K3 di setiap proyek',
    accent: 'secondary' as const,
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Tim Profesional',
    description: 'Tenaga kerja terampil, cermat dan santun',
    accent: 'primary' as const,
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
]
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl border bg-card shadow-md ring-1 ring-border/60"
  >
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-secondary" />

    <div class="relative p-6 md:p-8 space-y-3">
      <div
        v-for="(item, index) in highlights"
        :key="item.title"
        :class="[
          'group flex items-start gap-4 rounded-xl border bg-background/80 p-4 md:p-5 transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-md',
          item.accent === 'secondary' ? 'hover:border-secondary/25' : 'hover:border-primary/25',
        ]"
      >
        <div
          :class="[
            'relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 transition-transform duration-300 group-hover:scale-105',
            item.accent === 'secondary'
              ? 'bg-gradient-to-br from-secondary/15 to-secondary/5 text-secondary ring-secondary/15'
              : 'bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-primary/15',
          ]"
        >
          <span
            class="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="item.icon" />
          </svg>
        </div>

        <div class="min-w-0 pt-0.5">
          <h4
            :class="[
              'font-semibold text-base',
              item.accent === 'secondary' ? 'text-secondary' : 'text-primary',
            ]"
          >
            {{ item.title }}
          </h4>
          <p class="mt-1 text-sm text-muted-foreground leading-relaxed">
            {{ item.description }}
          </p>
          <div
            :class="[
              'mt-3 h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-14',
              item.accent === 'secondary' ? 'bg-secondary' : 'bg-primary',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
