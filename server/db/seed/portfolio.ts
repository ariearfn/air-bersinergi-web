export interface PortfolioImage {
  src: string
  alt: string
  caption?: string
}

export type PortfolioLayout = 'gallery' | 'caption-grid'

export type PortfolioCategoryId = 'project' | 'service' | 'pengadaan'

export interface PortfolioCategory {
  id: PortfolioCategoryId
  title: string
  description: string
  accent: 'primary' | 'secondary'
}

export interface PortfolioSection {
  slug: string
  title: string
  description?: string
  category: PortfolioCategoryId
  layout?: PortfolioLayout
  images: PortfolioImage[]
}

export const portfolioIntro = {
  company:
    'PT. Anugerah Insan Ridho Bersinergi sebagai perusahaan General Contractor and Supplier yang bergerak dibidang pengadaan barang dan jasa dalam bidang industri, kontruksi, mekanik, elektrik, dan engineering. Maka kami siap memberikan produk dan jasa berdasarkan dengan bidang yang kami tekuni maupun sesuai kebutuhan customer.',
  lead: 'Berikut, beberapa pekerjaan proyek, layanan service, dan pengadaan yang sudah kami kerjakan:',
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'project',
    title: 'Proyek',
    description: 'Pengerjaan konstruksi, instalasi, dan fabrikasi di lapangan.',
    accent: 'primary',
  },
  {
    id: 'service',
    title: 'Service',
    description: 'Servis, maintenance, dan perbaikan peralatan industri.',
    accent: 'secondary',
  },
  {
    id: 'pengadaan',
    title: 'Pengadaan',
    description: 'Pengadaan material, peralatan, dan suku cadang sesuai kebutuhan proyek.',
    accent: 'primary',
  },
]

export const portfolioSections: PortfolioSection[] = [
  {
    slug: 'road-construction-projects',
    title: 'Road Construction Projects',
    description: 'Dokumentasi pengerjaan jalan beton — dari pengecoran, screeding, hingga finishing.',
    category: 'project',
    layout: 'gallery',
    images: [
      {
        src: '/portfolio/road-construction/01.webp',
        alt: 'Pengecoran beton jalan dengan truk mixer',
      },
      {
        src: '/portfolio/road-construction/02.webp',
        alt: 'Tim pekerja meratakan permukaan beton jalan',
      },
      {
        src: '/portfolio/road-construction/03.webp',
        alt: 'Proses screeding dan finishing jalan beton',
      },
      {
        src: '/portfolio/road-construction/04.webp',
        alt: 'Pengerjaan jalan beton pada malam hari',
      },
    ],
  },
  {
    slug: 'construction-installation-projects',
    title: 'Construction & Installation Projects',
    description: 'Proyek waterproofing, epoxy flooring, fabrikasi baja, railing, dan instalasi compressor.',
    category: 'project',
    layout: 'caption-grid',
    images: [
      {
        src: '/portfolio/projects/epoxy-flooring.webp',
        alt: 'Epoxy Flooring Project',
        caption: 'Epoxy Flooring Project',
      },
      {
        src: '/portfolio/projects/building-waterproofing.webp',
        alt: 'Building Waterproofing Project',
        caption: 'Building Waterproofing Project',
      },
      {
        src: '/portfolio/projects/fabrikasi-baja.webp',
        alt: 'Fabrikasi Baja',
        caption: 'Fabrikasi Baja',
      },
      {
        src: '/portfolio/projects/hand-railing.webp',
        alt: 'Hand Railing Project',
        caption: 'Hand Railing Project',
      },
      {
        src: '/portfolio/projects/air-tank-compressor-installation.webp',
        alt: 'Air Tank Compressor Installation Project',
        caption: 'Air Tank Compressor Installation Project',
      },
      {
        src: '/portfolio/projects/air-compressor-piping-installation.webp',
        alt: 'Air Compressor Piping Installation Project',
        caption: 'Air Compressor Piping Installation Project',
      },
    ],
  },
  {
    slug: 'service-maintenance-projects',
    title: 'Service & Maintenance',
    description: 'Servis forklift, hydraulic press, genset, dan cooling tower.',
    category: 'service',
    layout: 'caption-grid',
    images: [
      {
        src: '/portfolio/projects/service-forklift.webp',
        alt: 'Service Forklift',
        caption: 'Service Forklift',
      },
      {
        src: '/portfolio/projects/service-hydraulic-50-ton.webp',
        alt: 'Service Hydraulic 50 Ton Project',
        caption: 'Service Hydraulic 50 Ton Project',
      },
      {
        src: '/portfolio/projects/service-hydraulic-press-5-ton.webp',
        alt: 'Service Mesin Hydraulic Press 5 Ton Project',
        caption: 'Service Mesin Hydraulic Press 5 Ton Project',
      },
      {
        src: '/portfolio/projects/service-genset-45-kva-silent-type.webp',
        alt: 'Service Genset 45 KVA Silent Type',
        caption: 'Service Genset 45 KVA Silent Type',
      },
      {
        src: '/portfolio/projects/cooling-tower-filler-replacement.webp',
        alt: 'Cooling Tower Filler Replacement Project',
        caption: 'Cooling Tower Filler Replacement Project',
      },
    ],
  },
  {
    slug: 'pengadaan-supply-projects',
    title: 'Pengadaan Material & Peralatan',
    description: 'Pengadaan blower fan, dust collector, valve, sand blasting, dan pagar BRC.',
    category: 'pengadaan',
    layout: 'caption-grid',
    images: [
      {
        src: '/portfolio/projects/pengadaan-centrifugal-blower-fan.webp',
        alt: 'Pengadaan Centrifugal Blower Fan',
        caption: 'Pengadaan Centrifugal Blower Fan',
      },
      {
        src: '/portfolio/projects/pengadaan-dust-collector.webp',
        alt: 'Pengadaan Dust Collector',
        caption: 'Pengadaan Dust Collector',
      },
      {
        src: '/portfolio/projects/pengadaan-electric-ball-valve-motorized.webp',
        alt: 'Pengadaan Electric Ball Valve Motorized',
        caption: 'Pengadaan Electric Ball Valve Motorized',
      },
      {
        src: '/portfolio/projects/pengadaan-foot-valve.webp',
        alt: 'Pengadaan Foot Valve',
        caption: 'Pengadaan Foot Valve',
      },
      {
        src: '/portfolio/projects/pengadaan-sand-blasting.webp',
        alt: 'Pengadaan Sand Blasting',
        caption: 'Pengadaan Sand Blasting',
      },
      {
        src: '/portfolio/projects/pengadaan-pagar-brc.webp',
        alt: 'Pengadaan Pagar BRC',
        caption: 'Pengadaan Pagar BRC',
      },
    ],
  },
]

