import {
  FILTERED_JOBS_BY_ORGANIZATIONS,
  UNIQUE_ORGANIZATIONS,
} from "@/store/constants";

const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const items = state.jobs.map((job) => job.organization);
    return new Set(items);
  },
  [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
    if (state.selectedOrganizations.length === 0) {
      return state.jobs;
    }
    return state.jobs.filter((job) =>
      state.selectedOrganizations.includes(job.organization)
    );
  },
};

export default getters;
