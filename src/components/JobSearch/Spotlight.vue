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

export default {
  name: "SpotLight",
  data() {
    return {
      spotlights: [],
    };
  },
  async mounted() {
    const response = await axios.get(
      `${process.env.VUE_APP_API_URL}/spotlights`
    );
    this.spotlights = response.data;
  },
};
</script>
