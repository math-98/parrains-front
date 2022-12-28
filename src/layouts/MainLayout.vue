<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark mb-4">
    <router-link class="navbar-brand ps-3" :to="{ name: 'home' }">
      <i class="fas fa-hands-helping"></i>
      Parrainage
    </router-link>

    <ul class="navbar-nav ms-auto me-3 me-lg-4">
      <li class="nav-item dropdown" v-if="user">
        <a
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fas fa-user fa-fw"></i>
          {{ user.name }}
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <button
              class="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
            >
              <i class="fas fa-sign-out-alt"></i>
              Déconnexion
            </button>
          </li>
        </ul>
      </li>
      <li class="nav-item" v-else>
        <router-link class="nav-link" :to="{ name: 'login' }">
          <i class="fas fa-sign-in-alt fa-fw"></i>
          Connexion
        </router-link>
      </li>
    </ul>
  </nav>

  <main>
    <div class="container px-4">
      <h1 class="mt-4" v-if="$route.name != 'home'">
        {{ $route.meta.title }}
      </h1>

      <router-view></router-view>
    </div>
  </main>

  <div
    class="modal fade"
    id="logoutModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="logoutModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="logoutModalLabel">Prêt à partir ?</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Fermer"
          ></button>
        </div>
        <div class="modal-body">
          Sélectionnez "Déconnexion" ci-dessous si vous être prêt à terminer
          votre session actuelle.
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">
            Annuler
          </button>
          <button class="btn btn-danger" @click="logout">Déconnexion</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Modal } from "bootstrap";

export default {
  methods: {
    logout() {
      const modal = Modal.getInstance(document.getElementById("logoutModal"));
      this.$store.dispatch("logout").then(() => {
        modal.hide();

        if (this.$route.meta.requiresAuth) {
          this.$router.push({ name: "login" });
        }
      });
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.authentication.user,
    }),
  },
};
</script>
