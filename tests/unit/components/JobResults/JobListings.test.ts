import JobListings from "@/components/JobResults/JobListings.vue";
import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import { useFilteredJobs, useFetchJobsAction } from "@/store/composables";
import useCurrentPage from "@/composables/useCurrentPage";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
import { ref } from "vue";

jest.mock("@/store/composables");
jest.mock("@/composables/useCurrentPage");
jest.mock("@/composables/usePreviousAndNextPages");

const useCurrentPageMock = useCurrentPage as jest.Mock;
const usePreviousAndNextPagesMock = usePreviousAndNextPages as jest.Mock;
const useFilteredJobsMock = useFilteredJobs as jest.Mock;

describe("JobListings", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("when the component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue({ value: 1 });
      usePreviousAndNextPagesMock.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });

      shallowMount(JobListings, createConfig());

      expect(useFetchJobsAction).toHaveBeenCalled();
    });
  });

  it("creates a job listing for a maximum of 10 jobs", async () => {
    useFilteredJobsMock.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPageMock.mockReturnValue({ value: 1 });
    usePreviousAndNextPagesMock.mockReturnValue({
      previousPage: undefined,
      nextPage: 2,
    });

    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobsListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobsListings).toHaveLength(10);
  });

  it("displays page number", () => {
    useFilteredJobsMock.mockReturnValue({ value: [] });
    useCurrentPageMock.mockReturnValue(ref(5));
    usePreviousAndNextPagesMock.mockReturnValue({
      previousPage: 4,
      nextPage: 6,
    });
    const wrapper = shallowMount(JobListings, createConfig());
    expect(wrapper.text()).toMatch("Page 5");
  });

  describe("when the user is on first page of job results", () => {
    it("does not show link to previous page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue(ref(1));
      usePreviousAndNextPagesMock.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });
    it("shows link to next page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPageMock.mockReturnValue(ref(1));
      usePreviousAndNextPagesMock.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when the user is on last page of job results", () => {
    it("shows link to previous page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPageMock.mockReturnValue(ref(2));
      usePreviousAndNextPagesMock.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
    it("does not show link to next page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPageMock.mockReturnValue(ref(2));
      usePreviousAndNextPagesMock.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });
  });
});
