import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav", () => {
  const createConfig = (routeName) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      const wrapper = mount(SubNav, createConfig("JobResults"));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBeTruthy();
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
