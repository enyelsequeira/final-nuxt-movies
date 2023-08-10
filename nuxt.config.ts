// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/devtools",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
  ],
  build: {
    transpile: ["vue-toastification"],
  },
  auth: {
    origin: process.env.ORIGIN as string,
    enableGlobalAppMiddleware: true,
  },
});
