<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const client = useSupabaseClient()
const saving = ref(false)
const saved = ref(false)

const { data: settings, refresh } = await useAsyncData('admin-settings', async () => {
  const { data } = await client.from('site_settings').select('*').single()
  return data
})

const form = reactive({
  site_name: '',
  site_description: '',
  contact_email: '',
  contact_phone: '',
  whatsapp_number: '',
  address: '',
  social_instagram: '',
  social_facebook: '',
  social_linkedin: '',
})

watchEffect(() => {
  if (settings.value) {
    Object.assign(form, {
      site_name: settings.value.site_name || '',
      site_description: settings.value.site_description || '',
      contact_email: settings.value.contact_email || '',
      contact_phone: settings.value.contact_phone || '',
      whatsapp_number: settings.value.whatsapp_number || '',
      address: settings.value.address || '',
      social_instagram: settings.value.social_instagram || '',
      social_facebook: settings.value.social_facebook || '',
      social_linkedin: settings.value.social_linkedin || '',
    })
  }
})

async function save() {
  saving.value = true
  saved.value = false

  try {
    const { error } = await client
      .from('site_settings')
      .update({ ...form, updated_at: new Date().toISOString() })
      .eq('id', settings.value?.id)

    if (error) throw error
    saved.value = true
    await refresh()
    setTimeout(() => { saved.value = false }, 3000)
  } catch (e) {
    alert('Gagal menyimpan pengaturan')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Pengaturan Situs</h1>
      <UiButton @click="save" :disabled="saving">
        {{ saving ? 'Menyimpan...' : 'Simpan' }}
      </UiButton>
    </div>

    <div v-if="saved" class="mb-4 p-3 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm">
      Pengaturan berhasil disimpan!
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <UiCard class="p-5">
        <h3 class="font-semibold mb-4">Informasi Umum</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">Nama Situs</label>
            <UiInput v-model="form.site_name" placeholder="PT. Air Bersinergi" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Deskripsi Situs</label>
            <UiTextarea v-model="form.site_description" placeholder="Deskripsi singkat..." :rows="3" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Alamat</label>
            <UiTextarea v-model="form.address" placeholder="Alamat lengkap..." :rows="3" />
          </div>
        </div>
      </UiCard>

      <UiCard class="p-5">
        <h3 class="font-semibold mb-4">Kontak</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">Email</label>
            <UiInput v-model="form.contact_email" type="email" placeholder="email@company.com" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Telepon</label>
            <UiInput v-model="form.contact_phone" placeholder="+62 xxx" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">WhatsApp</label>
            <UiInput v-model="form.whatsapp_number" placeholder="+62 xxx" />
          </div>
        </div>
      </UiCard>

      <UiCard class="p-5">
        <h3 class="font-semibold mb-4">Media Sosial</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">Instagram</label>
            <UiInput v-model="form.social_instagram" placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Facebook</label>
            <UiInput v-model="form.social_facebook" placeholder="https://facebook.com/..." />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">LinkedIn</label>
            <UiInput v-model="form.social_linkedin" placeholder="https://linkedin.com/..." />
          </div>
        </div>
      </UiCard>
    </div>
  </div>
</template>
