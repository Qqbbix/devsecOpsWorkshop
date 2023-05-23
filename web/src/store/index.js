import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login'
import redeem from '@/store/modules/redeem'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    redeem,
  },
})
