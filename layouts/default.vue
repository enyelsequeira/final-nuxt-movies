<template>
  <div className="h-full" of-auto relative data-scroll>
    <MobileNavigation
      :items="data?.genres"
      :sidebar-open="sidebarOpen"
      @update:sidebarOpen="sidebarOpen = $event"
    />

    <!-- Static sidebar for desktop -->
    <Navigation :items="data?.genres" />

    <div class="lg:pl-64 h-full">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="toggleSidebar"
        >
          <span class="sr-only">Open sidebar</span>
          <IconMenu class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div class="flex flex-1 gap-x-4 self-stretch items-center lg:gap-x-6">
          <SearchInput />

          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!-- Separator -->
            <div
              class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />

            <!-- Profile dropdown -->
          </div>
          <Menu v-if="userData?.user" as="div" class="relative">
            <div>
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="hidden lg:flex lg:items-center">
                  <span
                    className="ml-4 text-sm font-semibold leading-6 text-gray-900 truncate"
                    aria-hidden="true"
                  >
                    {{ userData.user.name || userData?.user.email }}
                  </span>
                  <IconChevronDown
                    class="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none flex flex-col items-center"
              >
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    :href="`/profile/${userData?.user?.id}`"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'w-full  px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    Your Profile
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'w-full  px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'w-full  px-4 py-2 text-sm text-gray-700',
                    ]"
                    @click="signOut()"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

          <button v-else :class="`${buttons.primary}`" @click="open">
            SIGN IN
          </button>
        </div>
      </div>
      <SigninModal :is-open="isOpen" :close="close" />

      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { useDisclosure } from "@storefront-ui/vue";

import { IconChevronDown, IconMenu } from "@tabler/icons-vue";
import { buttons } from "~/constants/classes";
import { APIKEY } from "~/services/axios";
const { close, isOpen, open } = useDisclosure({
  initialValue: false,
});

const { signOut, data: userData } = useAuth();

export interface GenresData {
  id: number;
  name: string;
}
type Data = {
  genres: GenresData[];
};
const sidebarOpen = ref(false);
const api = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}`;
const { data } = await useFetch<Data>(api);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>
