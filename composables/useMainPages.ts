export const useMainPages = () => {
  const route = useRoute();
  const router = useRouter();

  const page = ref(route.query.page ? parseInt(route.query.page as string) : 1);

  const changePage = (newPage: number) => {
    page.value = newPage;
    router.push({
      query: { page: newPage },
    });
  };
  const resetPage = () => {
    page.value = 1;
    router.push({
      query: {
        page: 1,
      },
    });
  };
  return {
    page,
    changePage,
    resetPage,
  };
};
