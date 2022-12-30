<template>
  <div class="row mb-3" v-if="user">
    <div class="col-6 d-grid">
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addFilleulModal"
      >
        <i class="fas fa-user-plus"></i>
        Ajouter un filleul
      </button>
    </div>
    <div class="col-6 d-grid">
      <button
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#importFilleulsModal"
      >
        <i class="fas fa-file-import"></i>
        Importer des filleuls
      </button>
    </div>
  </div>
  <filleul-add-component></filleul-add-component>
  <filleuls-import-component></filleuls-import-component>

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
      <tr v-for="filleul of filleuls" :key="filleul.id">
        <td>{{ filleul.lastname }}</td>
        <td>{{ filleul.firstname }}</td>
        <td>
          <i
            v-bind:class="{
              fas: true,
              'fa-check': !filleul.absent,
              'fa-times': filleul.absent,
            }"
          ></i>
          {{ filleul.absent ? "Absent" : "Présent" }}
        </td>
        <td v-if="user">
          {{ filleul.created_at.format("DD/MM/YYYY HH:mm:ss") }}
        </td>
        <td class="d-grid" v-if="user">
          <div class="btn-group" role="group">
            <button
              class="btn btn-success"
              data-bs-toggle="modal"
              :data-bs-target="'#editFilleulModal-' + filleul.id"
            >
              <i class="fas fa-pen"></i>
              Editer
            </button>
            <button
              class="btn btn-danger"
              data-bs-toggle="modal"
              :data-bs-target="'#deleteFilleulModal-' + filleul.id"
            >
              <i class="fas fa-trash"></i>
              Supprimer
            </button>
          </div>
          <filleul-edit-component :filleul="filleul"></filleul-edit-component>
          <filleul-delete-component
            :filleul="filleul"
          ></filleul-delete-component>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import FilleulAddComponent from "@/components/filleuls/FilleulAddComponent.vue";
import FilleulDeleteComponent from "@/components/filleuls/FilleulDeleteComponent.vue";
import FilleulEditComponent from "@/components/filleuls/FilleulEditComponent.vue";
import FilleulsImportComponent from "@/components/filleuls/FilleulsImportComponent.vue";

export default {
  components: {
    FilleulAddComponent,
    FilleulDeleteComponent,
    FilleulEditComponent,
    FilleulsImportComponent,
  },
  computed: {
    ...mapGetters({
      filleuls: "filleuls/filleuls",
    }),
    ...mapState({
      user: (state) => state.authentication.user,
    }),
  },
};
</script>
