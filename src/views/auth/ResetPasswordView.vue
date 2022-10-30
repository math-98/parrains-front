<template>
  <div class="card shadow-lg border-0 rounded-lg mt-5">
    <div class="card-header">
      <h3 class="text-center font-weight-light my-4">
        Réinitialiser le mot de passe
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
        <div class="form-group mb-2">
          <div class="form-label-group">
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Nouveau mot de passe"
              required
            />
          </div>
        </div>
        <div class="form-group mb-2">
          <div class="form-label-group">
            <input
              type="password"
              class="form-control"
              v-model="password_confirmation"
              placeholder="Confirmer le mot de passe"
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
            <input type="submit" class="btn btn-primary" value="Envoyer" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.token = this.$route.params.token;
    this.email = this.$route.query.email;
  },
  methods: {
    submitForm() {
      if (this.password !== this.password_confirmation) {
        this.error = "Les mots de passe ne correspondent pas";
        console.table({
          password: this.password,
          passwordConfirm: this.password_confirmation,
        });
        return;
      }

      axios
        .post("/reset-password", {
          token: this.token,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      token: "",
      error: "",
    };
  },
};
</script>

<style scoped></style>
