import JobListings from "@/components/JobResults/JobListings.vue";
import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import axios from "axios";

jest.mock("axios");

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const createConfig = ($route) => ({
    global: {
      mocks: {
        $route,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
  });

  afterEach(() => {
    axios.get.mockReset();
  });

  it("fetches jos", () => {
    shallowMount(JobListings, createConfig(createRoute()));
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/jobs`
    );
  });

  it("creates a job listing for a maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(20).fill({}) });
    const $route = createRoute({ page: "1" });
    const wrapper = shallowMount(JobListings, createConfig($route));
    await flushPromises();
    const jobsListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobsListings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const $route = createRoute({ page: undefined });
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params includes page nuymber", () => {
    it("displays page number", () => {
      const $route = createRoute({ page: 5 });
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 5");
    });
  });

  describe("when the user is on first page of job results", () => {
    it("does not show link to previous page", async () => {
      const $route = createRoute({ page: "1" });
      const wrapper = shallowMount(JobListings, createConfig($route));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });
    it("shows link to next page", async () => {
      const $route = createRoute({ page: "1" });
      const wrapper = shallowMount(JobListings, createConfig($route));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when the user is on last page of job results", () => {
    it("shows link to previous page", async () => {
      const $route = createRoute({ page: "2" });
      const wrapper = shallowMount(JobListings, createConfig($route));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
    it("does not show link to next page", async () => {
      const $route = createRoute({ page: "2" });
      const wrapper = shallowMount(JobListings, createConfig($route));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });
  });
});
