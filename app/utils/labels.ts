export const portfolioCategoryLabels = {
  project: 'Proyek',
  service: 'Service',
  pengadaan: 'Pengadaan'
} as const

export type PortfolioCategory = keyof typeof portfolioCategoryLabels

export const productGroupLabels = {
  'machinery': 'Mesin & Peralatan Industri',
  'materials': 'Material & Konstruksi',
  'safety-tools': 'Keselamatan & Peralatan Kerja'
} as const

export type ProductGroup = keyof typeof productGroupLabels
