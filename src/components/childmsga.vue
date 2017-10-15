<template>
  <ul class="infoFill">
    <li class="mg0">
      <span>孩子姓名</span>
      <div class="input_group">
        <input type="text" placeholder="请填写孩子姓名" />
      </div>
    </li>
    <li>
      <span>英文名</span>
      <div class="input_group">
        <input type="text" />
        <span class="Engname">常用英文名</span>
      </div>
    </li>
    <li>
      <span>孩子生日</span>
      <div class="input_group">
        <select name="" id=""></select>
        <!-- <i class="xiala iconfont icon-xiala"></i> -->
      </div>
    </li>
    <li class="sex_li">
      <span>性别</span>
      <div class="input_group sex_group">
        <span class="radio_group">
          <input type="radio" name="sex" id="nan" checked/>
          <label for="nan">男</label>
        </span>
        <span class="radio_group">
          <input type="radio" name="sex" id="nv" />
          <label for="nv">女</label>
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'childmsg',
    data () {
      return {
      }
    },
    created () {
    }
  }
</script>
