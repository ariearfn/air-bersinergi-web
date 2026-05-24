<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const client = useSupabaseClient()
const saving = ref(false)
const showForm = ref(false)
const editingId = ref<number | null>(null)

const { data: services, refresh } = await useAsyncData('admin-services', async () => {
  const { data } = await client.from('services').select('*').order('sort_order')
  return data || []
})

const form = reactive({
  title: '',
  slug: '',
  description: '',
  long_description: '',
  icon: '',
  is_featured: false,
  is_visible: true,
  sort_order: 0,
})

function resetForm() {
  Object.assign(form, {
    title: '', slug: '', description: '', long_description: '',
    icon: '', is_featured: false, is_visible: true, sort_order: 0,
  })
  editingId.value = null
  showForm.value = false
}

function startEdit(item: any) {
  editingId.value = item.id
  Object.assign(form, {
    title: item.title || '',
    slug: item.slug || '',
    description: item.description || '',
    long_description: item.long_description || '',
    icon: item.icon || '',
    is_featured: item.is_featured || false,
    is_visible: item.is_visible ?? true,
    sort_order: item.sort_order || 0,
  })
  showForm.value = true
}

function generateSlug() {
  form.slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function save() {
  saving.value = true
  try {
    if (editingId.value) {
      const { error } = await client
        .from('services')
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq('id', editingId.value)
      if (error) throw error
    } else {
      const { error } = await client.from('services').insert(form)
      if (error) throw error
    }
    resetForm()
    await refresh()
  } catch (e) {
    alert('Gagal menyimpan layanan')
  } finally {
    saving.value = false
  }
}

async function deleteItem(id: number) {
  if (!confirm('Yakin ingin menghapus layanan ini?')) return
  try {
    const { error } = await client.from('services').delete().eq('id', id)
    if (error) throw error
    await refresh()
  } catch (e) {
    alert('Gagal menghapus')
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Layanan</h1>
      <UiButton @click="showForm = true" v-if="!showForm">Tambah Layanan</UiButton>
    </div>

    <UiCard v-if="showForm" class="p-5 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">{{ editingId ? 'Edit' : 'Tambah' }} Layanan</h3>
        <UiButton size="sm" variant="ghost" @click="resetForm">Batal</UiButton>
      </div>
      <form @submit.prevent="save" class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium mb-1 block">Judul</label>
            <UiInput v-model="form.title" @blur="!editingId && generateSlug()" required />
          </div>
          <div>
            <label class="text-sm font-medium mb-1 block">Slug</label>
            <UiInput v-model="form.slug" required />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium mb-1 block">Deskripsi Singkat</label>
          <UiTextarea v-model="form.description" :rows="2" />
        </div>
        <div>
          <label class="text-sm font-medium mb-1 block">Deskripsi Lengkap</label>
          <UiTextarea v-model="form.long_description" :rows="4" />
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="text-sm font-medium mb-1 block">Urutan</label>
            <UiInput v-model.number="form.sort_order" type="number" />
          </div>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="form.is_featured" class="rounded" />
            <span class="text-sm">Featured</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="form.is_visible" class="rounded" />
            <span class="text-sm">Tampilkan</span>
          </label>
        </div>
        <UiButton type="submit" :disabled="saving">
          {{ saving ? 'Menyimpan...' : 'Simpan' }}
        </UiButton>
      </form>
    </UiCard>

    <div class="space-y-3">
      <UiCard v-for="service in services" :key="service.id" class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-semibold">{{ service.title }}</h3>
              <UiBadge v-if="service.is_featured" variant="secondary">Featured</UiBadge>
              <UiBadge v-if="!service.is_visible" variant="outline">Tersembunyi</UiBadge>
            </div>
            <p class="text-sm text-muted-foreground mt-1 line-clamp-1">{{ service.description }}</p>
          </div>
          <div class="flex gap-2">
            <UiButton size="sm" variant="ghost" @click="startEdit(service)">Edit</UiButton>
            <UiButton size="sm" variant="ghost" class="text-destructive" @click="deleteItem(service.id)">Hapus</UiButton>
          </div>
        </div>
      </UiCard>
    </div>
  </div>
</template>
