<script setup lang="ts">
const { content } = useSite()
const { data: team } = await useFetch('/api/team', { key: 'team', default: () => [] })

const facts = [
  { icon: 'i-lucide-building-2', label: 'Nama Perusahaan', value: 'PT. Anugerah Insan Ridho Bersinergi' },
  { icon: 'i-lucide-scroll-text', label: 'Akta Notaris', value: 'No. 6 / 3 Juni 2024' },
  { icon: 'i-lucide-receipt-text', label: 'NPWP', value: '20.669.191.7-470.000' },
  { icon: 'i-lucide-map-pin', label: 'Domisili', value: 'Kota Bekasi, Jawa Barat' }
]

const businessAreas = ['Industry', 'Construction', 'Mechanical', 'Electrical', 'Safety', 'Engineering']

const missions = [
  'Memberikan kepuasan dan kepercayaan konsumen atas produk dan jasa yang berkualitas melalui keunggulan sistem management dan sumber daya manusia yang handal.',
  'Mempersiapkan tenaga kerja profesional, terampil, cermat dan santun.',
  'Menerapkan kejujuran, integritas, dan etika bisnis ke dalam semua aspek bisnis.'
]

const qualityPillars = [
  { icon: 'i-lucide-badge-check', title: 'Produk Berkualitas', text: 'Meneguhkan komitmen kuat untuk senantiasa menghasilkan produk berkualitas demi kepuasan pelanggan.' },
  { icon: 'i-lucide-handshake', title: 'Persyaratan Pelanggan', text: 'Secara konsisten memenuhi atau melampaui semua persyaratan pelanggan.' },
  { icon: 'i-lucide-trending-up', title: 'Perbaikan Berkelanjutan', text: 'Melaksanakan proses perbaikan berkesinambungan pada mutu produk maupun layanan, biaya, pertanggung jawaban sosial dan moral.' }
]

const k3Commitments = [
  { title: 'Kepatuhan Regulasi K3', text: 'Bersungguh-sungguh mematuhi peraturan perundang-undangan tentang Kesehatan dan Keselamatan Kerja sebagai upaya pencegahan terjadinya kecelakaan dan penyakit akibat kerja.' },
  { title: 'Lingkungan Kerja Aman', text: 'Berkomitmen tinggi menjamin terjaganya Kesehatan dan Keselamatan Kerja bagi karyawan, pekerja, dan pihak lain di lingkungan kantor maupun lokasi kerja.' }
]

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

