import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../components/TheContainer.vue"),
    },
    {
      path: "/images",
      component: () => import("../components/TheImages.vue"),
    },
  ],
});
