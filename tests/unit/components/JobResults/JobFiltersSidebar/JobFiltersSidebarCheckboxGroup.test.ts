import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { shallowMount } from "@vue/test-utils";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

jest.mock("vuex");
jest.mock("vue-router");

const useStoreMock = useStore as jest.Mock;
const useRouterMock = useRouter as jest.Mock;

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createConfig = (props = {}) => ({
    props: {
      uniqueValues: new Set(["Value A", "Value B"]),
      mutation: "MUTATION",
      ...props,
    },
  });

  it("renders unique list of values for filtering jobs", async () => {
    useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });
    useRouterMock.mockReturnValue({ push: jest.fn() });

    const props = { uniqueValues: new Set(["Value 1", "Value 2"]) };
    const wrapper = shallowMount(
      JobFiltersSidebarCheckboxGroup,
      createConfig(props)
    );

    const inputLabels = wrapper.findAll("[data-test='value']");
    const inputValues = inputLabels.map((node) => node.text());

    expect(inputValues).toEqual(["Value 1", "Value 2"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit, subscribe: jest.fn() });
      useRouterMock.mockReturnValue({ push: jest.fn() });

      const props = {
        mutation: "TEST_MUTATION",
        uniqueValues: new Set(["Value 1"]),
      };
      const wrapper = shallowMount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );

      const valueInput = wrapper.find("[data-test='Value 1']");
      await valueInput.setValue(true);

      expect(commit).toHaveBeenCalledWith("TEST_MUTATION", ["Value 1"]);
    });

    it("navigate user to job results page to see fresh batch of filtered jobs", async () => {
      useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });
      const push = jest.fn();
      useRouterMock.mockReturnValue({ push });

      const props = {
        uniqueValues: new Set(["Value"]),
      };
      const wrapper = shallowMount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );

      const valueInput = wrapper.find("[data-test='Value']");
      await valueInput.setValue(true);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
