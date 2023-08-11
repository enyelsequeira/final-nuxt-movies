import { sidebarMenu } from "./../constants/index";
import { acceptHMRUpdate, defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: sidebarMenu[0].value,
    page: 1,
  }),
  getters: {
    getCategories: (state) => state.categories,
    getPage: (state) => state.page,
  },
  actions: {
    setCategories(category: string) {
      this.categories = category;
    },
    // increment page
    incrementPage() {
      this.page++;
    },
    decrementPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    // reset page
    resetPage() {
      this.page = 1;
    },
  },
});

// make sure to pass the right store definition, `useSession` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
