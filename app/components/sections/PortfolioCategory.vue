<script setup lang="ts">
import type { PortfolioSection } from '~/data/portfolio-sections'

const props = withDefaults(defineProps<{
  section: PortfolioSection
  index: number
  accent?: 'primary' | 'secondary'
}>(), {
  accent: 'primary',
})

const isCaptionGrid = computed(() => props.section.layout === 'caption-grid')
const isSecondary = computed(() => props.accent === 'secondary')

const accentRing = computed(() =>
  isSecondary.value ? 'group-hover:ring-secondary/40' : 'group-hover:ring-primary/30',
)

const accentBar = computed(() =>
  isSecondary.value ? 'bg-secondary' : 'bg-primary',
)

const accentBadge = computed(() =>
  isSecondary.value ? 'bg-secondary/90 text-secondary-foreground' : 'bg-primary/90 text-primary-foreground',
)
</script>

<template>
  <article
    :id="section.slug"
    class="scroll-mt-28 rounded-2xl border bg-card shadow-sm overflow-hidden"
  >
    <div
      :class="[
        'relative px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b',
        isSecondary
          ? 'bg-gradient-to-r from-secondary/5 via-transparent to-primary/5'
          : 'bg-gradient-to-r from-primary/5 via-transparent to-secondary/5',
      ]"
    >
      <div
        :class="[
          'absolute top-0 left-0 w-full h-1',
          isSecondary
            ? 'bg-gradient-to-r from-secondary via-secondary/70 to-primary'
            : 'bg-gradient-to-r from-primary via-primary/70 to-secondary',
        ]"
      />

      <div class="min-w-0">
        <div class="flex items-center gap-3 mb-2">
          <span
            :class="isSecondary ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'"
            class="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <UiBadge variant="outline" class="text-xs">
            {{ section.images.length }} foto
          </UiBadge>
        </div>
        <h3
          :class="isSecondary ? 'text-secondary' : 'text-primary'"
          class="text-xl md:text-2xl font-bold uppercase tracking-wide"
        >
          {{ section.title }}
        </h3>
        <p v-if="section.description" class="text-sm text-muted-foreground mt-2 max-w-2xl">
          {{ section.description }}
        </p>
      </div>
    </div>

    <div class="p-6 md:p-8 bg-muted/20">
      <div
        :class="[
          'grid gap-5 md:gap-6',
          isCaptionGrid
            ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2',
        ]"
      >
        <figure
          v-for="(image, imageIndex) in section.images"
          :key="`${section.slug}-${imageIndex}`"
          :class="[
            'group relative overflow-hidden rounded-2xl bg-background shadow-md ring-1 ring-border/60',
            'transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1.5',
            accentRing,
          ]"
        >
          <div
            :class="[
              'relative overflow-hidden',
              isCaptionGrid ? 'aspect-[4/3]' : 'aspect-[16/10]',
            ]"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/45"
            />

            <span
              :class="accentBadge"
              class="absolute top-3 left-3 z-10 inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full text-[11px] font-bold tabular-nums shadow-lg"
            >
              {{ String(imageIndex + 1).padStart(2, '0') }}
            </span>

            <figcaption class="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
              <p
                v-if="image.caption || image.alt"
                class="text-white font-semibold text-sm md:text-[15px] leading-snug line-clamp-2 normal-case tracking-normal drop-shadow-sm"
              >
                {{ image.caption || image.alt }}
              </p>
              <div
                :class="[
                  'mt-3 h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-14',
                  accentBar,
                ]"
              />
            </figcaption>
          </div>
        </figure>
      </div>
    </div>
  </article>
</template>
