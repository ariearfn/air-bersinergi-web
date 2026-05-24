export type CatalogGroupId = 'machinery' | 'materials' | 'safety-tools'

export interface CatalogGroup {
  id: CatalogGroupId
  title: string
  description: string
}

export interface CatalogProduct {
  title: string
  description: string
  accent: 'primary' | 'secondary'
  group: CatalogGroupId
  detailSlug?: string
}

export const catalogGroups: CatalogGroup[] = [
  {
    id: 'machinery',
    title: 'Mesin & Peralatan Industri',
    description: 'Mesin, pompa, blower, motor, dan peralatan operasional pabrik & proyek.',
  },
  {
    id: 'materials',
    title: 'Material & Konstruksi',
    description: 'Material bangunan, baja, pipa, ducting, dan media surface preparation.',
  },
  {
    id: 'safety-tools',
    title: 'Keselamatan & Peralatan Kerja',
    description: 'APD/K3 dan power tools untuk pekerjaan lapangan & maintenance.',
  },
]

export const catalogProducts: CatalogProduct[] = [
  {
    title: 'Generator Set',
    description: 'Genset silent type dan open type untuk kebutuhan power backup industri, konstruksi, dan proyek skala menengah hingga besar.',
    accent: 'secondary',
    group: 'machinery',
  },
  {
    title: 'Construction Material',
    description: 'Material konstruksi berkualitas untuk kebutuhan proyek bangunan, infrastruktur, dan pengembangan fasilitas industri.',
    accent: 'primary',
    group: 'materials',
  },
  {
    title: 'Safety Equipment',
    description: 'Peralatan keselamatan kerja (K3) lengkap untuk melindungi tenaga kerja di lingkungan industri dan konstruksi.',
    accent: 'secondary',
    group: 'safety-tools',
    detailSlug: 'safety-equipment',
  },
  {
    title: 'Pump Machine',
    description: 'Pompa industri untuk sistem fluida, transfer cairan, dan aplikasi mekanikal pada berbagai sektor industri.',
    accent: 'primary',
    group: 'machinery',
    detailSlug: 'pump-machine',
  },
  {
    title: 'Blower Fan',
    description: 'Centrifugal blower fan dan peralatan ventilasi industri untuk sistem udara dan proses produksi.',
    accent: 'secondary',
    group: 'machinery',
    detailSlug: 'blower-fan',
  },
  {
    title: 'Dinamo & Gear Motor',
    description: 'Motor dinamo, gear motor, dan komponen penggerak untuk mesin industri dan peralatan mekanikal.',
    accent: 'primary',
    group: 'machinery',
    detailSlug: 'dynamo-gear-motor',
  },
  {
    title: 'Machinery & Tools',
    description: 'Peralatan mesin industri, kompresor, forklift, genset, boiler, dan tools untuk operasional pabrik dan proyek.',
    accent: 'secondary',
    group: 'machinery',
    detailSlug: 'machinery-tools',
  },
  {
    title: 'Tools Equipment',
    description: 'Peralatan tools untuk pekerjaan mekanikal, instalasi, dan maintenance industri.',
    accent: 'primary',
    group: 'safety-tools',
    detailSlug: 'tools-equipment',
  },
  {
    title: 'Steel, Plumbing & Ducting',
    description: 'Baja, pipa plumbing, ducting, dan komponen struktur untuk instalasi mekanikal dan konstruksi.',
    accent: 'primary',
    group: 'materials',
    detailSlug: 'steel-plumbing-ducting',
  },
  {
    title: 'Abrasive Sand',
    description: 'Abrasive sand dan material sand blasting untuk surface preparation dan finishing permukaan logam.',
    accent: 'secondary',
    group: 'materials',
    detailSlug: 'abrasive-sand',
  },
]

export function productsByGroup(groupId: CatalogGroupId) {
  return catalogProducts.filter(product => product.group === groupId)
}
