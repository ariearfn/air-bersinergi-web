/** Content exported from the retired Supabase project, plus contact details from the old Kontak page. */

export const siteSettingsSeed = {
  siteName: 'PT. Anugerah Insan Ridho Bersinergi',
  siteDescription: 'General Contractor and Supplier - Industry, Construction, Mechanical, Electrical, Safety, and Engineering',
  contactEmail: 'afif@airbersinergi.com',
  contactPhone: '+62 895 4213 92455',
  whatsappNumber: '62895421392455',
  address: 'Perum Dukuh Zamrud Blok I 17 No 91, Kelurahan Cimuning, Kecamatan Mustika Jaya, Kota Bekasi, Provinsi Jawa Barat',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Perum+Dukuh+Zamrud+Blok+I+17+No+91,+Cimuning,+Mustika+Jaya,+Bekasi,+Jawa+Barat'
}

export const siteContentSeed = [
  {
    section: 'hero',
    title: 'Solusi Terpercaya untuk Kebutuhan Industri Anda',
    subtitle: 'PT. Anugerah Insan Ridho Bersinergi bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanikal, elektrikal, dan engineering.',
    sortOrder: 1
  },
  {
    section: 'about',
    title: 'Perusahaan yang Produktif, Tangguh dan Terpercaya',
    body: 'PT. Anugerah Insan Ridho Bersinergi merupakan perusahaan General Contractor and Supplier yang bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanikal, elektrikal, dan engineering. Perusahaan kami menawarkan kerja sama dengan berbagai perusahaan nasional, dan instansi pemerintah berdasarkan bidang keahlian perusahaan.',
    sortOrder: 2
  },
  {
    section: 'cta',
    title: 'Siap Bekerja Sama?',
    subtitle: 'Hubungi kami untuk konsultasi dan penawaran terbaik untuk kebutuhan proyek Anda',
    ctaText: 'Hubungi Kami Sekarang',
    ctaLink: '/kontak',
    sortOrder: 3
  }
]

export const servicesSeed = [
  {
    slug: 'construction',
    title: 'Construction',
    description: 'Jasa konstruksi bangunan dan infrastruktur',
    longDescription: 'Menyediakan layanan konstruksi meliputi pembangunan gedung, jalan, dan infrastruktur lainnya dengan standar kualitas tinggi.',
    icon: 'i-lucide-hard-hat',
    isFeatured: true
  },
  {
    slug: 'mechanical',
    title: 'Mechanical',
    description: 'Pengadaan dan instalasi mekanikal',
    longDescription: 'Layanan mekanikal termasuk instalasi pompa, kompresor, hydraulic, dan peralatan mekanis lainnya.',
    icon: 'i-lucide-cog',
    isFeatured: true
  },
  {
    slug: 'electrical',
    title: 'Electrical',
    description: 'Solusi kelistrikan dan elektrikal',
    longDescription: 'Menyediakan solusi elektrikal meliputi instalasi, maintenance, dan pengadaan komponen kelistrikan.',
    icon: 'i-lucide-zap',
    isFeatured: true
  },
  {
    slug: 'safety-equipment',
    title: 'Safety Equipment',
    description: 'Pengadaan peralatan keselamatan kerja',
    longDescription: 'Supplier peralatan K3 dan safety equipment berkualitas untuk kebutuhan industri.',
    icon: 'i-lucide-shield-check',
    isFeatured: false
  },
  {
    slug: 'engineering',
    title: 'Engineering',
    description: 'Jasa rekayasa dan engineering',
    longDescription: 'Layanan engineering meliputi design, fabrikasi, dan instalasi struktur baja serta komponen engineering.',
    icon: 'i-lucide-drafting-compass',
    isFeatured: true
  },
  {
    slug: 'industrial-supply',
    title: 'Industrial Supply',
    description: 'Pengadaan barang industri',
    longDescription: 'Supplier berbagai kebutuhan industri termasuk generator set, blower fan, dinamo, gear motor, dan tools.',
    icon: 'i-lucide-package',
    isFeatured: false
  }
]

export const teamSeed = [
  {
    name: 'Afif',
    role: 'Management',
    email: 'afif@airbersinergi.com',
    phone: '+62 895 4213 92455',
    whatsapp: '62895421392455',
    isContact: true
  },
  {
    name: 'Heri Suparno',
    role: 'Operations',
    email: 'herisuparno@airbersinergi.com',
    phone: '+62 821 7570 1119',
    whatsapp: '6282175701119',
    isContact: true
  },
  {
    name: 'Irfan Fakhri',
    role: 'Technical',
    email: 'irfanfakhri@airbersinergi.com',
    phone: '+62 822 8867 2745',
    whatsapp: '6282288672745',
    isContact: true
  }
]

export const clientsSeed = [
  { name: 'Combiphar', logoUrl: '/clients/combiphar.png' },
  { name: 'KAI Services', logoUrl: '/clients/kai-services.png' },
  { name: 'Meditap', logoUrl: '/clients/meditap.png' },
  { name: 'Mbiz', logoUrl: '/clients/mbiz.png' },
  { name: 'NHTS', logoUrl: '/clients/nhts.png' },
  { name: 'DDT', logoUrl: '/clients/ddt.png' },
  { name: 'Revass', logoUrl: '/clients/revass.png' },
  { name: 'Adhi', logoUrl: '/clients/adhi.png' },
  { name: 'Kaho', logoUrl: '/clients/kaho.png' },
  { name: 'AM/NS Indonesia', logoUrl: '/clients/amns-indonesia.png' },
  { name: 'Tekpak Indonesia', logoUrl: '/clients/tekpak.png' },
  { name: 'Multifacade', logoUrl: '/clients/multifacade.png' },
  { name: 'HK', logoUrl: '/clients/hk.png' },
  { name: 'SPU', logoUrl: '/clients/spu.png' },
  { name: 'Total Bangun Persada', logoUrl: '/clients/total-bangun-persada.png' },
  { name: 'Shin Sam-Plus', logoUrl: '/clients/shin-sam-plus.png' },
  { name: 'Angkasa Bumi Cemerlang', logoUrl: '/clients/angkasa-bumi.png' },
  { name: 'Busana Apparel Group', logoUrl: '/clients/busana-apparel.png' },
  { name: 'Sika', logoUrl: '/clients/sika.png' },
  { name: 'PT. Inti Polymeta', logoUrl: '/clients/inti-polymeta.png' },
  { name: 'Unilever', logoUrl: '/clients/unilever.png' },
  { name: 'PT. Karya Inti Karton', logoUrl: '/clients/karya-inti-karton.png' }
]
