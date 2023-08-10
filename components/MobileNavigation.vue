<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-50 lg:hidden" @click="closeSidebar">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div
                class="absolute left-full top-0 flex w-16 justify-center pt-5"
              >
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="closeSidebar"
                >
                  <span class="sr-only">Close sidebar</span>
                  <IconX class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>

            <div
              class="flex grow flex-col gap-y-5 overflow-y-auto bg-light-background-primary dark:bg-dark-background-secondary px-6 pb-4"
            >
              <NuxtLink
                href="/"
                aria-label="go home"
                class="flex h-16 shrink-0 items-center"
              >
                <IconMovie class="w-14 h-14 flex mx-auto py-1" />
              </NuxtLink>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="link" className="space-y-1">
                      <li
                        v-for="(item, index) in sidebarMenu"
                        :key="index"
                        class="text-sm font-base font-title dark:text-white transition duration-500 ease-in-out cursor-pointer text-light-2 py-2 hover:font-semibold hover:text-dark-2 dark:hover:text-light-3"
                        @click="
                          router.push('/');
                          categoryStore.setCategories(item.value);
                          categoryStore.resetPage();
                          closeSidebar();
                        "
                      >
                        {{ item.label }}
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div>
                      <p
                        class="text-xl font-medium tracking-widest my-6 text-gray-500 uppercase dark:text-white font-title"
                      >
                        Genres
                      </p>
                    </div>
                    <ul role="list" class="-mx-2 mt-2 space-y-1">
                      <li v-for="(item, index) in items" :key="index">
                        <NuxtLink
                          :to="`/genres/${item.id}`"
                          class="group flex gap-x-3 p-2"
                          @click="closeSidebar"
                        >
                          <IconChevronRight
                            class="p-1 text-light bg-light-accent rounded-xl group-hover:text-dark group-hover:bg-orange"
                          />
                          <span>
                            {{ item.name }}
                          </span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                  <li class="mt-auto">
                    <a
                      href="#"
                      class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-black"
                    >
                      <IconCalendar
                        class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                        aria-hidden="true"
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  IconMovie,
  IconChevronRight,
  IconX,
  IconCalendar,
} from "@tabler/icons-vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { sidebarMenu } from "~/constants";
import { GenresData } from "~/layouts/default.vue";
import { useCategoryStore } from "~/store";
const { items, sidebarOpen } = defineProps<{
  items: GenresData[] | undefined;
  sidebarOpen: boolean;
}>();
const emit = defineEmits(["update:sidebarOpen"]);

const categoryStore = useCategoryStore();
const router = useRouter();
const closeSidebar = () => {
  emit("update:sidebarOpen", false);
};
</script>
