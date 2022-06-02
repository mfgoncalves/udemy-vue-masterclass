import { Job } from "@/api/types";
import state from "@/store/state";
import { GlobalState } from "@/store/types";

export const createState = (
  initial: Partial<GlobalState> = {}
): GlobalState => ({
  ...state(),
  ...initial,
});

export const createJob = (initial: Partial<Job> = {}): Job => ({
  id: 1,
  title: "Angular Developer",
  organization: "Vue and Me",
  degree: "Master's",
  jobType: "Intern",
  locations: ["Lisbon"],
  minimumQualifications: [],
  preferredQualifications: [],
  description: [],
  dateAdded: "2021-07-04",
  ...initial,
});
