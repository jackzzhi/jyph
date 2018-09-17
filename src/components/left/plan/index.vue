<template>
  <div class="plan">
    <div class="planTime">
      <div class="date">{{this.t}} <span class="s">{{this.T}}</span></div>
      <div class="day">任务计划 <span :style="{ color : '' + initDataTwo[0]['75'].dataList[0].color }">{{initDataTwo[0]['75'].dataList[0].value}}</span>个工作日</div>
    </div>
    <div class="planSub">
      <div class="planName">当前第 <span :style="{ color : '' + initDataTwo[0]['75'].dataList[1].color }">{{initDataTwo[0]['75'].dataList[1].value}}</span>个工作日</div>

      <div class="proGress">
        <div class="planNum">已过&nbsp;</div>
        <div id="box">
        <div id="bar"></div> <span class="n">&nbsp;{{initDataTwo[0]['75'].dataList[2].value}}{{initDataTwo[0]['75'].dataList[2].unit}}</span>
      </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      T: '',
      t: '',
      total: '',
      curN: '',
      year: '',
      month: '',
      day: ''
    }
  },
  computed: {
    ...mapGetters(['initDataTwo'])
  },
  mounted () {
    setInterval(this.Time, 1000)
    this.show()
  },
  methods: {
    // 获取系统时间
    Time () {
      var today = new Date()
      var year = today.getFullYear()
      var month = today.getMonth() + 1
      var day = today.getDate()
      var h = today.getHours()
      var m = today.getMinutes()
      var s = today.getSeconds()
      month = this.checkTime(month)
      day = this.checkTime(day)
      h = this.checkTime(h)
      m = this.checkTime(m)
      s = this.checkTime(s)
      this.t = year + '.' + month + '.' + day + ''
      this.T = h + ':' + m + ':' + s
      let qing = h + '' + m + '' + s
      if (qing === '073000' || qing === '200000' || qing === '030000') {
        window.location.reload(true)
      }
    },
    // 时间补零
    checkTime (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    // 任务进度
    show () {
      if (this.initDataTwo[0]['75'].dataList[1].value === this.initDataTwo[0]['75'].dataList[0].value) {
        $('.n').css('right', '5%')
      }
      var o = document.getElementById('bar')
      o.style.width = ((this.initDataTwo[0]['75'].dataList[1].value / this.initDataTwo[0]['75'].dataList[0].value) * 176) + 'px' // 200是外框的宽度
    }
  }
}
</script>

<style scoped>

.plan{height: 100%;position: relative;background: url("../img/border.png") no-repeat;background-size: 100% 100%;color: #fff}
.planTime{width: 100%;height:auto;position: absolute;top:15%;}
.planTime .date{float: left;font-size:20px;color: #ffe100}
.planTime .date span{color: #ffe100}
.s{font-size:17px;}
.planTime .day{float: right;margin-right: 10%;font-size: 14px;}
.planSub{width: 100%;position: absolute;top:55%;}
.planSub .planName{float: left;font-size: 13px;}
.planSub .proGress{float: right;margin-right: 3%}
.planNum{float: left;font-size: 13px;}
.planSub #box span{position:absolute;right:auto;color: #fff;font-size: 8px;line-height: 15px}
#box {float:left;width:176px;height:12px;margin-top: 3px;background:#005965; border-radius: 50px/ 50px;}
#bar {float:left;width:0px;height:12px;border:0px;border-radius: 50px/ 50px;background: -webkit-linear-gradient(right,#aa6620,#ffe100);}
@media screen and (min-width: 1370px) {
  #box{height:16px;}
  #bar{height:16px;}
  .planSub #box span{font-size: 10px;line-height: 16px}
  .planSub .planName{font-size: 16px;}
  .planNum{font-size: 16px;}
  .planTime .day{font-size: 18px;}
  .s{font-size:20px;}
  .planTime .date{font-size:23px}
}
@media screen and (min-width: 1930px) {
  .planTime{width: 100%;height:auto;position: absolute;top:20%;}
  .planSub{width: 100%;position: absolute;top:65%;}
}
</style>
