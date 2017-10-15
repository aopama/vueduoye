<template>
  <div class="cm-layer-shade">
    <div class="cm-layer-zhezhao" @click="click"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: '',
    props: [],
    data () {
      return {}
    },
    methods: {
      click () {
        this.$emit('toggle',false);
      }
    }
  }
</script>

<style>
  .cm-layer-shade{
    position:fixed;
    top:0;left:0;z-index:999;
    width:100%;height:100%;
  }
  .cm-layer-shade .cm-layer-zhezhao{
    width:100%;height:100%;
    background:rgba(000,000,000,.5);
  }
</style>
