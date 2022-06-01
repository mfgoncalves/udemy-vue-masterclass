import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import { mount } from "@vue/test-utils";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useUniqueJobTypes } from "@/store/composables";

jest.mock("vue-router");
jest.mock("vuex");
jest.mock("@/store/composables");

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of job types for filtering jobs", async () => {
    useUniqueJobTypes.mockReturnValue(["Full-time", "Part-time", "Intern"]);

    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const organizationLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = organizationLabels.map((node) => node.text());

    expect(jobTypes).toEqual(["Full-time", "Part-time", "Intern"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for job type", async () => {
      const commit = jest.fn();

      useUniqueJobTypes.mockReturnValue(["Full-time", "Part-time", "Intern"]);
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });

      const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const googleInput = wrapper.find("[data-test='Full-time']");
      await googleInput.setChecked();

      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", [
        "Full-time",
      ]);
    });
    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      useStore.mockReturnValue({ commit: jest.fn() });
      useUniqueJobTypes.mockReturnValue(["Full-time", "Part-time", "Intern"]);

      const push = jest.fn();
      useRouter.mockReturnValue({
        push,
      });

      const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const googleInput = wrapper.find("[data-test='Full-time']");
      await googleInput.setChecked();

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
      });
    });
  });
});
