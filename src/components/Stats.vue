<template>
  <div>
    <p>Total Follows: {{ this.Follows.total }}</p>
    <table>
      <thead>
        <th>Name</th>
        <th>Follow Date</th>
      </thead>
      <tbody>
        <tr v-for="(follower, i) in this.Follows.followerArr[0]" v-bind:key="i">
          <td>{{ follower.from_login }}</td>
          <td>{{ follower.followed_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Stats",
  methods: {},
  computed: {
    ...mapState({
      User: (state) => state.User,
      Follows: (state) => state.Follows,
    }),
  },
};
</script>

<style scoped>
</style>