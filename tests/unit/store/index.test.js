import getJobs from "@/api/getJobs";
import { actions, getters, mutations, state } from "@/store";

jest.mock("@/api/getJobs");

describe("state", () => {
  it("keeps track of wether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });
});

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state).toEqual({ isLoggedIn: true });
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API response", () => {
      const state = { jobs: [] };
      mutations.RECEIVE_JOBS(state, ["Job 1", "Job 2"]);
      expect(state).toEqual({ jobs: ["Job 1", "Job 2"] });
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that the user has chosen to filter jobs by", () => {
      const state = { selectedOrganizations: [] };
      mutations.ADD_SELECTED_ORGANIZATIONS(state, ["Google", "Amazon"]);
      expect(state).toEqual({ selectedOrganizations: ["Google", "Amazon"] });
    });
  });
});

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

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobs.mockResolvedValue([{ id: 1, title: "Software Developer" }]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("makes request to fetch jobs", async () => {
      const ctx = {
        commit: jest.fn(),
      };
      await actions.FETCH_JOBS(ctx);
      expect(getJobs).toHaveBeenCalled();
    });

    it("send message to save received jobs in store", async () => {
      const commit = jest.fn();
      const ctx = { commit };
      await actions.FETCH_JOBS(ctx);
      expect(commit).toHaveBeenCalledWith("RECEIVE_JOBS", [
        { id: 1, title: "Software Developer" },
      ]);
    });
  });
});
