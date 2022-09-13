<template>
  <el-row :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="admin" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">当日访问</div>
          <div class="card-panel-num">{{ province }}</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="admin" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">一周访问</div>
          <div class="card-panel-num">
            {{ city }}
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="admin" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">当前发布</div>
          <div class="card-panel-num">
            {{ daytemp }}℃
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="admin" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">一周发布</div>
          <div class="card-panel-num">
            {{ nighttemp }}℃
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
export default {
  name: 'PanelGroup',
  data() {
    return {
      province: null,
      city: null,
      adcode: null,
      daytemp: 0,
      nighttemp: 0
    }
  },
  computed: {
    ...mapGetters(['device']),
  },
  methods: {
    getLocaltionIp() {
      this.$axios.get('https://restapi.amap.com/v3/ip?key=1bc23dcf6e92d1820475064333c85de0').then(res => {
        Message.success('获取定位成功')
        if (res.data && res.data.status == '1') {
          this.province = res.data.province
          this.city = res.data.city
          this.adcode = res.data.adcode
          this.getNowWeather(this.adcode)
        }
      }).catch(err => {
        Message.error(err || '获取定位失败')
      })
    },
    getNowWeather(adcode) {
      this.$axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=' + adcode + '&key=1bc23dcf6e92d1820475064333c85de0&extensions=all').then(res => {
        if (res.data && res.data.status == '1') {
          this.daytemp = res.data.forecasts[0].casts[0].daytemp
          this.nighttemp = res.data.forecasts[0].casts[0].nighttemp
        }
      }).catch(err => {
        Message.error(err || '获取天气失败')
      })
    }
  },
  mounted() {
    this.getLocaltionIp()
  }
}
</script>
<style lang="scss" scoped>
.card-panel-col {
  margin-bottom: 32px;

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .card-panel-icon-wrapper {
      padding: 16px;
      margin: 14px 0 0 14px;
      float: left;
      transition: all 0.38s ease-out;

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }

  &:hover {
    .card-panel-icon-wrapper {
      background-color: #40c9c6;
      border-radius: 6px;
    }

    .card-panel-icon {
      color: #fff;
    }
  }
}
</style>