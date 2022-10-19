<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark mb-4">
    <a class="navbar-brand ps-3" href="#">
      <i class="fas fa-hands-helping"></i>
      Parrainage
    </a>

    <ul class="navbar-nav ms-auto me-3 me-lg-4"></ul>
  </nav>

  <main>
    <div class="container px-4">
      <router-view></router-view>
    </div>
  </main>
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
      });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
