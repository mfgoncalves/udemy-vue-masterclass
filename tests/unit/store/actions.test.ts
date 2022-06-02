import getJobs from "@/api/getJobs";
import actions from "@/store/actions";

jest.mock("@/api/getJobs");
const getJobsMock = getJobs as jest.Mock;

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobsMock.mockResolvedValue([{ id: 1, title: "Software Developer" }]);
    });

    afterEach(() => {
      getJobsMock.mockClear();
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
