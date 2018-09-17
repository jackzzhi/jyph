<!--  -->
<template>
  <div v-if="isShow" class="widget_loading">
    <div class="loading_cont">
      <div class="loading_img">
        <img src="../../assets/image/loading.png" alt="">
      </div>
      <div class="text_cont">正在加载中...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  props: ['isShow'],
  methods: {}
}

</script>
<style lang='less'>
  .widget_loading {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .8);
    color: #85e9d9;
    z-index: 9;
    .loading_cont {
      width: 200px;
      height: 100px;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      .loading_img {
        height: 70px;
        text-align: center;
        img {
          width: 50x;
          height: 50px;
          animation: loading 2s linear infinite;
        }
      }
      .text_cont {
        color: #fff;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
