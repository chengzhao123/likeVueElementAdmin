<template>
  <div id="peaEcharts" :style="{height:height,width:width}" ></div>
</template>
<script>
import mixins from '../../mixins/resize.js'
export default {
  name: 'PeaEcharts',
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
      this.chart = this.$echarts.init(document.getElementById('peaEcharts'))
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: expectedData
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: actualData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>