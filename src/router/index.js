import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import constansRoutes from './modules/constantRoutes.js'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
 if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
 return originalPush.call(this, location).catch(err => err)
}
const routes = [
  ...constansRoutes,
  
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,
  // mode: 'hash'
})
export function resetRouter() {
  router.matcher = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
    // mode: 'hash'
  }).matcher
}
export default router