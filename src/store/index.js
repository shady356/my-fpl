import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuOpen: false,
    bootstrap: null
  },
  mutations: {
    setMenuStatus(state, status) {
      state.isMenuOpen = status
    },
    setBootstrapData (state, data) {
      state.bootstrap = data
    }
  },
  actions: {
    commitMenuStatus(state, status) {
      state.commit('setMenuStatus', status)
    },
    commitSetBootstrapData(state, data) {
      state.commit('setBootstrapData', data)
    },
  },
  modules: {},
})