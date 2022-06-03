import HeaderContainer from "@/components/Shared/HeaderContainer.vue";
import { mount } from "@vue/test-utils";

describe("HeaderContainer", () => {
  it("allows parent components to provide title content", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        title: "<h3>Test title</h3>",
      },
    });

    expect(wrapper.text()).toMatch("Test title");
  });

  it("allows parent components to provide subtitle content", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        subtitle: "<p>Test subtitle</p>",
      },
    });

    expect(wrapper.text()).toMatch("Test subtitle");
  });
});
