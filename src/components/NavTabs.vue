<template>
  <div>
    <a class="nav-link" @click.prevent="setActive('stats')" href="#Stats"
      >Stats</a
    >
    <a class="nav-link" @click.prevent="setActive('library')" href="#Library"
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
      console.log(menuItem);
      this.activeItem = menuItem;
    },
  },
  components: {
    Stats,
    Library,
  },
};
</script>