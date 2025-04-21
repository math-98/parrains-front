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
        <td>{{ parrainage.filleul.firstname }} {{ parrainage.filleul.lastname }}</td>
        <td>
          <template v-if="parrainage.parrain">
            {{ parrainage.parrain.firstname }} {{ parrainage.parrain.lastname }}
          </template>
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

<script lang="ts">
import { mapState } from 'pinia'
import AssignComponent from '@/components/parrainages/AssignComponent.vue'
import { useAuthStore } from '@/store/auth.js'
import { useFilleulsStore } from '@/store/fieuls.js'
import { useParrainsStore } from '@/store/parrains.js'

export default {
  components: { AssignComponent },
  computed: {
    parrainages() {
      const parrains = useParrainsStore().parrains

      return useFilleulsStore()
        .filleuls.filter((filleul: any) => {
          return !!filleul.parrain_id
        })
        .map((filleul: any) => {
          const parrain = parrains.find((parrain: any) => {
            return parrain.id === filleul.parrain_id
          })
          return {
            filleul: filleul,
            parrain: parrain,
          }
        })
    },
    ...mapState(useAuthStore, {
      user: (state) => state.user,
    }),
  },
  name: 'AssignedTabComponent',
}
</script>

<style scoped></style>
