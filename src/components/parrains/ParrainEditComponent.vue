<template>
  <div
    class="modal fade"
    :id="'editParrainModal-' + parrain.id"
    ref="modal"
    tabindex="-1"
    :aria-labelledby="'editParrainModalLabel-' + parrain.id"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="'editParrainModalLabel-' + parrain.id">
            Modifier "{{ parrain.firstname }} {{ parrain.lastname }}"
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
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :id="'absentCheck-' + parrain.id"
              v-model="absent"
            />
            <label class="form-check-label" :for="'absentCheck-' + parrain.id"> Absent </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" :disabled="!isValid" @click="submit">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'bootstrap'
import { useParrainsStore } from '@/store/parrains.js'

export default {
  mounted() {
    this.lastname = this.parrain.lastname
    this.firstname = this.parrain.firstname
    this.absent = this.parrain.absent
  },
  methods: {
    submit() {
      let data = {
        id: this.parrain.id,
        lastname: this.lastname,
        firstname: this.firstname,
        absent: this.absent,
      }

      useParrainsStore()
        .edit(data)
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
      absent: false,
      errors: [] as any,
    }
  },
  name: 'ParrainEditComponent',
  props: {
    parrain: {
      type: Object,
      required: true,
    },
  },
}
</script>
