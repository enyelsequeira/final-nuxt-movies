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
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-xs lg:max-w-md pb-2"
            >
              <div
                class="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t"
              >
                <DialogTitle as="h3" :class="`${titles.h2} text-gray-900`"
                  >Sign in</DialogTitle
                >
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

              <div class="px-4 pb-3">
                <div>
                  <div class="mt-4 grid grid-cols-2 gap-3">
                    <button
                      @click="async () => await signIn('google')"
                      :class="ButtonIcons"
                    >
                      <IconBrandGoogle />
                    </button>

                    <button
                      @click="async () => await signIn('github')"
                      :class="ButtonIcons"
                    >
                      <IconBrandGithub />
                    </button>
                  </div>
                </div>
              </div>
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
import { IconBrandGithub } from "@tabler/icons-vue";
import { IconBrandGoogle } from "@tabler/icons-vue";
import { titles } from "~/constants/classes";
const { status, data, signIn, signOut } = useSession();

console.log({ status: status.value, data: data.value });
const ButtonIcons =
  "inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0";

const { close, isOpen } = defineProps<{
  close: () => boolean;
  isOpen: boolean;
}>();
</script>

<style scoped></style>
