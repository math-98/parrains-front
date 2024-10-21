<template>
  <RouterView />
</template>

<script>
export default {
  mounted() {
    this.$store
      .dispatch("fetchUser")
      .then(() => {
        this.$store.dispatch("managers/fetch");
      })
      .catch(() => {
        this.$store.dispatch("init");
      });
    this.$store.dispatch("parrains/fetch");
    this.$store.dispatch("filleuls/fetch");
  },
};
</script>
