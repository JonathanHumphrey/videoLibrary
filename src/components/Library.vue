<template>
  <div class="content-wrapper">
    <div
      class="content"
      v-for="(stream, i) in this.followedStreams[0]"
      :key="i"
    >
      <h4>{{ stream.user_name }}</h4>
      <h5>Game: {{ stream.game_name }}</h5>
      <h5>Viewers: {{ stream.viewer_count }}</h5>
      <img :src="`${stream.thumbnail_url}`" alt="" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      followedStreams: (state) => state.followedStreams,
    }),
  },
};
</script>
<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
}
.content {
  display: inherit;
  border: solid black;
  flex-direction: row;
  justify-content: space-between;
}
</style>
