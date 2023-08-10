<template>
  <div>
    <p class="text-2xl font-bold font-title my-2">Cast</p>
    <div class="grid grid-cols-3 gap-3 md:grid md:grid-cols-5 py-1">
      <div
        v-if="credits"
        v-for="cast in credits.cast.slice(0, 5)"
        :key="cast.id"
        class="flex flex-col"
      >
        <img
          class="rounded-md h-36 object-cover"
          :src="`https://image.tmdb.org/t/p/original/${cast?.profile_path}`"
        />
        <NuxtLink
          :to="{
            path: `/cast/`,
            query: {
              id: cast.id,
            },
          }"
        >
          <p
            class="text-base font-body truncate text-center hover:text-red-400 dark:hover:text-red-200"
          >
            {{ cast.name }}
          </p>
        </NuxtLink>
      </div>
      <div v-else>
        <p>No cast found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Credits } from "~/types";

const { credits } = defineProps<{
  credits?: Credits;
}>();
</script>
