<template>
  <div
    class="modal fade"
    :id="'deleteFilleulModal-' + filleul.id"
    ref="modal"
    tabindex="-1"
    :aria-labelledby="'deleteFilleulModalLabel-' + filleul.id"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="'deleteFilleulModalLabel-' + filleul.id">
            Supprimer "{{ filleul.firstname }} {{ filleul.lastname }}"
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Fermer"
          ></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>

          Êtes-vous sûr de vouloir supprimer le filleul "{{ filleul.firstname }}
          {{ filleul.lastname }}" ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-danger" @click="submit">Supprimer</button>
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
      let modalElm: any = this.$refs.modal
      const modal = Modal.getOrCreateInstance(modalElm)
      useFilleulsStore()
        .remove(this.filleul.id)
        .then(() => {
          modal.hide()
        })
        .catch((error: any) => {
          this.error = error.response.data.message
        })
    },
  },
  data() {
    return {
      error: '',
    }
  },
  name: 'FilleulDeleteComponent',
  props: {
    filleul: {
      type: Object,
      required: true,
    },
  },
}
</script>
