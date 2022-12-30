<template>
  <div class="row">
    <div
      v-bind:class="{
        'col-xl-3': user,
        'col-xl-4': !user,
        'col-sm-6': true,
        'mb-3': true,
      }"
    >
      <div class="card text-white bg-primary o-hidden h-100">
        <div class="card-body">
          <div class="card-body-icon">
            <i class="fas fa-fw fa-user-plus"></i>
          </div>

          <h5>Filleuls</h5>
          {{ filleuls.length }}
        </div>
        <router-link
          class="card-footer d-flex align-items-center justify-content-between"
          :to="{ name: 'filleuls' }"
        >
          <span class="small text-white">Plus de détails...</span>
          <div class="small text-white">
            <i class="fas fa-angle-right"></i>
          </div>
        </router-link>
      </div>
    </div>
    <div
      v-bind:class="{
        'col-xl-3': user,
        'col-xl-4': !user,
        'col-sm-6': true,
        'mb-3': true,
      }"
    >
      <div class="card text-white bg-secondary o-hidden h-100">
        <div class="card-body">
          <div class="card-body-icon">
            <i class="fas fa-fw fa-users"></i>
          </div>

          <h5>Parrains</h5>
          {{ parrains.length }}
        </div>
        <router-link
          class="card-footer d-flex align-items-center justify-content-between"
          :to="{ name: 'parrains' }"
        >
          <span class="small text-white">Plus de détails...</span>
          <div class="small text-white">
            <i class="fas fa-angle-right"></i>
          </div>
        </router-link>
      </div>
    </div>
    <div v-if="user" class="col-xl-3 col-sm-6 mb-3">
      <div class="card text-white bg-dark o-hidden h-100">
        <div class="card-body">
          <div class="card-body-icon">
            <i class="fas fa-fw fa-users-cog"></i>
          </div>

          <h5>Managers</h5>
          {{ managers.length }}
        </div>
        <router-link
          class="card-footer d-flex align-items-center justify-content-between"
          :to="{ name: 'managers' }"
        >
          <span class="small text-white">Plus de détails...</span>
          <div class="small text-white">
            <i class="fas fa-angle-right"></i>
          </div>
        </router-link>
      </div>
    </div>
    <div
      v-bind:class="{
        'col-xl-3': user,
        'col-xl-4': !user,
        'col-sm-6': true,
        'mb-3': true,
      }"
    >
      <div class="card text-white bg-success o-hidden h-100">
        <div class="card-body">
          <div class="card-body-icon">
            <i class="fas fa-fw fa-hands-helping"></i>
          </div>
          <div class="me-5">
            <h5>Parrainages</h5>
            <span v-if="parrainageRatio === 100">Terminé !</span>
            <div class="progress" v-else>
              <div
                class="progress-bar"
                role="progressbar"
                :style="'width: ' + parrainageRatio + '%;'"
                :aria-valuenow="parrainageRatio"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ parrainageRatio }} %
              </div>
            </div>
          </div>
        </div>
        <a
          class="card-footer d-flex align-items-center justify-content-between"
          href="#"
        >
          <span class="small text-white">Plus de détails... </span>
          <div class="small text-white">
            <i class="fas fa-angle-right"></i>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      parrainageRatio: 0,
    };
  },
  computed: {
    ...mapGetters({
      filleuls: "filleuls/filleuls",
      managers: "managers/managers",
      parrains: "parrains/parrains",
    }),
    ...mapState({
      user: (state) => state.authentication.user,
    }),
  },
};
</script>
