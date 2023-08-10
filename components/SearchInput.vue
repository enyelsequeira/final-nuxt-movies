<template>
  <div class="relative flex flex-1 max-w-full mt-2">
    <div class="relative mt-1 w-full">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm"
      >
        <input
          v-model="message"
          class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none dark:bg-dark-background-primary dark:text-white"
          placeholder="Search..."
        />

        <button
          v-if="message && message.length > 0 && !isLoading"
          class="absolute inset-y-0 right-0 flex items-center pr-2"
          @click="message = ''"
        >
          <IconX class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
        <SfLoaderCircular
          class="absolute inset-y-0 right-2 !ring-blue-800"
          v-if="isLoading"
          size="base"
        />
      </div>
      <ul
        v-if="message && message.length > 0 && data && data.length > 0"
        class="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm space-y-2 flex flex-col"
      >
        <li
          v-for="item in data"
          :key="item.id"
          class="text-gray-900 cursor-pointer hover:bg-gray-200 px-2 py-1"
        >
          <NuxtLink
            :to="`/movies/${item.id}`"
            @click="message = ''"
            class="flex space-x-2"
          >
            <p class="text-lg">
              {{ item.name || item.title }}
            </p>
            <img
              :src="
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${
                      item.poster_path || item.backdrop_path
                    }`
                  : '/placeholder.png'
              "
              :alt="item.name || item.title"
              class="w-7 h-7 object-cover object-center rounded-sm"
            />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconX } from "@tabler/icons-vue";
import { useQuery } from "@tanstack/vue-query";
import { EndPoints, getMovieAPI } from "../services/axios";
import { refDebounced } from "@vueuse/core";
import { SearchResultDetails } from "types";
import { SfLoaderCircular } from "@storefront-ui/vue";

const message = ref("");
const debounced = refDebounced(message, 1000);

const { data, isLoading } = useQuery({
  queryKey: ["search", debounced],
  queryFn: async () => {
    const res = await getMovieAPI().get<SearchResultDetails>(
      `${EndPoints.search}&query=${debounced.value}`
    );
    return res.data.results;
  },
  select: (d) => {
    return d.filter((item) => item.media_type === "movie");
  },
});

watchEffect(() => {
  console.log({ data: data.value });
});
</script>
