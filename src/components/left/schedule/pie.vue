<template>
    <div :id="'myChart' +id" :val="val" style="width:50px;height: 50px;margin-top: -3px"></div>
</template>

<script>
export default {
  props: ['id', 'val'],
  data () {
    return {
      a: ''
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.$echarts.init(document.getElementById('myChart' + this.id))
    // 绘制图表
    myChart.setOption({
      tooltip: {
        show: false
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销']
      },
      series: [
        {
          type: 'pie',
          // zoom: 2,
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          legendHoverLink: false,
          hoverAnimation: false,
          color: [{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0.4,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#ffcf0b'// 0% 处的颜色
            }, {
              offset: 1,
              color: '#ffff24'
            }],
            globalCoord: false
          }, '#3d3d3d'],
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: this.val + '%',
              textStyle: {
                fontSize: 8,
                color: '#fff'
              }
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: this.val},
            {value: 100 - this.val}
          ]
        }
      ]
    })
  }
}
</script>

<style scoped>
/*#myPie{width:50px;height: 50px;margin-top: -4px}*/
</style>
