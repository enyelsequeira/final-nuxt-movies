<template>
  <div class="min-h-screen grid lg:grid-cols-2 lg:gap-x-2">
    <Carrousel :images="data?.images.profiles.slice(0, 8)" />
    <div class="mt-5 border-red-900 flex flex-col items-center md:items-center">
      <p class="text-2xl font-bold font-title md:tracking-wider text-center">
        {{ data?.name }}
      </p>
      <p class="text-xl font-medium font-title tracking-wide my-2">
        {{ data?.birthday }}
      </p>
      <p class="text-xl font-medium font-title tracking-wide my-2">
        Born: {{ data?.place_of_birth }}
      </p>
      <div class="space-y-3">
        <p :class="more ? 'line-clamp-none' : 'line-clamp-6'">
          {{ data?.biography }}
        </p>
        <button
          variant="secondary"
          @click="more = !more"
          :class="`${buttons.primary} p-2 rounded-xl`"
        >
          {{ more ? "Less" : "More" }} &rarr;
        </button>
      </div>
      <div class="flex mt-4 w-full space-x-2">
        <a
          class="bg-white text-blue-500 px-2 md:px-4 h-[fit-content] py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg cursor-pointer hover:bg-light-extra-two transition-all ease-in duration-200 hover:text-light dark:hover:bg-dark-background-primary"
          target="_blank"
          :href="`https://www.imdb.com/name/${data?.imdb_id}`"
          rel="noreferrer"
        >
          &rarr; IMDB
        </a>
        <button
          class="bg-blue-600 text-white px-6 my-2 md:my-0 md:px-4 h-[fit-content] py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg hover:bg-blue-500 transition-all ease-in duration-300 cursor-pointer"
          @click="router.back()"
        >
          &larr; Back
        </button>
      </div>
    </div>
    <section class="lg:col-span-2 text-white mt-3 px-4 py-2">
      <p
        class="font-medium font-title my-4 text-4xl text-black dark:text-white"
      >
        Recommendations
      </p>
      <div class="grid lg:grid-cols-2 xl:grid-cols-4 gap-3">
        <MovieComponent
          v-if="moviesBycast"
          v-for="movie in moviesBycast"
          :key="movie.id"
          v-bind="movie"
          :tv-shows="false"
        />
        <div v-else>
          <p
            :class="`${titles.h1} py-4 text-center col-span-full flex flex-col items-center justify-center text-black dark:text-white `"
          >
            NO MOVIES FOUND
            <IconMoodSadFilled class="dark:text-red-50 text-black" />
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { IconMoodSadFilled } from "@tabler/icons-vue";
import { buttons, titles } from "~/constants/classes";
import { APIKEY, MOVIEAPI } from "~/services/axios";
import { Credits } from "~/types";
const more = ref(false);

const router = useRouter();
const route = useRoute();

console.log({ route: route.query });
if (!route.query.id) {
  router.push("/");
}
export interface CastType {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: any;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  credits: Credits;
  images: Images;
}

export interface Images {
  profiles: Profile[];
}

export interface Profile {
  aspect_ratio: number;
  height: number;
  iso_639_1: any;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieWithCast {
  results: MovieWithCastResult[];
}

export interface MovieWithCastResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
// `/discover/movie?with_cast=${personCode}&page=1&api_key=${APIKEY}`;
const { data, refresh } = await useFetch<CastType>(
  () =>
    `${MOVIEAPI}/person/${route.query.id}?append_to_response=videos,credits,images&api_key=${APIKEY}`
);
const { data: moviesWithCast } = await useFetch<MovieWithCast>(
  () =>
    `${MOVIEAPI}/discover/movie?with_cast=${route.query.id}&api_key=${APIKEY}`
);

const moviesBycast = moviesWithCast?.value?.results.slice(0, 12);
</script>
