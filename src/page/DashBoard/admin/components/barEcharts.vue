<template>
  <div id="barEcharts" :style="{height:height,width:width}" ></div>
</template>
<script>
import mixins from '../../mixins/resize.js'
export default {
  name: 'BarEcharts',
  data() {
    return {
      chart: null
    }
  },
  mixins: [mixins],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  mounted() {
    let {expectedData, actualData} = this.chartData
    this.initEChart(expectedData, actualData)
  },
  methods: {
    initEChart(expectedData, actualData) {
      this.chart = this.$echarts.init(document.getElementById('barEcharts'))
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: expectedData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: actualData
      })
    }
  }
}
</script>