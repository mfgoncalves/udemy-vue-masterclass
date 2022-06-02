import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { mount } from "@vue/test-utils";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

jest.mock("vuex");
jest.mock("vue-router");

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Test header",
      uniqueValues: new Set(["Value A", "Value B"]),
      mutation: "MUTATION",
      ...props,
    },
  });

  it("renders unique list of values for filtering jobs", async () => {
    useRouter.mockReturnValue({ push: jest.fn() });

    const props = { uniqueValues: new Set(["Value 1", "Value 2"]) };
    const wrapper = mount(JobFiltersSidebarCheckboxGroup, createConfig(props));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const inputLabels = wrapper.findAll("[data-test='value']");
    const inputValues = inputLabels.map((node) => node.text());

    expect(inputValues).toEqual(["Value 1", "Value 2"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });

      const props = {
        mutation: "TEST_MUTATION",
        uniqueValues: new Set(["Value 1"]),
      };
      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const valueInput = wrapper.find("[data-test='Value 1']");
      await valueInput.setChecked();

      expect(commit).toHaveBeenCalledWith("TEST_MUTATION", ["Value 1"]);
    });

    it("navigate user to job results page to see fresh batch of filtered jobs", async () => {
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      const push = jest.fn();
      useRouter.mockReturnValue({ push });

      const props = {
        uniqueValues: new Set(["Value"]),
      };
      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const valueInput = wrapper.find("[data-test='Value']");
      await valueInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
