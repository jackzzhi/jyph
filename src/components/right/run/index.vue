<template>
<div class="run">
  <h2 class="runName">运营情况</h2>
  <div class="banner" >
    <div class="banner-s" style="width: 100%;height: 100%">
      <div style="width: 100%;height: 100%;display: flex">
        <div class="list"  @click="change1('106')">
          <div class="Gauge">
            <gauge :id="'90'" :toggleNum="toggleNum" :val="initDataTwo[0]['90'].dataList[0].value" :max="initDataTwo[0]['90'].dataList[0].max"></gauge>
          </div>
          <div class="list-zl">
            <div class="num1">{{initDataTwo[0]['90'].dataList[0].value}}</div>
            <div class="num2">{{initDataTwo[0]['90'].dataList[0].ratio}}</div>
            <div class="num3">{{initDataTwo[0]['90'].dataList[0].name}}</div>
          </div>
        </div>
        <div class="list"  @click="change1('102')">
          <div class="Gauge">
            <gauge :id="'91'" :toggleNum="toggleNum" :val="initDataTwo[0]['91'].dataList[0].value" :max="initDataTwo[0]['91'].dataList[0].max"></gauge>
          </div>

          <div class="list-zl">
            <div class="num1">{{initDataTwo[0]['91'].dataList[0].value}}{{initDataTwo[0]['91'].dataList[0].unit}}</div>
            <div class="num2">{{initDataTwo[0]['91'].dataList[0].ratio}}</div>
            <div class="num3">{{initDataTwo[0]['91'].dataList[0].name}}</div>
          </div>
        </div>
        <div class="list"  @click="change1('103')">
          <div class="Gauge">
            <gauge :id="'92'" :toggleNum="toggleNum" :val="initDataTwo[0]['92'].dataList[0].value" :max="initDataTwo[0]['92'].dataList[0].max"></gauge>
          </div>

          <div class="list-zl">
            <div class="num1">{{initDataTwo[0]['92'].dataList[0].value}}</div>
            <div class="num2">{{initDataTwo[0]['92'].dataList[0].ratio}}</div>
            <div class="num3">{{initDataTwo[0]['92'].dataList[0].name}}</div>
          </div>
        </div>
      </div>

    </div>
    <div class="banner-s" style="width: 100%;height: 100%">
      <div style="width: 100%;height:100%;display: flex">
        <div class="list"  @click="change1('97')">
          <div class="Gauge">
            <gauge :id="'87'" :toggleNum="toggleNum" :val="initDataTwo[0]['87'].dataList[0].value" :max="initDataTwo[0]['87'].dataList[0].max"></gauge>
          </div>

          <div class="list-zl">
            <div class="num1">{{initDataTwo[0]['87'].dataList[0].value}}{{initDataTwo[0]['87'].dataList[0].unit}}</div>
            <div class="num2">{{initDataTwo[0]['87'].dataList[0].ratio}}</div>
            <div class="num3">{{initDataTwo[0]['87'].dataList[0].name}}</div>
          </div>
        </div>
        <div class="list" @click="change1('97')">
          <div class="Gauge">
            <gauge :id="'88'" :toggleNum="toggleNum" :val="initDataTwo[0]['88'].dataList[0].value" :max="initDataTwo[0]['88'].dataList[0].max"></gauge>
          </div>

          <div class="list-zl">
            <div class="num1">{{initDataTwo[0]['88'].dataList[0].value}}{{initDataTwo[0]['88'].dataList[0].unit}}</div>
            <div class="num2">{{initDataTwo[0]['88'].dataList[0].ratio}}</div>
            <div class="num3">{{initDataTwo[0]['88'].dataList[0].name}}</div>
          </div>
        </div>
        <div class="list"  @click="change1('97')">
          <div class="Gauge">
            <gauge :id="'89'" :toggleNum="toggleNum" :val="initDataTwo[0]['89'].dataList[0].value" :max="initDataTwo[0]['89'].dataList[0].max"></gauge>
          </div>

          <div class="list-zl">
            <div class="num1">{{initDataTwo[0]['89'].dataList[0].value}}{{initDataTwo[0]['89'].dataList[0].unit}}</div>
            <div class="num2">{{initDataTwo[0]['89'].dataList[0].ratio}}</div>
            <div class="num3">{{initDataTwo[0]['89'].dataList[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="prev" class="arrow"><img src="../assets-right/left.png" alt=""></div>
    <div  id="next" class="arrow"><img src="../assets-right/right.png" alt=""></div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import utils from '@/utils'

import gauge from './gauge'
export default {
  data () {
    return {
      toggleNum: 0
    }
  },
  components: {gauge},
  computed: {
    ...mapGetters(['initDataTwo'])
  },
  methods: {
    ...mapActions(['changeDetailInfo', 'toggleLoading', 'setRequestData', 'setErrorInfo']),
    change1 (ids) {
      const _this = this
      this.toggleLoading(true)
      let data = {
        'token': 'CBCFD8AB22DD476DAAA66728EE200373',
        'itemNo': '' + ids,
        'orgCodeList': [this.initDataTwo[0]['73'].dataList[0].id]
      }
      let requestData = {
        data: data,
        params: {
          name: '',
          index: '' + ids,
          type: 'branch'
        }
      }
      this.setRequestData(requestData)
      this.$axios.post(this.$url, data).then((res) => {
        let param = {
          show: true,
          type: 'branch',
          title: res.data.data[0][ids].title + '(' + res.data.data[0][ids].dataList[0].axisY.left.unit + ')',
          titleSec: this.initDataTwo[0]['104'].dataList[0].areaName,
          data: res.data.data,
          index: '' + ids
        }
        this.changeDetailInfo(param)
        this.toggleLoading(false)
      }).catch((error) => {
        utils.errorHandler(error, _this)
      })
    }
  },
  mounted () {
    var index = $(this).index()
    var i = 0
    i = index
    var timer = setInterval(() => {
      i = i > 1 ? 0 : i
      $('.banner .banner-s').eq(i).fadeIn(500).siblings().fadeOut(500)
      i++
    }, 5000)
    $('.banner .banner-s').eq(0).show()
    $('.banner').mouseover(function () {
      $('.arrow').show()
      clearInterval(timer)
    })
    $('.banner').mouseout(function () {
      $('.arrow').hide()
      timer = setInterval(function () {
        i++
        i = i > 2 ? 0 : i
        $('.banner .banner-s').eq(i).fadeIn(500).siblings().fadeOut(500)
      }, 5000)
    })
    $('#prev img').click(function () {
      i--
      i = i < 0 ? 2 : i
      $('.banner .banner-s').eq(i).fadeIn(500).siblings().fadeOut(500)
    })
    $('#next img').click(function () {
      i++
      i = i > 2 ? 0 : i
      $('.banner .banner-s').eq(i).fadeIn(500).siblings().fadeOut(500)
    })
  }
}
</script>

<style scoped>
  .run{height: 100% ;cursor: pointer}
  .banner{height: 87%;position: relative;cursor: pointer}
  .banner .banner-s{display: none;position: absolute;top:0;}
  .list{height: 100%;position: relative}
  .list .Gauge{height: 50%;position: absolute;left: 50%;margin-left: -41%}
  .runName{height: 13%;line-height:30px;color:#fff ;padding-left: 20px;font-size: 16px; background: url(../../../assets/image/drip.png) no-repeat 2px center;}
.list-zl{
  width: 100%;
  height: 50%;
  text-align: center;
  font-size: 8px;
color: #fff;
  line-height: 30px;
position: absolute;
  top: 43%;
  /*left: 18%;*/
}
  .list{
    flex: 1;
  }
  .arrow {
    cursor: pointer;
    display: none;
    line-height: 39px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    width: 20px;
    height: 25px;
    position: absolute;
    z-index: 2;
    top: 40%;
    color: #fff;
  }
  .arrow img{
    width: 100%;
    height: 100%;
  }
  #prev {
    left: 5px;
  }
  #next {
    right: 5px;
  }
  @media screen and (min-width: 1370px) {
    .list .Gauge{height: 60%;margin-left: -30%}
    .banner{font-size: 16px}
    .list-zl{font-size: 15px}
  }
  @media screen and (min-width: 1930px) {
    .list .Gauge{height: 70%;margin-left: -26%}

  }
</style>
