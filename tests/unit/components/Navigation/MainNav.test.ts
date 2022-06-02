import MainNav from "@/components/Navigation/MainNav.vue";
import { GlobalState } from "@/store/types";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";

interface MockStore {
  state: Partial<GlobalState>;
}

describe("MainNav", () => {
  const createConfig = ($store: MockStore) => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("displays company name", () => {
    const $store = {
      state: {
        isLoggedIn: false,
      },
    };
    const wrapper = shallowMount(MainNav, createConfig($store));
    expect(wrapper.text()).toMatch("OE Careers");
  });

  it("displays menu items for navigation", () => {
    const $store = {
      state: {
        isLoggedIn: false,
      },
    };
    const wrapper = shallowMount(MainNav, createConfig($store));
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
    it("issues call to Vuex to login user", async () => {
      const commit = jest.fn();
      const $store = {
        state: {
          isLoggedIn: false,
        },
        commit,
      };

      const wrapper = shallowMount(MainNav, createConfig($store));
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      expect(commit).toHaveBeenCalledWith("LOGIN_USER");
    }),
      it("prompts user to sign in", () => {
        const $store = {
          state: {
            isLoggedIn: false,
          },
        };
        const wrapper = shallowMount(MainNav, createConfig($store));
        const loginButton = wrapper.find("[data-test='login-button']");
        expect(loginButton.exists()).toBeTruthy();
      });
  });

  describe("when user is logged in", () => {
    it("displays user profile picture", async () => {
      const $store = {
        state: {
          isLoggedIn: true,
        },
      };
      const wrapper = shallowMount(MainNav, createConfig($store));

      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBeTruthy();
    });

    it("displays subnavigation menu with additional information", async () => {
      const $store = {
        state: {
          isLoggedIn: true,
        },
      };
      const wrapper = shallowMount(MainNav, createConfig($store));

      const subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
