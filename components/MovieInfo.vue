<template>
  <section class="px-1 md:px-[10px] h-full md:max-h-full">
    <div class="mt-5 flex flex-col items-center md:items-center">
      <p class="text-2xl font-bold font-title md:tracking-wider text-center">
        {{ title }}
      </p>
      <p class="text-xl font-medium font-title tracking-wide my-5">
        {{ tagline || "No Tagline" }}
      </p>
      <div
        class="flex md:space-x-2 my-2 border-2 border-black dark:border-red-200/25"
      >
        <div class="relative px-2">
          <p>{{ runtime }} mins</p>
          <span
            class="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1"
          />
        </div>
        <div class="relative px-2">
          <p>{{ release_date }}</p>
          <span
            class="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1"
          />
        </div>
        <div class="relative px-2">
          <p class="relative">
            {{
              (spoken_languages && spoken_languages[0]?.english_name) ||
              "No Language"
            }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <p :class="`${titles.h3}`">Overview</p>
      <p :class="`${titles.base}`">{{ overview }}</p>
    </div>
    <div class="flex flex-between space-x-16 md:space-x-48">
      <div>
        <p :class="`${titles.h3} my-2`">Rating</p>
        <SfRating
          :value="Number(vote_average)"
          :max="10"
          size="xs"
          class="mr-2"
        />
        <p>{{ vote_average }} Vote average</p>
      </div>
      <div class="flex flex-col space-y-4 items-center justify-center">
        <button
          class="border w-fit border-black/10 rounded-md bg-white"
          @click="
            toggleFav.mutate(
              { movieProps },
              {
                onSuccess: (res) => {
                  queryClient.invalidateQueries({
                    queryKey: ['get-movies-liked-by-user-id', userId],
                  });
                  if (res) {
                    toast.success(res?.data.message);
                  }
                },
              },
            )
          "
        >
          <IconHeart
            :class="isMovieInUserFavorites ? 'fill-red-500' : 'fill-blue-500'"
          />
        </button>
        <button
          class="border w-fit border-black/10 rounded-md bg-white"
          @click="
            toggleWatchLater.mutate(
              { movieProps },
              {
                onSuccess: (res) => {
                  queryClient.invalidateQueries({
                    queryKey: ['get-watchlater-by-user-id', userId],
                  });
                  if (res) {
                    toast.success(res?.data.message);
                  }
                },
              },
            )
          "
        >
          <IconClock
            :class="isMovieInUserWatchLater ? 'fill-red-500' : 'fill-blue-500'"
          />
        </button>
      </div>
    </div>
    <Genres :genres="genres" />
    <Cast :credits="credits" />
    <div
      class="flex flex-row gap-1 flex-wrap lg:flex-row justify-between items-baseline my-2"
    >
      <div
        class="flex rounded-lg flex-row justify-between text-lg gap-1"
        role="group"
      >
        <a
          v-if="imdb_id"
          target="_blank"
          rel="noopener noreferrer"
          :href="`https://www.imdb.com/title/${imdb_id}`"
        >
          <button :class="primary">
            <p>IMDB</p>
            <IconBadge4k />
          </button>
        </a>

        <a target="_blank" rel="noopener noreferrer" :href="`${homepage}`">
          <button :class="primary">
            <p>Website</p>
            <IconLink />
          </button>
        </a>
        <button :class="primary" @click="open">
          <p>Trailer</p>
          <IconPlayerPlay />
        </button>
      </div>

      <button
        class="bg-blue-600 text-white px-6 my-2 md:my-0 md:px-4 h-[fit-content] py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg hover:bg-blue-500 transition-all ease-in duration-300 cursor-pointer"
        @click="router.back()"
      >
        &larr; Back
      </button>
    </div>
  </section>
  <MovieModal :is-open="isOpen" :close="close" :video="videos" :title="title" />
</template>

<script setup lang="ts">
import { SfRating, useDisclosure } from "@storefront-ui/vue";
import {
  IconHeart,
  IconPlayerPlay,
  IconClock,
  IconLink,
  IconBadge4k,
} from "@tabler/icons-vue";
import { useToast } from "vue-toastification";

import { useQueryClient } from "@tanstack/vue-query";
import { titles } from "~/constants/classes";

import { Credits, Genre, Languages, Videos } from "~/types";
import { useToggleWatchLaterMovie } from "~/composables/useToggleFavMovies";
const { close, isOpen, open } = useDisclosure({ initialValue: false });
const router = useRouter();
const queryClient = useQueryClient();
const toast = useToast();
const primary =
  "bg-white text-blue-500 px-2 md:px-4 h-[fit-content] py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg cursor-pointer hover:bg-light-extra-two transition-all ease-in duration-200 hover:text-light dark:hover:bg-dark-background-primary";

const {
  title,
  id,
  tagline,
  backdrop_path,
  homepage,
  poster_path,
  vote_average,
  vote_count,
  userId,
} = defineProps<{
  tagline?: string;
  runtime?: number;
  genres?: Genre[];
  homepage?: string;
  imdb_id?: string;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  overview?: string;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  spoken_languages?: Languages[];
  id?: number;
  videos?: Videos;
  credits?: Credits;
  isShow?: string;
  userId?: string;
}>();
const movieProps = {
  backdrop_path: backdrop_path as string,
  homepage: homepage as string,
  title: title as string,
  movieId: id as number,
  original_title: title as string,
  popularity: String(vote_count),
  poster_path: poster_path as string,
  tagline: tagline as string,
  vote_average: String(vote_average),
  vote_count: String(vote_count),
  userId: `${userId}`,
};
const toggleFav = useToggleFavMovie();
const toggleWatchLater = useToggleWatchLaterMovie();
const { data: userMovies } = useFetchFavorite(`${userId}`);
const { data: watchlater } = useFetchWatchLater(`${userId}`);

const movieExists = ref<boolean | undefined>(false);
const watchLaterExists = ref<boolean | undefined>(false);

watch(
  () => userMovies.value,
  (newVal) => {
    movieExists.value = newVal?.data?.some((movie) => movie.movieId === id);
  },
);
watch(
  () => watchlater.value,
  (newVal) => {
    watchLaterExists.value = newVal?.data?.some(
      (movie) => movie.movieId === id,
    );
  },
);

const isMovieInUserFavorites = computed(() => movieExists.value);
const isMovieInUserWatchLater = computed(() => watchLaterExists.value);
</script>
