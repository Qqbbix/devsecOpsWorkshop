const getters = {}

const actions = {
  setRedeem({ commit }, payload) {
    commit('SET_REDEEM', payload)
  },
}

const mutations = {
  SET_REDEEM(state, payload) {
    state.redeem = payload
  },
}

const states = {
  redeem: {},
}

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
}
