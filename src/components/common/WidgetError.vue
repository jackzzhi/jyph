<!--  -->
<template>
  <div class="error_page">
    <div class="error_icon"><img :src="failImg" /></div>
    <h1>{{errorInfo.errorText}}</h1>
    <a @click="refresh">重新加载</a>
    <div class="contacr_info">
      <p>如果有问题请及时反馈,我们会在第一时间为您处理</p>
      <p>研发团队：大数据中心 司南团队</p>
      <p>反馈邮箱：<span>sinan@jieyuechina.com</span></p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import failImg from '@/assets/image/fail.png'
export default {
  name: '',
  data () {
    return {
      failImg: failImg
    }
  },
  computed: {
    ...mapGetters(['errorInfo'])
  },
  methods: {
    refresh () {
      location.reload(true)
    }
  }
}

</script>
<style lang='less' scoped>
.error_page {
  width: 500px;
  height: 300px;
  margin: 300px auto;
  position: relative;
  color: #fff;
  .error_icon {
    margin-bottom: 20px;
  }
  h1 {
    font-size: 26px;
    margin-bottom: 20px;
  }
  a {
    display: inline-block;
    margin-top: 15px;
    padding: 4px 12px;
    border-radius: 3px;
    cursor: pointer;
    color: #fff;
    background: #178ab3;
    margin-bottom: 20px;
  }
  .contacr_info {
    margin-top: 20px;
    text-align: left;
    line-height: 30px;
  }
  span {
    color: #178ab3;
  }
}
</style>
