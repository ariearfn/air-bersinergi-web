<script setup lang="ts">
defineProps<{
  index: number
  title: string
  description?: string | null
  longDescription?: string | null
  icon?: string | null
  detailed?: boolean
}>()
</script>

<template>
  <article class="reveal group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/10">
    <span class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />

    <div class="flex items-start justify-between">
      <span class="flex size-14 items-center justify-center bg-primary text-white transition-colors group-hover:bg-secondary">
        <UIcon :name="icon || 'i-lucide-wrench'" class="size-7" />
      </span>
      <span class="font-display text-5xl leading-none font-bold text-slate-300 transition-colors group-hover:text-primary/40">
        {{ String(index + 1).padStart(2, '0') }}
      </span>
    </div>

    <h3 class="mt-6 font-display text-2xl font-bold tracking-wide text-slate-900 uppercase">
      {{ title }}
    </h3>
    <p v-if="description" class="mt-2 font-medium text-slate-700">
      {{ description }}
    </p>
    <p v-if="detailed && longDescription" class="mt-3 text-sm leading-relaxed text-slate-500">
      {{ longDescription }}
    </p>
  </article>
</template>
