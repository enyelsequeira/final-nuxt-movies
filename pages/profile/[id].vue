<template>
  <div class="min-h-screen flex flex-col gap-y-3 p-3">
    <section>
      <p :class="`${titles.h2} col-span-4 my-2`">Favorite Movies</p>
      <FavoriteMovies />
    </section>
    <section>
      <p :class="`${titles.h2} col-span-4 my-2`">Watch Later Movies</p>
      <WatchLaterMovie />
    </section>
  </div>
</template>

<script setup lang="ts">
import { titles } from "../../constants/classes";
const { status } = useSession();

if (status.value === "unauthenticated") {
  navigateTo("/");
}
</script>
