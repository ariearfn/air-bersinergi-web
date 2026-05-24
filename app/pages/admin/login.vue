<script setup lang="ts">
definePageMeta({
  layout: false,
})

const client = useSupabaseClient()
const router = useRouter()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

watchEffect(() => {
  if (user.value) {
    router.push('/admin')
  }
})

async function login() {
  loading.value = true
  error.value = ''

  try {
    const { error: err } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (err) throw err
    router.push('/admin')
  } catch (e: any) {
    error.value = e.message || 'Login gagal. Periksa email dan password Anda.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-muted/30 p-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <img src="/logo.png" alt="Air Bersinergi" class="h-24 w-auto mx-auto mb-4" />
        <h1 class="text-2xl font-bold">Admin CMS</h1>
        <p class="text-sm text-muted-foreground mt-1">PT. Air Bersinergi</p>
      </div>

      <UiCard class="p-6">
        <form @submit.prevent="login" class="space-y-4">
          <div v-if="error" class="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            {{ error }}
          </div>

          <div>
            <label for="email" class="text-sm font-medium mb-1.5 block">Email</label>
            <UiInput id="email" v-model="email" type="email" placeholder="admin@airbersinergi.com" required />
          </div>

          <div>
            <label for="password" class="text-sm font-medium mb-1.5 block">Password</label>
            <UiInput id="password" v-model="password" type="password" placeholder="••••••••" required />
          </div>

          <UiButton type="submit" :disabled="loading" class="w-full">
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </UiButton>
        </form>
      </UiCard>

      <p class="text-center text-xs text-muted-foreground mt-4">
        <NuxtLink to="/" class="hover:text-primary">&larr; Kembali ke Website</NuxtLink>
      </p>
    </div>
  </div>
</template>
