import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";
import { mount } from "@vue/test-utils";

import { useStore } from "vuex";

jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

describe("JobFiltersSidebarPrompt", () => {
  describe("when user clicks clears filters button", () => {
    it("sends message to clear all of user's job search filters", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit });
      const wrapper = mount(JobFiltersSidebarPrompt);

      const button = wrapper.find("[data-test='clear-user-job-filters']");
      await button.trigger("click");

      expect(commit).toHaveBeenCalledWith("CLEAR_USER_JOB_FILTERS_SELECTIONS");
    });
  });
});
