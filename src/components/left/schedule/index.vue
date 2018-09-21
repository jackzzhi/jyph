<template>
    <div class="sched">
      <h2 class="schName">任务跟踪进度</h2>
      <div class="yearmoney">
        <div class="yearName">{{initDataTwo[0]['76'].title}}</div>
        <div class="ico"><img src="../img/任务跟踪进度-色块1.png" alt=""></div>
        <div class="yearList">
          <div class="reality">{{initDataTwo[0]['76'].dataList[1].name}} &nbsp;</div>
          <div class="target">{{initDataTwo[0]['76'].dataList[0].name}} &nbsp;</div>
        </div>
        <div class="object">
          <div id="one">
            <div id="one1"></div>
            <span class="b" style="right:auto;">&nbsp;&nbsp;{{initDataTwo[0]['76'].dataList[1].value}}{{initDataTwo[0]['76'].dataList[1].unit}}</span>
          </div>
          <div id="one">
            <div id="one2"></div>
            <span>&nbsp;&nbsp;{{initDataTwo[0]['76'].dataList[0].value}}{{initDataTwo[0]['76'].dataList[0].unit}}</span>
          </div>
        </div>
        <div class="pie">
          <span>{{initDataTwo[0]['77'].title}}</span>
          <pie :id="1" :val="initDataTwo[0]['77'].dataList[0].series.data[0].value"></pie>

        </div>
      </div>
      <div class="yearmoney">
        <div class="yearName">{{initDataTwo[0]['78'].title}}</div>
        <div class="ico"><img src="../img/任务跟踪进度-色块1.png" alt=""></div>
        <div class="yearList">
          <div class="reality">{{initDataTwo[0]['78'].dataList[1].name}} &nbsp;
            </div>
          <div class="target">{{initDataTwo[0]['78'].dataList[0].name}} &nbsp;
          </div>
        </div>
        <div class="object">
          <div id="two">
            <div id="two1"></div>
            <span class="c" style="right: auto">&nbsp;&nbsp;{{initDataTwo[0]['78'].dataList[1].value}}{{initDataTwo[0]['78'].dataList[1].unit}}</span>
          </div>
          <div id="two">
            <div id="two2"></div>
            <span>&nbsp;&nbsp;{{initDataTwo[0]['78'].dataList[0].value}}{{initDataTwo[0]['78'].dataList[0].unit}}</span>
          </div>
        </div>
        <div class="pie"> <span>{{initDataTwo[0]['79'].title}}</span>
          <pie :id="2" :val="initDataTwo[0]['79'].dataList[0].series.data[0].value"></pie>
        </div>
      </div>
      <div class="mouth">
        <div class="mouthName">{{initDataTwo[0]['80'].title}}</div>
        <div class="mouthNum">{{initDataTwo[0]['80'].dataList[0].value}}{{initDataTwo[0]['80'].dataList[0].unit}}</div>
      </div>
      <div class="yearmoney" style="border-bottom: 0px">
        <div class="yearName cName">{{initDataTwo[0]['81'].title}}&nbsp;</div>
        <div class="ico"><img src="../img/任务跟踪进度-色块1.png" alt=""></div>
        <div class="yearList">
          <div class="reality">{{initDataTwo[0]['81'].dataList[0].name}} &nbsp;
          </div>
          <div class="target">{{initDataTwo[0]['81'].dataList[1].name}} &nbsp;
          </div>
        </div>
        <div class="object">
          <div id="three">
            <div id="three1"></div>
            <span class="d" id="threes" style="right:auto;">&nbsp;&nbsp;{{initDataTwo[0]['81'].dataList[0].value}}{{initDataTwo[0]['81'].dataList[0].unit}}</span>
          </div>
          <div id="three">
            <div id="three2"></div>
            <span>&nbsp;&nbsp;{{initDataTwo[0]['81'].dataList[1].value}}{{initDataTwo[0]['81'].dataList[1].unit}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Pie from './pie'
import { mapGetters } from 'vuex'
export default {
  components: { Pie },
  data () {
    return {
      t: ''
    }
  },
  computed: {
    ...mapGetters(['initDataTwo'])
  },
  mounted () {
    // 本年放款
    this.one1()
    this.one2()
    // 本月放款
    this.two1()
    this.two2()
    // c-M1
    this.three1()
    this.three2()
  },
  methods: {
    // 本年放款
    one1 () {
      var a = this.initDataTwo[0]['76'].dataList[0].value
      var b = this.initDataTwo[0]['76'].dataList[1].value
      let d = b.replace(/,/g, '')
      let c = a.replace(/,/g, '')
      if (d * 1 === c * 1) {
        $('.b').css('right', '29%')
      }
      if (d * 1 > c * 1) {
        d = c
        $('.b').css('right', '29%')
      }
      var p = document.getElementById('one').offsetWidth
      var o = document.getElementById('one1')
      o.style.width = ((d / c) * p) + 'px' // p是外框的宽度
    },
    one2 () {
      let a = this.initDataTwo[0]['76'].dataList[0].value
      let c = a.replace(/,/g, '')
      var p = document.getElementById('one').offsetWidth
      var o1 = document.getElementById('one2')
      o1.style.width = ((c / c) * p) + 'px' // p是外框的宽度
    },
    // 本月放款
    two1 () {
      var p = document.getElementById('two').offsetWidth
      let a = this.initDataTwo[0]['78'].dataList[0].value
      let b = this.initDataTwo[0]['78'].dataList[1].value
      let d = b.replace(/,/g, '')
      let c = a.replace(/,/g, '')
      if (d * 1 === c * 1) {
        $('.c').css('right', '29%')
      }
      if (d * 1 > c * 1) {
        d = c
        $('.c').css('right', '29%')
      }
      var o = document.getElementById('two1')
      o.style.width = ((d / c) * p) + 'px' // p是外框的宽度
    },
    two2 () {
      let a = this.initDataTwo[0]['78'].dataList[0].value
      let c = a.replace(/,/g, '')
      var p = document.getElementById('two').offsetWidth
      var o1 = document.getElementById('two2')
      o1.style.width = ((c / c) * p) + 'px' // p是外框的宽度
    },
    // 任务进度
    three1 () {
      let a = parseInt(this.initDataTwo[0]['81'].dataList[0].value)
      let b = parseInt(this.initDataTwo[0]['81'].dataList[1].value)
      var p = document.getElementById('three').offsetWidth
      var o = document.getElementById('three1')
      if (a * 1 > b * 1) {
        a = b
        $('.d').css('right', '11%')
      }
      o.style.width = ((a / b) * p) + 'px' // p是外框的宽度
      if (a * 1 === b * 1) {
        $('.d').css('right', '11%')
      }
    },
    three2 () {
      let b = parseInt(this.initDataTwo[0]['81'].dataList[1].value)
      var p = document.getElementById('three').offsetWidth
      var o1 = document.getElementById('three2')
      o1.style.width = ((b / b) * p) + 'px' // p是外框的宽度
    }
  }
}
</script>

<style scoped>
  .object{flex: 1;margin-top: 1.6%}
  .sched{height: 100%;position: relative; color: #fff;}
  .sched .schName{font-size: 16px;padding-left: 20px;line-height: 33px;background:url("../../../assets/image/drip.png") no-repeat 0 center}
  .sched .yearmoney{display: flex;border-bottom: 1px solid #00374b}
  .ico{width: 3.5%;}
  .ico img{width: 90%;height: auto;margin-top: 30%}
  .yearList{margin-left: 1%;margin-top:1%;font-size: 12px;line-height: 18px}
  .yearList .target,.reality{display: flex}
  .yearList .target span{color: #09cbc5}
  .yearList .reality span{color: #09cbc5}
  .yearName{line-height:46px;margin-right: 5%;font-size: 12px}
  .cName{line-height: 42px;margin-right: 1%}
  .pie{height: 45px;display: flex;margin-right: 1%;margin-left: 2%}
  .pie span{line-height: 40px;font-size: 12px}
  .sched .mouth{padding:0.5% 0;display: flex;border-bottom: 1px solid #00374b;font-size: 12px}
  .sched .mouth .mouthNum{margin-left: 8%;line-height: 25px}
  .sched .mouth .mouthName{line-height: 25px}
  #one,#two,#three{width:85%;height:15px;border-radius: 50px/ 50px;}
  #one span,#two span,#three span{position:absolute;right:29%;line-height:14px;color: #fff;font-size: 8px}
  #three span{position:absolute;right:11%;color: #fff;font-size: 8px}
   /*#threes{position:absolute;right:auto;color: #fff;font-size: 8px}*/
  #three1,#one1,#two1 {float:left;width:0px;height:13px;border:0px;background: -webkit-linear-gradient(right,#fe240d,#f0be00);border-radius: 50px/ 50px;}
  #one1,#two1 {float:left;width:0px;height:13px;border:0px;background: -webkit-linear-gradient(right,#EAFF00,#EE1BE3);border-radius: 50px/ 50px;}
  #three2,#one2,#two2 {float:left;width:0px;height:13px;border:0px;background: -webkit-linear-gradient(right,#7BF8B5,#21AFEA);border-radius: 50px/ 50px;}

  @media screen and (min-width: 1370px) {
  #three1,#one1,#two1{height:16px;}
  #three2,#one2,#two2{height:16px;margin-top: 2px}
  .ico img{margin-top: 0}
  .yearName{font-size: 15px}
  .pie span{line-height: 45px;font-size: 15px}
  .sched .mouth{font-size: 15px}
  .yearList{font-size: 15px;line-height: 18px}
  #one span,#two span,#three span{font-size: 12px;line-height: 22px}
  #one .b,#two .c,#three .d{line-height: 17.5px}
  .object{    margin-top: 1.2%;}
  .pie{height: 55px;}
  .sched .yearmoney{margin-top:1%;}
    .sched .mouth{padding: 2% 0;}
}
  @media screen and (min-width: 1930px) {
    .sched .yearmoney{margin-top:3%;}
    .yearName{line-height: 50px}
    .cName{line-height: 52px}
    .ico img{height: 83%}
    #one .b,#two .c,#three .d{line-height: 17px}
    .sched .schName{line-height: 40px}

  }
  /*@media screen and (min-height: 788px) {*/
   /**/
  /*}*/
</style>
