import { Degree, Job } from "@/api/types";
import {
  FILTERED_JOBS,
  INCLUDE_JOB_BY_DEGREE,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_ORGANIZATION,
  UNIQUE_DEGREES,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from "@/store/constants";
import { GlobalState } from "@/store/types";

const getters = {
  [UNIQUE_DEGREES](state: GlobalState) {
    return state.degrees.map((degree) => degree.degree);
  },
  [UNIQUE_JOB_TYPES](state: GlobalState) {
    const items = state.jobs.map((job) => job.jobType);
    return new Set(items);
  },
  [UNIQUE_ORGANIZATIONS](state: GlobalState) {
    const items = state.jobs.map((job) => job.organization);
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
  [INCLUDE_JOB_BY_DEGREE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedDegrees.length === 0) {
      return true;
    }
    return state.selectedDegrees.includes(job.degree);
  },
  [FILTERED_JOBS](
    state: GlobalState,
    getters: Record<string, (job: Job) => boolean>
  ) {
    return state.jobs
      .filter((job) => getters[INCLUDE_JOB_BY_ORGANIZATION](job))
      .filter((job) => getters[INCLUDE_JOB_BY_JOB_TYPE](job))
      .filter((job) => getters[INCLUDE_JOB_BY_DEGREE](job));
  },
};

export default getters;
