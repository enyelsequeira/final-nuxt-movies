<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto bg-light-background-primary dark:bg-dark-background-secondary px-6 pb-4 no-scrollbar"
    >
      <NuxtLink
        href="/"
        aria-label="go home"
        class="flex h-16 shrink-0 items-center mt-2 text-white dark:text-white"
      >
        <IconMovie class="w-14 h-14 flex mx-auto py-1" />
      </NuxtLink>

      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="link" className="space-y-1">
              <li
                v-for="(item, index) in sidebarMenu"
                class="text-sm font-base font-title dark:text-white transition duration-500 ease-in-out cursor-pointer text-light-2 py-2 hover:font-semibold hover:text-dark-2 dark:hover:text-light-3"
                :key="index"
                @click="
                  router.push('/');
                  categoryStore.setCategories(item.value);
                  categoryStore.resetPage();
                "
              >
                {{ item.label }}
              </li>
            </ul>
          </li>

          <li>
            <div>
              <p
                className="text-xl font-medium  tracking-widest my-6 text-gray-500 uppercase dark:text-white font-title"
              >
                Genres
              </p>
            </div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
              <NuxtLink
                class="group flex gap-x-3 p-2"
                v-for="(item, index) in items"
                :key="index"
                :to="`/genres/${item.id}`"
              >
                <IconChevronRight
                  class="p-1 text-light bg-light-accent rounded-xl group-hover:text-dark group-hover:bg-orange"
                />
                <span
                  class="font-title dark:text-white text-black transition duration-500 ease-in-out text-sm cursor-pointer group-hover:text-dark-2 group-hover:font-semibold dark:hover:text-light-3"
                >
                  {{ item.name }}
                </span>
              </NuxtLink>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import { GenresData } from "~/layouts/default.vue";
import { sidebarMenu } from "~/constants/index";
import { IconMovie } from "@tabler/icons-vue";
import { useCategoryStore } from "~/store";
const categoryStore = useCategoryStore();
const router = useRouter();

const { items } = defineProps<{
  items?: GenresData[];
}>();
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
