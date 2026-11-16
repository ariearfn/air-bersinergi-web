export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      title: 'PT. Anugerah Insan Ridho Bersinergi',
      meta: [
        { name: 'description', content: 'General Contractor and Supplier - Industry, Construction, Mechanical, Electrical, Safety, and Engineering' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
    }
  },

  routeRules: {
    '/admin/**': { ssr: false }
  },

  compatibilityDate: '2026-06-30'
})
