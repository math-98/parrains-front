<template>
  <div
    class="modal fade"
    :id="'assignModal-' + filleul.id"
    ref="modal"
    tabindex="-1"
    :aria-labelledby="'assignModalLabel-' + filleul.id"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="'assignModalLabel-' + filleul.id">
            Assigner "{{ filleul.firstname }} {{ filleul.lastname }}"
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Fermer"
          ></button>
        </div>
        <div class="modal-body">
          <label class="form-label">Parrain</label>
          <select class="form-select" v-model="parrain_id">
            <option value="" v-if="!filleul.parrain_id">Sélectionner un parrain</option>
            <option v-for="parrain of parrains" :value="parrain.id" :key="parrain.id">
              {{ parrain.firstname }} {{ parrain.lastname }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" :disabled="!parrain_id" @click="submit">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapState } from 'pinia'
import { Modal } from 'bootstrap'
import { useFilleulsStore } from '@/store/fieuls.js'
import { useParrainsStore } from '@/store/parrains.js'

export default {
  mounted() {
    let modalElm: any = this.$refs.modal
    this.modal = new Modal(modalElm)
    this.parrain_id = this.filleul.parrain_id ?? ''
  },
  unmounted() {
    this.modal.hide()
  },
  methods: {
    submit() {
      useFilleulsStore()
        .edit({
          id: this.filleul.id,
          parrain_id: this.parrain_id,
        })
        .then(() => {
          this.modal.hide()
        })
    },
  },
  computed: {
    ...mapState(useParrainsStore, {
      parrains: 'parrains',
    }),
  },
  data() {
    return {
      modal: undefined as any,
      parrain_id: undefined as any,
    }
  },
  name: 'AssignComponent',
  props: {
    filleul: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
