<template>
  <div id="app">
    <Initialize />
    <NavTabs />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Initialize from "./components/Initialize.vue";
import NavTabs from "./components/NavTabs.vue";
import Tab from "./components/Tab.vue";
//import Stats from "./components/Stats.vue";

export default Vue.extend({
  methods: {},
  name: "App",
  components: { Initialize, NavTabs },
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
