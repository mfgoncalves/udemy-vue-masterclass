<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="isOnJobResultsPage" data-test="job-count">
        <FontAwesomeIcon class="mr-3" :icon="['fas', 'search']" />
        <span>
          <span class="text-brand-green-1">1653</span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubNav",
  computed: {
    isOnJobResultsPage() {
      return this.$route.name === "JobResults";
    },
  },
};
</script>
