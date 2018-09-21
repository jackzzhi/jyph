<!--  -->
<template>
  <div class="echarts_ranking" :style="type === 'other' ? {width: '100%'} : {}">
    <div class="echarts_cont" ref="echarts_cont" :style="echartsContStyle">
      <div v-if="!noTitle" class="title">
        <h2>{{data.title}}</h2>
        <span>{{unit}}</span>
        <span class="span_ranking" v-if="dataList.orgRankItemNo" @click="showRanking">全国排名</span>
      </div>
      <div :id="'echarts_ranking' + index + type" :style="echartsStyle"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import bgImg from '@/assets/image/boxBg.png'
import utils from '@/utils'

export default {
  name: 'Index',
  data () {
    return {
      echartsStyle: {
        height: 'calc(100% - 30px)',
        width: '100%'
      },
      myChart: null,
      dataList: this.data.dataList[0],
      areaLevel: {
        '2': '',
        '3': '分部'
      },
      echartsContStyle: {
        background: this.noBgShow ? null : 'url(' + bgImg + ') center/100% 100% no-repeat'
      }
    }
  },
  props: ['data', 'index', 'type', 'unit', 'noBgShow', 'noTitle'],
  computed: {
    ...mapGetters(['changeSizeNum'])
  },
  watch: {
    changeSizeNum () {
      this.myChart.resize()
    },
    data (val) {
      this.dataList = this.data.dataList[0]
      this.echartsRankingShow()
    }
  },
  methods: {
    ...mapActions(['changeDetailInfo', 'toggleLoading', 'setRequestData', 'setErrorInfo']),
    echartsRankingShow () {
      let dom = document.getElementById('echarts_ranking' + this.index + this.type)
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
            color: '#fff',
            fontFamily: 'arial, helvetica, STHeitiSC-Light, Heiti SC, droidsansfallback, dengxian, microsoft yahei'
          },
          itemHeight: 6,
          itemWidth: 12
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          top: this.index === '82' ? '24%' : '16%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.dataList.axisX.data || [],
            axisLabel: {
              color: '#fff'
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
            color: '#fff',
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
          data: this.dataList.axisY.left ? this.dataList.axisY.left.data : null,
          name: this.index === '74' ? '(' + this.dataList.axisY.left.unit + ')' : null,
          nameTextStyle: {
            color: '#fff',
            padding: [0, 30, 0, 0]
          }
        }, {
          type: this.dataList.axisY.right && this.dataList.axisY.right.data ? 'category' : 'value',
          axisLabel: {
            color: '#fff',
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
          data: this.dataList.axisY.right ? this.dataList.axisY.right.data : null,
          name: this.index === '74' ? '(' + this.dataList.axisY.right.unit + ')' : null,
          nameTextStyle: {
            color: '#fff',
            padding: [0, 0, 0, 30]
          }
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
              color: '#fff',
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
              color: '#fff',
              formatter: item.unit === '%' ? '{c}%' : '{c}'
            }
          }
        }
      })
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
      // 获取下一级数据
      myChart.off('click')
      myChart.on('click', (params) => {
        // debugger
        const _this = this
        if (this.dataList.orgLevel === '4' || this.index === '74') {
          return
        }
        this.toggleLoading(true)
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
          this.toggleLoading(false)
        }).catch((error) => {
          utils.errorHandler(error, _this)
        })
      })
    },
    // 获取全国排名数据
    showRanking () {
      const _this = this
      this.toggleLoading(true)
      let itemNo = this.dataList.orgRankItemNo
      let data = {
        'token': 'CBCFD8AB22DD476DAAA66728EE200373',
        'itemNo': itemNo
      }
      let requestData = {
        data: data,
        params: {
          name: '',
          index: '' + itemNo,
          type: 'ranking'
        }
      }
      this.setRequestData(requestData)
      this.$axios.post(this.$url, data).then((res) => {
        let param = {
          show: true,
          type: 'ranking',
          title: res.data.data[0][itemNo].title,
          titleSec: '',
          data: res.data.data,
          index: itemNo
        }
        this.changeDetailInfo(param)
        this.toggleLoading(false)
      }).catch((error) => {
        utils.errorHandler(error, _this)
      })
    }
  },
  mounted () {
    this.echartsRankingShow()
  }
}

</script>
<style lang='less' scoped>
  .echarts_ranking {
    width: 24.5%;
    height: 100%;
    .echarts_cont {
      height: 100%;
      .title {
        line-height: 20px;
        height: 30px;
        padding: 10px 24px 0 6px;
        h2 {
          font-size: 16px;
          float: left;
          padding-left: 20px;
          background: url(../../assets/image/drip.png) no-repeat 0 center;
        }
        span {
          font-size: 12px;
          float: right;
          margin-left: 12px;
        }
        .span_ranking {
          cursor: pointer;
        }
      }
    }
  }
</style>
