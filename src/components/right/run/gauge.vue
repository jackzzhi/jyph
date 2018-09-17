
<template>
    <div :id="'gauge' + id" :val="val" :max="max" style="width:100%;height:100%;position: absolute;top:8%;" :ref="'gauge' + id" :data-sizenum="changeSizeNum"></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['id', 'toggleNum', 'val', 'max'],
  data () {
    return {
      myChart: null
    }
  },
  computed: {
    ...mapGetters(['changeSizeNum'])
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('gauge' + this.id))
      this.myChart = myChart
      this.myChart.resize()
      myChart.setOption({

        series: [
          {
            name: '业务指标',
            type: 'gauge',
            min: 0,
            max: this.max,
            detail: { show: false },
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 3,
                color: [[3, '#07e8eb']]
              }
            },
            radius: '95%',
            pointer: {
              show: true,
              length: '90%',
              width: 2
            },
            splitLine: {
              // show: true,
              length: 6,
              lineStyle: {
                width: 1,
                color: '#07e8eb',
                shadowColor: '#07e8eb',
                shadowBlur: 10
              }
            },
            data: [{
              value: this.val
            }],
            axisTick: false,
            axisLabel: false
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
