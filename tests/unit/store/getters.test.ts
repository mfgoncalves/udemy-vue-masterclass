import getters from "@/store/getters";
import { createJob, createState } from "./utils";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const state = createState({
        jobs: [
          createJob({ organization: "A" }),
          createJob({ organization: "B" }),
          createJob({ organization: "A" }),
        ],
      });
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["A", "B"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const state = createState({
        jobs: [
          createJob({ jobType: "Full-time" }),
          createJob({ jobType: "Part-time" }),
          createJob({ jobType: "Full-time" }),
        ],
      });
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["Full-time", "Part-time"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected any organizations", () => {
      it("includes job", () => {
        const state = createState({
          selectedOrganizations: [],
        });
        const job = createJob({ organization: "Google" });

        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);

        expect(includeJob).toBe(true);
      });
    });
    it("identifies if job is associated with given organizations", () => {
      const state = createState({
        selectedOrganizations: ["Google", "Microsoft"],
      });
      const job = createJob({ organization: "Google" });

      const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);

      expect(includeJob).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job types", () => {
      it("includes job", () => {
        const state = createState({
          selectedJobTypes: [],
        });
        const job = createJob({ jobType: "Full-time" });

        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);

        expect(includeJob).toBe(true);
      });
    });
    it("identifies if job is associated with given job types", () => {
      const state = createState({
        selectedJobTypes: ["Full-time", "Part-time"],
      });
      const job = createJob({ jobType: "Full-time" });

      const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);

      expect(includeJob).toBe(true);
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filters jobs by organization and job type", () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const mockGetters = {
        INCLUDE_JOB_BY_ORGANIZATION,
        INCLUDE_JOB_BY_JOB_TYPE,
      };
      const job = createJob();
      const state = createState({
        jobs: [job],
      });

      const result = getters.FILTERED_JOBS(state, mockGetters);

      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
    });
  });
});
