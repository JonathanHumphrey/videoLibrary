import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
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
      followerArr: [],
      pagination: '',
      URL: ''
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
      state.Follows.followerArr.push(dataBlob.followers)
      state.Follows.pagination = dataBlob.pagination

      state.Follows.URL = dataBlob.URL.concat(dataBlob.pagination)
      //console.log(state.Follows.pagination)
    },
    subFetch: (state, subArr) => {
      state.subscribers.unshift(subArr)
    },
    streamFetch: (state, streamArr) => {
      state.followedStreams.unshift(streamArr)

      console.log(streamArr)
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
      const followUrl = "https://api.twitch.tv/helix/users/follows?to_id=" + User.userId + '&after='
      const subUrl = "https://api.twitch.tv/helix/subscriptions?broadcaster_id=" + User.userId
      const streamUrl = "https://api.twitch.tv/helix/streams/followed?user_id=" + User.userId
      const nextPageUrl = followUrl + '&after='

      
        
      //Fetches the users followers 

      //CURRENTLY: only fetches the first two, and after that, the pagination cursor doesn't update properly for subsequent requests

      //TODO: make this able to go through and update itself so that the pagination curosr is being updated each time it makes the mutation to state. 
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
            const follows = []
           
            for (const key in data.data) {
              const date = data.data[key].followed_at
              
              follows.push({
                from_login: data.data[key].from_login,
                from_id: data.data[key].from_id,
                from_name: data.data[key].from_name,
                to_id: data.data[key].to_id,
                to_login: data.data[key].to_login,
                to_name: data.data[key].to_name,
                followed_at: moment(date).utc().format('MM-DD-YYYY'),
              })
            }
            const dataBlob = {
              total: data.total,
              followers: follows,
              pagination: data.pagination.cursor,
              URL: followUrl
            }
            console.log(dataBlob.pagination)
            commit('followFetch', dataBlob)

            
              
              fetch(this.state.Follows.URL, {
                headers: new Headers({
                  'Authorization': 'Bearer ' + User.token,
                  'Client-ID': 'pk0roinew9e83z6qn6ctr7xo7yas15'
                })
              })
              .then(
                function (response) {
              return response.json();
              })
                .then(
                  data => {
                    
                    const nextPage = []
                   for (const key in data.data) {
                    const date = data.data[key].followed_at
                    
                    nextPage.push({
                      from_login: data.data[key].from_login,
                      from_id: data.data[key].from_id,
                      from_name: data.data[key].from_name,
                      to_id: data.data[key].to_id,
                      to_login: data.data[key].to_login,
                      to_name: data.data[key].to_name,
                      followed_at: moment(date).utc().format('MM-DD-YYYY'),
                    })
                   }
                    const nextPageBlob = {
                      total: data.total,
                      followers: nextPage,
                      pagination: data.pagination.cursor,
                      URL:  followUrl
                    }
                    console.log(nextPageBlob.pagination)
                    

                    commit('followFetch', nextPageBlob)
                }
              )
            
            //}
            
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
