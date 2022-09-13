<template>
  <div class="dashboard-admin-container">
    <panelGroup />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <lineEcharts :chartData="lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <peaEcharts :chartData="peaChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <barEcharts :chartData="barChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import lineEcharts from './components/lineEcharts.vue'
import peaEcharts from './components/peaEcharts.vue'
import barEcharts from './components/barEcharts.vue'
import panelGroup from './components/panelGroup.vue'

const animationDuration = 6000
export default {
  name: 'AdminDashBoard',
  components: {
    panelGroup,
    lineEcharts,
    peaEcharts,
    barEcharts
  },
  data() {
    return {
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      },
      peaChartData: {
        expectedData: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts'],
        actualData: [
          { value: 320, name: 'Industries' },
          { value: 240, name: 'Technology' },
          { value: 149, name: 'Forex' },
          { value: 100, name: 'Gold' },
          { value: 59, name: 'Forecasts' }
        ]
      },
      barChartData: {
        expectedData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        actualData: [{
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration
        }]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>