import { Job } from "@/api/types";
import {
  FETCH_JOBS,
  FILTERED_JOBS,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from "@/store/constants";
import { computed } from "vue";
import { useStore } from "vuex";

// Getters

export const useFilteredJobs = () => {
  const store = useStore();
  return computed<Job[]>(() => store.getters[FILTERED_JOBS]);
};

export const useUniqueJobTypes = () => {
  const store = useStore();
  return computed<Set<string>>(() => store.getters[UNIQUE_JOB_TYPES]);
};

export const useUniqueOrganizations = () => {
  const store = useStore();
  return computed<Set<string>>(() => store.getters[UNIQUE_ORGANIZATIONS]);
};

// Actions

export const useFetchJobsAction = () => {
  const store = useStore();
  store.dispatch(FETCH_JOBS);
};
