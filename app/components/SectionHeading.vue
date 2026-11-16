<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
}>(), {
  align: 'left'
})
</script>

<template>
  <div class="reveal" :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
    <div class="flex items-center gap-3" :class="align === 'center' && 'justify-center'">
      <span class="h-0.5 w-8 bg-secondary" />
      <p
        class="font-display text-sm font-semibold tracking-[0.25em] uppercase"
        :class="dark ? 'text-white/70' : 'text-primary'"
      >
        {{ eyebrow }}
      </p>
      <span v-if="align === 'center'" class="h-0.5 w-8 bg-secondary" />
    </div>
    <h2
      class="mt-4 font-display text-4xl leading-none font-bold tracking-tight uppercase md:text-5xl"
      :class="dark ? 'text-white' : 'text-slate-900'"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-5 text-lg leading-relaxed"
      :class="dark ? 'text-slate-300' : 'text-slate-600'"
    >
      {{ description }}
    </p>
  </div>
</template>
