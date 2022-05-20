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

<script>
import JobListing from "@/components/JobResults/JobListing.vue";
import axios from "axios";

export default {
  name: "JobListings",
  components: { JobListing },
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    paginatedJobs() {
      return this.jobs.slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
    },
    currentPage() {
      const pageString = this.$route.query.page || "1";
      let pageNumber = Number.parseInt(pageString);
      if (isNaN(pageNumber) || pageNumber < 1) {
        pageNumber = 1;
      }
      return pageNumber;
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      return previousPage >= 1 ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      return nextPage <= Math.ceil(this.jobs.length / 10)
        ? nextPage
        : undefined;
    },
  },
  async mounted() {
    const response = await axios.get(`${process.env.VUE_APP_API_URL}/jobs`);
    this.jobs = response.data;
  },
};
</script>
