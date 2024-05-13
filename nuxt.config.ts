// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700],
    },
  },
});
