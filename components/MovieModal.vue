<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:max-w-4xl pb-2"
            >
              <div
                class="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t"
              >
                <DialogTitle as="h3" :class="`${titles.h2} text-gray-900`">{{
                  title
                }}</DialogTitle>
                <button
                  @click="close"
                  class="p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <span
                    class="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none"
                  >
                    <IconX />
                  </span>
                </button>
              </div>

              <div class="relative flex-auto">
                <iframe
                  v-if="TrailerOrTease?.key"
                  class="w-3/4 h-[300px] md:h-[500px] py-10 mx-auto"
                  frameBorder="0"
                  title="Video Player"
                  :src="`https://www.youtube.com/embed/${TrailerOrTease?.key}`"
                  allow="autoplay"
                />
                <div v-else class="my-5">
                  <p class="text-center text-2xl">No Trailer or Tease 🙁</p>
                </div>
              </div>
              <button
                class="w-[fit-content] my-4 bg-blue-600 text-white px-6 text-2xl rounded-md hover:bg-blue-500 transition-all ease-in duration-300 cursor-pointer mx-auto flex items-center justify-center"
                type="button"
                @click="close"
              >
                Close
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { IconX } from "@tabler/icons-vue";
import { titles } from "~/constants/classes";
import { Videos } from "~/types";

const { close, isOpen, title, video } = defineProps<{
  close: () => boolean;
  video?: Videos;
  isOpen: boolean;
  title?: string;
}>();

const TrailerOrTease = video?.results.find(
  (v) => v.type === "Trailer" || v.type === "Tease"
);
</script>
