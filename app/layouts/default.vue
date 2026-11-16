<script setup lang="ts">
const { settings } = useSite()
const whatsapp = computed(() => waLink(settings.value?.whatsappNumber))
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white text-slate-800">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />

    <a
      v-if="whatsapp"
      :href="whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      class="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <UIcon name="i-simple-icons-whatsapp" class="size-7" />
    </a>
  </div>
</template>
