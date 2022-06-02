<template>
  <ul>
    <li v-for="spotlight of spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      />
    </li>
  </ul>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "SpotLight",
  setup() {
    const spotlights = ref([]);

    onMounted(async () => {
      const response = await axios.get(
        `${process.env.VUE_APP_API_URL}/spotlights`
      );
      spotlights.value = response.data;
    });

    return {
      spotlights,
    };
  },
};
</script>
