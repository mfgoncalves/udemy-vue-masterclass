import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav", () => {
  const createConfig = (routeName, $store = {}) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      const $store = {
        getters: {
          FILTERED_JOBS_BY_ORGANIZATIONS: [{ id: 1 }, { id: 2 }],
        },
      };
      const wrapper = mount(SubNav, createConfig("JobResults", $store));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when user is not on job page", () => {
    it("does not display job count", () => {
      const wrapper = mount(SubNav, createConfig("Home"));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBeFalsy();
    });
  });
});
