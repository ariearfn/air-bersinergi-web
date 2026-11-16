<script setup lang="ts">
const { data: groups } = await useFetch('/api/portfolio', { key: 'portfolio', default: () => [] })

const photos = computed(() =>
  groups.value.flatMap(g => g.photos.map(p => ({
    ...p,
    category: g.category,
    groupTitle: g.title,
    label: p.caption || g.title
  })))
)

const filters = computed(() => [
  { label: 'Semua', value: 'all', count: photos.value.length },
  ...(Object.keys(portfolioCategoryLabels) as PortfolioCategory[]).map(value => ({
    label: portfolioCategoryLabels[value],
    value,
    count: photos.value.filter(p => p.category === value).length
  }))
])
const active = ref('all')

const visible = computed(() =>
  active.value === 'all' ? photos.value : photos.value.filter(p => p.category === active.value)
)

const lightboxIndex = ref<number | null>(null)
const lightboxOpen = computed({
  get: () => lightboxIndex.value !== null,
  set: (v) => {
    if (!v) lightboxIndex.value = null
  }
})
const current = computed(() => (lightboxIndex.value === null ? null : visible.value[lightboxIndex.value]))

function step(delta: number) {
  if (lightboxIndex.value === null) return
  const n = visible.value.length
  lightboxIndex.value = (lightboxIndex.value + delta + n) % n
}

defineShortcuts({
  arrowleft: () => step(-1),
  arrowright: () => step(1)
})
</script>

<template>
  <div>
    <div class="reveal flex flex-wrap gap-2" role="tablist" aria-label="Kategori portofolio">
      <button
        v-for="f in filters"
        :key="f.value"
        type="button"
        role="tab"
        :aria-selected="active === f.value"
        class="flex items-center gap-2 border px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors"
        :class="active === f.value
          ? 'border-primary bg-primary text-white'
          : 'border-slate-300 bg-white text-slate-600 hover:border-primary hover:text-primary'"
        @click="active = f.value"
      >
        {{ f.label }}
        <span class="text-xs opacity-70">{{ f.count }}</span>
      </button>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      <button
        v-for="(photo, i) in visible"
        :key="photo.id"
        type="button"
        class="group relative aspect-square overflow-hidden bg-slate-200 text-left"
        :class="i % 7 === 0 && 'md:col-span-2 md:row-span-2'"
        @click="lightboxIndex = i"
      >
        <img
          :src="photo.imageUrl"
          :alt="photo.alt || photo.label"
          loading="lazy"
          class="size-full object-cover transition-transform duration-700 group-hover:scale-110"
        >
        <div class="absolute inset-0 bg-linear-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
        <div class="absolute inset-x-0 bottom-0 p-3 md:p-4">
          <span class="bg-secondary px-2 py-0.5 font-display text-[11px] font-semibold tracking-widest text-white uppercase">
            {{ portfolioCategoryLabels[photo.category] }}
          </span>
          <p class="mt-2 line-clamp-2 text-sm leading-snug font-semibold text-white">
            {{ photo.label }}
          </p>
        </div>
        <span class="absolute top-3 right-3 flex size-9 items-center justify-center bg-white/90 text-slate-900 opacity-0 transition-opacity group-hover:opacity-100">
          <UIcon name="i-lucide-maximize-2" class="size-4" />
        </span>
      </button>
    </div>

    <UModal
      v-model:open="lightboxOpen"
      fullscreen
      :title="current?.label"
      :description="current?.groupTitle"
      :ui="{ content: 'bg-ink-950/97 ring-0', header: 'border-white/10', title: 'text-white', description: 'text-slate-400', body: 'flex items-center justify-center', close: 'text-white' }"
    >
      <template #body>
        <div v-if="current" class="relative flex size-full items-center justify-center">
          <img
            :src="current.imageUrl"
            :alt="current.alt || current.label"
            class="max-h-[78vh] max-w-full object-contain"
          >
          <UButton
            icon="i-lucide-chevron-left"
            color="neutral"
            variant="solid"
            size="xl"
            class="absolute left-0 rounded-none"
            aria-label="Foto sebelumnya"
            @click="step(-1)"
          />
          <UButton
            icon="i-lucide-chevron-right"
            color="neutral"
            variant="solid"
            size="xl"
            class="absolute right-0 rounded-none"
            aria-label="Foto berikutnya"
            @click="step(1)"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
