<template>
  <div class="row mb-3">
    <div class="col-6 d-grid" v-if="user">
      <router-link class="btn btn-success" :to="{ name: 'association' }">
        <i class="fas fa-play"></i>
        Lancer le parrainage
      </router-link>
    </div>
    <div
      v-bind:class="{
        'col-6': user,
        'col-12': !user,
        'd-grid': true,
      }"
    >
      <a class="btn btn-secondary" :href="pdfUrl" target="_blank">
        <i class="fas fa-file-import"></i>
        Exporter en PDF
      </a>
    </div>
  </div>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button
        class="nav-link active"
        id="nav-assigned-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-assigned"
        type="button"
        role="tab"
        aria-controls="nav-assigned"
        aria-selected="true"
      >
        Parrainages
      </button>
      <button
        class="nav-link"
        id="nav-unassigned-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-unassigned"
        type="button"
        role="tab"
        aria-controls="nav-unassigned"
        aria-selected="false"
      >
        Non parrainés
      </button>
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div
      class="tab-pane fade show active"
      id="nav-assigned"
      role="tabpanel"
      aria-labelledby="nav-assigned-tab"
    >
      <assigned-tab-component></assigned-tab-component>
    </div>
    <div
      class="tab-pane fade"
      id="nav-unassigned"
      role="tabpanel"
      aria-labelledby="nav-unassigned-tab"
    >
      <unassigned-tab-component></unassigned-tab-component>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import AssignedTabComponent from '@/components/parrainages/AssignedTabComponent.vue'
import UnassignedTabComponent from '@/components/parrainages/UnassignedTabComponent.vue'
import { useAuthStore } from '@/store/auth.ts'

export default {
  computed: {
    pdfUrl() {
      return `${import.meta.env.VITE_API_URL}/export/pdf`
    },
    ...mapState(useAuthStore, {
      user: (state) => state.user,
    }),
  },
  name: 'ParrainagesView',
  components: { AssignedTabComponent, UnassignedTabComponent },
}
</script>

<style scoped>
.tab-pane {
  padding: 1rem;
}
</style>
