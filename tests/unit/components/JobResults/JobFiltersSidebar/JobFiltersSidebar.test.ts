import { shallowMount } from "@vue/test-utils";
import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";
import { useUniqueJobTypes, useUniqueOrganizations } from "@/store/composables";

jest.mock("@/store/composables");

const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;
const useUniqueOrganizationsMock = useUniqueOrganizations as jest.Mock;

describe("JobFiltersSidebar", () => {
  it("allows users to filter jobs by job types", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useUniqueOrganizationsMock.mockReturnValue(new Set(["Google"]));
    const wrapper = shallowMount(JobFiltersSidebar);
    const jobTypesFilter = wrapper.findComponent(
      "[data-test='job-types-filter']"
    );
    // @ts-expect-error
    const { header, mutation, uniqueValues } = jobTypesFilter.props();
    expect(header).toBe("Job Types");
    expect(uniqueValues).toEqual(new Set(["Full-time", "Part-time"]));
    expect(mutation).toBe("ADD_SELECTED_JOB_TYPES");
  });
  it("allows users to filter jobs by organizations", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useUniqueOrganizationsMock.mockReturnValue(new Set(["Google"]));
    const wrapper = shallowMount(JobFiltersSidebar);
    const organizationsFilter = wrapper.findComponent(
      "[data-test='organizations-filter']"
    );
    // @ts-expect-error
    const { header, mutation, uniqueValues } = organizationsFilter.props();
    expect(header).toBe("Organizations");
    expect(uniqueValues).toEqual(new Set(["Google"]));
    expect(mutation).toBe("ADD_SELECTED_ORGANIZATIONS");
  });
});
