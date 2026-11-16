<script setup lang="ts">
const route = useRoute()
const open = ref(false)
const scrolled = ref(false)

const links = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang Kami', to: '/tentang-kami' },
  { label: 'Layanan', to: '/layanan' },
  { label: 'Portofolio', to: '/portofolio' },
  { label: 'Kontak', to: '/kontak' }
]

const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))

// Every public page opens with a dark hero, so the header starts transparent over it.
const solid = computed(() => scrolled.value || open.value)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(() => route.path, () => {
  open.value = false
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="solid ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-transparent'"
  >
    <UContainer class="flex h-18 items-center justify-between gap-6">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-3" aria-label="Beranda">
        <span class="flex size-12 items-center justify-center rounded-md bg-white p-1 shadow-sm">
          <img src="/logo.png" alt="AIR Bersinergi" class="size-full object-contain">
        </span>
        <span class="hidden leading-tight sm:block">
          <span
            class="block font-display text-lg font-bold tracking-wide uppercase"
            :class="solid ? 'text-slate-900' : 'text-white'"
          >Air Bersinergi</span>
          <span class="block text-xs" :class="solid ? 'text-slate-500' : 'text-white/70'">General Contractor & Supplier</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="relative px-3.5 py-2 text-sm font-semibold tracking-wide uppercase transition-colors"
          :class="[
            isActive(link.to)
              ? (solid ? 'text-primary' : 'text-white')
              : (solid ? 'text-slate-600 hover:text-slate-900' : 'text-white/75 hover:text-white')
          ]"
        >
          {{ link.label }}
          <span
            v-if="isActive(link.to)"
            class="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-secondary"
          />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <UButton
          to="/kontak"
          color="secondary"
          icon="i-lucide-message-square-text"
          class="hidden sm:inline-flex"
        >
          Minta Penawaran
        </UButton>
        <UButton
          :icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
          color="neutral"
          variant="ghost"
          class="lg:hidden"
          :class="solid ? '' : 'text-white hover:bg-white/10'"
          :aria-label="open ? 'Tutup menu' : 'Buka menu'"
          :aria-expanded="open"
          @click="open = !open"
        />
      </div>
    </UContainer>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav v-if="open" class="border-t border-slate-200 bg-white lg:hidden" aria-label="Navigasi mobile">
        <UContainer class="flex flex-col gap-1 py-4">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-md px-3 py-2.5 text-sm font-semibold tracking-wide uppercase"
            :class="isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-slate-700 hover:bg-slate-100'"
          >
            {{ link.label }}
          </NuxtLink>
          <UButton to="/kontak" color="secondary" block class="mt-2">
            Minta Penawaran
          </UButton>
        </UContainer>
      </nav>
    </Transition>
  </header>
</template>
