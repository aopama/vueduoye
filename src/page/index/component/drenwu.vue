<template>
  <div class="drenwu" :class="selfClass">
    <div class="drenwuName">
      <em class="drenwuLeftBox"></em>
      <h3>{{name}}</h3>
    </div>
    <div class="drenwuList">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default{
  props:['selfClass', 'name'],
  data () {
    return {

    }
  }
}
</script>

<style>
  .drenwu{}
  .drenwu .drenwuName{padding:.32rem 0;display:-webkit-box;display:box;display:-webkit-flex;display:flex;box-align:center;align-items:center;}
  .drenwu .drenwuName .drenwuLeftBox{display: block;width:.133rem;height:.34rem;margin-right:.2rem;background:#37b7ff;border-radius:.1rem;}
  .drenwu .drenwuName h3{font-size:.34rem;font-weight: bold;}
</style>
