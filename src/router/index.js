import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CompletedPage from "../views/Completed.vue";
// eslint-disable-next-line no-use-before-define
import SurveyView from "../views/SurveyView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/completed",
    name: "CompletedPage",
    component: CompletedPage
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/survey/:surveyid",
    name: "SurveyView",
    component: SurveyView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
