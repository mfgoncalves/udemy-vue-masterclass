import { createRouter, createWebHashHistory } from "vue-router";

// Lazy loading
const HomeView = () => import("@/views/HomeView.vue");
const JobResultsView = () =>
  import(/* webpackChunkName: "jobs" */ "@/views/JobResultsView.vue");
const JobView = () =>
  import(/* webpackChunkName: "jobs" */ "@/views/JobView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobResultsView,
  },
  {
    path: "/jobs/results/:id",
    name: "JobLising",
    component: JobView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;