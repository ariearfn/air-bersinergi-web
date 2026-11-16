<script setup lang="ts">
const { data: categories } = await useFetch('/api/products', { key: 'products', default: () => [] })

type Category = (typeof categories.value)[number]

const filters = [
  { label: 'Semua', value: 'all' },
  ...Object.entries(productGroupLabels).map(([value, label]) => ({ label, value }))
]
const activeGroup = ref('all')

const visible = computed(() =>
  activeGroup.value === 'all'
    ? categories.value
    : categories.value.filter(c => c.group === activeGroup.value)
)

const coverOf = (c: Category) => c.items.find(i => i.imageUrl)?.imageUrl ?? c.catalogImage
/** Item images are cut-out product shots; a category without them falls back to a site photo. */
const hasProductShots = (c: Category) => c.items.some(i => i.imageUrl)

const selected = ref<Category | null>(null)
const open = computed({
  get: () => selected.value !== null,
  set: (v) => {
    if (!v) selected.value = null
  }
})
</script>

<template>
  <div>
    <div class="reveal flex flex-wrap gap-2" role="tablist" aria-label="Kategori produk">
      <button
        v-for="f in filters"
        :key="f.value"
        type="button"
        role="tab"
        :aria-selected="activeGroup === f.value"
        class="border px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors"
        :class="activeGroup === f.value
          ? 'border-primary bg-primary text-white'
          : 'border-slate-300 bg-white text-slate-600 hover:border-primary hover:text-primary'"
        @click="activeGroup = f.value"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <button
        v-for="category in visible"
        :key="category.id"
        type="button"
        class="reveal group flex flex-col overflow-hidden border border-slate-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/10"
        @click="selected = category"
      >
        <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            v-if="coverOf(category)"
            :src="coverOf(category)!"
            :alt="category.title"
            loading="lazy"
            class="size-full transition-transform duration-500 group-hover:scale-105"
            :class="hasProductShots(category) ? 'object-contain p-6' : 'object-cover'"
          >
          <div v-else class="flex size-full items-center justify-center bg-blueprint bg-ink-900">
            <UIcon name="i-lucide-package" class="size-14 text-white/30" />
          </div>
          <span class="absolute top-0 left-0 bg-ink-950 px-3 py-1.5 font-display text-xs font-semibold tracking-widest text-white uppercase">
            {{ productGroupLabels[category.group] }}
          </span>
        </div>
        <div class="flex flex-1 flex-col p-6">
          <h3 class="font-display text-2xl font-bold tracking-wide text-slate-900 uppercase">
            {{ category.title }}
          </h3>
          <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {{ category.summary }}
          </p>
          <span class="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
            {{ category.items.length ? `Lihat ${category.items.length} produk` : 'Tanyakan ketersediaan' }}
            <UIcon name="i-lucide-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </button>
    </div>

    <USlideover
      v-model:open="open"
      :title="selected?.title"
      :description="selected?.subtitle ?? undefined"
      :ui="{ content: 'sm:max-w-2xl' }"
    >
      <template #body>
        <div v-if="selected" class="space-y-6">
          <p v-if="selected.intro || selected.summary" class="leading-relaxed text-slate-600">
            {{ selected.intro || selected.summary }}
          </p>

          <img
            v-if="selected.catalogImage"
            :src="selected.catalogImage"
            :alt="`Katalog ${selected.title}`"
            class="w-full border border-slate-200"
          >

          <article
            v-for="item in selected.items"
            :key="item.id"
            class="flex flex-col gap-5 border border-slate-200 p-5 sm:flex-row"
          >
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              :alt="item.name"
              loading="lazy"
              class="aspect-square w-full shrink-0 bg-slate-50 object-contain p-2 sm:w-36"
            >
            <div class="min-w-0">
              <h4 class="font-display text-xl font-bold tracking-wide text-slate-900 uppercase">
                {{ item.name }}
              </h4>
              <p v-if="item.model" class="text-sm font-semibold text-secondary">
                {{ item.model }}
              </p>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">
                {{ item.description }}
              </p>
              <ul v-if="item.highlights.length" class="mt-3 flex flex-wrap gap-1.5">
                <li
                  v-for="h in item.highlights"
                  :key="h"
                  class="bg-primary/8 px-2 py-1 text-xs font-medium text-primary"
                >
                  {{ h }}
                </li>
              </ul>
            </div>
          </article>

          <div class="bg-ink-950 p-6 text-white">
            <p class="font-display text-xl font-bold uppercase">
              Butuh spesifikasi khusus?
            </p>
            <p class="mt-1 text-sm text-slate-300">
              Produk dapat disesuaikan dengan kebutuhan proyek Anda.
            </p>
            <UButton to="/kontak" color="secondary" class="mt-4" trailing-icon="i-lucide-arrow-right">
              Minta Penawaran
            </UButton>
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>
