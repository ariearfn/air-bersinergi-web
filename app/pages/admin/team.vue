<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const client = useSupabaseClient()
const saving = ref(false)
const showForm = ref(false)
const editingId = ref<number | null>(null)

const { data: team, refresh } = await useAsyncData('admin-team', async () => {
  const { data } = await client.from('team_members').select('*').order('sort_order')
  return data || []
})

const form = reactive({
  name: '',
  role: '',
  bio: '',
  photo_url: '',
  email: '',
  is_visible: true,
  sort_order: 0,
})

function resetForm() {
  Object.assign(form, {
    name: '', role: '', bio: '', photo_url: '', email: '',
    is_visible: true, sort_order: 0,
  })
  editingId.value = null
  showForm.value = false
}

function startEdit(item: any) {
  editingId.value = item.id
  Object.assign(form, {
    name: item.name || '',
    role: item.role || '',
    bio: item.bio || '',
    photo_url: item.photo_url || '',
    email: item.email || '',
    is_visible: item.is_visible ?? true,
    sort_order: item.sort_order || 0,
  })
  showForm.value = true
}

async function save() {
  saving.value = true
  try {
    if (editingId.value) {
      const { error } = await client
        .from('team_members')
        .update(form)
        .eq('id', editingId.value)
      if (error) throw error
    } else {
      const { error } = await client.from('team_members').insert(form)
      if (error) throw error
    }
    resetForm()
    await refresh()
  } catch (e) {
    alert('Gagal menyimpan data tim')
  } finally {
    saving.value = false
  }
}

async function deleteItem(id: number) {
  if (!confirm('Yakin ingin menghapus anggota ini?')) return
  try {
    const { error } = await client.from('team_members').delete().eq('id', id)
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
      <h1 class="text-2xl font-bold">Tim</h1>
      <UiButton @click="showForm = true" v-if="!showForm">Tambah Anggota</UiButton>
    </div>

    <UiCard v-if="showForm" class="p-5 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">{{ editingId ? 'Edit' : 'Tambah' }} Anggota</h3>
        <UiButton size="sm" variant="ghost" @click="resetForm">Batal</UiButton>
      </div>
      <form @submit.prevent="save" class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium mb-1 block">Nama</label>
            <UiInput v-model="form.name" required />
          </div>
          <div>
            <label class="text-sm font-medium mb-1 block">Jabatan</label>
            <UiInput v-model="form.role" />
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium mb-1 block">Email</label>
            <UiInput v-model="form.email" type="email" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1 block">URL Foto</label>
            <UiInput v-model="form.photo_url" placeholder="https://..." />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium mb-1 block">Bio</label>
          <UiTextarea v-model="form.bio" :rows="3" />
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="text-sm font-medium mb-1 block">Urutan</label>
            <UiInput v-model.number="form.sort_order" type="number" />
          </div>
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
      <UiCard v-for="member in team" :key="member.id" class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <img v-if="member.photo_url" :src="member.photo_url" :alt="member.name" class="w-full h-full rounded-full object-cover" />
            <span v-else class="text-lg font-bold text-primary">{{ member.name.charAt(0) }}</span>
          </div>
          <div class="min-w-0">
            <h3 class="font-medium text-sm truncate">{{ member.name }}</h3>
            <p class="text-xs text-muted-foreground">{{ member.role }}</p>
          </div>
        </div>
        <div class="flex gap-2 mt-3">
          <UiButton size="sm" variant="ghost" class="h-7 text-xs" @click="startEdit(member)">Edit</UiButton>
          <UiButton size="sm" variant="ghost" class="h-7 text-xs text-destructive" @click="deleteItem(member.id)">Hapus</UiButton>
        </div>
      </UiCard>
    </div>
  </div>
</template>
