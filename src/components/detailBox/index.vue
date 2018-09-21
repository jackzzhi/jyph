<!--  -->
<template>
  <div class="puhui_detail" @click.stop="closeBox">
    <div class="detail_cont" @click.stop>
      <div class="title">
        <h2>{{detailInfo.title}}</h2>
        <span @click="closeBox">x</span>
      </div>
      <div class="detail_info">
        <h3>{{detailInfo.titleSec}}</h3>
        <branch :changeIsLoading="changeIsLoading" v-if="detailInfo.type === 'branch'" :data="detailInfo.data[0][detailInfo.index]" :index="detailInfo.index"></branch>
        <ranking v-if="detailInfo.type === 'ranking'" :data="detailInfo.data[0][detailInfo.index]" :index="detailInfo.index"></ranking>
        <widget-loading :isShow="isLoading" :type="errorInfo.type" :errorText="errorInfo.errorText" :isRefresh="errorInfo.isRefresh"></widget-loading>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Branch from '@/components/detailBox/branch.vue'
import Ranking from '@/components/detailBox/ranking.vue'
import WidgetLoading from '@/components/common/WidgetLoading'
export default {
  name: 'Index',
  data () {
    return {
      isLoading: false
    }
  },
  props: ['detailInfo'],
  components: { Branch, Ranking, WidgetLoading },
  computed: {
    ...mapGetters(['errorInfo'])
  },
  methods: {
    ...mapActions(['changeDetailInfo']),
    closeBox () {
      let param = {
        show: false,
        type: '',
        title: '',
        titleSec: '',
        data: null,
        index: null
      }
      this.changeDetailInfo(param)
    },
    changeIsLoading () {
      this.isLoading = !this.isLoading
    }
  }
}

</script>
<style lang='less' scoped>
  .puhui_detail {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(7,27,45, .9);
    color: #85e9d9;
    z-index: 9;
    .detail_cont {
      width: 61%;
      height: 59%;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #093140;
      margin: auto;
      .title {
        height: 30px;
        padding-left: 6px;
        line-height: 30px;
        color: #fff;
        position: relative;
        background: #0c4559;
        h2 {
          font-size: 12px;
        }
        span {
          display: inline-block;
          width: 14px;
          height: 14px;
          line-height: 12px;
          border-radius: 50%;
          color: #008ae3;
          background: #fff;
          position: absolute;
          right: 20px;
          top: 8px;
          text-align: center;
        }
      }
      .detail_info {
        position: relative;
        height: calc(100% - 30px);
        h3 {
          line-height: 36px;
          font-size: 16px;
          padding-left: 17px;
        }
      }
    }
  }
</style>
