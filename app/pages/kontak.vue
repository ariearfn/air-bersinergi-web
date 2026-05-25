<script setup lang="ts">
const client = useSupabaseClient()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service_interest: '',
  message: '',
})

const loading = ref(false)
const success = ref(false)
const error = ref('')

const officeAddress = 'Perum Dukuh Zamrud Blok I 17 No 91, Kelurahan Cimuning, Kecamatan Mustika Jaya, Kota Bekasi, Provinsi Jawa Barat'

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Perum+Dukuh+Zamrud+Blok+I+17+No+91,+Cimuning,+Mustika+Jaya,+Bekasi,+Jawa+Barat'

const contactTeam = [
  {
    name: 'Afif',
    email: 'afif@airbersinergi.com',
    phone: '+62 895 4213 92455',
    whatsapp: '62895421392455',
    initials: 'AF',
  },
  {
    name: 'Heri Suparno',
    email: 'herisuparno@airbersinergi.com',
    phone: '+62 821 7570 1119',
    whatsapp: '6282175701119',
    initials: 'HS',
  },
  {
    name: 'Irfan Fakhri',
    email: 'irfanfakhri@airbersinergi.com',
    phone: '+62 822 8867 2745',
    whatsapp: '6282288672745',
    initials: 'IF',
  },
]

async function submitForm() {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const { error: err } = await client.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service_interest: form.service_interest,
      message: form.message,
      source: 'website',
    })

    if (err) throw err

    success.value = true
    Object.assign(form, { name: '', email: '', phone: '', service_interest: '', message: '' })
  } catch (e: any) {
    error.value = 'Gagal mengirim pesan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Kontak - PT. Air Bersinergi',
  description: 'Hubungi kami untuk konsultasi dan penawaran',
})
</script>

<template>
  <div>
    <section class="bg-gradient-to-br from-primary/95 to-primary text-primary-foreground py-16">
      <div class="container">
        <UiBadge variant="secondary" class="mb-4">Kontak</UiBadge>
        <h1 class="text-4xl font-bold">Hubungi Kami</h1>
        <p class="text-primary-foreground/80 mt-2 max-w-2xl">
          Siap melayani kebutuhan proyek dan pengadaan Anda
        </p>
      </div>
    </section>

    <section class="py-16">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <h2 class="text-2xl font-bold mb-6">Kirim Pesan</h2>

            <div v-if="success" class="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
              Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.
            </div>

            <div v-if="error" class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
              {{ error }}
            </div>

            <form @submit.prevent="submitForm" class="space-y-4">
              <div>
                <label for="name" class="text-sm font-medium mb-1.5 block">Nama Lengkap *</label>
                <UiInput id="name" v-model="form.name" placeholder="Nama Anda" required />
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="text-sm font-medium mb-1.5 block">Email *</label>
                  <UiInput id="email" v-model="form.email" type="email" placeholder="email@contoh.com" required />
                </div>
                <div>
                  <label for="phone" class="text-sm font-medium mb-1.5 block">Telepon / WhatsApp</label>
                  <UiInput id="phone" v-model="form.phone" placeholder="08xxx" />
                </div>
              </div>
              <div>
                <label for="service" class="text-sm font-medium mb-1.5 block">Bidang yang Dibutuhkan</label>
                <UiInput id="service" v-model="form.service_interest" placeholder="Contoh: Construction, Mechanical, dll" />
              </div>
              <div>
                <label for="message" class="text-sm font-medium mb-1.5 block">Pesan *</label>
                <UiTextarea id="message" v-model="form.message" placeholder="Detail kebutuhan Anda..." :rows="5" required />
              </div>
              <UiButton type="submit" :disabled="loading" class="w-full sm:w-auto">
                {{ loading ? 'Mengirim...' : 'Kirim Pesan' }}
              </UiButton>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div>
              <UiBadge variant="outline" class="mb-3">Tim Kami</UiBadge>
              <h2 class="text-2xl md:text-3xl font-bold">Informasi Kontak</h2>
              <p class="text-muted-foreground mt-2 leading-relaxed">
                Hubungi tim kami untuk konsultasi proyek, penawaran harga, atau informasi layanan.
              </p>
            </div>

            <div class="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-secondary/5 overflow-hidden shadow-sm">
              <div class="h-28 md:h-32 bg-gradient-to-br from-primary/20 to-secondary/10 relative overflow-hidden">
                <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.4),transparent_55%)]" />
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-14 h-14 rounded-2xl bg-background/90 shadow-lg flex items-center justify-center">
                    <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-5 md:p-6">
                <h3 class="font-semibold text-foreground">Kantor & Alamat</h3>
                <p class="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {{ officeAddress }}
                </p>
                <a
                  :href="mapsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Buka di Google Maps
                </a>
              </div>
            </div>

            <div class="space-y-3">
              <p class="text-sm font-semibold text-foreground px-1">Kontak Person</p>
              <div
                v-for="(person, index) in contactTeam"
                :key="person.email"
                class="group rounded-2xl border bg-card p-4 md:p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/25"
              >
                <div class="flex items-start gap-4">
                  <div
                    :class="index === 1 ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'"
                    class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
                  >
                    {{ person.initials }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <h4 class="font-semibold text-foreground">{{ person.name }}</h4>
                    <div class="mt-3 flex flex-col sm:flex-row sm:flex-wrap gap-2">
                      <a
                        :href="`mailto:${person.email}`"
                        class="inline-flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
                      >
                        <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span class="truncate">{{ person.email }}</span>
                      </a>
                      <a
                        :href="`https://wa.me/${person.whatsapp}?text=Halo%20${encodeURIComponent(person.name)}%2C%20saya%20ingin%20bertanya%20mengenai%20layanan%20PT.%20Air%20Bersinergi.`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 rounded-lg border bg-green-50 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-100 hover:border-green-200 transition-colors"
                      >
                        <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        {{ person.phone }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border bg-muted/30 p-4 md:p-5">
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold">Jam Respon</p>
                  <p class="text-sm text-muted-foreground mt-1">
                    Senin–Jumat, 08.00–17.00 WIB. Pesan via WhatsApp akan kami respon secepatnya.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/62895421392455?text=Halo%2C%20saya%20ingin%20bertanya%20mengenai%20layanan%20PT.%20Air%20Bersinergi."
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2.5 w-full p-4 rounded-2xl bg-green-600 text-white font-semibold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:shadow-green-700/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp Langsung
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
