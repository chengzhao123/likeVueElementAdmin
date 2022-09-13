
import Layout from '@/layout/index.vue'
const constansRoutes = [
  {
    path: '/login',
    component: () => import('@/page/Login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/dashBoard',
    component: Layout,
    children: [
      {
        path: 'dashBoard',
        component: () => import('@/page/DashBoard/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'admin'},
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/page/Error/index.vue'),
    hidden: true
  }
]
export default constansRoutes