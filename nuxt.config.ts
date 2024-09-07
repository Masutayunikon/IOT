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
    "nuxt-security",
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/eslint"
  ],

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
