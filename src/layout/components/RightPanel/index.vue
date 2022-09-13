<template>
  <div class="setting-article">
    <div class="setting-icon" @click="toggleSetting">
      <i :class="showSetting ? 'el-icon-close' : 'el-icon-setting'"></i>
    </div>
    <div class="setting-content">
      <div class="setting-item">
        <h3>系统布局设置</h3>
      </div>
      <div class="setting-item">
        <span>背景音乐</span>
        <el-switch @change="changeAudio" v-model="musicVal" />
      </div>
      <div class="setting-item" v-show="musicVal">
        <span>切换歌曲</span>
        <el-button size="mini" @click="changeMusic">下一首</el-button>
      </div>
      <div class="setting-item" v-show="musicVal">
        <span>背景音量</span>
        <el-slider class="musicTwo" @change="changeAudioTwo" v-model="musicValTwo" show-stops :max="100" :min="0">
        </el-slider>
      </div>
      <div class="setting-item">
        <span>固定Header</span>
        <el-switch @change="changeThree" v-model="headerVal" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "RightPanel",
  data() {
    return {
      musicVal: false,
      musicValTwo: 24
    };
  },
  computed: {
    ...mapGetters(['showSetting', "headerVal"]),
  },
  watch: {
    musicVal(val) {
      if (val) {
        this.musicValTwo = 24
      }
    }
  },
  methods: {
    changeAudio(v) {
      var audioTag = document.getElementsByClassName("audioTag")[0];
      if (v) {
        audioTag.play()
        audioTag.volume = this.musicValTwo / 100
      }
      else {
        audioTag.load()
        audioTag.volume = this.musicValTwo / 100
      }
    },
    changeAudioTwo(v) {
      var audioTag = document.getElementsByClassName("audioTag")[0];
      this.musicValTwo = v
      audioTag.volume = v / 100
    },
    toggleSetting() {
      this.$emit('toggleSetting')
    },
    changeThree(v) {
      this.$store.dispatch('app/setHeaderVal', v)
    },
    changeMusic() {
      var audioTag = document.getElementsByClassName("audioTag")[0];
      if (audioTag.src.indexOf('moon') != -1) {
        audioTag.src = require('../../../music/TruE.mp3')
        audioTag.play()
      } else {
        audioTag.src = require('../../../music/moon_halo.mp3')
        audioTag.play()
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.setting-article {
  position: fixed;
  right: 0;
  background: white;
  top: 0;
  height: 100vh;
  width: 100%;
  max-width: 260px;
  transition: all 0.28s;
  z-index: 1003;
  transform: translateX(100%);

  .setting-icon {
    position: absolute;
    top: 260px;
    left: -48px;
    width: 48px;
    height: 48px;
    font-size: 24px;
    text-align: center;
    line-height: 48px;
    background-color: rgb(24, 144, 255);
    border-radius: 6px 0 0 6px;
    color: white;
    cursor: pointer;
  }

  .setting-content {
    padding: 24px;
    font-size: 14px;
    word-wrap: break-word;

    .setting-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      align-items: center;

      .musicTwo {
        width: 100%;
        max-width: 120px;

        /deep/.el-slider__stop {
          background-color: #dcdfe6 !important;
        }
      }
    }
  }
}
</style>