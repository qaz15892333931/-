import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sex: "",
    openId: "",
    smsCode: '',
    phone: '',
    token: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app,
  },
  getters
})
export default store
