import ActionButton from "@/components/ActionButton";
import { mount } from "@vue/test-utils";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "Sample text",
        primary: "primary",
      },
    });

    expect(wrapper.text()).toMatch("Sample text");
  });

  it("applies one of several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        type: "primary",
        text: "Sample text",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBeTruthy();
  });
});
