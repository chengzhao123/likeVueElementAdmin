import Layout from '@/layout/index.vue'
const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    meta: {  roles: ['admin'], icon: 'admin',title: '用户管理' },
    children: [
      {
        path: 'userList',
        component: () => import('@/page/User/userList.vue'),
        name: 'UserList',
        meta: { title: '用户列表', icon: 'admin' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    name: 'Article',
    meta: { title: '商品管理', icon: 'admin' },
    children: [
      {
        path: 'list',
        component: () => import('@/page/Article/list.vue'),
        name: 'Article List',
        meta: { title: '商品列表', icon: 'admin' }
      },
      {
        path: 'edit',
        component: () => import('@/page/Article/edit.vue'),
        name: 'Articl Edit',
        meta: { title: '分类管理', icon: 'admin', roles: ['admin'] }
      }
    ]
  },
 //用户管理 ->用户列表 权限管理->权限列表 角色列表 商品管理 ->商品列表 分类管理 商品参数
  {
    path: '/permission',
    component: Layout,
    meta: {roles: ['admin'], title: '权限管理', icon: 'admin' },
    children: [
      {
        path: 'list',
        component: () => import('@/page/Permission/roleList.vue'),
        name: 'roleList',
        meta: { title: '角色列表', icon: 'admin'}
      },
      {
        path: 'permissionList',
        component: () => import('@/page/Permission/permissionList.vue'),
        name: 'permissionList',
        meta: { title: '权限列表', icon: 'admin'}
      },
      {
        path: 'role',
        component: () => import('@/page/Permission/role.vue'),
        name: 'permission Role',
        meta: { title: '角色权限', icon: 'admin'}
      },
    ]
  },
  { path: '*', redirect: '/404', hidden:true }
]
export default asyncRoutes