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
      if (value !== undefined) {
        localStorage.setItem("userId", value);
      }
      else {
        state.authenticated = false;
      }
      state.userId = value;
    },
    setUsername(state, value) {
      state.username = value;
    },
    setEmail(state, value) {
      state.email = value;
    },
    setAccessToken(state, value) {
      if (value !== undefined) {
        localStorage.setItem("accessToken", value);
      }
      else {
        state.authenticated = false;
      }

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
      let userId = localStorage.getItem("userId");
      let tmpToken = localStorage.getItem("accessToken");

      if (!state.authenticated && userId !== undefined && tmpToken !== undefined) {
        state.userId = userId;
        state.accessToken = tmpToken;
        state.authenticated = true;
      }

      if (userId == undefined || tmpToken == undefined)
        state.authenticated = false;

      return state.authenticated;
    },
    getUserId: (state) => {
      let userId = localStorage.getItem("userId");
      let tmpToken = localStorage.getItem("accessToken");

      if (!state.authenticated && userId !== undefined && tmpToken !== undefined) {
        state.userId = userId;
        state.accessToken = tmpToken;
        state.authenticated = true;
      }

      if (userId == undefined || tmpToken == undefined)
        state.authenticated = false;

      return state.userId;
    },
    getUsername: (state) => state.username,
    getEmail: (state) => state.email,
    getAccessToken: (state) => {
      let userId = localStorage.getItem("userId");
      let tmpToken = localStorage.getItem("accessToken");

      if (!state.authenticated && userId !== undefined && tmpToken !== undefined) {
        state.userId = userId;
        state.accessToken = tmpToken;
        state.authenticated = true;
      }

      if (userId == undefined || tmpToken == undefined)
        state.authenticated = false;

      return state.accessToken;
    }

  },
});

export default store