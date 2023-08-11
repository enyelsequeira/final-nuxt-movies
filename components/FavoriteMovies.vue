<template>
  <div
    v-if="isLoading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <MovieSkeleton v-for="index in 10" :key="index" />
  </div>
  <div
    v-if="!isLoading && data?.data && data.data.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <MovieComponent
      v-for="item in data.data"
      :key="item.id"
      :id="item.movieId"
      :backdrop_path="item.backdrop_path"
      :title="item.title"
      :vote_average="Number(item.vote_average)"
      :tv-shows="false"
      :poster_path="item.poster_path"
    />
  </div>
  <div v-if="!isLoading && (!data?.data || data.data.length === 0)">
    <p class="text-xl font-semibold">No Favorite Movies Found</p>
  </div>
</template>

<script setup lang="ts">
import { useFetchFavorite } from "~/composables/useFetchFavorite";
const { data: user, status } = useSession();
const { data, isLoading } = useFetchFavorite(`${user.value?.user.id}`);
</script>

<style scoped></style>
