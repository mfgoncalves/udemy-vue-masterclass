import { createStore } from "vuex";
import getJobs from "@/api/getJobs";

// Mutations
export const LOGIN_USER = "LOGIN_USER";
export const RECEIVE_JOBS = "RECEIVE_JOBS";
export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
// Actions
export const FETCH_JOBS = "FETCH_JOBS";
// Getters
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";

export const state = () => {
  return {
    isLoggedIn: false,
    jobs: [],
    selectedOrganizations: [],
  };
};

export const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECEIVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGANIZATIONS](state, organizations) {
    state.selectedOrganizations = organizations;
  },
};

export const getters = {
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

export const actions = {
  [FETCH_JOBS]: async (ctx) => {
    const jobListings = await getJobs();
    ctx.commit(RECEIVE_JOBS, jobListings);
  },
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== "procuction",
});

export default store;
