<script setup lang="ts">
import type { PortfolioCategory, PortfolioSection } from '~/data/portfolio-sections'

defineProps<{
  category: PortfolioCategory
  sections: PortfolioSection[]
}>()
</script>

<template>
  <section :id="`portfolio-${category.id}`" class="scroll-mt-28">
    <div
      :class="[
        'rounded-2xl border overflow-hidden mb-6 md:mb-8',
        category.accent === 'secondary' ? 'border-secondary/20 bg-secondary/5' : 'border-primary/20 bg-primary/5',
      ]"
    >
      <div class="px-6 md:px-8 py-6 md:py-7">
        <UiBadge
          :class="category.accent === 'secondary' ? 'bg-secondary text-secondary-foreground' : ''"
          class="mb-3"
        >
          {{ category.title }}
        </UiBadge>
        <h2
          :class="category.accent === 'secondary' ? 'text-secondary' : 'text-primary'"
          class="text-2xl md:text-3xl font-bold uppercase tracking-wide"
        >
          Portofolio {{ category.title }}
        </h2>
        <p class="text-muted-foreground mt-2 max-w-2xl">{{ category.description }}</p>
        <div v-if="sections.length" class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="section in sections"
            :key="section.slug"
            class="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium text-foreground/80"
          >
            {{ section.title }}
          </span>
        </div>
      </div>
    </div>

    <div class="space-y-8 md:space-y-10">
      <SectionsPortfolioCategory
        v-for="(section, index) in sections"
        :key="section.slug"
        :section="section"
        :index="index"
        :accent="category.accent"
      />
    </div>
  </section>
</template>
