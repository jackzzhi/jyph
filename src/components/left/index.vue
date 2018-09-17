<template>
  <div class="puhui_left">
    <div class="puhui_left_plan">
    <LeftPlan></LeftPlan>
    </div>
    <div class="puhui_left_schedule">
      <Schedule></Schedule>
    </div>
    <div class="puhui_left_ranking">
      <echarts :type="'other'" :unit="'(' + initDataOne[0]['82'].dataList[0].axisY.left.unit + ')'" :index="'82'" :data="initDataOne[0]['82']"></echarts>
    </div>
  </div>
</template>
<script>
import LeftPlan from './plan/index'
import Schedule from './schedule/index'
import Echarts from '@/components/echarts/index.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['initDataOne'])
  },
  components: { LeftPlan, Schedule, Echarts },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .puhui_left {
    flex: 1;
  }
  .puhui_left_plan{height: 16%}
  .puhui_left_schedule{height: 43%}
  .puhui_left_ranking{height: 38%}
  .puhui_left_ranking{width: 100%;background: url("img/border.png") no-repeat;background-size: 100% 100%;margin-top: 2%;}
  .puhui_left_schedule{width: 100%;background: url("img/border.png") no-repeat;background-size: 100% 100%;margin-top: 2%;}
</style>
