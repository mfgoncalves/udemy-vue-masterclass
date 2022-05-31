import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import { mount } from "@vue/test-utils";

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = ($store) => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of job types for filtering jobs", async () => {
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time", "Intern"]),
      },
    };

    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig($store));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const organizationLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = organizationLabels.map((node) => node.text());

    expect(jobTypes).toEqual(["Full-time", "Part-time", "Intern"]);
  });

  it("communicates that user has selected checkbox for job type", async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time", "Intern"]),
      },
      commit,
    };

    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig($store));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const googleInput = wrapper.find("[data-test='Full-time']");
    await googleInput.setChecked();

    expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", [
      "Full-time",
    ]);
  });
});
