import TextInput from "@/components/Shared/TextInput.vue";
import { mount } from "@vue/test-utils";

describe("TextInput", () => {
  it("communicates that user has entered character", () => {
    const wrapper = mount(TextInput, { props: { modelValue: "" } });

    const input = wrapper.find("input");
    input.setValue("a");
    input.setValue("ab");
    input.setValue("abc");
    const messages = wrapper.emitted()["update:modelValue"];

    expect(messages).toEqual([["a"], ["ab"], ["abc"]]);
  });
});
