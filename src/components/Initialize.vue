<template>
  <div>
    dook

    <a
      id="linkAnchor"
      href="https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=pk0roinew9e83z6qn6ctr7xo7yas15&redirect_uri=http://localhost:8080&scope=channel%user:read:follows"
      >Authorize a Link</a
    >
    <button @click="test()">Link Now!</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Initialize",
  methods: {
    ...mapActions(["validate"]),
    test() {
      let url = window.location.hash;
      let split = url.split(/[:&]/);
      console.log(url, split);

      let token = split;
      console.log(token);
      this.validate(token);
    },
  },
};
</script>

<style scoped>
</style>