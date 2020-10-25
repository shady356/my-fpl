import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuOpen: false
  },
  mutations: {
    setMenuStatus(state, status) {
      state.isMenuOpen = status
    },
  },
  actions: {
    commitMenuStatus(state, status) {
      state.commit('setMenuStatus', status)
    },
  },
  modules: {},
})