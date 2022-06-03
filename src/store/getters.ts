import { Job } from "@/api/types";
import {
  FILTERED_JOBS,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_ORGANIZATION,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from "@/store/constants";
import { GlobalState } from "@/store/types";

const getters = {
  [UNIQUE_ORGANIZATIONS](state: GlobalState) {
    const items = state.jobs.map((job) => job.organization);
    return new Set(items);
  },
  [UNIQUE_JOB_TYPES](state: GlobalState) {
    const items = state.jobs.map((job) => job.jobType);
    return new Set(items);
  },
  [INCLUDE_JOB_BY_ORGANIZATION]: (state: GlobalState) => (job: Job) => {
    if (state.selectedOrganizations.length === 0) {
      return true;
    }
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedJobTypes.length === 0) {
      return true;
    }
    return state.selectedJobTypes.includes(job.jobType);
  },
  [FILTERED_JOBS](state: GlobalState, getters: any) {
    return state.jobs
      .filter((job) => getters[INCLUDE_JOB_BY_ORGANIZATION](job))
      .filter((job) => getters[INCLUDE_JOB_BY_JOB_TYPE](job));
  },
};

export default getters;
