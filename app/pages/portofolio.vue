<script setup lang="ts">
useSeoMeta({
  title: 'Portofolio — PT. Anugerah Insan Ridho Bersinergi',
  description: 'Dokumentasi proyek konstruksi, service mesin, dan pengadaan barang yang telah dikerjakan PT. Anugerah Insan Ridho Bersinergi.'
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Portofolio"
      title="Hasil Kerja di Lapangan"
      description="Dokumentasi pekerjaan proyek, service, dan pengadaan yang telah kami selesaikan untuk klien industri dan konstruksi."
      image="/portfolio/road-construction/02.webp"
    />

    <section class="py-20 md:py-28">
      <UContainer>
        <PortfolioGallery />
      </UContainer>
    </section>

    <CtaBand />
  </div>
</template>
