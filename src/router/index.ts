import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import FullpageLayout from "../layouts/FullpageLayout.vue";
import LoginView from "../views/auth/LoginView.vue";
import ResetPasswordView from "../views/auth/ResetPasswordView.vue";
import HomeView from "@/views/HomeView.vue";
import ManagerView from "@/views/ManagerView.vue";
import ParrainsView from "@/views/ParrainsView.vue";
import FilleulView from "@/views/FilleulView.vue";
import ParrainagesView from "@/views/parrainages/ParrainagesView.vue";
import AssociationView from "@/views/parrainages/AssociationView.vue";

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
          meta: {
            title: "Accueil",
          },
        },
        {
          path: "/filleuls",
          name: "filleuls",
          component: FilleulView,
          meta: {
            title: "Filleuls",
          },
        },
        {
          path: "/managers",
          name: "managers",
          component: ManagerView,
          meta: {
            requiresAuth: true,
            title: "Managers",
          },
        },
        {
          path: "/parrainages",
          name: "parrainages",
          component: ParrainagesView,
          meta: {
            title: "Parrainages",
          },
        },
        {
          path: "/parrains",
          name: "parrains",
          component: ParrainsView,
          meta: {
            title: "Parrains",
          },
        },
      ],
    },
    {
      path: "/parrainages/association",
      name: "association-root",
      component: FullpageLayout,
      children: [
        {
          path: "/parrainages/association",
          name: "association",
          component: AssociationView,
          meta: {
            requiresAuth: true,
            title: "Association",
          },
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
            title: "Connexion",
          },
        },
        {
          path: "/reset-password/:token",
          name: "reset-password",
          component: ResetPasswordView,
          meta: {
            requiresGuest: true,
            title: "Mot de passe oublié",
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

  document.title = to.meta.title + " - Parrainages";
});

export default router;
