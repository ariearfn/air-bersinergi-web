<script setup lang="ts">
const client = useSupabaseClient()

const { data: team } = await useAsyncData('team', async () => {
  const { data } = await client.from('team_members').select('*').eq('is_visible', true).order('sort_order')
  return data || []
})

const qualityPillars = [
  {
    title: 'Produk Berkualitas',
    description: 'Meneguhkan komitmen kuat untuk senantiasa menghasilkan produk berkualitas demi kepuasan pelanggan',
    icon: 'quality',
  },
  {
    title: 'Persyaratan Pelanggan',
    description: 'Secara konsisten memenuhi atau melampaui semua persyaratan pelanggan',
    icon: 'customer',
  },
  {
    title: 'Perbaikan Berkelanjutan',
    description: 'Melaksanakan proses perbaikan berkesinambungan pada mutu produk maupun layanan, biaya, pertanggung jawaban sosial dan moral',
    icon: 'improvement',
  },
]

const k3Commitments = [
  {
    title: 'Kepatuhan Regulasi K3',
    description: 'Bersungguh-sungguh mematuhi peraturan perundang-undangan tentang Kesehatan dan Keselamatan Kerja sebagai upaya pencegahan terjadinya kecelakaan dan penyakit akibat kerja.',
  },
  {
    title: 'Lingkungan Kerja Aman',
    description: 'Berkomitmen tinggi menjamin terjaganya Kesehatan dan Keselamatan Kerja bagi karyawan, pekerja, dan pihak lain di lingkungan kantor maupun lokasi kerja.',
  },
]

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
    <section class="py-20 bg-muted/30 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
      <div class="container relative">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <UiBadge class="mb-4">Kebijakan Mutu</UiBadge>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight">Komitmen Kualitas & Keselamatan</h2>
          <p class="text-muted-foreground mt-4 leading-relaxed">
            PT. Anugerah Insan Ridho Bersinergi sebagai General Contractor dan Supplier berkomitmen penuh
            dalam setiap pengadaan barang dan jasa yang kami kerjakan.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <UiCard
            v-for="(pillar, index) in qualityPillars"
            :key="pillar.title"
            class="group relative p-6 border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background/80 backdrop-blur-sm"
          >
            <div class="absolute top-0 left-6 right-6 h-1 rounded-full bg-gradient-to-r from-primary to-primary/40" />
            <div class="flex items-center gap-3 mb-4 mt-2">
              <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <svg v-if="pillar.icon === 'quality'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <svg v-else-if="pillar.icon === 'customer'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-muted-foreground">0{{ index + 1 }}</span>
            </div>
            <h3 class="font-semibold text-lg mb-2">{{ pillar.title }}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ pillar.description }}</p>
          </UiCard>
        </div>

        <UiCard class="overflow-hidden border-0 shadow-md">
          <div class="grid lg:grid-cols-5">
            <div class="lg:col-span-2 bg-gradient-to-br from-primary to-primary/80 p-8 md:p-10 text-primary-foreground flex flex-col justify-center">
              <div class="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-3">Kesehatan & Keselamatan Kerja</h3>
              <p class="text-primary-foreground/80 text-sm leading-relaxed">
                Prioritas utama kami dalam setiap proyek — melindungi tenaga kerja dan lingkungan operasional.
              </p>
            </div>
            <div class="lg:col-span-3 p-8 md:p-10 space-y-6 bg-background">
              <div
                v-for="item in k3Commitments"
                :key="item.title"
                class="flex gap-4 p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
              >
                <div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">{{ item.title }}</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </UiCard>
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
