<script setup lang="ts">
const { settings } = useSite()

const links = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang Kami', to: '/tentang-kami' },
  { label: 'Layanan', to: '/layanan' },
  { label: 'Portofolio', to: '/portofolio' },
  { label: 'Kontak', to: '/kontak' }
]

const fields = ['Industry', 'Construction', 'Mechanical', 'Electrical', 'Safety', 'Engineering']

const socials = computed(() => [
  { icon: 'i-simple-icons-instagram', label: 'Instagram', to: settings.value?.socialInstagram },
  { icon: 'i-simple-icons-facebook', label: 'Facebook', to: settings.value?.socialFacebook },
  { icon: 'i-simple-icons-linkedin', label: 'LinkedIn', to: settings.value?.socialLinkedin }
].filter(s => s.to))

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative bg-ink-950 text-slate-400">
    <div class="h-1.5 bg-hazard opacity-80" />
    <UContainer class="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <div class="flex items-center gap-3">
          <span class="flex size-12 items-center justify-center rounded-md bg-white p-1">
            <img src="/logo.png" alt="AIR Bersinergi" class="size-full object-contain">
          </span>
          <div>
            <p class="font-display text-lg font-bold tracking-wide text-white uppercase">
              Air Bersinergi
            </p>
            <p class="text-xs">
              General Contractor & Supplier
            </p>
          </div>
        </div>
        <p class="mt-5 max-w-sm text-sm leading-relaxed">
          {{ settings?.siteName }} bergerak dibidang pengadaan barang dan jasa dalam bidang industri, konstruksi, mekanikal, elektrikal, dan engineering.
        </p>
        <div v-if="socials.length" class="mt-5 flex gap-2">
          <UButton
            v-for="s in socials"
            :key="s.label"
            :to="s.to!"
            target="_blank"
            :icon="s.icon"
            :aria-label="s.label"
            color="neutral"
            variant="ghost"
            class="text-slate-400 hover:text-white"
          />
        </div>
      </div>

      <div class="lg:col-span-2">
        <p class="font-display text-sm font-semibold tracking-widest text-white uppercase">
          Navigasi
        </p>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" class="transition-colors hover:text-white">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="lg:col-span-2">
        <p class="font-display text-sm font-semibold tracking-widest text-white uppercase">
          Bidang Usaha
        </p>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li v-for="field in fields" :key="field">
            {{ field }}
          </li>
        </ul>
      </div>

      <div class="lg:col-span-4">
        <p class="font-display text-sm font-semibold tracking-widest text-white uppercase">
          Kontak
        </p>
        <ul class="mt-4 space-y-3.5 text-sm">
          <li v-if="settings?.address" class="flex gap-3">
            <UIcon name="i-lucide-map-pin" class="mt-0.5 size-4 shrink-0 text-secondary" />
            <span class="leading-relaxed">{{ settings.address }}</span>
          </li>
          <li v-if="settings?.contactEmail" class="flex gap-3">
            <UIcon name="i-lucide-mail" class="mt-0.5 size-4 shrink-0 text-secondary" />
            <a :href="`mailto:${settings.contactEmail}`" class="hover:text-white">{{ settings.contactEmail }}</a>
          </li>
          <li v-if="settings?.whatsappNumber" class="flex gap-3">
            <UIcon name="i-simple-icons-whatsapp" class="mt-0.5 size-4 shrink-0 text-secondary" />
            <a :href="waLink(settings.whatsappNumber)" target="_blank" rel="noopener noreferrer" class="hover:text-white">
              {{ settings.contactPhone || settings.whatsappNumber }}
            </a>
          </li>
        </ul>
      </div>
    </UContainer>

    <div class="border-t border-white/10">
      <UContainer class="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ year }} {{ settings?.siteName }}. All rights reserved.</p>
        <p>Bekasi, Jawa Barat — Indonesia</p>
      </UContainer>
    </div>
  </footer>
</template>
