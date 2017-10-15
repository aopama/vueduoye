<template>
  <section class="input-item">
    <div class="icon">
      <i class="iconfont" :class="icon"></i>
    </div>
    <slot name="input"></slot>
  </section>
</template>

<script>
  export default {
    props:['icon']
  }
</script>

<style>
  .input-item{overflow:hidden;margin-top:.266rem;display:-webkit-flex;display:flex;align-items:center;display:-webkit-box;display:box;-webkit-box-align: center;position:relative;border:1px solid #bebebe;border-radius:.1rem;padding-left:.906rem;}
  .input-item.input-item-active{border:1px solid #008bd9;}
  .input-item .icon{position:absolute;width:.906rem;height:1.15rem;top:0;left:0;text-align:center;line-height:1.15rem;color:#717171;}
  .input-item .icon .iconfont{font-size:.4rem;}
  .input-item .input{width:8rem;border:0px;font-size:.4rem;height: 1.2rem;margin:1px;}
</style>
