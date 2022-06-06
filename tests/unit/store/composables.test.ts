import { useStore } from "vuex";
jest.mock("vuex");

import {
  useFetchJobsAction,
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
  useUniqueDegrees,
  useFetchDegreesAction,
} from "@/store/composables";

const useStoreMock = useStore as jest.Mock;

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("retrieves filtered jobs from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }],
        },
      });

      const result = useFilteredJobs();

      expect(result.value).toEqual([{ id: 1 }]);
    });
  });

  describe("useUniqueJobTypes", () => {
    it("retrieves unique job types from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time"]),
        },
      });

      const result = useUniqueJobTypes();

      expect(result.value).toEqual(new Set(["Full-time"]));
    });
  });

  describe("useUniqueOrganizations", () => {
    it("retrieves unique organizations from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["Google"]),
        },
      });

      const result = useUniqueOrganizations();

      expect(result.value).toEqual(new Set(["Google"]));
    });
  });

  describe("useUniqueDegrees", () => {
    it("retrieves unique degrees from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_DEGREES: ["Master's"],
        },
      });

      const result = useUniqueDegrees();

      expect(result.value).toEqual(["Master's"]);
    });
  });

  describe("useFetchJobsAction", () => {
    it("sends call to fetch jobs from API", () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({
        dispatch,
      });

      useFetchJobsAction();

      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  describe("useFetchDegreesAction", () => {
    it("sends call to fetch degrees from API", () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({
        dispatch,
      });

      useFetchDegreesAction();

      expect(dispatch).toHaveBeenCalledWith("FETCH_DEGREES");
    });
  });
});
