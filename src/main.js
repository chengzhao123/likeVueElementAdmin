import Vue from 'vue';
import App from './App.vue'
import ElementUI from 'element-ui'
import echarts from 'echarts' //全局引入echarts
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css' //element样式
import 'normalize.css/normalize.css' //normalize公共样式
import axios from 'axios'
import store from './store' //状态管理
import router from './router' //路由
import './permission.js' //路由权限
import './icons' //svg组件
import '@/styles/index.scss' //自定义全局样式
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
import pagination from '@/components/Pagination/index.vue'
Vue.component('pagination', pagination)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')