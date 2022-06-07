<template>
  <div>
    dook

    <a
      id="linkAnchor"
      href="https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=pk0roinew9e83z6qn6ctr7xo7yas15&redirect_uri=http://localhost:8080&scope=user:read:follows"
      >Authorize a Link</a
    >
    <button @click="validateToken()">Link Now!</button>
    <div>
      <h1>{{ this.user.username }}</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
/* 
http://localhost:8080/#access_token=if94bmlel947n7g4efdzkfhzvkxe8p&scope=user%3Aread%3Afollows&token_type=bearer
*/
export default {
  name: "Initialize",
  methods: {
    ...mapActions(["validate"]),
    validateToken() {
      // Partitions up the url so that the token can be grabbed
      //Initial Split
      let url = window.location.hash;

      let split = url.split(/[:&]/);

      let token = split[0].split("=");

      let actualToken = token[1];
      this.validate(actualToken);
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.User,
    }),
  },
};
</script>

<style scoped>
</style>