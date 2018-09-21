<!--  -->
<template>
  <div class="puhui_branch">
    <div id="puhui_branch"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import utils from '@/utils'

export default {
  name: 'Index',
  data () {
    return {
      dataList: this.data.dataList[0],
      areaLevel: {
        '2': '',
        '3': '分部'
      }
    }
  },
  props: ['data', 'index', 'changeIsLoading'],
  watch: {
    data (val) {
      // debugger
      this.dataList = val.dataList[0]
      this.branchShow()
    }
  },
  methods: {
    ...mapActions(['toggleBranch', 'changeDetailInfo', 'setRequestData', 'setErrorInfo']),
    branchShow () {
      let dom = document.getElementById('puhui_branch')
      let myChart = this.$echarts.init(dom)
      this.myChart = myChart
      let xAxis = {
        type: 'value',
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          formatter: function () {
            return ''
          }
        }
      }
      let grid = {
        left: '2%',
        right: '15%',
        bottom: '3%',
        top: '0',
        containLabel: true
      }
      let option = {
        legend: {
          data: this.index !== '83' ? this.dataList.series.map(item => {
            return {
              name: item.name,
              icon: item.name === '警戒线' ? 'line' : null
            }
          }) : [],
          textStyle: {
            color: '#c3fbff',
            fontFamily: 'arial, helvetica, STHeitiSC-Light, Heiti SC, droidsansfallback, dengxian, microsoft yahei'
          },
          itemHeight: 12
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          top: '14%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.dataList.axisX.data || [],
            axisLabel: {
              color: '#c3fbff'
            },
            axisLine: {
              lineStyle: {
                color: '#6f7f88'
              }
            }
          }
        ],
        yAxis: [{
          type: this.dataList.axisY.left && this.dataList.axisY.left.data ? 'category' : 'value',
          axisLabel: {
            color: '#c3fbff',
            formatter: this.dataList.axisY.left && !this.dataList.axisY.left.data ? this.dataList.axisY.left.unit === '%' ? '{value}%' : '{value}' : null
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#063247'
            }
          },
          data: this.dataList.axisY.left && this.dataList.axisY.left.data
        }, {
          type: this.dataList.axisY.right && this.dataList.axisY.right.data ? 'category' : 'value',
          axisLabel: {
            color: '#c3fbff',
            formatter: this.dataList.axisY.right && !this.dataList.axisY.right.data ? this.dataList.axisY.right.unit === '%' ? '{value}%' : '{value}' : null
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: this.dataList.axisY.right && this.dataList.axisY.right.data
        }]
      }
      if (this.index === '83') {
        option.xAxis[0] = xAxis
        option.grid = grid
      }
      option.series = this.dataList.series.map(item => {
        if (item.type === 'bar') {
          let firstNum
          let lastNum
          let position
          if (this.index === '83') {
            firstNum = 1
            lastNum = 0
            position = 'right'
          } else {
            firstNum = 0
            lastNum = 1
            position = 'top'
          }
          return {
            name: item.name,
            type: 'bar',
            data: item.data.map((val, i) => {
              return {value: val, id: this.dataList.axisX.ids ? this.dataList.axisX.ids[i] : this.dataList.axisY.left.ids[i], areaLevel: this.dataList.orgLevel}
            }),
            yAxisIndex: item.axisType === '1' ? 0 : 1,
            markLine: this.data.type === 'overdue' && {
              data: [
                {
                  name: '警戒线',
                  yAxis: 7560
                }
              ],
              lineStyle: {
                type: 'solid',
                curveness: 1
              },
              symbol: [''],
              label: {
                show: false
              }
            },
            itemStyle: {
              color: item.color.split(',').length > 1 ? new this.$echarts.graphic.LinearGradient(firstNum, 0, 0, lastNum, [{
                offset: 0,
                color: item.color.split(',')[1]
              }, {
                offset: 1,
                color: item.color.split(',')[0]
              }]) : item.color.split(',')[0],
              barBorderRadius: [6, 6, 6, 6]
            },
            barWidth: 12,
            label: {
              show: item.valueShow === '1',
              position: position,
              color: '#c3fbff',
              formatter: item.unit === '%' ? '{c}%' : '{c}'
            }
          }
        } else if (item.type === 'line') {
          return {
            name: item.name,
            symbol: item.name === '警戒线' && 'none',
            type: 'line',
            yAxisIndex: item.axisType === '1' ? 0 : 1,
            data: item.data.map((val, i) => {
              return {value: val, id: this.dataList.axisX.ids ? this.dataList.axisX.ids[i] : this.dataList.axisY.ids[i], areaLevel: this.dataList.orgLevel}
            }),
            itemStyle: {
              color: item.color
            },
            label: {
              show: item.valueShow === '1',
              position: 'top',
              color: '#c3fbff',
              formatter: item.unit === '%' ? '{c}%' : '{c}'
            }
          }
        } else if (item.type === 'lines') {
          return {
            name: '警戒线',
            type: 'lines'
          }
        }
      })
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
      // 获取下一级数据
      myChart.off('click')
      myChart.on('click', (params) => {
        const _this = this
        if (this.dataList.orgLevel === '4') {
          return
        }
        this.changeIsLoading()
        let data = {
          'token': 'CBCFD8AB22DD476DAAA66728EE200373',
          'itemNo': '' + this.index,
          'orgCodeList': [params.data.id]
        }
        let requestData = {
          data: data,
          params: {
            name: params.name,
            index: '' + this.index,
            type: 'branch',
            areaLevel: this.areaLevel[params.data.areaLevel]
          }
        }
        this.setRequestData(requestData)
        this.$axios.post(this.$url, data).then((res) => {
          let unit = this.index === '83' ? '(%)' : '(' + res.data.data[0][this.index].dataList[0].axisY.left.unit + ')'
          let param = {
            show: true,
            type: 'branch',
            title: res.data.data[0][this.index].title + unit,
            titleSec: params.name + this.areaLevel[params.data.areaLevel],
            data: res.data.data,
            index: '' + this.index
          }
          this.changeDetailInfo(param)
          this.changeIsLoading()
        }).catch((error) => {
          utils.errorHandler(error, _this)
        })
      })
    }
  },
  mounted () {
    this.branchShow()
  }
}

</script>
<style lang='less' scoped>
  .puhui_branch {
    width: 100%;
    height: calc(100% - 27px);
    padding: 0 17px;
    #puhui_branch {
      width: 100%;
      height: 100%;
    }
  }
</style>
