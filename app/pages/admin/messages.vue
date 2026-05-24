<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const client = useSupabaseClient()

const { data: messages, refresh } = await useAsyncData('admin-messages', async () => {
  const { data } = await client.from('contact_messages').select('*').order('created_at', { ascending: false })
  return data || []
})

const selectedMessage = ref<any>(null)

async function markAsRead(id: number) {
  await client.from('contact_messages').update({ is_read: true }).eq('id', id)
  await refresh()
}

async function deleteMessage(id: number) {
  if (!confirm('Yakin ingin menghapus pesan ini?')) return
  await client.from('contact_messages').delete().eq('id', id)
  selectedMessage.value = null
  await refresh()
}

function viewMessage(msg: any) {
  selectedMessage.value = msg
  if (!msg.is_read) {
    markAsRead(msg.id)
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Pesan Masuk</h1>

    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1">
        <div class="space-y-2">
          <div
            v-for="msg in messages"
            :key="msg.id"
            @click="viewMessage(msg)"
            :class="[
              'p-3 rounded-lg border cursor-pointer transition-colors',
              selectedMessage?.id === msg.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50',
              !msg.is_read ? 'border-l-4 border-l-primary' : ''
            ]"
          >
            <div class="flex items-center justify-between">
              <p class="font-medium text-sm truncate">{{ msg.name }}</p>
              <UiBadge v-if="!msg.is_read" variant="secondary" class="text-xs shrink-0 ml-2">Baru</UiBadge>
            </div>
            <p class="text-xs text-muted-foreground truncate mt-0.5">{{ msg.email }}</p>
            <p class="text-xs text-muted-foreground mt-1 line-clamp-1">{{ msg.message }}</p>
            <p class="text-xs text-muted-foreground mt-1">{{ formatDate(msg.created_at) }}</p>
          </div>

          <p v-if="!messages || messages.length === 0" class="text-sm text-muted-foreground text-center py-8">
            Belum ada pesan masuk.
          </p>
        </div>
      </div>

      <div class="lg:col-span-2">
        <UiCard v-if="selectedMessage" class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h2 class="font-semibold text-lg">{{ selectedMessage.name }}</h2>
              <p class="text-sm text-muted-foreground">{{ selectedMessage.email }}</p>
              <p v-if="selectedMessage.phone" class="text-sm text-muted-foreground">{{ selectedMessage.phone }}</p>
            </div>
            <UiButton size="sm" variant="ghost" class="text-destructive" @click="deleteMessage(selectedMessage.id)">Hapus</UiButton>
          </div>

          <div class="space-y-3 border-t pt-4">
            <div v-if="selectedMessage.service_interest">
              <p class="text-xs text-muted-foreground">Bidang yang Dibutuhkan:</p>
              <UiBadge variant="outline" class="mt-1">{{ selectedMessage.service_interest }}</UiBadge>
            </div>
            <div>
              <p class="text-xs text-muted-foreground mb-1">Pesan:</p>
              <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ selectedMessage.message }}</p>
            </div>
            <p class="text-xs text-muted-foreground">{{ formatDate(selectedMessage.created_at) }}</p>
          </div>

          <div class="flex gap-2 mt-6">
            <a :href="`mailto:${selectedMessage.email}`">
              <UiButton size="sm">Balas via Email</UiButton>
            </a>
            <a v-if="selectedMessage.phone" :href="`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`" target="_blank">
              <UiButton size="sm" variant="outline">WhatsApp</UiButton>
            </a>
          </div>
        </UiCard>

        <div v-else class="flex items-center justify-center h-64 text-muted-foreground text-sm">
          Pilih pesan untuk melihat detail
        </div>
      </div>
    </div>
  </div>
</template>
