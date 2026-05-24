<script setup lang="ts">
const client = useSupabaseClient()

const { data: portfolio } = await useAsyncData('all-portfolio', async () => {
  const { data } = await client.from('portfolio').select('*').eq('is_visible', true).order('sort_order')
  return data || []
})

useSeoMeta({
  title: 'Portofolio - PT. Air Bersinergi',
  description: 'Proyek-proyek yang telah kami kerjakan',
})
</script>

<template>
  <div>
    <section class="bg-gradient-to-br from-primary/95 to-primary text-primary-foreground py-16">
      <div class="container">
        <UiBadge variant="secondary" class="mb-4">Portofolio</UiBadge>
        <h1 class="text-4xl font-bold">Proyek Kami</h1>
        <p class="text-primary-foreground/80 mt-2 max-w-2xl">
          Beberapa proyek yang sudah kami kerjakan dengan hasil terbaik
        </p>
      </div>
    </section>

    <section class="py-16">
      <div class="container">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard v-for="project in portfolio" :key="project.id" class="overflow-hidden group hover:shadow-lg transition-shadow">
            <div class="aspect-video bg-muted relative overflow-hidden">
              <img
                v-if="project.cover_image"
                :src="project.cover_image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-muted-foreground">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div v-if="project.is_featured" class="absolute top-2 right-2">
                <UiBadge variant="secondary">Featured</UiBadge>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-semibold text-lg mb-1">{{ project.title }}</h3>
              <p v-if="project.client_name" class="text-sm text-primary font-medium mb-2">{{ project.client_name }}</p>
              <p v-if="project.description" class="text-sm text-muted-foreground line-clamp-2">{{ project.description }}</p>
              <div v-if="project.tags" class="flex flex-wrap gap-1 mt-3">
                <UiBadge v-for="tag in project.tags" :key="tag" variant="outline" class="text-xs">{{ tag }}</UiBadge>
              </div>
            </div>
          </UiCard>
        </div>

        <div v-if="!portfolio || portfolio.length === 0" class="text-center py-12">
          <p class="text-muted-foreground">Belum ada proyek yang ditampilkan.</p>
        </div>
      </div>
    </section>
  </div>
</template>