useSeoMeta({
  title: 'Tentang Kami — PT. Anugerah Insan Ridho Bersinergi',
  description: 'Profil, visi misi, kebijakan mutu, dan komitmen K3 PT. Anugerah Insan Ridho Bersinergi, General Contractor & Supplier di Bekasi.'
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Tentang Kami"
      title="Membangun dengan Integritas"
      description="General Contractor & Supplier untuk pengadaan barang dan jasa di bidang industri, konstruksi, mekanikal, elektrikal, dan engineering."
      image="/portfolio/projects/fabrikasi-baja.webp"
    />

    <!-- Profile -->
    <section class="py-24 md:py-32">
      <UContainer class="grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <SectionHeading eyebrow="Profil Perusahaan" :title="content.about?.title || 'Perusahaan yang Produktif, Tangguh dan Terpercaya'" />
          <div class="reveal mt-8 space-y-5 text-lg leading-relaxed text-slate-600">
            <p>
              {{ content.about?.body || 'PT. Anugerah Insan Ridho Bersinergi merupakan perusahaan General Contractor and Supplier yang bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanikal, elektrikal, dan engineering.' }}
            </p>
          </div>
          <div class="reveal mt-10">
            <p class="font-display text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Bidang Usaha
            </p>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li
                v-for="area in businessAreas"
                :key="area"
                class="border border-slate-300 px-4 py-2 font-display text-sm font-semibold tracking-wider text-slate-800 uppercase"
              >
                {{ area }}
              </li>
            </ul>
          </div>
        </div>

        <dl class="reveal self-start border-t-4 border-primary bg-slate-50 lg:col-span-5">
          <div
            v-for="fact in facts"
            :key="fact.label"
            class="flex items-start gap-4 border-b border-slate-200 px-6 py-5 last:border-b-0"
          >
            <UIcon :name="fact.icon" class="mt-0.5 size-5 shrink-0 text-secondary" />
            <div>
              <dt class="font-display text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                {{ fact.label }}
              </dt>
              <dd class="mt-1 font-semibold text-slate-900">
                {{ fact.value }}
              </dd>
            </div>
          </div>
        </dl>
      </UContainer>
    </section>

    <!-- Vision & mission -->
    <section class="relative isolate overflow-hidden bg-ink-950 py-24 text-white md:py-32">
      <div class="absolute inset-0 -z-10 bg-blueprint" />
      <UContainer class="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div class="reveal">
          <div class="flex items-center gap-3">
            <span class="h-0.5 w-8 bg-secondary" />
            <h2 class="font-display text-sm font-semibold tracking-[0.25em] text-white/70 uppercase">
              Visi
            </h2>
          </div>
          <p class="mt-6 font-display text-3xl leading-tight font-semibold md:text-4xl">
            Menjadi sebuah perusahaan yang <span class="text-signal-400">produktif, tangguh dan terpercaya</span> pada setiap bidang yang dikerjakan dan selalu mengedepankan keselamatan dan kesehatan kerja.
          </p>
        </div>

        <div class="reveal">
          <div class="flex items-center gap-3">
            <span class="h-0.5 w-8 bg-secondary" />
            <h2 class="font-display text-sm font-semibold tracking-[0.25em] text-white/70 uppercase">
              Misi
            </h2>
          </div>
          <ol class="mt-6 divide-y divide-white/10 border-y border-white/10">
            <li v-for="(mission, i) in missions" :key="i" class="flex gap-6 py-6">
              <span class="font-display text-3xl leading-none font-bold text-cobalt-400">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <p class="leading-relaxed text-slate-300">
                {{ mission }}
              </p>
            </li>
          </ol>
        </div>
      </UContainer>
    </section>

    <!-- Quality policy -->
    <section class="bg-slate-50 py-24 md:py-32">
      <UContainer>
        <SectionHeading
          eyebrow="Kebijakan Mutu"
          title="Komitmen Kualitas"
          description="Sebagai General Contractor dan Supplier, kami berkomitmen penuh dalam setiap pengadaan barang dan jasa yang kami kerjakan."
        />
        <div class="mt-14 grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-3">
          <article v-for="(pillar, i) in qualityPillars" :key="pillar.title" class="reveal bg-white p-8">
            <div class="flex items-start justify-between">
              <span class="flex size-12 items-center justify-center bg-primary text-white">
                <UIcon :name="pillar.icon" class="size-6" />
              </span>
              <span class="font-display text-4xl leading-none font-bold text-slate-300">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
            </div>
            <h3 class="mt-6 font-display text-2xl font-bold tracking-wide text-slate-900 uppercase">
              {{ pillar.title }}
            </h3>
            <p class="mt-3 leading-relaxed text-slate-600">
              {{ pillar.text }}
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- K3 -->
    <section class="py-24 md:py-32">
      <UContainer>
        <div class="reveal grid overflow-hidden lg:grid-cols-5">
          <div class="relative isolate flex flex-col justify-end overflow-hidden bg-secondary p-10 text-white lg:col-span-2">
            <div class="absolute inset-x-0 top-0 h-2 bg-hazard opacity-40" />
            <UIcon name="i-lucide-shield-check" class="size-14" />
            <h2 class="mt-6 font-display text-4xl leading-none font-bold uppercase md:text-5xl">
              Kesehatan & Keselamatan Kerja
            </h2>
            <p class="mt-4 leading-relaxed text-white/85">
              Prioritas utama kami dalam setiap proyek — melindungi tenaga kerja dan lingkungan operasional.
            </p>
          </div>
          <div class="divide-y divide-slate-200 border border-slate-200 lg:col-span-3 lg:border-l-0">
            <div v-for="item in k3Commitments" :key="item.title" class="flex gap-5 p-8 md:p-10">
              <UIcon name="i-lucide-circle-check" class="mt-1 size-6 shrink-0 text-secondary" />
              <div>
                <h3 class="font-display text-2xl font-bold tracking-wide text-slate-900 uppercase">
                  {{ item.title }}
                </h3>
                <p class="mt-2 leading-relaxed text-slate-600">
                  {{ item.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Team -->
    <section v-if="team.length" class="border-t border-slate-200 bg-slate-50 py-24 md:py-32">
      <UContainer>
        <SectionHeading eyebrow="Tim Kami" title="Orang di Balik Pekerjaan" description="Tenaga profesional yang siap melayani kebutuhan proyek dan pengadaan Anda." />
        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="member in team"
            :key="member.id"
            class="reveal group flex flex-col border border-slate-200 bg-white transition-shadow hover:shadow-xl hover:shadow-primary/10"
          >
            <div
              class="relative flex items-center justify-center overflow-hidden bg-ink-900"
              :class="member.photoUrl ? 'aspect-[4/3]' : 'aspect-[16/7]'"
            >
              <div class="absolute inset-0 bg-blueprint" />
              <img
                v-if="member.photoUrl"
                :src="member.photoUrl"
                :alt="member.name"
                loading="lazy"
                class="relative size-full object-cover"
              >
              <span v-else class="relative font-display text-7xl font-bold text-white/90">
                {{ initials(member.name) }}
              </span>
              <span class="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
            </div>
            <div class="flex flex-1 flex-col p-6">
              <h3 class="font-display text-2xl font-bold tracking-wide text-slate-900 uppercase">
                {{ member.name }}
              </h3>
              <p v-if="member.role" class="mt-1 text-sm font-medium text-primary">
                {{ member.role }}
              </p>
              <p v-if="member.bio" class="mt-3 text-sm leading-relaxed text-slate-600">
                {{ member.bio }}
              </p>
              <div v-if="member.whatsapp || member.email" class="mt-auto flex gap-2 pt-6">
                <UButton
                  v-if="member.whatsapp"
                  :to="waLink(member.whatsapp)"
                  target="_blank"
                  icon="i-simple-icons-whatsapp"
                  color="success"
                  variant="soft"
                  size="sm"
                >
                  WhatsApp
                </UButton>
                <UButton
                  v-if="member.email"
                  :to="`mailto:${member.email}`"
                  icon="i-lucide-mail"
                  color="neutral"
                  variant="outline"
                  size="sm"
                >
                  Email
                </UButton>
              </div>
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <CtaBand />
  </div>
</template>
