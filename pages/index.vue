<template>
  <div class="px-6 py-2">
    <ul>
      <div
        v-if="isLoading"
        class="flex min-h-screen justify-center items-center"
      >
        <div
          class="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-64 w-64"
        ></div>
      </div>
      <li
        v-if="!isLoading && data?.results"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-3"
      >
        <MovieComponent
          v-for="item in data?.results"
          :id="item.id"
          :backdrop_path="item.backdrop_path"
          :title="item.title"
          :vote_average="item.vote_average"
          :tv-shows="false"
          :poster_path="item.poster_path"
        />
        <div
          class="flex justify-center items-center py-4 gap-x-4 w-full col-span-full"
        >
          <button
            :class="[
              categoryStore.page === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-100 cursor-pointer',
              'bg-red-400 w-10 h-10 rounded-full flex items-center justify-center',
            ]"
            @click="categoryStore.decrementPage()"
          >
            <IconChevronLeft class="w-4 h-4" />
          </button>
          <p class="text-xl">
            {{ categoryStore.page }}
          </p>
          <button
            :class="[
              categoryStore.page === data?.total_pages
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-100 cursor-pointer',
              'bg-red-400 w-10 h-10 rounded-full flex items-center justify-center',
            ]"
            @click="categoryStore.incrementPage()"
          >
            <IconChevronRight class="w-4 h-4" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { storeToRefs } from "pinia";
import { APIKEY, MOVIEAPI } from "~/services/axios";
import { useCategoryStore } from "~/store";
import { Movie } from "~/types";

const categoryStore = useCategoryStore();
const { categories, page } = storeToRefs(categoryStore);
const keys = useRuntimeConfig();

export interface Root {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const { data, isLoading, suspense } = useQuery<Root>({
  queryKey: ["movies", categories, page],
  queryFn: async () => {
    const data = await axios.get(
      `${MOVIEAPI}/movie/${categories.value}?page=${page.value}&api_key=${APIKEY}`
    );
    return data.data;
  },
});
onServerPrefetch(async () => {
  await suspense();
});
console.log({ keys });
</script>
