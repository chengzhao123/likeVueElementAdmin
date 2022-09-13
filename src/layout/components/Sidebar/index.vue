<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :background-color="variables.menuBg" :text-color="variables.menuText"
        :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false"
        mode="vertical" :collapse="!sidebar.opened">
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
  <script>
import { mapGetters } from 'vuex'
import sidebarItem from './sidebarItem.vue'
import variables from '@/styles/variable.scss'
export default {
  name: 'Sidebar',
  components: {
    sidebarItem
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
  },
  data() {
    return {
    }
  }
}
</script>
  <style lang="css" scoped>
  </style>