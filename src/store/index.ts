import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User: 
      {
        username: '',
        userId: 0
      }
    
  },
  mutations: {
    addUser: (state, dataBlob) => {
      
      state.User.username = dataBlob.username
      state.User.userId = dataBlob.userID
    }
  },
  actions: {
    async validate({ commit }, token) {
      
      const res = fetch('https://id.twitch.tv/oauth2/validate', {
        headers: new Headers({
          'Authorization': 'OAuth ' + token
        })
      })
        .then(
          function (response) {
            return response.json();
          }
      )
      .then(
        data => {
          //console.log(data)
          const dataBlob = {
            username: data.login,
            userID: data.user_id
          }
          commit('addUser', dataBlob)
        }
      );
      
    },
    
  },
  modules: {
  }
})
