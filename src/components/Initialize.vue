<template>
  <div class="wrapper">
    <a
      class="link-account-anchor"
      id="linkAnchor"
      href="https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=pk0roinew9e83z6qn6ctr7xo7yas15&redirect_uri=https://62a767df1e68ea0bab77f158--lovely-tiramisu-43f35a.netlify.app/&scope=user:read:follows%20channel:read:subscriptions%20user:read:follows"
      >Authorize a Link</a
    >
    <button class="link-button" @click="validateToken()">Link Now!</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// FOR LOCAL HOST: http://localhost:8080
// FOR NETLIFY: https://62a767df1e68ea0bab77f158--lovely-tiramisu-43f35a.netlify.app/

/* 
http://localhost:8080/#access_token=if94bmlel947n7g4efdzkfhzvkxe8p&scope=user%3Aread%3Afollows&token_type=bearer
*/
export default {
  name: "Initialize",
  methods: {
    ...mapActions(["validate", "fetchInformation"]),
    validateToken() {
      // Partitions up the url so that the token can be grabbed
      //Initial Split
      let url = window.location.hash;

      let split = url.split(/[:&]/);

      let token = split[0].split("=");

      let actualToken = token[1];
      this.validate(actualToken);

      setTimeout(() => {
        this.fetchInformation(this.User);
      }, 500);
    },
  },
  computed: {
    ...mapState({
      User: (state) => state.User,
      Follows: (state) => state.Follows,
    }),
  },
};
</script>

<style scoped>
.wrapper {
  margin-bottom: 5rem;
  width: 12rem;
}
.link-account-anchor {
  text-decoration: none;
  background-color: #6441a5;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 1rem;
  color: #ffffff;
}
.link-button {
  text-decoration: none;
  background-color: #6441a5;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 1rem;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
</style>