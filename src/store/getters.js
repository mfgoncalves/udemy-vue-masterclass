import {
  FILTERED_JOBS,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_ORGANIZATION,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from "@/store/constants";

const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const items = state.jobs.map((job) => job.organization);
    return new Set(items);
  },
  [UNIQUE_JOB_TYPES](state) {
    const items = state.jobs.map((job) => job.jobType);
    return new Set(items);
  },
  [INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job) => {
    if (state.selectedOrganizations.length === 0) {
      return true;
    }
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job) => {
    if (state.selectedJobTypes.length === 0) {
      return true;
    }
    return state.selectedJobTypes.includes(job.jobType);
  },
  [FILTERED_JOBS](state, getters) {
    return state.jobs
      .filter((job) => getters[INCLUDE_JOB_BY_ORGANIZATION](job))
      .filter((job) => getters[INCLUDE_JOB_BY_JOB_TYPE](job));
  },
};

export default getters;
