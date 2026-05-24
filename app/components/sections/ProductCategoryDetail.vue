<script setup lang="ts">
import type { ProductCategoryDetail } from '~/data/product-details'

defineProps<{
  category: ProductCategoryDetail
}>()
</script>

<template>
  <div :id="category.slug">
    <UiCard class="p-6 md:p-8 border shadow-sm">
      <div class="mb-8">
        <UiBadge class="mb-4">{{ category.subtitle }}</UiBadge>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight">{{ category.title }}</h2>
        <p class="text-muted-foreground mt-4 leading-relaxed">{{ category.intro }}</p>
      </div>

      <div v-if="category.catalogImage" class="mb-8 md:mb-10">
        <div class="rounded-xl overflow-hidden border bg-white shadow-sm">
          <img
            :src="category.catalogImage"
            :alt="`${category.title} catalog`"
            class="w-full h-auto"
          />
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiCard
          v-for="item in category.items"
          :key="item.name"
          class="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div v-if="item.image" class="aspect-[4/3] bg-white p-6 flex items-center justify-center border-b">
            <img
              :src="item.image"
              :alt="item.name"
              class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 class="font-semibold text-lg leading-snug">{{ item.name }}</h3>
              <UiBadge v-if="item.model" variant="outline" class="shrink-0 text-xs">{{ item.model }}</UiBadge>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed mb-4">{{ item.description }}</p>
            <ul v-if="item.highlights?.length" class="space-y-1.5">
              <li
                v-for="highlight in item.highlights"
                :key="highlight"
                class="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {{ highlight }}
              </li>
            </ul>
          </div>
        </UiCard>
      </div>

      <div class="mt-8 md:mt-10 text-center">
        <p class="text-sm text-muted-foreground mb-4">
          Tersedia berbagai merk dan spesifikasi lainnya sesuai permintaan customer.
        </p>
        <NuxtLink to="/kontak">
          <UiButton variant="outline">Minta Penawaran</UiButton>
        </NuxtLink>
      </div>
    </UiCard>
  </div>
</template>
