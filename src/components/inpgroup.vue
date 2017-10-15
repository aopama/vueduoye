<template>
  <span class="radio_group" :class="{'mg0':istrue}">
    <input type="radio" :name="name" :id="engcon" :checked="check" :value="v"/>
    <label :for="engcon">{{content}}</label>
  </span>
</template>

<script>
  export default {
    name: 'inpgroup',
    props: ['content','engcon','name','istrue','check','v'],
    data () {
      return {

      }
    },
    created () {
      console.log(this.name)
    }
  }
</script>
