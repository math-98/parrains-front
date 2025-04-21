<template>
  <div
    class="modal fade"
    id="importFilleulsModal"
    tabindex="-1"
    aria-labelledby="importFilleulsModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="importFilleulsModalLabel">Importer des filleuls</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Fermer"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="importFilleulsFile" class="form-label"> Fichier CSV </label>
            <input
              class="form-control"
              type="file"
              id="importFilleulsFile"
              @change="load($event)"
            />
            <div class="form-text">
              <a href="/csv/import-template.csv" target="_blank"> Télécharger le modèle </a>
            </div>
          </div>
          <hr v-if="filleuls.length" />

          <table class="table" v-if="filleuls.length">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="filleul of filleuls" :key="filleul.id">
                <td>{{ filleul.lastname }}</td>
                <td>{{ filleul.firstname }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" v-if="filleuls.length" @click="submit">
            Importer
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
    load(event: any) {
      event.target.files[0].text().then((text: any) => {
        const lines = text.trim().split('\n')
        lines.shift()

        this.filleuls = lines.map((line: any) => {
          const [lastname, firstname] = line.split(';')

          return {
            lastname,
            firstname,
          }
        })
      })
    },
    submit() {
      const promises: any[] = []
      this.filleuls.forEach((filleul: any) => {
        promises.push(useFilleulsStore().add(filleul.firstname, filleul.lastname))
      })

      Promise.all(promises).then(() => {
        let modalElm: any = this.$refs.modal
        const modal = Modal.getOrCreateInstance(modalElm)
        modal.hide()
      })
    },
  },
  data() {
    return {
      filleuls: [] as any[],
    }
  },
  name: 'FilleulsImportComponent',
}
</script>
