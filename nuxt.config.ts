// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-07',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/mdc",
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
  ],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'IOT',
      short_name: 'IOT',
      theme_color: 'white',
      background_color: '#ffffff',
      icons: [
        { src: '/arduino.svg', sizes: '192x192', type: 'image/svg' },
      ],
      start_url: '/',
      display: 'standalone',
      prefer_related_applications: true,
    },
    workbox: {
      cleanupOutdatedCaches: true,
      navigateFallback: '/en-US',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
  },

  // i18n module configuration
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'lang/'
  },

})
