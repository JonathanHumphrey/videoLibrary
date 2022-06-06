import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async validate(token) {
      console.log(token)
      const res = fetch('https://id.twitch.tv/oauth2/validate', {
        headers: new Headers({
          'Authorization': 'OAuth f4zrhgn4vlpupdwkba7hf07a1pvfpm'
        })
      })
        .then(
          function (response) {
            return response.json();
          }
      )
      .then(
        data => {
          console.log(data)
        }
      );
      
    }
  },
  modules: {
  }
})
