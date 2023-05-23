const getters = {}

const actions = {
}

const mutations = {
  setLogin(state, payload) {
    state.login = payload
  },
  setRedeemPoint(state, usedPoint) {
    state.login.point -= usedPoint
  },
}

const states = {
  login: null,
}

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
}
