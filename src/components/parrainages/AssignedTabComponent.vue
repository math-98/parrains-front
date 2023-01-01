<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Filleul</th>
        <th scope="col">Parrain</th>
        <th scope="col" v-if="user">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="parrainage of parrainages" :key="parrainage.filleul.id">
        <td>
          {{ parrainage.filleul.firstname }} {{ parrainage.filleul.lastname }}
        </td>
        <td>
          {{ parrainage.parrain.firstname }} {{ parrainage.parrain.lastname }}
        </td>
        <td class="d-grid" v-if="user">
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            :data-bs-target="'#assignModal-' + parrainage.filleul.id"
          >
            <i class="fas fa-user-edit"></i>
            Réassigner
          </button>
          <assign-component :filleul="parrainage.filleul"></assign-component>
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
    parrainages() {
      const parrains = this.$store.getters["parrains/parrains"];

      return this.$store.getters["filleuls/filleuls"]
        .filter((filleul) => {
          return !!filleul.parrain_id;
        })
        .map((filleul) => {
          const parrain = parrains.find((parrain) => {
            return parrain.id === filleul.parrain_id;
          });
          return {
            filleul: filleul,
            parrain: parrain,
          };
        });
    },
    ...mapState({
      user: (state) => state.authentication.user,
    }),
  },
  name: "AssignedTabComponent",
};
</script>

<style scoped></style>
