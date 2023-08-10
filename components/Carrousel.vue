<template>
  <TabGroup as="div" class="flex flex-col-reverse pt-2 lg:pt-1">
    <div class="mx-auto mt-2 w-full max-w-2xl sm:block lg:max-w-none">
      <TabList class="grid grid-cols-4 gap-3 px-2">
        <Tab
          v-for="(image, index) in images"
          :key="image.file_path"
          class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
        >
          <span class="sr-only"> {{ image.file_path }} </span>
          <span class="absolute inset-0 overflow-hidden rounded-md">
            <img
              width="500"
              height="500"
              :src="`https://image.tmdb.org/t/p/original${image.file_path}`"
              :alt="image.file_path"
              class="h-full w-full object-cover object-center"
            />
          </span>
        </Tab>
      </TabList>
    </div>

    <TabPanels class="aspect-h-1 aspect-w-1 w-full">
      <TabPanel v-for="(image, index) in images" :key="image.file_path">
        <img
          width="500"
          height="500"
          :src="`https://image.tmdb.org/t/p/original${image.file_path}`"
          :alt="image.file_path"
          class="object-cover object-center rounded-xl h-[400px] md:h-[500px] lg:h-[675px] flex mx-auto"
        />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { Poster } from "~/types";

const { images } = defineProps<{
  images?: Poster[];
}>();
</script>
