import { computed } from "vue";
import { useRoute } from "vue-router";

const useConfirmRoute = (name) => {
  const route = useRoute();
  return computed(() => route.name === name);
};

export default useConfirmRoute;
