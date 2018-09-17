<!--  -->
<template>
  <div class="puhui_ranking">
    <table :style="tabTitleStyle" class="tab_title" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td ref="tdTitle1">排名</td>
        <td ref="tdTitle2">大区</td>
        <td ref="tdTitle3">分部</td>
        <td ref="tdTitle4">门店</td>
        <td width="15%" :ref="'tdTitle' + ( i + 5 )" v-for="(item, i) in titleData[index]" :key="i">{{item}}</td>
      </tr>
    </table>
    <div class="ranking_cont">
      <table ref="tabBody" cellpadding="0" cellspacing="0" border="0">
        <tr v-for="(item, i) in this.data.dataList" :key="i">
          <td ref="tdBody1">{{i + 1}}</td>
          <td ref="tdBody2">{{item.areaName}}</td>
          <td ref="tdBody3">{{item.branchName}}</td>
          <td ref="tdBody4">{{item.storeName}}</td>
          <td width="15%">{{item.value1}}</td>
          <td width="15%" v-if="titleData[index].length >= 2">{{item.value2}}</td>
          <td width="15%" v-if="titleData[index].length >= 2">{{item.value3 + item.unit}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      titleData: {
        '94': ['当月进审量(笔)'],
        '95': ['当月放款任务(元)', '当月放款额(元)', '任务达成率'],
        '96': ['C(元)', 'M1(元)', 'C-M1(%)']
      },
      tabTitleStyle: {}
    }
  },
  props: ['data', 'index'],
  methods: {
    ...mapActions(['toggleBranch'])
  },
  mounted () {
    this.tabTitleStyle = {
      width: this.$refs.tabBody.offsetWidth + 'px'
    }
    this.$refs.tdTitle1.style.width = this.$refs.tdBody1[0].offsetWidth + 'px'
    this.$refs.tdTitle2.style.width = this.$refs.tdBody2[0].offsetWidth + 'px'
    this.$refs.tdTitle3.style.width = this.$refs.tdBody3[0].offsetWidth + 'px'
    this.$refs.tdTitle4.style.width = this.$refs.tdBody4[0].offsetWidth + 'px'
  }
}

</script>
<style lang='less' scoped>
  .puhui_ranking {
    width: 100%;
    height: calc(100% - 10px);
    padding: 0 17px;
    position: relative;
    padding-top: 20px;
    table {
      width: 100%;
      td {
        height: 20px;
        line-height: 20px;
        border: 1px solid #063247;
        text-align: center;
        background: #093140;
      }
    }
    .ranking_cont {
      padding-top: 20px;
      height: 100%;
      overflow: auto;
    }
    .tab_title {
      position: absolute;
      top: 20px;
    }
  }
</style>
