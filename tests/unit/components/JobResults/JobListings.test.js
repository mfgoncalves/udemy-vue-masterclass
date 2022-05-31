import JobListings from "@/components/JobResults/JobListings.vue";
import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const createStore = (config = {}) => ({
    getters: { FILTERED_JOBS: Array(15).fill({}) },
    dispatch: jest.fn(),
    ...config,
  });

  const createConfig = ($route, $store) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("when the component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      const $route = createRoute();
      const dispatch = jest.fn();
      const $store = createStore({ dispatch });

      shallowMount(JobListings, createConfig($route, $store));

      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  it("creates a job listing for a maximum of 10 jobs", async () => {
    const $route = createRoute({ page: "1" });
    const numberOfJobsInStore = 25;
    const $store = createStore({
      getters: {
        FILTERED_JOBS: Array(numberOfJobsInStore).fill({}),
      },
    });
    const wrapper = shallowMount(JobListings, createConfig($route, $store));
    await flushPromises();
    const jobsListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobsListings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const $route = createRoute({ page: undefined });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params includes page number", () => {
    it("displays page number", () => {
      const $route = createRoute({ page: 5 });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 5");
    });
  });

  describe("when the user is on first page of job results", () => {
    it("does not show link to previous page", async () => {
      const $route = createRoute({ page: "1" });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });
    it("shows link to next page", async () => {
      const $route = createRoute({ page: "1" });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when the user is on last page of job results", () => {
    it("shows link to previous page", async () => {
      const $route = createRoute({ page: "2" });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
    it("does not show link to next page", async () => {
      const $route = createRoute({ page: "2" });
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });
  });
});
