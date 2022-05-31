import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { mount } from "@vue/test-utils";

describe("JobFiltersSidebarOrganizations", () => {
  const createConfig = ($store, $router) => ({
    global: {
      mocks: {
        $store,
        $router,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of organizations for filtering jobs", async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon", "Facebook"]),
      },
    };
    const $router = { push: jest.fn() };

    const wrapper = mount(
      JobFiltersSidebarOrganizations,
      createConfig($store, $router)
    );

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const organizationLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationLabels.map((node) => node.text());

    expect(organizations).toEqual(["Google", "Amazon", "Facebook"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for organization", async () => {
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon", "Facebook"]),
        },
        commit,
      };
      const $router = { push: jest.fn() };

      const wrapper = mount(
        JobFiltersSidebarOrganizations,
        createConfig($store, $router)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();

      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_ORGANIZATIONS", [
        "Google",
      ]);
    });

    it("navigate user to job results page to see fresh batch of filtered jobs", async () => {
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon", "Facebook"]),
        },
        commit,
      };
      const $router = { push: jest.fn() };

      const wrapper = mount(
        JobFiltersSidebarOrganizations,
        createConfig($store, $router)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
