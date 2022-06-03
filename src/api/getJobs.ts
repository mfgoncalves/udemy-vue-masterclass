import axios from "axios";
import { Job } from "@/api/types";

const getJobs = async () => {
  const response = await axios.get<Job[]>(
    `${process.env.VUE_APP_API_URL}/jobs`
  );
  return response.data;
};

export default getJobs;
