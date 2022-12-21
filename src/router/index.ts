import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import FullpageLayout from "../layouts/FullpageLayout.vue";
import LoginView from "../views/auth/LoginView.vue";
import ResetPasswordView from "../views/auth/ResetPasswordView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: MainLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: FullpageLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: LoginView,
          meta: {
            requiresGuest: true,
          },
        },
        {
          path: "/reset-password/:token",
          name: "reset-password",
          component: ResetPasswordView,
          meta: {
            requiresGuest: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!JSON.parse(
    sessionStorage.getItem("isAuthenticated") ?? "false"
  );
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
