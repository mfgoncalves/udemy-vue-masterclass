import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { useUniqueOrganizations } from "@/store/composables";
import { shallowMount } from "@vue/test-utils";
jest.mock("@/store/composables");

const useUniqueOrganizationsMock = useUniqueOrganizations as jest.Mock;

describe("JobFiltersSidebarOrganizations", () => {
  it("allows users to filter jobs by organizations", () => {
    useUniqueOrganizationsMock.mockReturnValue(new Set(["Google", "Amazon"]));

    const wrapper = shallowMount(JobFiltersSidebarOrganizations);
    const organizationsFilter = wrapper.findComponent({
      name: "JobFiltersSidebarCheckboxGroup",
    });
    const { mutation, uniqueValues } = organizationsFilter.props();
    expect(uniqueValues).toEqual(new Set(["Google", "Amazon"]));
    expect(mutation).toBe("ADD_SELECTED_ORGANIZATIONS");
  });
});
