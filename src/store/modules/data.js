const state = {
  userList: [], //用户列表数据
  roleList: [], //角色列表数据
}
const mutations = {
  ADD_USERLIST: (state, list) => {
    state.userList.push(list)
  },
  EDIT_USERLIST : (state, list) => {
    state.userList = list
  },
  DEL_USERLIST : (state, list) => {
    state.userList = list
  },
  ADD_ROLELIST: (state, list) => {
    state.roleList.push(list)
  },
  EDIT_ROLELIST : (state, list) => {
    state.roleList = list
  },
  DEL_ROLELIST : (state, list) => {
    state.roleList = list
  },
}
const actions = {
  addUserList({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      commit('ADD_USERLIST', userInfo)
      resolve()
    })
  },
  delUserList({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      let val = state.userList.filter(item => {
        return item.userId != userInfo.userId
      })
      commit('DEL_USERLIST', val)
      resolve()
    })
  },
  editUserList({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      let val = state.userList.map(item => {
        if(item.userId == userInfo.userId) {
          return userInfo
        }
        return item
      })
      commit('EDIT_USERLIST', val)
      resolve()
    })
  },
  changeUserRole({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      let val = state.userList.map(item => {
        if(item.userId == userInfo.userId) {
          return userInfo
        }
        return item
      })
      commit('EDIT_USERLIST', val)
      resolve()
    })
  },
  addRoleList({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      commit('ADD_ROLELIST', userInfo)
      resolve()
    })
  },
  delRoleList({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      let val = state.roleList.filter(item => {
        return item.roleId != userInfo.roleId
      })
      commit('DEL_ROLELIST', val)
      resolve()
    })
  },
  editRoleList({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      let val = state.roleList.map(item => {
        if(item.roleId == userInfo.roleId) {
          return userInfo
        }
        return item
      })
      commit('EDIT_ROLELIST', val)
      resolve()
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}