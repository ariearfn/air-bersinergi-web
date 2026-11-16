<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
  image?: string
}>()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-ink-950 pt-36 pb-20 text-white md:pt-44 md:pb-28">
    <img
      v-if="image"
      :src="image"
      alt=""
      class="absolute inset-0 -z-20 size-full object-cover opacity-35 grayscale"
    >
    <div class="absolute inset-0 -z-10 bg-linear-to-r from-ink-950 via-ink-950/90 to-ink-950/40" />
    <div class="absolute inset-0 -z-10 bg-blueprint" />

    <UContainer>
      <div class="flex items-center gap-3">
        <span class="h-0.5 w-10 bg-secondary" />
        <p class="font-display text-sm font-semibold tracking-[0.25em] text-white/80 uppercase">
          {{ eyebrow }}
        </p>
      </div>
      <h1 class="mt-5 max-w-4xl font-display text-5xl leading-[0.95] font-bold tracking-tight uppercase md:text-7xl">
        {{ title }}
      </h1>
      <p v-if="description" class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
        {{ description }}
      </p>
      <slot />
    </UContainer>

    <div class="absolute right-0 bottom-0 left-0 h-1.5 bg-hazard opacity-70" />
  </section>
</template>
