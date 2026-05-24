<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-foreground text-background">
    <div class="container py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              AIR
            </div>
            <div>
              <p class="font-bold text-sm">PT. Anugerah Insan Ridho Bersinergi</p>
              <p class="text-xs text-muted-foreground">General Contractor & Supplier</p>
            </div>
          </div>
          <p class="text-sm text-muted-foreground leading-relaxed">
            Perusahaan General Contractor and Supplier yang bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanikal, elektrikal, dan engineering.
          </p>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Navigasi</h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li><NuxtLink to="/" class="hover:text-primary transition-colors">Beranda</NuxtLink></li>
            <li><NuxtLink to="/tentang-kami" class="hover:text-primary transition-colors">Tentang Kami</NuxtLink></li>
            <li><NuxtLink to="/layanan" class="hover:text-primary transition-colors">Layanan</NuxtLink></li>
            <li><NuxtLink to="/portofolio" class="hover:text-primary transition-colors">Portofolio</NuxtLink></li>
            <li><NuxtLink to="/kontak" class="hover:text-primary transition-colors">Kontak</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Kontak</h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Perum Dukuh Zamrud Blok I 17 No 91, Kel. Cimuning, Kec. Mustika Jaya, Kota Bekasi, Jawa Barat</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:afif@airbersinergi.com" class="hover:text-primary transition-colors">afif@airbersinergi.com</a>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="https://wa.me/6289542139245" class="hover:text-primary transition-colors">+62 895 4213 92455</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
        <p>&copy; {{ currentYear }} PT. Anugerah Insan Ridho Bersinergi. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
