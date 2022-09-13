import { getToken, setToken, removeToken } from '@/utils/auth.js'
import router, { resetRouter } from '@/router'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const { userName } = userInfo
      let val = ''
      if (userName.trim().toLowerCase() == 'admin') {
        val = 'admin'
      } else {
        val = 'editor'
      }
      commit('SET_TOKEN', val)
      setToken(val)
      resolve()
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (getToken() == 'admin') {
        commit('SET_ROLES', ['admin'])
      } else {
        commit('SET_ROLES', ['editor'])
      }
      commit('SET_NAME', 'name')
      commit('SET_AVATAR', 'avatar')
      commit('SET_INTRODUCTION', 'introduction')
      resolve(state.roles)
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      if (document.getElementsByClassName('audioTag').length > 0) {
        document.getElementById('app').removeChild(document.getElementsByClassName('audioTag')[0])
      }
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },
  async changeRoles({ commit, dispatch }, role) {
    const token = role.join('')
    commit('SET_ROLES', role)
    commit('SET_TOKEN', token)
    setToken(token)
    resetRouter()
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', role, { root: true })
    // // dynamically add accessible routes
    router.addRoutes(accessRoutes)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}