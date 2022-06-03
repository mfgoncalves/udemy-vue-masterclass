import useCurrentPage from "@/composables/useCurrentPage";
import { useRoute } from "vue-router";
jest.mock("vue-router");

const useRouteMock = useRoute as jest.Mock;

describe("useCurrentPage", () => {
  describe("when query params include page", () => {
    it("returns page", () => {
      useRouteMock.mockReturnValue({ query: { page: "3" } });
      const page = useCurrentPage();
      expect(page.value).toBe(3);
    });
  });
  describe("when query params does not include page", () => {
    it("defaults to page 1", () => {
      useRouteMock.mockReturnValue({ query: {} });
      const page = useCurrentPage();
      expect(page.value).toBe(1);
    });
  });
  describe("when query params includes a not valid page", () => {
    it("defaults to page 1", () => {
      useRouteMock.mockReturnValue({ query: { page: "Invalid" } });
      const page = useCurrentPage();
      expect(page.value).toBe(1);
    });
  });
});
