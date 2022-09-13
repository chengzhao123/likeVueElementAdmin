import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission.js'
import user from './modules/user.js'
import app from './modules/app.js'
import getters from './getters.js'
import data from './modules/data.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    permission,
    user,
    app,
    data
  },
  getters
})
export default store

