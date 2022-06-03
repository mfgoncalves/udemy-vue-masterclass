<template>
  <h1>JobPage id: {{ currentJobId }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "JobView",
  setup() {
    const route = useRoute();

    const currentJobId = route.params.id;

    return {
      currentJobId,
    };
  },
});
</script>
