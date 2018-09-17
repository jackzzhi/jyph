<template>
  <div ref="middle" class="puhui_middle">
    <div ref="title" class="middle_title" :style="titleStyle">
      <h2 ref="titleName">捷越普惠数据可视化互动平台</h2>
      <span ref="areaName">{{areaName}}</span>
    </div>
    <div class="middle_title2"></div>
    <div class="middle_cont">
      <div class="puhui_tab">
        <a :style="isMarket ? tabBgActive : tabBgDefault" class="country_market" @click="changeType('market')">全国行情</a>
        <a :style="isMarket ? tabBgDefault : tabBgActive" @click="changeType('examine')">月进审批放款</a>
      </div>
      <div v-if="isMarket" class="map_cont">
        <middle-map :marketData="initDataTwo[0]['104'].dataList[0].mapDataList"></middle-map>
        <div class="map_toggle">
          <div class="toggle_box">
            <div class="toggle_cont" v-for="(item, i) in initDataTwo[0]['105'].dataList" :key="i">
              <a @click="changeArea(item.id, item.name)" :style="item.id === areaId ? {color: '#3594a0'} : {color: '' + item.color}">{{item.name}}</a><img :src="areaId === item.id ? imgSelect : imgDefault" alt="">
              <ul v-show="item.id === areaId">
                <li v-for="(val, i) in initDataTwo[0]['73'].dataList" :key="i">{{val.name}}：{{val.value}}{{val.unit === '%' ? '%' : ''}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="examine_cont">
        <echarts :noTitle="true" :noBgShow="true" :type="'other'" :index="'74'" :unit="''" :data="initDataTwo[0]['74']"></echarts>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MiddleMap from '@/components/map'
import Echarts from '@/components/echarts/index.vue'
import imgDefault from '@/assets/image/origin-blue.png'
import imgSelect from '@/assets/image/origin-yellow.png'
import bgDefault from '@/assets/image/tab-default.png'
import bgActive from '@/assets/image/tab-active.png'

export default {
  name: 'Index',
  data () {
    return {
      areaId: null,
      clickId: null,
      areaName: '全国',
      isMarket: true,
      imgDefault: imgDefault,
      imgSelect: imgSelect,
      tabBgDefault: {
        background: 'url(' + bgDefault + ') no-repeat center',
        'background-size': '100% 100%'
      },
      tabBgActive: {
        background: 'url(' + bgActive + ') no-repeat center',
        'background-size': '100% 100%'
      },
      titleStyle: {}
    }
  },
  computed: {
    ...mapGetters(['changeSizeNum', 'initDataTwo'])
  },
  watch: {
    changeSizeNum () {
      let title = this.$refs.title.offsetHeight
      this.titleStyle = {
        'line-height': title + 'px'
      }
      this.$refs.titleName.style.fontSize = parseInt(title * 0.57) + 'px'
      this.$refs.areaName.style.fontSize = parseInt(title * 0.27) + 'px'
    }
  },
  components: { MiddleMap, Echarts },
  methods: {
    ...mapActions(['setInitDataOne', 'setInitDataTwo', 'toggleLoading']),
    changeType (type) {
      if (type === 'market') {
        this.isMarket = true
      } else {
        this.isMarket = false
      }
    },
    getInitDataOne () {
      let data = {
        'token': 'CBCFD8AB22DD476DAAA66728EE200373',
        'subjectId': '1',
        'orgCodeList': [this.clickId]
      }
      return this.$axios.post(this.$url, data)
    },
    getInitDataTwo () {
      let data = {
        'token': 'CBCFD8AB22DD476DAAA66728EE200373',
        'subjectId': '2',
        'orgCodeList': [this.clickId]
      }
      return this.$axios.post(this.$url, data)
    },
    changeArea (id, name) {
      if (id === this.areaId) {
        return
      }
      this.clickId = id
      this.areaName = name
      this.toggleLoading(true)
      this.$emit('setOrgCodeList', [id])
      this.$axios.all([this.getInitDataOne(), this.getInitDataTwo()]).then(this.$axios.spread((res1, res2) => {
        this.setInitDataOne(res1.data.data)
        this.setInitDataTwo(res2.data.data)
        this.toggleLoading(false)
      }))
    }
  },
  created () {
    this.areaId = this.initDataTwo[0]['73'].dataList[0].id
  },
  updated () {
    this.areaId = this.initDataTwo[0]['73'].dataList[0].id
  },
  mounted () {
    let title = this.$refs.title.offsetHeight
    this.titleStyle = {
      'line-height': title + 'px'
    }
    this.$refs.titleName.style.fontSize = parseInt(title * 0.57) + 'px'
    this.$refs.areaName.style.fontSize = parseInt(title * 0.27) + 'px'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .puhui_middle {
    width: 44%;
    color: #85e9d9;
    margin: 0 6px;
    height: 100%;
    .middle_title {
      height: 10%;
      font-size: 0;
      background: url(../../assets/image/title1.png) center/100% 100% no-repeat;
      text-align: center;
      h2 {
        display: inline-block;
        font-size: 30px;
        color: #ffe100;
        font-style: italic;
      }
      span {
        display: inline-block;
        padding-left: 8px;
        font-size: 14px;
        font-style: italic;
        color: #ffe100;
        text-align: left;
        vertical-align: bottom;
      }
    }
    .middle_title2 {
      height: 5%;
      background: url(../../assets/image/title2.png) center/100% 100% no-repeat;
    }
    .middle_cont {
      position: relative;
      height: 84%;
      .puhui_tab {
        width: 100%;
        position: absolute;
        top: 0;
        padding-left: 13%;
        z-index: 1;
        a {
          display: inline-block;
          color: #85e9d9;
          width: 96px;
          height: 29px;
          line-height: 29px;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
        }
        a:nth-child(1) {
          margin-right: 4%;
        }
      }
    }
    .map_cont {
      width: 100%;
      font-size: 0;
      display: flex;
      height: 100%;
      padding-left: 20px;
      .map_toggle {
        flex: 1;
        text-align: right;
        font-size: 16px;
        line-height: 30px;
        padding-top: 18%;
        position: relative;
        .toggle_box {
          position: absolute;
          right: 15.4%;
          width: 160px;
          a {
            color: #c3fbff;
            padding-right: 4px;
            cursor: pointer;
          }
          ul {
            display: inline-block;
            font-size: 12px;
            line-height: 20px;
            color: #dfe9ad;
            background: url(../../assets/image/selectionBox.png) center/100% 100% no-repeat;
            text-align: left;
            padding: 4px 12px 4px 12px;
          }
        }
      }
    }
    .examine_cont {
      width: 100%;
      height: 100%;
      padding-top: 60px;
    }
  }
</style>
