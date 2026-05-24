import type { CatalogGroupId } from './catalog-products'

export interface ProductItem {
  name: string
  model?: string
  description: string
  image?: string
  highlights?: string[]
}

export interface ProductCategoryDetail {
  slug: string
  title: string
  subtitle: string
  intro: string
  group: CatalogGroupId
  catalogImage?: string
  items: ProductItem[]
}

export const productCategoryDetails: ProductCategoryDetail[] = [
  {
    slug: 'machinery-tools',
    title: 'Machinery & Tools',
    subtitle: 'Peralatan Mesin & Tools Industri',
    group: 'machinery',
    intro: 'Kami menyediakan berbagai peralatan mesin dan tools industri untuk mendukung operasional pabrik, gudang, konstruksi, dan proyek engineering sesuai kebutuhan customer.',
    items: [
      {
        name: 'Rotary Screw Air Compressor',
        model: 'Kaeser ASD 60 T',
        description: 'Kompresor udara screw rotary berkualitas tinggi dengan teknologi SIGMA dan SFC untuk efisiensi energi optimal pada aplikasi industri.',
        image: '/products/machinery-tools/kaeser-compressor.png',
        highlights: ['Teknologi SIGMA & SFC', 'Efisiensi energi tinggi', 'Panel kontrol digital'],
      },
      {
        name: 'Manual Hydraulic Stacker',
        description: 'Stacker hidraulik manual untuk angkat dan pindah pallet di gudang atau workshop. Konstruksi baja kokoh dengan mekanisme chain lift yang andal.',
        image: '/products/machinery-tools/hydraulic-stacker.png',
        highlights: ['Operasi hidraulik manual', 'Safety mesh guard', 'Mudah manuver'],
      },
      {
        name: 'Portable Air Compressor',
        model: 'AIRMAN PDS400S',
        description: 'Kompresor udara portable towable untuk kebutuhan proyek konstruksi dan industri di lokasi remote. Desain trailer tahan kondisi lapangan.',
        image: '/products/machinery-tools/airman-compressor.png',
        highlights: ['Towable trailer unit', 'Kapasitas industri', 'Akses maintenance mudah'],
      },
      {
        name: 'Industrial Boiler',
        description: 'Boiler industri / pressure vessel untuk sistem steam dan proses termal pada pabrik. Finishing berkualitas dengan akses panel maintenance.',
        image: '/products/machinery-tools/industrial-boiler.png',
        highlights: ['Aplikasi steam & termal', 'Konstruksi heavy-duty', 'Siap instalasi proyek'],
      },
      {
        name: 'Industrial Forklift',
        model: 'Toyota 2.5 Ton',
        description: 'Forklift industri Toyota kapasitas 2.5 ton dengan fitur SAS (System of Active Stability) dan OPS untuk keselamatan operator.',
        image: '/products/machinery-tools/toyota-forklift.png',
        highlights: ['Kapasitas 2.5 ton', 'SAS & OPS safety', 'Cabin ergonomis'],
      },
      {
        name: 'Silent Generator Set',
        model: 'V-GEN Ultra Silent',
        description: 'Genset silent type dengan level kebisingan rendah (~65dB). Canopy soundproof untuk operasi di area sensitif seperti perkantoran dan fasilitas publik.',
        image: '/products/machinery-tools/vgen-genset.png',
        highlights: ['Ultra silent ~65dB', 'Canopy soundproof', 'Digital control panel'],
      },
    ],
  },
  {
    slug: 'pump-machine',
    title: 'Pump Machine',
    subtitle: 'Pompa Industri & Fluid Handling',
    group: 'machinery',
    intro: 'Kami menyediakan berbagai jenis pompa industri untuk transfer cairan, dewatering, wastewater, dan aplikasi fluid handling pada pabrik, konstruksi, dan utilitas.',
    items: [
      {
        name: 'Vertical Sump Pump',
        description: 'Pompa sump vertikal dengan motor listrik untuk aplikasi tank, pit, dan sump. Flange mounting dengan discharge outlet horizontal.',
        image: '/products/pump-machine/vertical-sump-pump-orange.png',
        highlights: ['Vertical installation', 'Flange mounting plate', 'Horizontal discharge outlet'],
      },
      {
        name: 'Vertical Cantilever Pump',
        description: 'Pompa cantilever vertikal dengan shaft panjang untuk transfer cairan dari tank dalam atau pit tanpa bearing submerged.',
        image: '/products/pump-machine/vertical-sump-pump-blue.png',
        highlights: ['Cantilever shaft design', 'Over-tank mounting', 'Maintenance-friendly'],
      },
      {
        name: 'Peristaltic / Hose Pump',
        description: 'Pompa peristaltic untuk handling fluida abrasif, viscous, atau slurry. Desain hose squeeze dengan flange connection.',
        image: '/products/pump-machine/peristaltic-pump.png',
        highlights: ['Abrasive & slurry handling', 'Hose squeeze mechanism', 'Flange inlet/outlet'],
      },
      {
        name: 'Centrifugal Pump',
        description: 'Pompa sentrifugal dengan casing stainless steel dan motor listrik untuk transfer cairan bersih maupun proses industri.',
        image: '/products/pump-machine/centrifugal-pump.png',
        highlights: ['Stainless steel volute', 'Electric motor driven', 'Suction & discharge flange'],
      },
      {
        name: 'Submersible Pump',
        description: 'Pompa submersible heavy-duty untuk dewatering, wastewater, dan aplikasi submerged dengan discharge flange dan strainer intake.',
        image: '/products/pump-machine/submersible-pump.png',
        highlights: ['Fully submersible', 'Built-in strainer cage', 'Heavy-duty cast housing'],
      },
    ],
  },
  {
    slug: 'blower-fan',
    title: 'Blower Fan',
    subtitle: 'Centrifugal Blower & Ventilasi Industri',
    group: 'machinery',
    intro: 'Kami menyediakan centrifugal blower fan dan axial fan untuk sistem ventilasi industri, exhaust, cooling, dan proses produksi pada pabrik dan proyek engineering.',
    items: [
      {
        name: 'Centrifugal Fan',
        model: 'DE150',
        description: 'Blower sentrifugal compact dengan housing volute untuk aplikasi ventilasi ringan. Kapasitas udara 1000 m³/h dengan motor 0.2 kW.',
        image: '/products/blower-fan/centrifugal-fan-de150.png',
        highlights: ['1000 m³/h airflow', '0.2 kW motor', '450 Pa static pressure'],
      },
      {
        name: 'Industrial Centrifugal Blower',
        description: 'Blower sentrifugal heavy-duty dengan housing spiral dan base frame baja untuk sistem exhaust dan ventilasi skala menengah.',
        image: '/products/blower-fan/centrifugal-blower-blue.png',
        highlights: ['Heavy-duty volute housing', 'Steel mounting frame', 'Flanged discharge outlet'],
      },
      {
        name: 'Centrifugal Blower with Motor',
        description: 'Unit blower sentrifugal dengan motor listrik terintegrasi, housing hammered finish, dan stand mounting untuk instalasi permanen.',
        image: '/products/blower-fan/centrifugal-blower-grey.png',
        highlights: ['Integrated electric motor', 'Rectangular discharge flange', 'Bolt-down mounting base'],
      },
      {
        name: 'Axial Duct Fan',
        model: 'CKE',
        description: 'Axial fan duct-type dengan wire safety grille untuk aplikasi ventilasi high-volume, cooling tower, dan exhaust system.',
        image: '/products/blower-fan/axial-fan-cke.png',
        highlights: ['Duct-mount flange', 'Wire mesh safety guard', 'High-volume airflow'],
      },
    ],
  },
  {
    slug: 'dynamo-gear-motor',
    title: 'Dinamo & Gear Motor',
    subtitle: 'Motor Listrik & Gear Motor Industri',
    group: 'machinery',
    intro: 'Kami menyediakan motor listrik (dinamo), worm gear motor, helical gear motor, dan motor-driven assembly untuk penggerak mesin industri, conveyor, mixer, dan peralatan mekanikal.',
    items: [
      {
        name: 'Worm Gear Motor',
        model: 'NMRV',
        description: 'Gear motor worm type dengan motor listrik silver dan gearbox biru untuk reduksi kecepatan dan peningkatan torsi pada aplikasi industri.',
        image: '/products/dynamo-gear-motor/worm-gear-motor-nmrv.png',
        highlights: ['NMRV worm gearbox', 'Speed reduction & torque boost', 'Flange motor coupling'],
      },
      {
        name: 'Industrial Electric Motor',
        model: 'TECO',
        description: 'Motor listrik industri TECO dengan frame cooling fin, terminal box, dan lifting eyebolt untuk aplikasi penggerak mesin berat.',
        image: '/products/dynamo-gear-motor/electric-motor-teco.png',
        highlights: ['TECO brand motor', 'Cooling fin frame', 'Heavy-duty shaft output'],
      },
      {
        name: 'Motor Pump Set',
        model: 'EBARA',
        description: 'Unit motor listrik coupled dengan pompa sentrifugal EBARA pada baseplate baja, lengkap dengan coupling guard untuk instalasi siap pakai.',
        image: '/products/dynamo-gear-motor/motor-pump-set-ebara.png',
        highlights: ['Motor-pump coupled unit', 'Steel baseplate mounting', 'Yellow coupling safety guard'],
      },
      {
        name: 'Helical Gear Motor',
        description: 'Gear motor helical inline dan shaft-mounted berbagai konfigurasi output untuk conveyor, agitator, dan mesin produksi.',
        image: '/products/dynamo-gear-motor/helical-gear-motor.png',
        highlights: ['Inline & shaft-mounted types', 'Horizontal output shaft', 'Industrial blue gearbox'],
      },
    ],
  },
  {
    slug: 'tools-equipment',
    title: 'Tools Equipment',
    subtitle: 'Power Tools & Peralatan Kerja',
    group: 'safety-tools',
    intro: 'Kami menyediakan power tools cordless dan peralatan kerja berkualitas untuk pekerjaan mekanikal, instalasi, maintenance, dan proyek konstruksi dari merek terpercaya.',
    items: [
      {
        name: 'Bosch 12V Max Cordless Tools',
        description: 'Rangkaian power tools cordless Bosch 12V Max untuk drilling, cutting, dan driving — termasuk multi-tool, jigsaw, FlexiClick 5-in-1, drill/driver, impact driver, serta battery & charger.',
        image: '/products/tools-equipment/bosch-cordless-tools.png',
        highlights: ['GOP12V-28 oscillating multi-tool', 'JS120 jigsaw & FlexiClick 5-in-1', 'Drill/driver, impact driver & masonry bits'],
      },
      {
        name: 'Makita 18V LXT Cordless Tools',
        model: '18V 5.0Ah',
        description: 'Ekosistem power tools Makita 18V LXT lithium-ion untuk konstruksi, woodworking, dan landscaping dengan satu platform baterai serbaguna.',
        image: '/products/tools-equipment/makita-lxt-tools.png',
        highlights: ['18V LXT 5.0Ah battery platform', 'Saw, drill, grinder & blower', 'Outdoor & construction tools'],
      },
    ],
  },
  {
    slug: 'safety-equipment',
    title: 'Safety Equipment',
    subtitle: 'Alat Pelindung Diri (APD / K3)',
    group: 'safety-tools',
    intro: 'Kami menyediakan peralatan keselamatan kerja (K3) lengkap — dari pelindung kepala, mata, pernapasan, tubuh, tangan, hingga kaki — untuk melindungi tenaga kerja di lingkungan industri dan konstruksi.',
    catalogImage: '/products/safety-equipment/catalog.png',
    items: [
      {
        name: 'Safety Helmet (Hard Hat)',
        description: 'Helm proyek industri dengan suspension harness untuk proteksi kepala dari benturan dan benda jatuh.',
        highlights: ['Berbagai warna (kuning, orange)', 'Suspension harness adjustable', 'Standar SNI / ANSI'],
      },
      {
        name: 'Safety Glasses & Goggles',
        description: 'Kacamata safety dengan lensa clear dan tinted untuk proteksi mata dari debu, percikan, dan cahaya UV.',
        highlights: ['Lensa clear & smoke', 'Frame ergonomis', 'Anti-scratch coating'],
      },
      {
        name: 'Respiratory Protection',
        description: 'Masker N95, masker bedah, dan masker kain untuk proteksi pernapasan dari debu, partikel, dan kontaminan udara.',
        highlights: ['N95 respirator', 'Surgical & fabric mask', 'Filtrasi partikel halus'],
      },
      {
        name: 'High-Visibility Safety Vest',
        description: 'Rompi safety reflector berwarna orange dan lime-yellow dengan pita reflektif untuk visibilitas di area kerja.',
        highlights: ['Reflective stripe V & horizontal', 'Mesh & solid fabric', 'Orange & lime-yellow'],
      },
      {
        name: 'Work Gloves',
        description: 'Sarung tangan kerja rajut dan disposable untuk handling material, assembly, dan pekerjaan ringan.',
        highlights: ['Knitted cotton gloves', 'Coated palm grip', 'Disposable latex/nitrile'],
      },
      {
        name: 'Heavy-Duty & Specialized Gloves',
        description: 'Sarung tangan khusus untuk aplikasi berat — heat resistant, chemical resistant, welding, dan industrial grip.',
        highlights: ['Heat & cut resistant mitten', 'Chemical resistant PVC', 'Leather welding glove'],
      },
      {
        name: 'Safety Footwear',
        description: 'Sepatu dan boot safety berbahan kulit dengan sol anti-slip dan toe cap untuk proteksi kaki di area kerja.',
        highlights: ['Chelsea boot & lace-up', 'Slip-on safety shoe', 'Anti-slip sole & toe cap'],
      },
    ],
  },
  {
    slug: 'steel-plumbing-ducting',
    title: 'Steel, Plumbing & Ducting',
    subtitle: 'Baja, Pipa & Ducting Industri',
    group: 'materials',
    intro: 'Kami menyediakan berbagai material baja, pipa plumbing, fitting, wire mesh, dan ducting untuk kebutuhan konstruksi, instalasi mekanikal, dan proyek engineering sesuai spesifikasi customer.',
    items: [
      {
        name: 'Steel Rebar (Besi Beton)',
        description: 'Besi tulangan beton (rebar) berkualitas untuk struktur beton bertulang pada proyek konstruksi bangunan dan infrastruktur.',
        image: '/products/steel-plumbing-ducting/rebar.png',
        highlights: ['Berbagai diameter tersedia', 'Standar SNI / ASTM', 'Untuk struktur beton bertulang'],
      },
      {
        name: 'Pipe Fittings & Flanges',
        description: 'Fitting pipa baja dan flange untuk sistem perpipaan industri — elbow, tee, reducer, stub end, dan end cap.',
        image: '/products/steel-plumbing-ducting/pipe-fittings.png',
        highlights: ['Elbow, tee, reducer', 'Flange & end cap', 'Material carbon steel'],
      },
      {
        name: 'Welded Wire Mesh',
        description: 'Wire mesh las galvanis untuk penguatan beton, pagar, dan aplikasi konstruksi dengan berbagai ukuran opening.',
        image: '/products/steel-plumbing-ducting/wire-mesh.png',
        highlights: ['Galvanized finish', 'Berbagai ukuran mesh', 'Untuk penguatan beton & pagar'],
      },
      {
        name: 'C-Channel / Strut Channel',
        description: 'Baja profil C-channel dan strut channel berbagai ukuran untuk sistem penyangga pipa, ducting, dan instalasi mekanikal.',
        image: '/products/steel-plumbing-ducting/c-channel.png',
        highlights: ['Multi ukuran profil', 'Untuk pipe support', 'Konstruksi baja kokoh'],
      },
      {
        name: 'Reinforced Industrial Hose',
        description: 'Selang industri reinforced dengan anyaman polyester untuk transfer fluida, udara, dan aplikasi tekanan sedang.',
        image: '/products/steel-plumbing-ducting/reinforced-hose.png',
        highlights: ['Reinforced braided', 'Transparan / berwarna', 'Fleksibel & tahan tekanan'],
      },
      {
        name: 'Corrugated Metal Panels',
        description: 'Panel baja bergelombang (corrugated) untuk atap, dinding, dan aplikasi cladding konstruksi industri.',
        image: '/products/steel-plumbing-ducting/corrugated-panels.png',
        highlights: ['Profil trapezoidal', 'Galvanized / coated', 'Atap & dinding industri'],
      },
      {
        name: 'PVC Pipes',
        model: 'DRVCO PVC AW',
        description: 'Pipa PVC AW berbagai diameter untuk sistem plumbing, drainase, dan instalasi air bersih maupun limbah.',
        image: '/products/steel-plumbing-ducting/pvc-pipes.png',
        highlights: ['Berbagai diameter', 'Standar AW', 'Bell-end & plain-end'],
      },
      {
        name: 'Flexible Duct Hose',
        description: 'Ducting fleksibel transparan dengan spiral wire reinforcement untuk ventilasi, dust collection, dan exhaust system.',
        image: '/products/steel-plumbing-ducting/flexible-duct-clear.png',
        highlights: ['Spiral wire reinforced', 'Transparan corrugated', 'Ventilasi & dust collection'],
      },
      {
        name: 'Wire Mesh Roll',
        description: 'Roll wire mesh galvanis untuk kebutuhan pagar, penguatan, dan aplikasi konstruksi skala proyek.',
        image: '/products/steel-plumbing-ducting/wire-mesh-roll.png',
        highlights: ['Roll format praktis', 'Galvanized steel', 'Berbagai lebar roll'],
      },
      {
        name: 'HDPE Pipes',
        description: 'Pipa HDPE berdiameter besar untuk sistem perpipaan air, gas, dan infrastruktur dengan garis identifikasi biru.',
        image: '/products/steel-plumbing-ducting/hdpe-pipes.png',
        highlights: ['Diameter besar', 'Tahan korosi', 'Infrastruktur & utilitas'],
      },
      {
        name: 'Flexible Ventilation Duct',
        description: 'Ducting ventilasi fleksibel berwarna orange dengan spiral reinforcement untuk portable blower dan exhaust system.',
        image: '/products/steel-plumbing-ducting/flexible-duct-orange.png',
        highlights: ['Safety orange color', 'Spiral reinforced', 'Portable blower compatible'],
      },
    ],
  },
  {
    slug: 'abrasive-sand',
    title: 'Abrasive Sand',
    subtitle: 'Media Sand Blasting & Surface Preparation',
    group: 'materials',
    intro: 'Kami menyediakan berbagai jenis abrasive sand dan media blasting untuk surface preparation, cleaning, deburring, dan finishing permukaan logam sesuai kebutuhan proyek industri dan konstruksi.',
    catalogImage: '/products/abrasive-sand/catalog.png',
    items: [
      {
        name: 'Steel Shot',
        model: 'S780 – S110',
        description: 'Media blasting berbentuk bulat (spherical) untuk peening, cleaning, dan finishing permukaan logam dengan berbagai grade ukuran.',
        highlights: ['Bentuk bulat seragam', 'Grade S780 hingga S110', 'Aplikasi shot peening & cleaning'],
      },
      {
        name: 'Steel Grit',
        model: 'G10 – G120',
        description: 'Media blasting angular untuk surface preparation agresif, removal coating, dan profiling permukaan baja.',
        highlights: ['Partikel angular tajam', 'Grade G10 hingga G120', 'Profil permukaan optimal'],
      },
      {
        name: 'Vulcanic Sand',
        description: 'Media blasting halus berwarna abu gelap untuk aplikasi cleaning permukaan dengan hasil finish halus dan seragam.',
        highlights: ['Tekstur halus', 'Cocok untuk finishing', 'Hasil permukaan bersih'],
      },
      {
        name: 'Coal Slag',
        description: 'Abrasive angular dari slag batubara untuk sand blasting berat pada konstruksi baja dan removal karat/paint.',
        highlights: ['Partikel angular kasar', 'Efektif untuk heavy blasting', 'Ekonomis untuk proyek besar'],
      },
      {
        name: 'Garnet Sand',
        description: 'Garnet alam berwarna merah bata, media blasting populer untuk surface preparation dengan debu minimal.',
        highlights: ['Warna merah bata khas', 'Low dust emission', 'Reusable & eco-friendly'],
      },
      {
        name: 'Copper Slag',
        description: 'Slag tembaga berwarna hijau kehitaman untuk sand blasting industri dengan performa cutting yang baik.',
        highlights: ['Cutting performance tinggi', 'Partikel angular seragam', 'Aplikasi industri & marine'],
      },
      {
        name: 'Brown Aluminium Oxide',
        description: 'Aluminium oksida coklat untuk blasting, grinding, dan surface finishing pada logam keras.',
        highlights: ['Keras & tahan aus', 'Multi-grade tersedia', 'Finishing logam keras'],
      },
      {
        name: 'Glass Beads',
        description: 'Manik-manik kaca transparan untuk peening dan finishing halus tanpa merusak dimensi permukaan.',
        highlights: ['Finish halus & satin', 'Tidak merusak dimensi', 'Peening & cosmetic finish'],
      },
      {
        name: 'White Aluminium Oxide',
        description: 'Aluminium oksida putih grade tinggi untuk precision blasting, grinding, dan aplikasi yang membutuhkan kontaminasi minimal.',
        highlights: ['Grade tinggi putih bersih', 'Precision blasting', 'Kontaminasi minimal'],
      },
    ],
  },
]

export function getCategoryDetail(slug: string) {
  return productCategoryDetails.find(c => c.slug === slug)
}

export function categoriesByGroup(groupId: CatalogGroupId) {
  return productCategoryDetails.filter(category => category.group === groupId)
}
