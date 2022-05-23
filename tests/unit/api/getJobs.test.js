import getJobs from "@/api/getJobs";
import axios from "axios";

jest.mock("axios");

describe("getJobs", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [{ id: 1, title: "Java Engineer" }] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches jobs that candidates can apply to", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/jobs`
    );
  });

  it("extracts jobs from response", async () => {
    const data = await getJobs();
    expect(data).toEqual([{ id: 1, title: "Java Engineer" }]);
  });
});
