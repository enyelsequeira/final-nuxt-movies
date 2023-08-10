<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-lg bg-white"
  >
    <div
      class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96"
    >
      <img
        width="{500}"
        height="{500}"
        :src="
          backdrop_path
            ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
            : '/placeholder.png'
        "
        :alt="title"
        class="h-full w-full object-cover object-center sm:h-full sm:w-full"
      />
    </div>
    <div class="flex flex-1 flex-col space-y-2 p-4">
      <h3
        class="text-sm font-medium text-gray-900 mx-auto max-w-xs break-words truncate"
      >
        <NuxtLink :to="`/movies/${id}`">
          <span aria-hidden="true" class="absolute inset-0" />
          {{ title }}
        </NuxtLink>
      </h3>
      <div class="flex flex-1 mx-auto">
        <SfRating
          :value="vote_average / 2"
          :max="5"
          size="xs"
          class="mr-2 text-blue-700"
        />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { SfRating } from "@storefront-ui/vue";

const { backdrop_path, id, title, tvShows, vote_average, value } = defineProps<{
  value?: number;
  // lets get all the props needs to be passed
  id: number;
  backdrop_path: string;
  title: string;
  vote_average: number;
  tvShows: boolean;
  poster_path: string;
}>();
</script>
