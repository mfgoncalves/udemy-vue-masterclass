import { computed } from "vue";
import { useRoute } from "vue-router";

const useCurrentPage = () => {
  const route = useRoute();
  return computed(() => {
    let pageNumber = Number.parseInt((route.query.page as string) || "1");
    if (isNaN(pageNumber) || pageNumber < 1) {
      pageNumber = 1;
    }
    return pageNumber;
  });
};

export default useCurrentPage;
