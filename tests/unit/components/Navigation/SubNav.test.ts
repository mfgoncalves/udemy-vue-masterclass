import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav.vue";
import useConfirmRoute from "@/composables/useConfirmRoute";
import { useFilteredJobs } from "@/store/composables";

jest.mock("@/composables/useConfirmRoute");
jest.mock("@/store/composables");

const useConfirmRouteMock = useConfirmRoute as jest.Mock;
const useFilteredJobsMock = useFilteredJobs as jest.Mock;

describe("SubNav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      useConfirmRouteMock.mockReturnValue(true);
      useFilteredJobsMock.mockReturnValue([{ id: 1 }, { id: 2 }]);

      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when user is not on job page", () => {
    it("does not display job count", () => {
      useConfirmRouteMock.mockReturnValue(false);

      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBeFalsy();
    });
  });
});
