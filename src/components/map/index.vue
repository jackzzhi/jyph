<template>
  <div class="middle_map">
    <div id="myMap"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'echarts/map/js/china'
export default {
  name: 'Index',
  props: ['marketData'],
  data () {
    return {
      myChart: null
    }
  },
  computed: {
    ...mapGetters(['changeSizeNum'])
  },
  watch: {
    marketData (val) {
      this.drawLine()
    },
    changeSizeNum () {
      this.myChart.resize()
    }
  },
  mounted () {
    setTimeout(this.drawLine, 0)
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myMap'))
      this.myChart = myChart
      // 绘制图表
      let map = this.marketData
      let option = {
        roamController: {// 控制地图的上下左右放大缩小 图上没有显示
          show: false,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        geo: {
          map: 'china',
          top: 0,
          right: 0,
          bottom: 20,
          left: 0,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#003997',
              borderColor: '#315fab',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#003997'
            }
          }
        },
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: map,
            rippleEffect: {
              scale: 5
            },
            label: {
              show: true,
              position: 'bottom',
              formatter: '{b}',
              color: '#b2bdd0'
            },
            itemStyle: {
              normal: {
                color: '#977433'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .middle_map {
    display: inline-block;
    width: 84%;
    height: 100%;
    #myMap {
      width: 100%;
      height: 100%;
    }
  }
</style>
