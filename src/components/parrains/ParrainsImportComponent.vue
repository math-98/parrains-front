<template>
  <div
    class="modal fade"
    id="importParrainsModal"
    tabindex="-1"
    aria-labelledby="importParrainsModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="importParrainsModalLabel">
            Importer des parrains
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
            <label for="importParrainsFile" class="form-label">
              Fichier CSV
            </label>
            <input
              class="form-control"
              type="file"
              id="importParrainsFile"
              @change="load($event)"
            />
            <div class="form-text">
              <a href="/csv/import-template.csv" target="_blank">
                Télécharger le modèle
              </a>
            </div>
          </div>
          <hr v-if="parrains.length" />

          <table class="table" v-if="parrains.length">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="parrain of parrains" :key="parrain.id">
                <td>{{ parrain.lastname }}</td>
                <td>{{ parrain.firstname }}</td>
              </tr>
            </tbody>
          </table>
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
            v-if="parrains.length"
            @click="submit"
          >
            Importer
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
    load(event) {
      event.target.files[0].text().then((text) => {
        const lines = text.trim().split("\n");
        lines.shift();

        this.parrains = lines.map((line) => {
          const [lastname, firstname] = line.split(";");

          return {
            lastname,
            firstname,
          };
        });
      });
    },
    submit() {
      const promises = [];
      this.parrains.forEach((parrain) => {
        promises.push(this.$store.dispatch("parrains/add", parrain));
      });

      Promise.all(promises).then(() => {
        const modal = Modal.getOrCreateInstance(this.$refs.modal);
        modal.hide();
      });
    },
  },
  data() {
    return {
      parrains: [],
    };
  },
  name: "ParrainsImportComponent",
};
</script>
