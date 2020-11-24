import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    identity: localStorage.getItem('identity') || null,
  },
  mutations: {
    login(state, data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('identity', data.identity);
      state.identity = data.identity;
      state.token = data.token
    },
  },
  actions: {}
})
