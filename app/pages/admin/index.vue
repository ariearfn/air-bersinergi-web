<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const client = useSupabaseClient()

const { data: stats } = await useAsyncData('admin-stats', async () => {
  const [messages, portfolio, services, team] = await Promise.all([
    client.from('contact_messages').select('id', { count: 'exact', head: true }),
    client.from('portfolio').select('id', { count: 'exact', head: true }),
    client.from('services').select('id', { count: 'exact', head: true }),
    client.from('team_members').select('id', { count: 'exact', head: true }),
  ])

  return {
    messages: messages.count || 0,
    portfolio: portfolio.count || 0,
    services: services.count || 0,
    team: team.count || 0,
  }
})

const { data: recentMessages } = await useAsyncData('recent-messages', async () => {
  const { data } = await client
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  return data || []
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <UiCard class="p-5">
        <p class="text-sm text-muted-foreground">Total Pesan</p>
        <p class="text-3xl font-bold mt-1">{{ stats?.messages || 0 }}</p>
      </UiCard>
      <UiCard class="p-5">
        <p class="text-sm text-muted-foreground">Portofolio</p>
        <p class="text-3xl font-bold mt-1">{{ stats?.portfolio || 0 }}</p>
      </UiCard>
      <UiCard class="p-5">
        <p class="text-sm text-muted-foreground">Layanan</p>
        <p class="text-3xl font-bold mt-1">{{ stats?.services || 0 }}</p>
      </UiCard>
      <UiCard class="p-5">
        <p class="text-sm text-muted-foreground">Tim</p>
        <p class="text-3xl font-bold mt-1">{{ stats?.team || 0 }}</p>
      </UiCard>
    </div>

    <UiCard class="p-5">
      <h2 class="font-semibold mb-4">Pesan Terbaru</h2>
      <div v-if="recentMessages && recentMessages.length > 0" class="space-y-3">
        <div
          v-for="msg in recentMessages"
          :key="msg.id"
          class="flex items-start justify-between p-3 rounded-md bg-muted/50"
        >
          <div>
            <p class="font-medium text-sm">{{ msg.name }}</p>
            <p class="text-xs text-muted-foreground">{{ msg.email }}</p>
            <p class="text-sm mt-1 line-clamp-1">{{ msg.message }}</p>
          </div>
          <UiBadge v-if="!msg.is_read" variant="secondary" class="shrink-0 ml-2">Baru</UiBadge>
        </div>
      </div>
      <p v-else class="text-sm text-muted-foreground">Belum ada pesan masuk.</p>
    </UiCard>
  </div>
</template>
