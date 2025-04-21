<template>
  <div class="d-grid">
    <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addManagerModal">
      <i class="fas fa-user-plus"></i>
      Ajouter un manager
    </button>
  </div>
  <manager-add-component></manager-add-component>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Email</th>
        <th scope="col">Créé le</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="manager of managers" :key="manager.id">
        <td>{{ manager.name }}</td>
        <td>{{ manager.email }}</td>
        <td>{{ manager.created_at.format('DD/MM/YYYY HH:mm:ss') }}</td>
        <td class="d-grid">
          <div class="btn-group" role="group">
            <button
              class="btn btn-success"
              data-bs-toggle="modal"
              :data-bs-target="'#editManagerModal-' + manager.id"
            >
              <i class="fas fa-pen"></i>
              Editer
            </button>
            <button
              class="btn btn-danger"
              data-bs-toggle="modal"
              :data-bs-target="'#deleteManagerModal-' + manager.id"
              v-if="manager.id !== user.id"
            >
              <i class="fas fa-trash"></i>
              Supprimer
            </button>
          </div>
          <manager-edit-component :manager="manager"></manager-edit-component>
          <manager-delete-component
            :manager="manager"
            v-if="manager.id !== user.id"
          ></manager-delete-component>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import ManagerAddComponent from '@/components/managers/ManagerAddComponent.vue'
import ManagerDeleteComponent from '@/components/managers/ManagerDeleteComponent.vue'
import ManagerEditComponent from '@/components/managers/ManagerEditComponent.vue'
import { useAuthStore } from '@/store/auth.ts'
import { useManagersStore } from '@/store/managers.ts'

export default {
  components: {
    ManagerAddComponent,
    ManagerDeleteComponent,
    ManagerEditComponent,
  },
  computed: {
    ...mapState(useAuthStore, {
      user: (state) => state.user as any,
    }),
    ...mapState(useManagersStore, {
      managers: (state) => state.managers,
    }),
  },
}
</script>
