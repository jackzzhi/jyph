
<template>
  <div class="puhui_right">
    <div class="puhui_right_run">
      <runComponent></runComponent>
    </div>
    <div class="puhui_right_case">
      <caseComponent :index="93"  :data="initDataTwo[0]['93']"></caseComponent>
    </div>
  </div>
</template>
<script>
import runComponent from './run/index'
import caseComponent from './case/index'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
    }
  },
  components: {runComponent, caseComponent},
  computed: {
    ...mapGetters(['initDataTwo'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .puhui_right {
    flex: 1;
  }
  .puhui_right_run{
    width: 100%;
    height: 36%;
    background: url("../left/img/border.png") no-repeat center;
    background-size: 100% 100%;
  }
  .puhui_right_case{
    width: 100%;
    height: 63%;
    background: url("../left/img/border.png") no-repeat center;
    background-size: 100% 100%;
    margin-top: 2%;
  }
</style>
