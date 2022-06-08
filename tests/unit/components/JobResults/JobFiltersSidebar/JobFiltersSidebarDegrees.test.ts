import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";
import { useUniqueDegrees } from "@/store/composables";
import { shallowMount } from "@vue/test-utils";
jest.mock("@/store/composables");

const useUniqueDegreesMock = useUniqueDegrees as jest.Mock;

describe("JobFiltersSidebarDegrees", () => {
  it("allows users to filter jobs by degrees", () => {
    useUniqueDegreesMock.mockReturnValue(["Bachelor's", "Master's"]);

    const wrapper = shallowMount(JobFiltersSidebarDegrees);
    const degreesFilter = wrapper.findComponent({
      name: "JobFiltersSidebarCheckboxGroup",
    });
    const { mutation, uniqueValues } = degreesFilter.props();
    expect(uniqueValues).toEqual(["Bachelor's", "Master's"]);
    expect(mutation).toBe("ADD_SELECTED_DEGREES");
  });
});
