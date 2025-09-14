// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  modules: [
    '@pinia/nuxt',
    'nuxt-svgo',
    'pinia-plugin-persistedstate/nuxt'
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  components: [
    {
      path: '~/components',
    },
    {
      path: '~/components/ui',
      prefix: 'Ui',
    },
  ],
});
