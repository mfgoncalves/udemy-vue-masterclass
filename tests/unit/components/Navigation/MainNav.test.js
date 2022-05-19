import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
  const createConfig = () => ({
    global: { stubs: { "router-link": RouterLinkStub } },
  });

  it("displays company name", () => {
    const wrapper = shallowMount(MainNav, createConfig());
    expect(wrapper.text()).toMatch("OE Careers");
  });

  it("displays menu items for navigation", () => {
    const wrapper = shallowMount(MainNav, createConfig());
    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuTexts = navigationMenuItems.map((item) => item.text());
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at OE",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const wrapper = shallowMount(MainNav, createConfig());
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBeTruthy();
    });
  });

  describe("when user is logged in", () => {
    it("displays user profile picture", async () => {
      const wrapper = shallowMount(MainNav, createConfig());
      let profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBeFalsy();

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBeTruthy();
    });

    it("displays subnavigation menu with additional information", async () => {
      const wrapper = shallowMount(MainNav, createConfig());
      let subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
