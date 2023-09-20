// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['nuxt-icon', '@nuxt/ui','@pinia/nuxt','@pinia-plugin-persistedstate/nuxt','@vee-validate/nuxt','@vueuse/nuxt'],
  srcDir: 'src/',
  tailwindcss: {
    cssPath: '@/assets/css/tailwind.css'
  },
  runtimeConfig: {
    public: {
      API_BACKEND_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
      // API_FRONTEND_URL: process.env.NUXT_API_FRONTEND_URL
    }
  },
  ssr: false,
})