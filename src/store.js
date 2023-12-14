import { createStore } from 'vuex'

const store = createStore({
    state() {
      return {
        authenticated: false,
        userId: "",
        username: "",
        email: "",
        accessToken: ""
      };
    },
    mutations: {
      setAuthenticated(state, value) {
        state.authenticated = value;
      },
      setUserId(state, value) {
        state.userId = value;
      },
      setUsername(state, value) {
        state.username = value;
      },
      setEmail(state, value)
      {
        state.email = value;
      },
      setAccessToken(state, value) {
        localStorage.setItem("accessToken", value);
        state.accessToken = value;
      }
    },
    actions: {
        authenticate({ commit }, { authenticated, userId, username, email, accessToken }) {
          commit('setAuthenticated', authenticated);
          commit('setUserId', userId);
          commit('setUsername', username);
          commit('setEmail', email);
          commit('setAccessToken', accessToken);
        },
      },
    getters: {
      isAuthenticated: (state) => {
        let tmpToken = localStorage.getItem("accessToken");
        console.log(tmpToken );
        if(tmpToken != null && !state.authenticated)
        {
          state.accessToken = tmpToken;
          state.authenticated = true;
        }
        return state.authenticated;
      },
      getUserId: (state) => state.userId,
      getUsername: (state) => state.username,
      getEmail: (state) => state.email,
      getAccessToken: (state) => {
        let tmpToken = localStorage.getItem("accessToken");
        if(tmpToken != null)
          state.accessToken = tmpToken;
        return state.accessToken;
      }
       
    },
  });  

export default store