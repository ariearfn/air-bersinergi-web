<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang Kami', href: '/tentang-kami' },
  { name: 'Layanan', href: '/layanan' },
  { name: 'Portofolio', href: '/portofolio' },
  { name: 'Kontak', href: '/kontak' },
]

const isActive = (href: string) => {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
          AIR
        </div>
        <div class="hidden sm:block">
          <p class="font-bold text-sm leading-tight">PT. Air Bersinergi</p>
          <p class="text-xs text-muted-foreground">General Contractor & Supplier</p>
        </div>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          :class="[
            'text-sm font-medium transition-colors hover:text-primary',
            isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
          ]"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <NuxtLink to="/kontak">
          <UiButton size="sm" class="hidden sm:inline-flex">Hubungi Kami</UiButton>
        </NuxtLink>

        <button
          class="md:hidden p-2 rounded-md hover:bg-accent"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="mobileMenuOpen" class="md:hidden border-t bg-background">
        <nav class="container py-4 space-y-2">
          <NuxtLink
            v-for="item in navigation"
            :key="item.href"
            :to="item.href"
            :class="[
              'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive(item.href) ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            ]"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>
