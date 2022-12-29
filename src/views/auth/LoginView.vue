<template>
  <div class="card shadow-lg border-0 rounded-lg mt-5">
    <div class="card-header">
      <h3 class="text-center font-weight-light my-4">
        <span v-if="mode == 'login'">Connexion</span>
        <span v-if="mode == 'reset'">Réinitialiser le mot de passe</span>
      </h3>
    </div>
    <div class="card-body">
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>

      <form method="post" action="#" @submit.prevent="submitForm">
        <div class="form-group mb-2">
          <div class="form-label-group">
            <input
              type="email"
              class="form-control"
              name="email"
              v-model="email"
              placeholder="Adresse email"
              required
              autofocus
            />
          </div>
        </div>
        <div class="form-group mb-2" v-if="mode == 'login'">
          <div class="form-label-group">
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Mot de passe"
              required
            />
          </div>
        </div>
        <div class="row mt-3 mb-2">
          <div class="col-3 d-grid">
            <router-link :to="{ name: 'home' }" class="btn btn-secondary">
              Retour
            </router-link>
          </div>
          <div class="col-9 d-grid">
            <input
              type="submit"
              class="btn btn-primary"
              value="Connexion"
              v-if="mode == 'login'"
            />
            <input
              type="submit"
              class="btn btn-primary"
              value="Envoyer"
              v-if="mode == 'reset'"
            />
          </div>
        </div>
      </form>
      <div class="text-center">
        <button
          class="btn btn-link small"
          v-if="mode == 'login'"
          @click="switchMode('reset')"
        >
          Mot de passe oublié ?
        </button>
        <button
          class="btn btn-link small"
          v-if="mode == 'reset'"
          @click="switchMode('login')"
        >
          Se connecter
        </button>
      </div>
    </div>
  </div>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div
      id="liveToast"
      class="toast hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto"> Réinitialisation du mot de passe </strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">{{ toastText }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "bootstrap";

export default {
  mounted() {
    this.toast = new Toast(document.querySelector("#liveToast"));
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$store.dispatch("managers/fetch");
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    resetPassword() {
      axios
        .post("/forgot-password", { email: this.email })
        .then((response) => {
          this.mode = "login";
          this.toastText = response.data.message;
          this.toast.show();
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    submitForm() {
      if (this.mode == "login") {
        this.login();
      } else {
        this.resetPassword();
      }
    },
    switchMode(mode) {
      this.error = "";
      this.mode = mode;
    },
  },
  data: function () {
    return {
      mode: "login",
      error: "",
      email: "",
      password: "",
      toast: undefined,
      toastText: "",
    };
  },
};
</script>
