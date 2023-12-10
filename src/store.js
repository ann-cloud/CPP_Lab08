import { createStore } from 'vuex'

const store = createStore({
    state() {
      return {
        authenticated: false,
        userId: "",
        username: "",
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
      setAccessToken(state, value) {
        state.accessToken = value;
      }
    },
    actions: {
        authenticate({ commit }, { authenticated, userId, username, accessToken }) {
          commit('setAuthenticated', authenticated);
          commit('setUserId', userId);
          commit('setUsername', username);
          commit('setAccessToken', accessToken);
        },
      },
    getters: {
      isAuthenticated: (state) => state.authenticated,
      getUserId: (state) => state.userId,
      getUsername: (state) => state.username,
      getAccessToken: (state) => state.accessToken,
    },
  });  

export default store