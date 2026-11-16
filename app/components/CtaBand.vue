<script setup lang="ts">
const { settings, content } = useSite()
const cta = computed(() => content.value.cta)
</script>

<template>
  <section class="relative isolate overflow-hidden bg-primary py-20 text-white md:py-24">
    <div class="absolute inset-0 -z-10 bg-blueprint" />
    <div class="absolute -right-24 -bottom-24 -z-10 size-96 rotate-12 bg-secondary/25 blur-3xl" />

    <UContainer class="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
      <div class="reveal max-w-2xl">
        <h2 class="font-display text-4xl leading-none font-bold tracking-tight uppercase md:text-5xl">
          {{ cta?.title || 'Siap Bekerja Sama?' }}
        </h2>
        <p class="mt-4 text-lg text-cobalt-100">
          {{ cta?.subtitle || 'Hubungi kami untuk konsultasi dan penawaran terbaik untuk kebutuhan proyek Anda' }}
        </p>
      </div>
      <div class="reveal flex flex-wrap gap-3">
        <UButton :to="cta?.ctaLink || '/kontak'" color="secondary" size="xl" trailing-icon="i-lucide-arrow-right">
          {{ cta?.ctaText || 'Hubungi Kami' }}
        </UButton>
        <UButton
          v-if="settings?.whatsappNumber"
          :to="waLink(settings.whatsappNumber)"
          target="_blank"
          size="xl"
          color="neutral"
          variant="outline"
          icon="i-simple-icons-whatsapp"
          class="bg-transparent text-white ring-white/40 hover:bg-white/10"
        >
          WhatsApp
        </UButton>
      </div>
    </UContainer>
  </section>
</template>
