<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :key="$route.fullpath">
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>
  <script>
export default {
  name: 'AppMain',
  data() {
    return {

    }
  }
}
</script>
  <style lang="scss" scoped>
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .fixed-header+.app-main {
    padding-top: 50px;
  }
  </style>