<script setup lang="ts">
export interface ServiceItem {
  id: string
  title: string
  description: string
  long_description?: string | null
}

const props = withDefaults(defineProps<{
  service: ServiceItem
  index?: number
  detailed?: boolean
}>(), {
  index: 0,
  detailed: false,
})

const useSecondary = computed(() => props.index % 2 === 1)

const iconPaths = [
  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'M13 10V3L4 14h7v7l9-11h-7z',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
]

const iconPath = computed(() => iconPaths[props.index % iconPaths.length])
</script>

<template>
  <article
    :class="[
      'group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300',
      'hover:-translate-y-1.5 hover:shadow-xl',
      useSecondary ? 'hover:border-secondary/30' : 'hover:border-primary/30',
      detailed ? 'p-6 md:p-8' : 'p-6 md:p-7',
    ]"
  >
    <div
      :class="[
        'absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100',
        useSecondary
          ? 'bg-gradient-to-r from-secondary via-secondary/70 to-primary'
          : 'bg-gradient-to-r from-primary via-primary/70 to-secondary',
      ]"
    />

    <div
      :class="[
        'absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-60 transition-opacity duration-300 group-hover:opacity-100',
        useSecondary ? 'bg-secondary/5' : 'bg-primary/5',
      ]"
    />

    <div class="relative">
      <div
        :class="[
          'mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ring-1 transition-transform duration-300 group-hover:scale-105',
          useSecondary
            ? 'bg-gradient-to-br from-secondary/15 to-secondary/5 text-secondary ring-secondary/15'
            : 'bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-primary/15',
        ]"
      >
        <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="iconPath" />
        </svg>
      </div>

      <h3
        :class="[
          'font-bold tracking-tight',
          detailed ? 'text-xl mb-3' : 'text-lg mb-2',
          useSecondary ? 'text-secondary' : 'text-primary',
        ]"
      >
        {{ service.title }}
      </h3>

      <p class="text-sm text-muted-foreground leading-relaxed">
        {{ service.description }}
      </p>

      <p
        v-if="detailed && service.long_description"
        class="mt-3 text-sm text-muted-foreground leading-relaxed border-t pt-3"
      >
        {{ service.long_description }}
      </p>

      <div
        :class="[
          'mt-5 h-0.5 w-10 rounded-full transition-all duration-500 group-hover:w-16',
          useSecondary ? 'bg-secondary' : 'bg-primary',
        ]"
      />
    </div>
  </article>
</template>
