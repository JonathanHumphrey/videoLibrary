<template>
  <div id="app">
    <Initialize />
    <Stats />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Initialize from "./components/Initialize.vue";
import Stats from "./components/Stats.vue";

export default Vue.extend({
  name: "App",
  components: { Initialize, Stats },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
