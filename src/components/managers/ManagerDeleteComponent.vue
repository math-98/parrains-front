<template>
  <div
    class="modal fade"
    :id="'deleteManagerModal-' + manager.id"
    ref="modal"
    tabindex="-1"
    :aria-labelledby="'deleteManagerModalLabel-' + manager.id"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="'deleteManagerModalLabel-' + manager.id">
            Supprimer "{{ manager.name }}"
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

          Êtes-vous sûr de vouloir supprimer le manager "{{ manager.name }}" ?
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
import { useManagersStore } from '@/store/managers.js'

export default {
  methods: {
    submit() {
      let modalElm: any = this.$refs.modal
      const modal = Modal.getOrCreateInstance(modalElm)
      useManagersStore()
        .remove(this.manager.id)
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
  name: 'ManagerDeleteComponent',
  props: {
    manager: {
      type: Object,
      required: true,
    },
  },
}
</script>