export function portfolioImageCount() {
  return portfolioSections.reduce((total, section) => total + section.images.length, 0)
}

export function sectionsByCategory(categoryId: PortfolioCategoryId) {
  return portfolioSections.filter(section => section.category === categoryId)
}

export function imageCountByCategory(categoryId: PortfolioCategoryId) {
  return sectionsByCategory(categoryId).reduce((total, section) => total + section.images.length, 0)
}

export interface FeaturedPortfolioProject {
  slug: string
  title: string
  category: PortfolioCategoryId
  image: string
  alt: string
}

export const featuredPortfolioProjects: FeaturedPortfolioProject[] = [
  {
    slug: 'road-construction-projects',
    title: 'Road Construction Projects',
    category: 'project',
    image: '/portfolio/road-construction/01.webp',
    alt: 'Pengecoran beton jalan dengan truk mixer',
  },
  {
    slug: 'construction-installation-projects',
    title: 'Air Compressor Piping Installation',
    category: 'project',
    image: '/portfolio/projects/air-compressor-piping-installation.webp',
    alt: 'Air Compressor Piping Installation Project',
  },
  {
    slug: 'construction-installation-projects',
    title: 'Epoxy Flooring Project',
    category: 'project',
    image: '/portfolio/projects/epoxy-flooring.webp',
    alt: 'Epoxy Flooring Project',
  },
  {
    slug: 'service-maintenance-projects',
    title: 'Service Hydraulic 50 Ton',
    category: 'service',
    image: '/portfolio/projects/service-hydraulic-50-ton.webp',
    alt: 'Service Hydraulic 50 Ton Project',
  },
  {
    slug: 'service-maintenance-projects',
    title: 'Cooling Tower Filler Replacement',
    category: 'service',
    image: '/portfolio/projects/cooling-tower-filler-replacement.webp',
    alt: 'Cooling Tower Filler Replacement Project',
  },
  {
    slug: 'pengadaan-supply-projects',
    title: 'Pengadaan Centrifugal Blower Fan',
    category: 'pengadaan',
    image: '/portfolio/projects/pengadaan-centrifugal-blower-fan.webp',
    alt: 'Pengadaan Centrifugal Blower Fan',
  },
]

export function categoryLabel(categoryId: PortfolioCategoryId) {
  return portfolioCategories.find(c => c.id === categoryId)?.title ?? categoryId
}
