<template>
  <div class="row mb-3" v-if="user">
    <div class="col-6 d-grid">
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addParrainModal"
      >
        <i class="fas fa-user-plus"></i>
        Ajouter un parrain
      </button>
    </div>
    <div class="col-6 d-grid">
      <button
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#importParrainsModal"
      >
        <i class="fas fa-file-import"></i>
        Importer des parrains
      </button>
    </div>
  </div>
  <parrain-add-component></parrain-add-component>
  <parrains-import-component></parrains-import-component>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Prénom</th>
        <th scope="col">Présent</th>
        <th scope="col" v-if="user">Créé le</th>
        <th scope="col" v-if="user">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="parrain of parrains" :key="parrain.id">
        <td>{{ parrain.lastname }}</td>
        <td>{{ parrain.firstname }}</td>
        <td>
          <i
            v-bind:class="{
              fas: true,
              'fa-check': !parrain.absent,
              'fa-times': parrain.absent,
            }"
          ></i>
          {{ parrain.absent ? "Absent" : "Présent" }}
        </td>
        <td v-if="user">
          {{ parrain.created_at.format("DD/MM/YYYY HH:mm:ss") }}
        </td>
        <td class="d-grid" v-if="user">
          <div class="btn-group" role="group">
            <button
              class="btn btn-success"
              data-bs-toggle="modal"
              :data-bs-target="'#editParrainModal-' + parrain.id"
            >
              <i class="fas fa-pen"></i>
              Editer
            </button>
            <button
              class="btn btn-danger"
              data-bs-toggle="modal"
              :data-bs-target="'#deleteParrainModal-' + parrain.id"
            >
              <i class="fas fa-trash"></i>
              Supprimer
            </button>
          </div>
          <parrain-edit-component :parrain="parrain"></parrain-edit-component>
          <parrain-delete-component
            :parrain="parrain"
          ></parrain-delete-component>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapState } from "pinia";
import ParrainAddComponent from "@/components/parrains/ParrainAddComponent.vue";
import ParrainDeleteComponent from "@/components/parrains/ParrainDeleteComponent.vue";
import ParrainEditComponent from "@/components/parrains/ParrainEditComponent.vue";
import ParrainsImportComponent from "@/components/parrains/ParrainsImportComponent.vue";
import { useParrainsStore } from "@/store/parrains";
import { useAuthStore } from "@/store/auth";

export default {
  components: {
    ParrainAddComponent,
    ParrainDeleteComponent,
    ParrainEditComponent,
    ParrainsImportComponent,
  },
  computed: {
    ...mapState(useParrainsStore, {
      parrains: "parrains",
    }),
    ...mapState(useAuthStore, {
      user: (state: any) => state.user,
    }),
  },
};
</script>
