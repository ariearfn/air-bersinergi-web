<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const client = useSupabaseClient()
const saving = ref(false)
const showForm = ref(false)
const editingId = ref<number | null>(null)

const { data: portfolio, refresh } = await useAsyncData('admin-portfolio', async () => {
  const { data } = await client.from('portfolio').select('*').order('sort_order')
  return data || []
})

const form = reactive({
  title: '',
  slug: '',
  client_name: '',
  description: '',
  cover_image: '',
  is_featured: false,
  is_visible: true,
  sort_order: 0,
})

function resetForm() {
  Object.assign(form, {
    title: '', slug: '', client_name: '', description: '',
    cover_image: '', is_featured: false, is_visible: true, sort_order: 0,
  })
  editingId.value = null
  showForm.value = false
}

function startEdit(item: any) {
  editingId.value = item.id
  Object.assign(form, {
    title: item.title || '',
    slug: item.slug || '',
    client_name: item.client_name || '',
    description: item.description || '',
    cover_image: item.cover_image || '',
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
        .from('portfolio')
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq('id', editingId.value)
      if (error) throw error
    } else {
      const { error } = await client.from('portfolio').insert(form)
      if (error) throw error
    }
    resetForm()
    await refresh()
  } catch (e) {
    alert('Gagal menyimpan proyek')
  } finally {
    saving.value = false
  }
}

async function deleteItem(id: number) {
  if (!confirm('Yakin ingin menghapus proyek ini?')) return
  try {
    const { error } = await client.from('portfolio').delete().eq('id', id)
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
      <h1 class="text-2xl font-bold">Portofolio</h1>
      <UiButton @click="showForm = true" v-if="!showForm">Tambah Proyek</UiButton>
    </div>

    <UiCard v-if="showForm" class="p-5 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">{{ editingId ? 'Edit' : 'Tambah' }} Proyek</h3>
        <UiButton size="sm" variant="ghost" @click="resetForm">Batal</UiButton>
      </div>
      <form @submit.prevent="save" class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium mb-1 block">Judul Proyek</label>
            <UiInput v-model="form.title" @blur="!editingId && generateSlug()" required />
          </div>
          <div>
            <label class="text-sm font-medium mb-1 block">Slug</label>
            <UiInput v-model="form.slug" required />
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium mb-1 block">Nama Klien</label>
            <UiInput v-model="form.client_name" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1 block">URL Gambar Cover</label>
            <UiInput v-model="form.cover_image" placeholder="https://..." />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium mb-1 block">Deskripsi</label>
          <UiTextarea v-model="form.description" :rows="3" />
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

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiCard v-for="project in portfolio" :key="project.id" class="overflow-hidden">
        <div class="aspect-video bg-muted relative">
          <img
            v-if="project.cover_image"
            :src="project.cover_image"
            :alt="project.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div class="p-3">
          <div class="flex items-center gap-1 mb-1">
            <UiBadge v-if="project.is_featured" variant="secondary" class="text-xs">Featured</UiBadge>
            <UiBadge v-if="!project.is_visible" variant="outline" class="text-xs">Hidden</UiBadge>
          </div>
          <h3 class="font-medium text-sm">{{ project.title }}</h3>
          <p v-if="project.client_name" class="text-xs text-muted-foreground">{{ project.client_name }}</p>
          <div class="flex gap-2 mt-2">
            <UiButton size="sm" variant="ghost" class="h-7 text-xs" @click="startEdit(project)">Edit</UiButton>
            <UiButton size="sm" variant="ghost" class="h-7 text-xs text-destructive" @click="deleteItem(project.id)">Hapus</UiButton>
          </div>
        </div>
      </UiCard>
    </div>
  </div>
</template>
