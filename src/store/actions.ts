import getDegrees from "@/api/getDegrees";
import getJobs from "@/api/getJobs";
import {
  FETCH_JOBS,
  FETCH_DEGREES,
  RECEIVE_DEGREES,
  RECEIVE_JOBS,
} from "@/store/constants";
import { Commit } from "vuex";

interface Context {
  commit: Commit;
}

const actions = {
  [FETCH_JOBS]: async (ctx: Context) => {
    const jobListings = await getJobs();
    ctx.commit(RECEIVE_JOBS, jobListings);
  },
  [FETCH_DEGREES]: async (ctx: Context) => {
    const degreeListings = await getDegrees();
    ctx.commit(RECEIVE_DEGREES, degreeListings);
  },
};

export default actions;
