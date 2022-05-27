import getters from "@/store/getters";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const state = {
        jobs: [
          { organization: "A" },
          { organization: "B" },
          { organization: "A" },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["A", "B"]));
    });
  });

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("identifies jobs that are associated with the given organizations", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Facebook" },
        ],
        selectedOrganizations: ["Google", "Amazon"],
      };
      const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state);
      expect(filteredJobs).toEqual([
        { organization: "Google" },
        { organization: "Amazon" },
      ]);
    });
  });

  describe("when the user has not selected any organizations", () => {
    it("returns all jobs", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Facebook" },
        ],
        selectedOrganizations: [],
      };
      const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state);
      expect(filteredJobs).toEqual([
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Facebook" },
      ]);
    });
  });
});
