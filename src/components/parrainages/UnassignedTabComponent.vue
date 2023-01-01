<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Filleul</th>
        <th scope="col">Présent</th>
        <th scope="col" v-if="user">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="filleul of filleuls" :key="filleul.id">
        <td>{{ filleul.firstname }} {{ filleul.lastname }}</td>
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
        <td class="d-grid" v-if="user">
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            :data-bs-target="'#assignModal-' + filleul.id"
          >
            <i class="fas fa-user-edit"></i>
            Assigner
          </button>
          <assign-component :filleul="filleul"></assign-component>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";
import AssignComponent from "@/components/parrainages/AssignComponent.vue";

export default {
  components: { AssignComponent },
  computed: {
    filleuls() {
      return this.$store.getters["filleuls/filleuls"].filter((filleul) => {
        return !filleul.parrain_id;
      });
    },
    ...mapState({
      user: (state) => state.authentication.user,
    }),
  },
  name: "UnassignedTabComponent",
};
</script>

<style scoped></style>
