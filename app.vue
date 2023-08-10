<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: "h-full bg-light-background-primary dark:bg-dark-background-primary",
    id: "page",
  },

  htmlAttrs: {
    lang: "en",
    class: "h-full",
  },
});
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#__nuxt {
  height: 100%;
}
</style>
