import getDegrees from "@/api/getDegrees";
import axios from "axios";

jest.mock("axios");

const axiosGetMock = axios.get as jest.Mock;

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [{ id: 1, degree: "Master's" }],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetch all possible degree requirements", async () => {
    await getDegrees();
    expect(axiosGetMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/degrees`
    );
  });

  it("extracts degrees from response", async () => {
    const data = await getDegrees();
    expect(data).toEqual([{ id: 1, degree: "Master's" }]);
  });
});
