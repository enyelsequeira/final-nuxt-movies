<template>
  <div class="min-h-screen flex flex-col gap-y-3 p-3">
    <Head>
      <Title>Profile Page | {{ data?.user?.name || data?.user?.id }} </Title>
    </Head>
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
const { status, data } = useSession();
console.log({ data });
if (status.value === "unauthenticated") {
  navigateTo("/");
}
useSeoMeta({
  ogTitle: "Profile Page",
  description: "Profile Page to find Information about the user",
  ogDescription: "Profile Page to find Information about the user",
});
</script>
