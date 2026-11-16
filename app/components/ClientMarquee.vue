<script setup lang="ts">
const { data: clients } = await useFetch('/api/clients', { key: 'clients', default: () => [] })

const half = computed(() => Math.ceil(clients.value.length / 2))
const rows = computed(() => [clients.value.slice(0, half.value), clients.value.slice(half.value)])
</script>

<template>
  <div v-if="clients.length" class="space-y-6">
    <UMarquee
      v-for="(row, i) in rows"
      :key="i"
      :reverse="i === 1"
      pause-on-hover
      overlay
      :ui="{ root: '[--duration:60s] [--gap:3.5rem]', content: 'items-center' }"
    >
      <img
        v-for="client in row"
        :key="client.id"
        :src="client.logoUrl"
        :alt="client.name"
        :title="client.name"
        loading="lazy"
        class="h-14 w-auto max-w-44 object-contain opacity-90 grayscale-[60%] transition hover:opacity-100 hover:grayscale-0 md:h-16"
      >
    </UMarquee>
  </div>
</template>
