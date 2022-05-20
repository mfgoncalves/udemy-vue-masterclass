import JobListings from "@/components/JobResults/JobListings.vue";
import { shallowMount, flushPromises } from "@vue/test-utils";
import axios from "axios";

jest.mock("axios");

describe("JobListings", () => {
  it("fetches jos", () => {
    axios.get.mockResolvedValue({ data: [] });
    shallowMount(JobListings);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("creates a job listing for each received job", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const wrapper = shallowMount(JobListings);
    await flushPromises();
    const jobsListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobsListings).toHaveLength(15);
  });
});
