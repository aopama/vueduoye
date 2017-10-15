<template>
  <header class="header">
    <div class="header-left" v-if="left">
      <slot name="headerLeft"></slot>
    </div>
    <h1 class="ft-34 ft-bold header_name">{{name}}</h1>
    <slot name="headtoplogo"></slot>
    <div class="header-right" v-if="right">
      <slot name="headerRight"></slot>
    </div>
  </header>
</template>

<script>
  export default {
    props:['name','left','right']
  }
</script>

<style>
  .header{
    position:fixed;
    top:0;
    left:0;
    width: 100%;
    height: 1.2rem;
    z-index:5;
    padding:0 .4rem;
    background: #008bd9;
    color:#ffffff;
  }
  .header .header_name{
    position:absolute;
    top:0;
    left:50%;
    transform: translateX(-50%);
    line-height: 1.2rem;
    font-family: Microsoft Yahei;
    white-space: nowrap;
  }
  .header .header-right{
    height: 100%;
    float:right;
    display:-webkit-box;
    display:box;
    display:-webkit-flex;
    display:flex;
    -webkit-box-align:center;
    align-items: center;
  }
  .header .header-left{float:left;width:1.173rem;height:1.173rem;display: -webkit-box;display: box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;}
  .header .header-left .iconfont{font-size:.6rem;}
  .header .header-right .formulate{float:right;color:#ffffff;font-size:.4rem;}
  .header .header-right a{font-size:.4rem;}
</style>
