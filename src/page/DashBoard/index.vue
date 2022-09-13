<template>
<div class="dashboard-container">
  <component :is="roleType" />
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import adminDashBoard from './admin/index.vue'
import editorDashBoard from './editor/index.vue'
import createAudio from '@/utils/music.js'
export default {
  name: 'DashBoard',
  data() {
    return {
      roleType: 'adminDashBoard',
      musicBgm: require('../../music/moon_halo.mp3')
    }
  },
  components: {
    adminDashBoard,
    editorDashBoard
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  mounted() {
    if(!this.roles.includes('admin')) {
      this.roleType = 'editorDashBoard'
    }
    createAudio()
    var audioTag = document.getElementsByClassName('audioTag')[0]
    audioTag.src = this.musicBgm
  }
}
</script>
<style lang="scss" scoped>
</style>