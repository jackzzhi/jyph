<template>
  <div class="puhui_index" @resize="changeSize">
    <div v-if="initDataOne && initDataTwo" class="puhui_cont">
      <div class="puhui_top">
        <puhui-left></puhui-left>
        <puhui-middle @setOrgCodeList="getOrgCodeList"></puhui-middle>
        <puhui-right></puhui-right>
      </div>
      <div class="puhui_bottom">
        <puhui-bottom></puhui-bottom>
      </div>
      <detail v-if="detailInfo.show" :detailInfo="detailInfo"></detail>
    </div>
    <widget-loading :isShow="isLoading"></widget-loading>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PuhuiMiddle from '@/components/middle'
import PuhuiLeft from '@/components/left'
import PuhuiRight from '@/components/right'
import PuhuiBottom from '@/components/bottom'
import Detail from '@/components/detailBox'
import WidgetLoading from '@/components/common/WidgetLoading'

export default {
  name: 'Index',
  data () {
    return {
      orgCodeList: ['301']
    }
  },
  components: { PuhuiMiddle, PuhuiLeft, PuhuiRight, PuhuiBottom, Detail, WidgetLoading },
  computed: {
    ...mapGetters(['isShowBranch', 'num', 'detailShow', 'detailInfo', 'initDataOne', 'initDataTwo', 'isLoading', 'requestData'])
  },
  methods: {
    ...mapActions(['changeSize', 'setInitDataOne', 'setInitDataTwo', 'toggleLoading', 'againRequestEvent', 'changeDetailInfo']),
    getOrgCodeList (val) {
      this.orgCodeList = val
    },
    getInitDataOne () {
      let data = {
        'token': 'CBCFD8AB22DD476DAAA66728EE200373',
        'subjectId': '1',
        'orgCodeList': this.orgCodeList
      }
      return this.$axios.post(this.$url, data)
    },
    getInitDataTwo () {
      let data = {
        'token': 'CBCFD8AB22DD476DAAA66728EE200373',
        'subjectId': '2',
        'orgCodeList': this.orgCodeList
      }
      return this.$axios.post(this.$url, data)
    },
    getAll () {
      // 重新请求branch数据
      if (this.detailInfo.show) {
        const { data, params } = this.requestData
        this.$axios.post(this.$url, data).then((res) => {
          let unit = params.index === '83' ? '(%)' : '(' + res.data.data[0][params.index].dataList[0].axisY.left.unit + ')'
          let param = {
            show: true,
            type: params.type,
            title: params.type === 'branch' ? res.data.data[0][params.index].title + unit : res.data.data[0][params.index].title,
            titleSec: params.name ? params.name + params.areaLevel : '',
            data: res.data.data,
            index: '' + params.index
          }
          this.changeDetailInfo(param)
        })
      }
      this.$axios.all([this.getInitDataOne(), this.getInitDataTwo()]).then(this.$axios.spread((res1, res2) => {
        this.setInitDataOne(res1.data.data)
        this.setInitDataTwo(res2.data.data)
        this.toggleLoading(false)
      }))
    }
  },
  created () {
    this.toggleLoading(true)
    this.getAll()
    setInterval(this.getAll, 600000)
  },
  mounted () {
    let timeout
    window.onresize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(this.changeSize, 100)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../assets/css/index.less';
  .puhui_index {
    width: 100%;
    height: 100%;
    color: #fff;
    .puhui_cont {
      width: 100%;
      height: 100%;
      .puhui_top {
        display: flex;
        padding: 12px;
        height: 65%;
      }
      .puhui_bottom {
        height: 35%;
        padding: 0 12px 12px 12px;
      }
    }
  }
</style>
