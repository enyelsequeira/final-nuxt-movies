<template>
  <div
    v-if="isLoading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <MovieSkeleton v-for="index in 10" :key="index" />
  </div>
  <div
    v-if="!isLoading && data?.data"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <MovieComponent
      v-for="item in data?.data"
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
    <p class="text-xl font-semibold">No Movies to watch later found</p>
  </div>
</template>

<script setup lang="ts">
import { useFetchWatchLater } from "~/composables/useFetchFavorite";

const { data: user, status } = useAuth();
const { data, isLoading } = useFetchWatchLater(`${user.value?.user.id}`);
</script>

<style scoped></style>
