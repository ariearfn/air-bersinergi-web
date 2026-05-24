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
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold mb-6">Informasi Kontak</h2>
              <div class="space-y-4">
                <UiCard class="p-4">
                  <div class="flex items-start gap-4">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-sm">Alamat</h4>
                      <p class="text-sm text-muted-foreground mt-1">Perum Dukuh Zamrud Blok I 17 No 91, Kelurahan Cimuning, Kecamatan Mustika Jaya, Kota Bekasi, Provinsi Jawa Barat</p>
                    </div>
                  </div>
                </UiCard>

                <UiCard class="p-4">
                  <div class="flex items-start gap-4">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-sm">Email</h4>
                      <div class="mt-1 space-y-1">
                        <p class="text-sm text-muted-foreground">afif@airbersinergi.com</p>
                        <p class="text-sm text-muted-foreground">herisuparno@airbersinergi.com</p>
                        <p class="text-sm text-muted-foreground">irfanfakhri@airbersinergi.com</p>
                      </div>
                    </div>
                  </div>
                </UiCard>

                <UiCard class="p-4">
                  <div class="flex items-start gap-4">
                    <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-sm">WhatsApp</h4>
                      <div class="mt-1 space-y-1">
                        <p class="text-sm text-muted-foreground">+62 895 4213 92455 (Afif)</p>
                        <p class="text-sm text-muted-foreground">+62 822 8867 2745 (Irfan)</p>
                        <p class="text-sm text-muted-foreground">+62 821 7570 1119 (Heri)</p>
                      </div>
                    </div>
                  </div>
                </UiCard>
              </div>
            </div>

            <a
              href="https://wa.me/6289542139245"
              target="_blank"
              class="flex items-center justify-center gap-2 w-full p-4 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp Langsung
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
