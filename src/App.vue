<template>
  <RouterView />
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("init").then(() => {
      this.$store
        .dispatch("fetchUser")
        .then(() => {
          this.$store.dispatch("managers/fetch");
        })
        .catch(() => {});
    });
  },
};
</script>
