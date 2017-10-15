<template>
  <div>
    <div class="headportrait" v-if="havechild">
      <span>孩子头像</span>
      <!--<i class="iconfont icon-youjiantou"></i>-->
      <img :src="sex==1?'static/img/toux.png':'static/img/child_2.png'">
    </div>
    <ul class="infoFill" v-if="havechild">
      <li class="mg0">
        <span>孩子姓名</span>
        <div class="input_group">
          <input id="c_childName" type="text" placeholder="请填写孩子姓名" />
        </div>
      </li>
      <li>
        <span>英文名</span>
        <div class="input_group">
          <input id="c_childEnglishName" type="text" :value="childNamea" placeholder="请选择或输入孩子英文名"/>
          <span class="Engname" @click="toggle">常用英文名</span>
        </div>
      </li>
      <li>
        <span>孩子生日</span>
        <div class="input_group">
          <input id="c_childBrithday" type="date" name="" :value="date" ref="childSr">
          <!-- <i class="xiala iconfont icon-xiala"></i> -->
        </div>
      </li>
    </ul>
    <div class="choice_sex" v-if="havechild">
      <span>性别</span>
      <div class="input_group sex_group" id="c_childSex">
        <span class="radio_group">
          <input type="radio" name="sex" id="nan1" v-model="sex" value="1"/>
          <label for="nan1">男</label>
        </span>
        <span class="radio_group">
          <input type="radio" name="sex" id="nv1" v-model="sex" value="2" />
          <label for="nv1">女</label>
        </span>
      </div>
    </div>
    <ul class="infoFill" v-if="!havechild" :class="{'mg0':!havechild}">
      <li class="mg0">
        <span>选择孩子</span>
        <div class="input_group">
          <select name="" id=""></select>
          <!-- <i class="xiala iconfont icon-xiala"></i> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'

  export default {
    name: 'childmsg',
    props: ['childNamea', 'havechild', 'csex'],
    data () {
      return {
        sex:1,
        date: ''
      }
    },
    created () {
      this.sex = this.csex||1;
      if(!this.d){
        this.childBirthday();
      }
    },
    computed: {
      d () {
        return this.$parent.date;
      }
    },
    watch: {
      d (n, v) {
        if(n){
          this.date = n;
        }
      }
    },
    mounted () {
      this.$refs.childSr.onchange = function(){
        var old = new Date();
        old.setFullYear(old.getFullYear()-3);
        var newval = new Date(this.value);
        if(newval-old>0){
          Toast('请填写孩子出生日期,且不能小于3岁和大于30岁')
          this.value = old.getFullYear()+'-'+c_mobile.num((old.getMonth()+1))+'-'+c_mobile.num(old.getDate());
        }else if(newval-old<-(946080000*1000)){
          Toast('请填写孩子出生日期,且不能小于3岁和大于30岁')
          this.value = old.getFullYear()+'-'+c_mobile.num((old.getMonth()+1))+'-'+c_mobile.num(old.getDate());
        }
      }
    },
    methods: {
      childBirthday () {
        let date = new Date();
        date.setFullYear(date.getFullYear()-3);
        this.date = date.getFullYear()+'-'+c_mobile.num((date.getMonth()+1))+'-'+c_mobile.num(date.getDate());
      },
      toggle () {
        this.$emit('toggle', true)
      }
    }
  }
</script>
