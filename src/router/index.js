import { createRouter, createWebHistory } from "vue-router";
import Selection from "./../views/Selection.vue";
import Playground from "./../views/Playground.vue";

const routes = [
  {
    path: "/",
    name: "Hero Selection",
    component: Selection,
  },
  {
    path: "/play",
    name: "Playground",
    component: Playground,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
