<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div v-if="showSetting" class="setting-background" @click="toggleSetting"></div>
    <siderbar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': headerVal }">
        <navbar />
      </div>
      <appMain />
    </div>
    <rightPanel :class="{ 'showSetting': showSetting }" @toggleSetting="toggleSetting" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import siderbar from '@/layout/components/Sidebar/index.vue'
import navbar from '@/layout/components/Navbar/index.vue'
import appMain from '@/layout/components/AppMain/index.vue'
import rightPanel from '@/layout/components/RightPanel/index.vue'
import ResizeMixin from './mixins/resize.js'
export default {
  name: 'Layout',
  components: {
    siderbar,
    appMain,
    navbar,
    rightPanel
  },
  mixins: [ResizeMixin],
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['sidebar', 'device', 'showSetting', 'headerVal']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/setSiderBar', false)
    },
    toggleSetting() {
      this.$store.dispatch('app/setShowSetting', !this.showSetting)
    }
  },

}
</script>
<style lang="scss" scoped >
@import "~@/styles/variable.scss";

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  position: fixed;
  z-index: 1000;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.setting-background {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  position: fixed;
  z-index: 1002;
}

.showSetting {
  transform: translateX(0);
}
</style>