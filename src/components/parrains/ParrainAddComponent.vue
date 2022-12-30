<template>
  <div
    class="modal fade"
    id="addParrainModal"
    ref="modal"
    tabindex="-1"
    aria-labelledby="addParrainModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addParrainModalLabel">
            Ajouter un parrain
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
                'is-invalid': errors.lastname,
              }"
              name="lastname"
              required
              v-model="lastname"
            />
            <div class="invalid-feedback" v-if="errors.lastname">
              <div v-for="error in errors.lastname" :key="error">{{ error }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Prénom</label>
            <input
              type="text"
              v-bind:class="{
                'form-control': true,
                'is-invalid': errors.firstname,
              }"
              name="firstname"
              required
              v-model="firstname"
            />
            <div class="invalid-feedback" v-if="errors.firstname">
              <div v-for="error in errors.firstname" :key="error">
                {{ error }}
              </div>
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
import { Modal } from "bootstrap";

export default {
  methods: {
    submit() {
      this.$store
        .dispatch("parrains/add", {
          lastname: this.lastname,
          firstname: this.firstname,
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
      return this.lastname && this.firstname;
    },
  },
  data() {
    return {
      lastname: "",
      firstname: "",
      errors: [],
    };
  },
  name: "ParrainAddComponent",
};
</script>
