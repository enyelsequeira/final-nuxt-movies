<template>
  <section
    class="px-4 sm:px-6 lg:px-8 min-h-screen grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-x-3 lg:gap-y-6 py-2 grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 mt-1"
  >
    <MovieComponent
      v-for="movie in data?.results"
      :key="movie.id"
      :backdrop_path="movie.poster_path"
      :title="movie.title"
      :id="movie.id"
      :poster_path="movie.poster_path"
      :vote_average="movie.vote_average"
      :tv-shows="false"
    />
  </section>
  <Pagination
    :total-items="data?.total_pages"
    :current-page="page"
    :max-pages="3"
    :page-size="10"
    @update:currentPage="changePage"
  />
</template>

<script lang="ts" setup>
import { APIKEY, EndPoints, MOVIEAPI } from "~/services/axios";
const router = useRouter();
import { Movie } from "~/types/index";

type Data = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
const route = useRoute();
const page = ref(route.query.page ? parseInt(route.query.page as string) : 1);
console.log({ page });
const APIPOINT = EndPoints.getMoviesByCategory;

const { data, refresh } = await useFetch<Data>(
  () =>
    `${MOVIEAPI}/${APIPOINT}?with_genres=${route.params.genre}&page=${route.query.page}&api_key=${APIKEY}`,
  {
    key: `movies-${route.params.genre}-${page.value}`,
  }
);

const changePage = (newPage: number) => {
  page.value = newPage;
  router.push({
    path: `/genres/${route.params.genre}`,
    query: { page: newPage },
  });

  refresh();
};
</script>
