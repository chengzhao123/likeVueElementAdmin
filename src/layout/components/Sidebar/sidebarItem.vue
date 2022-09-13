<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item)">
      <router-link :to="onlyOneChild.path" tag="div">
        <el-menu-item :index="onlyOneChild.path">
          <link-item :icons="onlyOneChild.meta && onlyOneChild.meta.icon"
            :title="onlyOneChild.meta && onlyOneChild.meta.title" :is-nest="this.isNest" />
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else :index="item.path" popper-append-to-body>
      <template slot="title">
        <link-item :icons="item.meta && item.meta.icon" :title="item.meta && item.meta.title" :is-nest="false" />
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="item.path"
        :is-nest="false" class="nest-menu" />
    </el-submenu>
  </div>
</template>
  <script>
import linkItem from './linkItem.vue';
import { mapGetters } from 'vuex'
import path from 'path';
export default {
  name: "SidebarItem",
  data() {
    this.onlyOneChild = null;
    return {};
  },
  components: {
    linkItem
  },
  props: {
    item: {
      type: Object,
      require: true
    },
    basePath: {
      type: String,
      default: ""
    },
    isNest: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  methods: {
    //判断是否只有一个显示的子路由
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          if (parent.path == '/') {
            this.onlyOneChild = { ...item, path: '/' + item.path };
          } else {
            this.onlyOneChild = { ...item, path: parent.path + '/' + item.path };
          }
          return true;
        }
      });

      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: this.basePath + "/" + this.item.path };
        return true;
      }
      return false;
    },
  }
}
</script>
  <style lang="css" scoped>
  </style>