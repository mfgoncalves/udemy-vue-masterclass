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

<script lang="ts">
import { Spotlight } from "@/api/types";
import axios from "axios";
import { ref, onMounted, defineComponent } from "vue";

export default defineComponent({
  name: "SpotLight",
  setup() {
    const spotlights = ref<Spotlight[]>([]);

    onMounted(async () => {
      const response = await axios.get<Spotlight[]>(
        `${process.env.VUE_APP_API_URL}/spotlights`
      );
      spotlights.value = response.data;
    });

    return {
      spotlights,
    };
  },
});
</script>
