<template>
  <div
    class="modal fade"
    id="addManagerModal"
    ref="modal"
    tabindex="-1"
    aria-labelledby="addManagerModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addManagerModalLabel">
            Ajouter un manager
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Fermer"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nom</label>
            <input
              type="text"
              v-bind:class="{
                'form-control': true,
                'is-invalid': errors.name,
              }"
              name="name"
              required
              v-model="name"
            />
            <div class="invalid-feedback" v-if="errors.name">
              <div v-for="error in errors.name" :key="error">{{ error }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              v-bind:class="{
                'form-control': true,
                'is-invalid': errors.email,
              }"
              name="email"
              required
              v-model="email"
            />
            <div class="invalid-feedback" v-if="errors.email">
              <div v-for="error in errors.email" :key="error">{{ error }}</div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <label class="form-label">Mot de passe</label>
              <div class="mb-2">
                <input
                  type="password"
                  v-bind:class="{
                    'form-control': true,
                    'is-invalid': errors.password,
                  }"
                  placeholder="Mot de passe"
                  required
                  v-model="password"
                />
                <div class="invalid-feedback" v-if="errors.password">
                  <span v-for="error in errors.password" :key="error">
                    {{ error }}
                  </span>
                </div>
              </div>
              <input
                type="password"
                v-bind:class="{
                  'form-control': true,
                  'is-valid':
                    passwordConfirmation && password === passwordConfirmation,
                }"
                class="form-control"
                placeholder="Confirmation du mot de passe"
                required
                v-model="passwordConfirmation"
              />
            </div>
            <div class="col-6">
              <password-validation-component
                :password="password"
                @validate="passwordValid = $event"
              ></password-validation-component>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!isValid"
            @click="submit"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordValidationComponent from "@/components/PasswordValidationComponent.vue";
import {Modal} from "bootstrap";

export default {
  components: { PasswordValidationComponent },
  methods: {
    submit() {
      this.$store
        .dispatch("managers/add", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          const modal = Modal.getOrCreateInstance(this.$refs.modal);
          modal.hide();
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
  computed: {
    isValid() {
      return (
        this.name &&
        this.email &&
        this.password &&
        this.passwordValid &&
        this.password === this.passwordConfirmation
      );
    },
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      passwordValid: false,
      errors: [],
    };
  },
  name: "ManagerAddComponent",
};
</script>
