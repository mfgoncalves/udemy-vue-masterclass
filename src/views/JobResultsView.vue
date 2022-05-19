<template>
  <div class="about">
    <h1>JobResultsView</h1>
    <button @click="goToHome">Home Page</button>
  </div>
</template>

<script>
export default {
  name: "JobResultsView",
  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
