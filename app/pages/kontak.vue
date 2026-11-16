<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { settings } = useSite()
const [{ data: team }, { data: services }] = await Promise.all([
  useFetch('/api/team', { key: 'team', default: () => [] }),
  useFetch('/api/services', { key: 'services', default: () => [] })
])

const contacts = computed(() => team.value.filter(m => m.isContact))
const serviceOptions = computed(() => [...services.value.map(s => s.title), 'Pengadaan Barang', 'Lainnya'])

const schema = z.object({
  name: z.string().trim().min(2, 'Nama minimal 2 karakter'),
  email: z.email('Email tidak valid'),
  phone: z.string().trim().max(40).optional(),
  serviceInterest: z.string().optional(),
  message: z.string().trim().min(10, 'Pesan minimal 10 karakter'),
  website: z.string().optional()
})
type Schema = z.output<typeof schema>

const emptyState = (): Partial<Schema> => ({ name: '', email: '', phone: '', serviceInterest: undefined, message: '', website: '' })
const state = reactive(emptyState())
const loading = ref(false)
const sent = ref(false)
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: event.data })
    sent.value = true
    Object.assign(state, emptyState())
  }
  catch (err) {
    const message = (err as { data?: { statusMessage?: string } }).data?.statusMessage
    toast.add({ title: 'Gagal mengirim pesan', description: message || 'Silakan coba lagi atau hubungi kami via WhatsApp.', color: 'error' })
  }
  finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Kontak — PT. Anugerah Insan Ridho Bersinergi',
  description: 'Hubungi PT. Anugerah Insan Ridho Bersinergi untuk konsultasi proyek dan penawaran pengadaan barang & jasa industri.'
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Kontak"
      title="Mari Diskusikan Proyek Anda"
      description="Konsultasi gratis untuk kebutuhan konstruksi, mekanikal, elektrikal, dan pengadaan. Tim kami merespons di jam kerja."
      image="/portfolio/projects/service-genset-45-kva-silent-type.webp"
    />

    <section class="py-24 md:py-32">
      <UContainer class="grid gap-14 lg:grid-cols-12">
        <!-- Form -->
        <div class="lg:col-span-7">
          <SectionHeading eyebrow="Kirim Pesan" title="Minta Penawaran" description="Isi formulir berikut, kami akan menghubungi Anda kembali melalui email atau WhatsApp." />

          <div v-if="sent" class="mt-10 border-l-4 border-success bg-green-50 p-8">
            <UIcon name="i-lucide-circle-check" class="size-10 text-success" />
            <h3 class="mt-4 font-display text-3xl font-bold text-slate-900 uppercase">
              Pesan Terkirim
            </h3>
            <p class="mt-2 text-slate-600">
              Terima kasih! Tim kami akan segera menghubungi Anda.
            </p>
            <UButton class="mt-6" variant="outline" @click="sent = false">
              Kirim pesan lain
            </UButton>
          </div>

          <UForm
            v-else
            :schema="schema"
            :state="state"
            class="mt-10 space-y-5"
            @submit="onSubmit"
          >
            <UFormField label="Nama Lengkap" name="name" required>
              <UInput v-model="state.name" placeholder="Nama Anda" size="xl" class="w-full" />
            </UFormField>
            <div class="grid gap-5 sm:grid-cols-2">
              <UFormField label="Email" name="email" required>
                <UInput v-model="state.email" type="email" placeholder="email@perusahaan.com" size="xl" class="w-full" />
              </UFormField>
              <UFormField label="Telepon / WhatsApp" name="phone">
                <UInput v-model="state.phone" type="tel" placeholder="08xx xxxx xxxx" size="xl" class="w-full" />
              </UFormField>
            </div>
            <UFormField label="Bidang yang Dibutuhkan" name="serviceInterest">
              <USelect v-model="state.serviceInterest" :items="serviceOptions" placeholder="Pilih bidang" size="xl" class="w-full" />
            </UFormField>
            <UFormField label="Pesan" name="message" required>
              <UTextarea v-model="state.message" :rows="6" placeholder="Jelaskan kebutuhan, spesifikasi, jumlah, atau lokasi proyek…" size="xl" class="w-full" />
            </UFormField>
            <input
              v-model="state.website"
              type="text"
              name="website"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="absolute -left-[9999px] size-px opacity-0"
            >
            <UButton type="submit" size="xl" color="secondary" :loading="loading" trailing-icon="i-lucide-send">
              Kirim Pesan
            </UButton>
          </UForm>
        </div>

        <!-- Contact info -->
        <aside class="space-y-8 lg:col-span-5">
          <div v-if="contacts.length" class="reveal">
            <p class="font-display text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Kontak Person
            </p>
            <ul class="mt-4 divide-y divide-slate-200 border border-slate-200">
              <li v-for="person in contacts" :key="person.id" class="flex items-center gap-4 p-5">
                <span class="flex size-12 shrink-0 items-center justify-center bg-ink-900 font-display text-lg font-bold text-white">
                  {{ person.name.split(/\s+/).slice(0, 2).map(w => w[0]).join('') }}
                </span>
                <div class="min-w-0 flex-1">
                  <p class="font-display text-xl font-bold tracking-wide text-slate-900 uppercase">
                    {{ person.name }}
                  </p>
                  <a v-if="person.email" :href="`mailto:${person.email}`" class="block truncate text-sm text-slate-500 hover:text-primary">
                    {{ person.email }}
                  </a>
                </div>
                <UButton
                  v-if="person.whatsapp"
                  :to="waLink(person.whatsapp)"
                  target="_blank"
                  icon="i-simple-icons-whatsapp"
                  color="success"
                  square
                  :aria-label="`WhatsApp ${person.name}`"
                />
              </li>
            </ul>
          </div>

          <div class="reveal bg-ink-950 text-white">
            <div class="p-6">
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-map-pin" class="mt-0.5 size-5 shrink-0 text-signal-400" />
                <div>
                  <p class="font-display text-lg font-bold tracking-wide uppercase">
                    Kantor
                  </p>
                  <p class="mt-1 text-sm leading-relaxed text-slate-300">
                    {{ settings?.address }}
                  </p>
                </div>
              </div>
              <div class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a v-if="settings?.contactEmail" :href="`mailto:${settings.contactEmail}`" class="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                  <UIcon name="i-lucide-mail" class="size-4" /> {{ settings.contactEmail }}
                </a>
                <a v-if="settings?.mapsUrl" :href="settings.mapsUrl" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                  <UIcon name="i-lucide-external-link" class="size-4" /> Buka di Google Maps
                </a>
              </div>
            </div>
            <iframe
              v-if="settings?.address"
              :src="mapsEmbedUrl(settings.address)"
              title="Lokasi kantor di Google Maps"
              class="block aspect-[4/3] w-full border-0 grayscale-[40%]"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </UContainer>
    </section>
  </div>
</template>
