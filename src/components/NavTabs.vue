<template>
  <div v-if="this.User.userId !== 0">
    <a
      class="nav-link"
      id="stats"
      @click.prevent="setActive('stats')"
      href="#Stats"
      >Stats</a
    >
    <a
      class="nav-link"
      id="library"
      @click.prevent="setActive('library')"
      href="#Library"
      >Library</a
    >

    <div class="tab-content" id="myTabContent">
      <div class="pane" v-show="this.activeItem == 'stats'" id="stats">
        <Stats />
      </div>
      <div class="pane" v-show="this.activeItem == 'library'" id="library">
        <Library />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Stats from "./Stats.vue";
import Library from "./Library.vue";

export default {
  data() {
    return {
      activeItem: "stats",
    };
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      let element = document.getElementById(`${menuItem}`);

      this.activeItem = menuItem;
    },
  },
  components: {
    Stats,
    Library,
  },
  computed: {
    ...mapState({
      User: (state) => state.User,
    }),
  },
};
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  background-color: #6441a5;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.25rem;
  color: #ffffff;
}
.nav-link:hover {
  padding: 1rem;
}
.nav-linke:active {
  background-color: #9146ff;
}
</style>