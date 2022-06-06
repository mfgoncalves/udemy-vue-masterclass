<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <JobListing
        v-for="job in paginatedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>

    <div cass="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            data-test="previous-page-link"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import JobListing from "@/components/JobResults/JobListing.vue";
import { computed, defineComponent, onMounted } from "vue";
import {
  useFilteredJobs,
  useFetchJobsAction,
  useFetchDegreesAction,
} from "@/store/composables";
import useCurrentPage from "@/composables/useCurrentPage";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

export default defineComponent({
  name: "JobListings",
  components: { JobListing },
  setup() {
    onMounted(useFetchJobsAction);
    onMounted(useFetchDegreesAction);

    const filteredJobs = useFilteredJobs();
    const currentPage = useCurrentPage();

    const maxPage = computed(() => Math.ceil(filteredJobs.value.length / 10));

    const { previousPage, nextPage } = usePreviousAndNextPages(
      currentPage,
      maxPage
    );

    const paginatedJobs = computed(() =>
      filteredJobs.value.slice(
        (currentPage.value - 1) * 10,
        currentPage.value * 10
      )
    );

    return {
      paginatedJobs,
      currentPage,
      previousPage,
      nextPage,
    };
  },
});
</script>
