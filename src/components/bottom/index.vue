<!--  -->
<template>
  <div class="puhui_bottom_cont">
    <echarts :type="'bottom'" :index="'83'" :unit="''" :data="initDataOne[0]['83']"></echarts>
    <echarts :type="'bottom'" :index="'84'" :unit="'(万元)'" :data="initDataOne[0]['84']"></echarts>
    <echarts :type="'bottom'" :index="'85'" :unit="'(万元)'" :data="initDataOne[0]['85']"></echarts>
    <echarts :type="'bottom'" :index="'86'" :unit="'(万元)'" :data="initDataOne[0]['86']"></echarts>
  </div>
</template>

<script>
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
  components: { Echarts },
  methods: {}
}

</script>
<style lang='less' scoped>
  .puhui_bottom_cont {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
