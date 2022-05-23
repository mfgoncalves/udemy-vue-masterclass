import axios from "axios";

const getJobs = async () => {
  const response = await axios.get(`${process.env.VUE_APP_API_URL}/jobs`);
  return response.data;
};

export default getJobs;
