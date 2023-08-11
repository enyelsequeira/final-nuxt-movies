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
    origin: process.env.ORIGIN,
  },
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ORIGIN: process.env.ORIGIN,
    public: {
      API_KEY: process.env.API_KEY,
    },
  },
});
