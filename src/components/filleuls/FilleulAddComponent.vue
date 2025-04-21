<template>
  <div
    class="modal fade"
    id="addFilleulModal"
    ref="modal"
    tabindex="-1"
    aria-labelledby="addFilleulModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addFilleulModalLabel">Ajouter un filleul</h5>
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
              <div v-for="error in errors.lastname" :key="error">
                {{ error }}
              </div>
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
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" :disabled="!isValid" @click="submit">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'bootstrap'
import { useFilleulsStore } from '@/store/fieuls.js'

export default {
  methods: {
    submit() {
      useFilleulsStore()
        .add(this.firstname, this.lastname)
        .then(() => {
          let modalElm: any = this.$refs.modal
          const modal = Modal.getOrCreateInstance(modalElm)
          modal.hide()
        })
        .catch((error: any) => {
          this.errors = error.response.data.errors
        })
    },
  },
  computed: {
    isValid() {
      return this.lastname && this.firstname
    },
  },
  data() {
    return {
      lastname: '',
      firstname: '',
      errors: [] as any,
    }
  },
  name: 'FilleulAddComponent',
}
</script>
