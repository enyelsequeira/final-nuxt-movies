<template>
  <div class="min-h-screen grid lg:grid-cols-2 lg:gap-x-2">
    <Carrousel :images="images" />
    <MovieInfo v-bind="props" />
    <section class="lg:col-span-2 text-white mt-3 px-4 py-2">
      <p
        class="font-medium font-title my-4 text-4xl text-black dark:text-white"
      >
        Recommendations
      </p>
      <div>
        <div
          v-if="recommendedMovies && recommendedMovies.length"
          class="col-span-full grid lg:grid-cols-2 xl:grid-cols-4 gap-3"
        >
          <MovieComponent
            v-for="movie in recommendedMovies"
            :id="movie.id"
            :key="movie.id"
            :backdrop_path="movie.backdrop_path"
            :title="movie.title"
            :vote_average="movie.vote_average"
            :tv-shows="false"
            :poster_path="movie.backdrop_path"
          />
        </div>

        <div v-else class="col-span-full">
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
import { titles } from "~/constants/classes";
import { APIKEY, EndPoints, MOVIEAPI } from "~/services/axios";
import { MovieInfoResponse } from "~/types";

const APIPOINT = EndPoints.getMovieInfo;

const route = useRoute();
const { data: user } = useSession();

const { data } = await useFetch<MovieInfoResponse>(
  `${MOVIEAPI}/${APIPOINT}/${route.params.movie}?append_to_response=videos,credits,images&api_key=${APIKEY}`
);

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface Root {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
const { data: Recommendations } = await useFetch<Root>(
  `${MOVIEAPI}/movie/${route.params.movie}/recommendations?api_key=${APIKEY}`,
  {
    key: `recommendations-${route.params.movie}`,
  }
);
const recommendedMovies = Recommendations?.value?.results.slice(0, 12);

const props = {
  tagline: data.value?.tagline,
  runtime: data.value?.runtime,
  genres: data.value?.genres,
  homepage: data.value?.homepage,
  imdb_id: data.value?.imdb_id,
  vote_average: data.value?.vote_average,
  vote_count: data.value?.vote_count,
  release_date: data.value?.release_date,
  overview: data.value?.overview,
  backdrop_path: data.value?.backdrop_path,
  poster_path: data.value?.poster_path,
  title: data.value?.title,
  spoken_languages: data.value?.spoken_languages,
  id: data.value?.id,
  videos: data.value?.videos,
  credits: data.value?.credits,

  // isShow?: string;
  userId: user.value?.user.id,
};
const images = data?.value?.images?.posters.slice(0, 8);

definePageMeta({
  pageTransition: {
    name: "bouncier",
  },
});
useSeoMeta({
  ogTitle: "Movie Information ",
  description: "Movie information for the movie you are looking for",
  ogDescription: "Movie information for the movie you are looking for",
});
</script>

<style scoped></style>
