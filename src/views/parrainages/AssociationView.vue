<template>
  <div class="card">
    <div class="card-header">Association</div>
    <div class="card-body">
      <div class="text-center mb-3" v-if="loading">
        <div
          class="spinner-border"
          role="status"
          style="width: 3rem; height: 3rem"
        >
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <div v-else-if="!this.filleulsUnassigned.length">
        <h3>C'est dans la boite !</h3>
        Nous vous souhaitons à tous une bonne année
        <i class="far fa-face-smile"></i>
      </div>

      <div v-else>
        <div class="row mb-2">
          <div class="col-2 d-grid">
            <button class="btn btn-danger" @click="filleulAbsent">
              <i class="fas fa-user-times"></i>
            </button>
          </div>
          <div class="col-10 d-flex align-items-center">
            {{ filleul.firstname }} {{ filleul.lastname }}
          </div>
        </div>
        <div class="mb-2 text-center">sera parrainé(e) par</div>
        <Transition name="parrain-fade">
          <div class="row" v-if="showParrain">
            <div class="col-2 d-grid">
              <button class="btn btn-danger" @click="parrainAbsent">
                <i class="fas fa-user-times"></i>
              </button>
            </div>
            <div class="col-10 d-flex align-items-center">
              {{ parrain.firstname }} {{ parrain.lastname }}
            </div>
          </div>
        </Transition>

        <div class="d-grid mt-3">
          <button
            class="btn btn-primary"
            :disabled="loading"
            @click="nextClick"
          >
            >>>
          </button>
        </div>
        <hr />

        <div class="mb-2">
          Parrains restants :<br />
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuemin="0"
              :aria-valuenow="parrainsAvailable.length"
              :aria-valuemax="parrains.length"
              :style="
                'width: ' +
                (parrainsAvailable.length * 100) / parrains.length +
                '%'
              "
            ></div>
          </div>
        </div>

        <div>
          Progression :<br />
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuemin="0"
              :aria-valuenow="filleuls.length - filleulsUnassigned.length"
              :aria-valuemax="filleuls.length"
              :style="
                'width: ' +
                ((filleuls.length - filleulsUnassigned.length) * 100) /
                  filleuls.length +
                '%'
              "
            ></div>
          </div>
        </div>
      </div>

      <div class="d-grid mt-3">
        <router-link :to="{ name: 'parrainages' }" class="btn btn-secondary">
          Retour à la liste
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    Promise.all([
      this.$store.dispatch("filleuls/fetch"),
      this.$store.dispatch("parrains/fetch"),
    ]).then(() => {
      this.filleul = this.filleulsUnassigned[0];
      this.refreshParrains();
      this.loading = false;
    });
  },
  computed: {
    filleuls() {
      return this.$store.getters["filleuls/filleuls"].filter((filleul) => {
        return !filleul.absent;
      });
    },
    filleulsUnassigned: function () {
      return this.filleuls.filter((filleul) => {
        return !filleul.parrain_id;
      });
    },
    parrains() {
      return this.$store.getters["parrains/parrains"].filter((parrain) => {
        return !parrain.absent;
      });
    },
  },
  data() {
    return {
      filleul: undefined,
      loading: true,
      parrain: undefined,
      parrainsAvailable: [],
      showParrain: false,
    };
  },
  methods: {
    nextClick() {
      if (this.showParrain) {
        this.$store
          .dispatch("filleuls/edit", {
            id: this.filleul.id,
            parrain_id: this.parrain.id,
          })
          .then(() => {
            this.refreshParrains();
            this.filleul = this.filleulsUnassigned[0];
          });
      }

      this.showParrain = !this.showParrain;
    },
    filleulAbsent() {
      this.$store
        .dispatch("filleuls/edit", {
          id: this.filleul.id,
          absent: true,
        })
        .then(() => {
          this.filleul = this.filleulsUnassigned[0];
        });
    },
    parrainAbsent() {
      this.showParrain = false;

      this.$store
        .dispatch("parrains/edit", {
          id: this.parrain.id,
          absent: true,
        })
        .then(() => {
          this.refreshParrains();
          this.showParrain = true;
        });
    },
    refreshParrains() {
      let min = Infinity;
      const parrainages = {};
      this.parrains.forEach((parrain) => {
        const filleulsCount = this.filleuls.filter((filleul) => {
          return filleul.parrain_id === parrain.id;
        }).length;
        min = Math.min(min, filleulsCount);

        parrainages[parrain.id] = filleulsCount;
      });

      this.parrainsAvailable = this.parrains.filter((parrain) => {
        return parrainages[parrain.id] === min && !parrain.absent;
      });

      const randomIndex = Math.floor(
        Math.random() * this.parrainsAvailable.length,
      );
      this.parrain = this.parrainsAvailable[randomIndex];
    },
  },
};
</script>

<style scoped>
.parrain-fade-enter-active {
  transition: opacity 0.5s ease;
}

.parrain-fade-enter-from {
  opacity: 0;
}
</style>
