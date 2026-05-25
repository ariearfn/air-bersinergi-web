<script setup lang="ts">
interface Client {
  name: string
  logo: string
}

const props = defineProps<{
  clients: Client[]
}>()

const midpoint = computed(() => Math.ceil(props.clients.length / 2))

const rowOne = computed(() => props.clients.slice(0, midpoint.value))
const rowTwo = computed(() => props.clients.slice(midpoint.value))

function loopRow(row: Client[]) {
  return [...row, ...row]
}
</script>

<template>
  <div class="relative space-y-4 md:space-y-5">
    <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-20 bg-gradient-to-r from-background to-transparent" />
    <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-20 bg-gradient-to-l from-background to-transparent" />

    <div class="overflow-hidden">
      <div class="marquee-track animate-marquee">
        <div
          v-for="(client, index) in loopRow(rowOne)"
          :key="`row1-${client.name}-${index}`"
          class="marquee-item"
        >
          <img
            :src="client.logo"
            :alt="client.name"
            class="max-h-14 md:max-h-16 max-w-full object-contain grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <div class="overflow-hidden">
      <div class="marquee-track animate-marquee-reverse">
        <div
          v-for="(client, index) in loopRow(rowTwo)"
          :key="`row2-${client.name}-${index}`"
          class="marquee-item"
        >
          <img
            :src="client.logo"
            :alt="client.name"
            class="max-h-14 md:max-h-16 max-w-full object-contain grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  display: flex;
  width: max-content;
  gap: 1.25rem;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 11rem;
  height: 5rem;
  padding: 0 0.5rem;
  background: transparent;
}

@media (min-width: 768px) {
  .marquee-track {
    gap: 1.75rem;
  }

  .marquee-item {
    width: 13rem;
    height: 5.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none !important;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }

  .marquee-item {
    width: calc(33.333% - 0.75rem);
  }
}
</style>
