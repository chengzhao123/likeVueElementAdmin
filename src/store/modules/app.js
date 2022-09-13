const state = {
  sidebar: {
    opened: true //默认打开左侧
  },
  device: 'pc',
  showSetting: false, //展示系统布局设置
  headerVal: true, //是否固定导航顶部
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
  },
  SET_SIDEBAR: (state, val) => {
    state.sidebar.opened = val
  },
  SET_DEVICE: (state, val) => {
    state.device = val
  },
  SET_SHOWSETTING: (state, val) => {
    state.showSetting = val
  },
  SET_HEADERVAL: (state, val) => {
    state.headerVal = val
  },
}
const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setSiderBar({commit}, val) {
    commit('SET_SIDEBAR', val)
  },
  setDevice({commit}, val) {
    commit('SET_DEVICE', val)
  },
  setShowSetting({commit}, val) {
    commit('SET_SHOWSETTING', val)
  },
  setHeaderVal({commit}, val) {
    commit('SET_HEADERVAL', val)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}