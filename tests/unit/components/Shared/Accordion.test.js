import Accordion from "@/components/Shared/Accordion";
import { mount } from "@vue/test-utils";

describe("Accordion", () => {
  const createConfig = (config = {}) => ({
    props: {
      header: "Test Header",
    },
    slots: {
      default: "<h3>My slot</h3>",
    },
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    ...config,
  });

  it("renders child", async () => {
    const config = createConfig({ slots: { default: "<h1>My child</h1>" } });
    const wrapper = mount(Accordion, config);

    expect(wrapper.text()).not.toMatch("My child");
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("My child");
  });

  describe("when custom child content is not provided", () => {
    it("renders default content", async () => {
      const config = createConfig({ slots: {} });
      const wrapper = mount(Accordion, config);

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      expect(wrapper.text()).toMatch("This should be populated");
    });
  });
});
