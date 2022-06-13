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
    followedStreams: []
    
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
    },
    subFetch: (state, subArr) => {
      state.subscribers.unshift(subArr)
    },
    streamFetch: (state, streamArr) => {
      state.followedStreams.unshift(streamArr)
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

    // Grabs and commits the various information needed from the API
    async fetchInformation({commit}, User) {
      
      // Establishes a URL for each of the different API requests
      const followUrl = "https://api.twitch.tv/helix/users/follows?to_id=" + User.userId
      const subUrl = "https://api.twitch.tv/helix/subscriptions?broadcaster_id=" + User.userId
      const streamUrl = "https://api.twitch.tv/helix/streams/followed?user_id=" + User.userId
        
      //Fetches the users followers 
        const followRes =  fetch(followUrl, {
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
            commit('followFetch', dataBlob)
        }
      )
      
      // Fetches the users subsrcibers
      const subRes = fetch(subUrl, {
        headers: new Headers({
          'Authorization': 'Bearer ' + User.token,
          'Client-ID': 'pk0roinew9e83z6qn6ctr7xo7yas15'
        })
      })
        .then(
          function (response) {
            return response.json()
          }
      )
        .then(
          data => {
            commit('subFetch', data.data)
        }
      )
      
      // Fetches the users followed streams and all their statistics
      const streamRes = fetch(streamUrl, {
        headers: new Headers({
          'Authorization': 'Bearer ' + User.token,
          'Client-ID': 'pk0roinew9e83z6qn6ctr7xo7yas15'
        }) 
      })
        .then(
          function (response) {
            return response.json()
        }
      )
        .then(
          data => {
            const streamDataArray = [];

            for (const key in data.data) {
              streamDataArray.push({
                id: data.data[key].id, 
                user_id: data.data[key].user_id, 
                user_name: data.data[key].user_name, 
                game_id: data.data[key].game_name, 
                stream_title: data.data[key].title, 
                viewer_count: data.data[key].viewer_count, 
                thumbnail_url: data.data[key].thumbnail_url.replace('{width}', '320').replace('{height}', '180'), 
                twitch_url: "https://twitch.tv/" + data.data[key].user_name
              })
            }
            commit('streamFetch', streamDataArray)
            
        }
      )

    },
    
  },
  modules: {
  }
})
