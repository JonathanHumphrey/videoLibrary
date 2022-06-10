<template>
  <div>
    <p>Total Follows: {{ this.Follows.total }}</p>
    <div class="stats-tables">
      <table>
        <thead>
          <th>Name</th>
          <th>Follow Date</th>
        </thead>
        <tbody>
          <tr
            v-for="(follower, i) in this.Follows.followerArr[0]"
            v-bind:key="i"
          >
            <td>{{ follower.from_login }}</td>
            <td>{{ follower.followed_at }}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <th>Name</th>
        </thead>
        <tbody>
          <tr v-for="(subs, i) in this.Subs[0]" v-bind:key="i">
            <td>{{ subs.user_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Tab",
    },
  },
  data() {
    return {
      isActive: true,
    };
  },
  name: "Stats",
  methods: {},
  computed: {
    ...mapState({
      User: (state) => state.User,
      Follows: (state) => state.Follows,
      Subs: (state) => state.subscribers,
    }),
  },
};
</script>

<style scoped>
.stats-tables {
  border: solid black;
  display: flex;
  flex-direction: row;
}
table {
  text-align: left;
  table-layout: auto;
  border-collapse: collapse;
  width: 100%;
  margin: 0;
  height: 1rem;
}
</style>