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

<script>
import { mapGetters } from "vuex";
import { FILTERED_JOBS } from "@/store/constants";

export default {
  name: "SubNav",
  computed: {
    ...mapGetters([FILTERED_JOBS]),
    isOnJobResultsPage() {
      return this.$route.name === "JobResults";
    },
  },
};
</script>
