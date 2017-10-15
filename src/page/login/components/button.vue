<template>
  <button class="btn" @click="click">{{name}}</button>
</template>

<script>
export default {
  props: ['name'],
  data () {
    return {

    }
  },
  methods: {
    click () {
      this.$emit('c')
    }
  }
}
</script>

<style>
  .btn{width:100%;height:1.2rem;background:#008bd9;font-size:.426rem;border-radius:.1rem;border:0;color:#ffffff;}
</style>
