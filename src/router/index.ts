import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Cards",
    component: () =>
      import(/* webpackChunkName: "cards" */ "../views/Cards.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
