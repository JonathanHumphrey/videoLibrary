import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User:{
      username: '',
      userId: 0,
      valid: false,
      token: 0
    },
    Follows: {
      total: 0,
      followerArr: []
    },
    subscribers: [],
    
  },
  mutations: {
    addUser: (state, dataBlob) => {
      state.User.username = dataBlob.username
      state.User.userId = dataBlob.userID
      state.User.valid = true
      state.User.token = dataBlob.token
    },
    followFetch: (state, dataBlob) => {
      state.Follows.total = dataBlob.total
      state.Follows.followerArr.unshift(dataBlob.followers)

      console.log(state)
    }
  },
  actions: {
    async validate({ commit }, token) {
      
      const res =  await fetch('https://id.twitch.tv/oauth2/validate', {
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
            userID: data.user_id,
            token: token
          }
          commit('addUser', dataBlob)
        }
      );
      
    },
    async fetchInformation({commit}, User) {
      
      console.log(User.token)
      const url = "https://api.twitch.tv/helix/users/follows?to_id=" + User.userId
        console.log(url)
        const res =  fetch(url, {
          headers: new Headers({
            'Authorization': 'Bearer ' + User.token,
            'Client-ID': 'pk0roinew9e83z6qn6ctr7xo7yas15'
          })
        })
        .then(
          function (response) {
            return response.json();
          }
        )
          .then(
            data => {
              const dataBlob = {
                total: data.total,
                followers: data.data
              }
              console.log(dataBlob.followers)
              commit('followFetch', dataBlob)
          }
      )
      
    },
    
  },
  modules: {
  }
})
