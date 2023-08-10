<template>
  <div v-if="genres">
    <p class="text-2xl font-bold font-title my-2">Genres</p>
    <div class="flex space-x-4">
      <NuxtLink
        className="hover:text-red-400 dark:hover:text-red-200"
        v-for="genre in genres"
        :key="genre.id"
        :to="`/genres/${genre.id}`"
      >
        <span>{{ genre.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Genre } from "~/types";

const { genres } = defineProps<{
  genres?: Genre[];
}>();
</script>

<!-- https://tailwind-movies.vercel.app/cast?id=6384 -->
