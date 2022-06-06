import axios from "axios";
import { Degree } from "@/api/types";

const getDegrees = async () => {
  const response = await axios.get<Degree[]>(
    `${process.env.VUE_APP_API_URL}/degrees`
  );
  return response.data;
};

export default getDegrees;
