import Vue from 'vue'
import SvgIcon from '@/layout/components/SvgIcon/index.vue'// svg component
// 面试准备\webpack+vue2+后台管理布局\src\layout\components\SvgIcon\index.vue
// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)