const getters = {
  sidebar: state => state.app.sidebar,
  // size: state => state.app.size,
  device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  headerVal: state => state.app.headerVal,
  showSetting: state => state.app.showSetting,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
}
export default getters
