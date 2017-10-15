<template>
  <a class="jinxuankechen-item" href="javascript:;">
    <em class="item-qianggou">抢购</em>
    <div class="jxkc-item-name">
      <em class="jxkc-item-name-box qiang">抢</em>
      <span>星球探索者系列课程包</span>
    </div>
    <section class="jxkc-item-course">
      <span class="courseshi">22课时</span>
      <ul class="countdown">
        <li class="countdown-box">00</li>
        <li class="countdown-m">:</li>
        <li class="countdown-box">06</li>
        <li class="countdown-m">:</li>
        <li class="countdown-box">49</li>
      </ul>
    </section>
    <section class="jxkc-item-money">
      <p class="text-r c-gray ft-24" style="margin-top:-.43rem;">原价<s>￥3080</s></p>
      <p class="ft-30">
        <span class="z c-blue">已有2838个人购买</span>
        <span class="y c-pink">抢购价<strong><em>￥</em><span class="ft-40">2772</span></strong></span>
        <span class="fclear show"></span>
      </p>
    </section>
  </a>
</template>

<script>
  export default {

  }
</script>

<style>
  .jinxuankechen{}
  .jinxuankechen .jinxuankechen-item{position:relative;display:block;position:relative;border-radius:.1rem;padding:.4rem;background:#ffffff;margin-bottom:.266rem;}
  .jinxuankechen .jinxuankechen-item .item-qianggou{position:absolute;top:-.093rem;right:.4rem;width:1.066rem;height:.44rem;background:#ff6e18;font-size:.293rem;color:#ffffff;text-align:center;line-height:.44rem;}
  .jinxuankechen .jinxuankechen-item .item-qianggou:after,.jinxuankechen .jinxuankechen-item .item-qianggou:before{content:"";position:absolute;width:0px;height:0px;}
  .jinxuankechen .jinxuankechen-item .item-qianggou:after{left:-.093rem;border:.046rem solid #f0f0f0;border-right:.046rem solid #cd4c00;border-bottom:.046rem solid #cd4c00;}
  .jinxuankechen .jinxuankechen-item .item-qianggou:before{right:-.092rem;border:.046rem solid #f0f0f0;border-left:.046rem solid #cd4c00;border-bottom:.046rem solid #cd4c00;}
  .jinxuankechen .jinxuankechen-item .jxkc-item-name{display:-webkit-box;display:box;-webkit-box-align:center;display:-webkit-flex;display:flex;align-items: center;margin-bottom:.133rem;}
  .jinxuankechen .jinxuankechen-item .jxkc-item-name .jxkc-item-name-box{display:block;height:.453rem;padding:0 .1rem;text-align:center;line-height:.53rem;font-size:.266rem;color:#ffffff;border-radius:.1rem;margin-right:.2rem;}
  .jinxuankechen .jinxuankechen-item .jxkc-item-name .qiang{background:#ff6e18;}
  .jinxuankechen .jinxuankechen-item .jxkc-item-name .dazhe{background:#fe2f4d;}
  .jinxuankechen .jinxuankechen-item .jxkc-item-name span{display:block;width:7rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:.453rem;color:#202020;-webkit-box-flex: 1;-webkit-flex-grow:1;}

  .jinxuankechen .jinxuankechen-item .jxkc-item-course{}
  .jinxuankechen .jinxuankechen-item .jxkc-item-course .courseshi{font-size:.4rem;color:#808080;}
  .jinxuankechen .jinxuankechen-item .jxkc-item-course .countdown{float:right;}
  .jinxuankechen .jinxuankechen-item .jxkc-item-course .countdown li{float:left;color:#202020;line-height:.533rem;}
  .jinxuankechen .jinxuankechen-item .jxkc-item-course .countdown li.countdown-box{width:.533rem;height:.533rem;background:#202020;font-size:.293rem;color:#ffffff;text-align:center;line-height:.533rem;border-radius:.1rem;}
  .jinxuankechen .jinxuankechen-item .jxkc-item-course .countdown li.countdown-m{margin:0 .1rem;}

  .jinxuankechen .jinxuankechen-item .jxkc-item-money{padding-top:.45rem;}
</style>
