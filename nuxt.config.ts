// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "ARS to BRL",
      htmlAttrs: {
        lang: "pt-BR",
      },
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    "@nuxtjs/google-fonts",
  ],
  pwa: {
    strategies: "generateSW",
    registerType: "autoUpdate",
    manifest: {
      name: "ARS to BRL",
      short_name: "ARS to BRL",
      theme_color: "#0f172a",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  },
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700],
    },
  },
});
