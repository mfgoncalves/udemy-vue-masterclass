<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="isOnJobResultsPage" data-test="job-count">
        <FontAwesomeIcon class="mr-3" :icon="['fas', 'search']" />
        <span>
          <span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useConfirmRoute from "@/composables/useConfirmRoute";
import { useFilteredJobs } from "@/store/composables";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubNav",
  setup() {
    const FILTERED_JOBS = useFilteredJobs();
    const isOnJobResultsPage = useConfirmRoute("JobResults");

    return {
      isOnJobResultsPage,
      FILTERED_JOBS,
    };
  },
});
</script>
