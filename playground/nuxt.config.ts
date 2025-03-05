// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["../src/module"],
  devtools: { enabled: true },
  compatibilityDate: "2025-03-05",
  contento: {
    apiUrl: process.env.CONTENTO_API_URL,
    apiKey: process.env.CONTENTO_API_KEY,
    siteId: process.env.CONTENTO_SITE_ID,
    previewSecret: process.env.CONTENTO_PREVIEW_SECRET,
  },
  runtimeConfig: {
    siteMainNavId: process.env.NUXT_SITE_MAIN_NAV_ID,
    siteFooterNavId: process.env.NUXT_SITE_FOOTER_NAV_ID,
  },
  routeRules: {
    "/home": { redirect: "/" },
  },
});
