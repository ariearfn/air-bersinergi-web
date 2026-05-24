<script setup lang="ts">
const client = useSupabaseClient()

const { data: team } = await useAsyncData('team', async () => {
  const { data } = await client.from('team_members').select('*').eq('is_visible', true).order('sort_order')
  return data || []
})

useSeoMeta({
  title: 'Tentang Kami - PT. Air Bersinergi',
  description: 'General Contractor and Supplier yang bergerak dibidang pengadaan barang dan jasa',
})
</script>

<template>
  <div>
    <!-- Header -->
    <section class="bg-gradient-to-br from-primary/95 to-primary text-primary-foreground py-16">
      <div class="container">
        <UiBadge variant="secondary" class="mb-4">Tentang Kami</UiBadge>
        <h1 class="text-4xl font-bold">PT. Anugerah Insan Ridho Bersinergi</h1>
        <p class="text-primary-foreground/80 mt-2 max-w-2xl">General Contractor and Supplier</p>
      </div>
    </section>

    <!-- Company Info -->
    <section class="py-16">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-2xl font-bold mb-4">Profil Perusahaan</h2>
            <p class="text-muted-foreground leading-relaxed mb-6">
              PT. Anugerah Insan Ridho Bersinergi merupakan perusahaan General Contractor and Supplier yang bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanikal, elektrikal, dan engineering.
            </p>
            <p class="text-muted-foreground leading-relaxed">
              Perusahaan kami menawarkan kerja sama dengan berbagai perusahaan nasional, dan instansi pemerintah berdasarkan bidang keahlian perusahaan.
            </p>
          </div>
          <div class="space-y-4">
            <UiCard class="p-4">
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Nama Perusahaan</span>
                <span class="text-sm font-medium">PT. Anugerah Insan Ridho Bersinergi</span>
              </div>
            </UiCard>
            <UiCard class="p-4">
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Akta Notaris</span>
                <span class="text-sm font-medium">6 / 3 Juni 2024</span>
              </div>
            </UiCard>
            <UiCard class="p-4">
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">NPWP</span>
                <span class="text-sm font-medium">206691917470000</span>
              </div>
            </UiCard>
            <UiCard class="p-4">
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Bidang Usaha</span>
                <span class="text-sm font-medium">Industry, Construction, Mechanical, Electrical, Safety, Engineering</span>
              </div>
            </UiCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Visi & Misi -->
    <section class="py-16 bg-muted/50">
      <div class="container">
        <div class="grid md:grid-cols-2 gap-12">
          <div>
            <h2 class="text-2xl font-bold mb-4 text-primary">Visi</h2>
            <p class="text-muted-foreground leading-relaxed">
              Menjadi sebuah Perusahaan yang produktif, tangguh dan terpercaya pada setiap bidang yang dikerjakan dan selalu mengedepankan keselamatan dan kesehatan kerja.
            </p>
          </div>
          <div>
            <h2 class="text-2xl font-bold mb-4 text-secondary">Misi</h2>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <p class="text-muted-foreground text-sm leading-relaxed">Memberikan kepuasan dan kepercayaan konsumen atas produk dan jasa yang berkualitas melalui keunggulan sistem management dan sumber daya manusia yang handal</p>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <p class="text-muted-foreground text-sm leading-relaxed">Mempersiapkan tenaga kerja profesional, terampil, cermat dan santun</p>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <p class="text-muted-foreground text-sm leading-relaxed">Menerapkan kejujuran, integritas, dan etika bisnis ke dalam semua aspek bisnis</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Quality Policy -->
    <section class="py-16">
      <div class="container">
        <h2 class="text-2xl font-bold mb-6 text-center">Kebijakan Mutu</h2>
        <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <UiCard class="p-6 text-center">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2">Produk Berkualitas</h3>
            <p class="text-sm text-muted-foreground">Komitmen kuat menghasilkan produk berkualitas demi kepuasan pelanggan</p>
          </UiCard>
          <UiCard class="p-6 text-center">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2">Perbaikan Berkelanjutan</h3>
            <p class="text-sm text-muted-foreground">Proses perbaikan berkesinambungan pada mutu produk maupun layanan</p>
          </UiCard>
          <UiCard class="p-6 text-center">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2">K3 Terjamin</h3>
            <p class="text-sm text-muted-foreground">Mematuhi peraturan Kesehatan dan Keselamatan Kerja</p>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section v-if="team && team.length > 0" class="py-16 bg-muted/50">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold">Tim Kami</h2>
          <p class="text-muted-foreground mt-2">Tenaga profesional yang siap melayani Anda</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <UiCard v-for="member in team" :key="member.id" class="p-6 text-center">
            <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <img
                v-if="member.photo_url"
                :src="member.photo_url"
                :alt="member.name"
                class="w-full h-full rounded-full object-cover"
              />
              <span v-else class="text-2xl font-bold text-primary">{{ member.name.charAt(0) }}</span>
            </div>
            <h3 class="font-semibold">{{ member.name }}</h3>
            <p class="text-sm text-muted-foreground">{{ member.role }}</p>
          </UiCard>
        </div>
      </div>
    </section>
  </div>
</template>
