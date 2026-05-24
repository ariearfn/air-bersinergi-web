<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()
const router = useRouter()

const sidebarOpen = ref(true)

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { name: 'Pengaturan Situs', href: '/admin/site-settings', icon: 'Settings' },
  { name: 'Konten Halaman', href: '/admin/content', icon: 'FileText' },
  { name: 'Layanan', href: '/admin/services', icon: 'Briefcase' },
  { name: 'Portofolio', href: '/admin/portfolio', icon: 'FolderOpen' },
  { name: 'Tim', href: '/admin/team', icon: 'Users' },
  { name: 'Pesan', href: '/admin/messages', icon: 'Mail' },
]

async function logout() {
  await client.auth.signOut()
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-muted/30">
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16'
      ]"
    >
      <div class="flex items-center h-16 px-4 border-b">
        <NuxtLink to="/admin" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            AIR
          </div>
          <span v-if="sidebarOpen" class="font-semibold text-sm">Admin CMS</span>
        </NuxtLink>
      </div>

      <nav class="flex-1 p-3 space-y-1">
        <NuxtLink
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          active-class="!bg-primary !text-primary-foreground"
        >
          <span class="w-5 h-5 flex items-center justify-center text-xs">{{ item.icon.slice(0, 2) }}</span>
          <span v-if="sidebarOpen">{{ item.name }}</span>
        </NuxtLink>
      </nav>

      <div class="p-3 border-t">
        <button
          @click="logout"
          class="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <span class="w-5 h-5 flex items-center justify-center text-xs">Lo</span>
          <span v-if="sidebarOpen">Keluar</span>
        </button>
      </div>
    </aside>

    <div :class="['transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-16']">
      <header class="h-16 border-b bg-card flex items-center justify-between px-6">
        <button @click="sidebarOpen = !sidebarOpen" class="p-2 rounded-md hover:bg-accent">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="flex items-center gap-3">
          <span class="text-sm text-muted-foreground">{{ user?.email }}</span>
          <NuxtLink to="/" target="_blank" class="text-sm text-primary hover:underline">
            Lihat Situs
          </NuxtLink>
        </div>
      </header>

      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
