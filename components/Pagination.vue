<template>
  <nav
    class="flex justify-between items-center py-2"
    role="navigation"
    aria-label="pagination"
  >
    <SfButton
      type="button"
      size="base"
      aria-label="Go to previous page"
      :disabled="selectedPage <= 1"
      variant="primary"
      class="gap-3"
      @click="prevWrapper"
    >
      <template #prefix>
        <SfIconChevronLeft />
      </template>
      <span class="hidden sm:inline-flex"> Previous </span>
    </SfButton>
    <ul class="hidden md:flex justify-center">
      <li v-if="!pages.find((page) => page === 1)">
        <div
          :class="[
            'flex pt-1 border-t-4 border-transparent',
            {
              'font-medium border-t-4 !border-primary-500': selectedPage === 1,
            },
          ]"
        >
          <button
            type="button"
            class="px-4 py-3 rounded-md text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
            :aria-current="selectedPage === 1"
            @click="setPageWrapper(1)"
          >
            1
          </button>
        </div>
      </li>
      <li v-if="startPage > 2">
        <div class="flex pt-1 border-t-4 border-transparent">
          <button
            type="button"
            disabled
            aria-hidden="true"
            class="px-4 py-3 rounded-md text-neutral-500"
          >
            ...
          </button>
        </div>
      </li>
      <li v-if="maxVisiblePages === 1 && selectedPage === totalPages">
        <div class="flex pt-1 border-t-4 border-transparent">
          <button
            type="button"
            class="px-4 py-3 rounded-md text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
            :aria-current="endPage - 1 === selectedPage"
            @click="setPageWrapper(endPage - 1)"
          >
            {{ endPage - 1 }}
          </button>
        </div>
      </li>
      <li v-for="page in pages" :key="`page-${page}`">
        <div
          :class="[
            'flex pt-1 border-t-4 border-transparent',
            {
              'font-medium border-t-4 !border-primary-700':
                selectedPage === page,
            },
          ]"
        >
          <button
            type="button"
            :class="[
              'px-4 py-3 text-neutral-500 rounded-md hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900',
              {
                '!text-neutral-900 hover:!text-primary-800 active:!text-primary-900':
                  selectedPage === page,
              },
            ]"
            :aria-label="`Page ${page} of ${totalPages}`"
            :aria-current="selectedPage === page"
            @click="setPageWrapper(page)"
          >
            {{ page }}
          </button>
        </div>
      </li>
      <li v-if="maxVisiblePages === 1 && selectedPage === 1">
        <div class="flex pt-1 border-t-4 border-transparent">
          <button
            type="button"
            class="px-4 py-3 rounded-md text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
            :aria-label="`Page 2 of ${totalPages}`"
            @click="setPageWrapper(2)"
          >
            2
          </button>
        </div>
      </li>
      <li v-if="endPage < totalPages - 1">
        <div class="flex pt-1 border-t-4 border-transparent">
          <button
            type="button"
            disabled
            aria-hidden="true"
            class="px-4 py-3 rounded-md text-neutral-500"
          >
            ...
          </button>
        </div>
      </li>
      <li v-if="!pages.find((page) => page === totalPages)">
        <div
          :class="[
            'flex pt-1 border-t-4 border-transparent',
            {
              'font-medium border-t-4 !border-primary-500':
                selectedPage === totalPages,
            },
          ]"
        >
          <button
            type="button"
            class="px-4 py-3 rounded-md text-white hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
            :aria-current="totalPages === selectedPage"
            @click="setPageWrapper(totalPages)"
          >
            {{ totalPages }}
          </button>
        </div>
      </li>
    </ul>
    <SfButton
      type="button"
      size="base"
      aria-label="Go to next page"
      :disabled="selectedPage >= totalPages"
      variant="primary"
      class="gap-3"
      @click="nextWrapper"
    >
      <span class="hidden sm:inline-flex"> Next </span>
      <template #suffix>
        <SfIconChevronRight />
      </template>
    </SfButton>
  </nav>
</template>

<script lang="ts" setup>
import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  usePagination,
} from "@storefront-ui/vue";

const { currentPage, maxPages, pageSize, totalItems } = defineProps<{
  totalItems: number | undefined;
  currentPage: number | undefined;
  pageSize: number | undefined;
  maxPages: number | undefined;
}>();
const emit = defineEmits(["update:currentPage"]);
const setPageWrapper = (page: number) => {
  setPage(page);
  emit("update:currentPage", page);
};
const nextWrapper = () => {
  if (selectedPage.value < totalPages.value) {
    next();

    emit("update:currentPage", selectedPage.value);
  }
};
const prevWrapper = () => {
  if (selectedPage.value > 1) {
    prev();
    emit("update:currentPage", selectedPage.value);
  }
};

const {
  totalPages,
  pages,
  selectedPage,
  startPage,
  endPage,
  next,
  prev,
  setPage,
  maxVisiblePages,
} = usePagination({
  totalItems: totalItems as number,
  currentPage,
  pageSize,
  maxPages,
});
</script>
