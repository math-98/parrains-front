<template>
  <RouterView />
</template>

<script lang="ts">
import { useAuthStore } from "@/store/auth.js";
import { useManagersStore } from "@/store/managers.js";
import { useParrainsStore } from "@/store/parrains.js";
import { useFilleulsStore } from "@/store/fieuls.js";

export default {
  mounted() {
    useAuthStore()
      .fetchUser()
      .then(() => {
        useManagersStore().fetch();
      })
      .catch(() => {
        useAuthStore().init();
      });
    useParrainsStore().fetch();
    useFilleulsStore().fetch();
  },
};
</script>
