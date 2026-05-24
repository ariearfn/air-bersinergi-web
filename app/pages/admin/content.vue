<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const client = useSupabaseClient()
const saving = ref(false)
const editingId = ref<number | null>(null)

const { data: contents, refresh } = await useAsyncData('admin-content', async () => {
  const { data } = await client.from('site_content').select('*').order('sort_order')
  return data || []
})

const editForm = reactive({
  title: '',
  subtitle: '',
  body: '',
  cta_text: '',
  cta_link: '',
  is_visible: true,
})

function startEdit(item: any) {
  editingId.value = item.id
  Object.assign(editForm, {
    title: item.title || '',
    subtitle: item.subtitle || '',
    body: item.body || '',
    cta_text: item.cta_text || '',
    cta_link: item.cta_link || '',
    is_visible: item.is_visible ?? true,
  })
}

function cancelEdit() {
  editingId.value = null
}

async function saveItem(id: number) {
  saving.value = true
  try {
    const { error } = await client
      .from('site_content')
      .update({ ...editForm, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
    editingId.value = null
    await refresh()
  } catch (e) {
    alert('Gagal menyimpan')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Konten Halaman</h1>

    <div class="space-y-4">
      <UiCard v-for="item in contents" :key="item.id" class="p-5">
        <div v-if="editingId === item.id">
          <div class="flex items-center justify-between mb-4">
            <UiBadge>{{ item.section }}</UiBadge>
            <div class="flex gap-2">
              <UiButton size="sm" variant="ghost" @click="cancelEdit">Batal</UiButton>
              <UiButton size="sm" @click="saveItem(item.id)" :disabled="saving">
                {{ saving ? 'Menyimpan...' : 'Simpan' }}
              </UiButton>
            </div>
          </div>
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium mb-1 block">Judul</label>
              <UiInput v-model="editForm.title" />
            </div>
            <div>
              <label class="text-sm font-medium mb-1 block">Subtitle</label>
              <UiInput v-model="editForm.subtitle" />
            </div>
            <div>
              <label class="text-sm font-medium mb-1 block">Konten</label>
              <UiTextarea v-model="editForm.body" :rows="4" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-sm font-medium mb-1 block">CTA Text</label>
                <UiInput v-model="editForm.cta_text" />
              </div>
              <div>
                <label class="text-sm font-medium mb-1 block">CTA Link</label>
                <UiInput v-model="editForm.cta_link" />
              </div>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="editForm.is_visible" class="rounded" />
              <span class="text-sm">Tampilkan</span>
            </label>
          </div>
        </div>

        <div v-else class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <UiBadge>{{ item.section }}</UiBadge>
              <UiBadge v-if="!item.is_visible" variant="outline">Tersembunyi</UiBadge>
            </div>
            <h3 class="font-semibold">{{ item.title || '(Belum ada judul)' }}</h3>
            <p v-if="item.subtitle" class="text-sm text-muted-foreground mt-1">{{ item.subtitle }}</p>
          </div>
          <UiButton size="sm" variant="ghost" @click="startEdit(item)">Edit</UiButton>
        </div>
      </UiCard>

      <div v-if="!contents || contents.length === 0" class="text-center py-8">
        <p class="text-muted-foreground">Belum ada konten.</p>
      </div>
    </div>
  </div>
</template>
