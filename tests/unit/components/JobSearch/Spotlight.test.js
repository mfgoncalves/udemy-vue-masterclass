import Spotlight from "@/components/JobSearch/Spotlight.vue";
import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";

jest.mock("axios");

describe("Spotlight", () => {
  const createConfig = (template) => ({
    slots: {
      default: `
        <template #default="slotProps">
          ${template}
        </template>
      `,
    },
  });

  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: "some-image",
          title: "some-title",
          description: "some-description",
          ...data,
        },
      ],
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("provides img attribute to parent component", async () => {
    mockSpotlightResponse({ img: "my-img" });
    const wrapper = mount(
      Spotlight,
      createConfig("<h1>{{ slotProps.img }}</h1>")
    );
    await flushPromises();
    expect(wrapper.text()).toMatch("my-img");
  });

  it("provides title attribute to parent component", async () => {
    mockSpotlightResponse({ img: "this is a title" });
    const wrapper = mount(
      Spotlight,
      createConfig("<h1>{{ slotProps.title }}</h1>")
    );
    await flushPromises();
    expect(wrapper.text()).toMatch("this is a title");
  });

  it("provides description attribute to parent component", async () => {
    mockSpotlightResponse({ img: "test-description" });
    const wrapper = mount(
      Spotlight,
      createConfig("<h1>{{ slotProps.description }}</h1>")
    );
    await flushPromises();
    expect(wrapper.text()).toMatch("test-description");
  });
});
