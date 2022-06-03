import { Job } from "@/api/types";
import JobListing from "@/components/JobResults/JobListing.vue";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { createJob } from "../../store/utils";

describe("JobListing", () => {
  const createConfig = (job: Job) => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
    props: {
      job: {
        ...job,
      },
    },
  });

  it("renders job title", () => {
    const job = createJob({ title: "Vue Programmer" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Vue Programmer");
  });

  it("renders job organization", () => {
    const job = createJob({ organization: "Google" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Google");
  });

  it("renders job locations", () => {
    const job = createJob({ locations: ["Orlando", "Dallas"] });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Orlando");
    expect(wrapper.text()).toMatch("Dallas");
  });

  it("renders job qualifications", () => {
    const job = createJob({
      minimumQualifications: ["Code", "Develop"],
    });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Code");
    expect(wrapper.text()).toMatch("Develop");
  });

  it("links to individual job's page", () => {
    const job = createJob({
      id: 15,
    });
    const wrapper = mount(JobListing, createConfig(job));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/15");
  });
});
