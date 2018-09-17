<template>
<div class="case">
 <h2 class="case-title">{{data.title}}</h2>
  <div class="case-list">
    <div class="caseNum">
      <div class="caseNum-name">{{data.dataList[0].name}}:</div>
      <div class="caseNum-number"><span>{{data.dataList[0].value}}</span> {{data.dataList[0].unit}} </div>
    </div>
    <div class="caseNum">
      <div class="caseNum-name">{{data.dataList[1].name}}:</div>
      <div class="caseNum-number"><span>{{data.dataList[1].value}}</span> {{data.dataList[1].unit}} </div>
    </div>
    <div class="number">
      <div class="number-name">{{data.dataList[2].name}}:</div>
      <div class="number-num"><span>{{data.dataList[2].value}}</span>{{data.dataList[2].unit}}</div>
    </div>
  </div>
  <div class="case-list">
    <div class="caseNum">
      <div class="caseNum-name">{{data.dataList[3].name}}:</div>
      <div class="caseNum-number"><span>{{data.dataList[3].value}}</span> {{data.dataList[3].unit}} </div>
    </div>
    <div class="caseNum">
      <div class="caseNum-name">{{data.dataList[4].name}}:</div>
      <div class="caseNum-number"><span>{{data.dataList[4].value}}</span> {{data.dataList[4].unit}} </div>
    </div>
    <div class="caseNum">
      <div class="caseNum-name">{{data.dataList[5].name}}:</div>
      <div class="caseNum-number"><span :style="{color : '' + data.dataList[5].color}">{{data.dataList[5].value}}</span> {{data.dataList[5].unit}} </div>
    </div>
    <div class="number">
      <div class="number-name">{{data.dataList[6].name}}:</div>
      <div class="number-num"><span :style="{color : '' + data.dataList[6].color}">{{data.dataList[6].value}}</span>{{data.dataList[6].unit}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['data', 'index', 'type']
}
</script>

<style scoped>
  span{display: inline-block;margin-right: 15px;margin-left: 15px}
  .case{margin-left: 5%;font-size: 14px}
  .case-title{height: 30px;font-size:16px;padding-left:20px;margin-left:-4%;line-height: 40px;color:#fff;background: url(../../../assets/image/drip.png) no-repeat 0 12px;}
  .case-list{margin-left: 5%;margin-top: 4%;color:#fff}
  .case-list span{font-size: 14px}
  .case-list .caseNum{display: flex;margin-bottom: 5%}
  .caseNum-number span,.number-num span{color:#11f3f4 }
  .case-list .caseNum .caseNum-number{flex: 1;text-align: right;margin-right:15%;color: #ffffff}
  .number{margin-right: 15%;display: flex;margin-bottom: 5%}
  .number .number-num{text-align: right;}
.number .number-num span{font-size: 8px;}
  .number .number-name{flex: 1;text-align: right;}
  @media screen and (min-height: 980px) {
    .case-list{line-height: 27px}
  }
  @media screen and (min-width: 1370px) {
    .case{font-size: 17px}
    .case-list span{font-size: 20px}
    .number .number-num span{font-size: 18px;}
    .case-list .caseNum .caseNum-number{font-size: 20px}
    .case-list .caseNum{margin-bottom: 5%}
    .number .number-num{font-size: 20px;}
    .number .number-name{font-size: 20px;}
    .caseNum-name{font-size: 20px;}
  }
  @media screen and (min-width: 1930px) {
    .case{font-size: 19px}
    .case-list span{font-size: 19px}
    .number .number-num span{font-size: 18px;}
  }
</style>
