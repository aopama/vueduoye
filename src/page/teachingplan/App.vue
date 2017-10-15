<template>
  <div id="app">
    <cHead :name="name" left="true">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
    </cHead>
    <div class="main">
      <childmsg :havechild="ischild"></childmsg>
      <p class="choice_tit">孩子对学习英语的兴趣度</p>
      <div class="choice_con">
        <inpgroup content="非常有兴趣" engcon="more" name="interest" istrue="true"></inpgroup>
        <inpgroup content="有兴趣" engcon="have" name="interest" istrue="true"></inpgroup>
        <inpgroup content="一般" engcon="general" name="interest"></inpgroup>
        <inpgroup content="没兴趣" engcon="without" name="interest"></inpgroup>
      </div>
      <p class="choice_tit">目前孩子的英语水平</p>
      <div class="choice_con">
        <inpgroup content="能流利交流" engcon="Fluent" name="basis" istrue="true"></inpgroup>
        <inpgroup content="能用完整句子" engcon="simple" name="basis" istrue="true"></inpgroup>
        <inpgroup content="能说简单单词" engcon="word" name="basis"></inpgroup>
        <inpgroup content="没学过英语" engcon="groundless" name="basis"></inpgroup>
      </div>
      <p class="choice_tit">希望学习英语达到何种目的</p>
      <div class="choice_con">
        <inpgroup content="培养国际化素质" engcon="quality" name="purpose" istrue="true"></inpgroup>
        <inpgroup content="提高英语交流能力" engcon="ability" name="purpose" istrue="true"></inpgroup>
        <inpgroup content="为出国留学做准备" engcon="abroad" name="purpose"></inpgroup>
        <inpgroup content="学习科普知识" engcon="kepu" name="purpose"></inpgroup>
      </div>
      <div class="interactionbtn" @click="yuyue">
        <button>生成教学方案</button>
      </div>
    </div>
  </div>
</template>

<script>
import cHead from '@/components/header';
import inpgroup from '@/components/inpgroup';
import childmsg from '@/components/childmsg';
export default {
  name: 'app',
  data () {
    return {
      name:'生成教学方案',
      ischild:true
    }
  },
  methods: {
    yuyue () {
      // console.log(this.isline)
    },
    back () {
      history.go(-1);
    }
  },
  components: {
    inpgroup, childmsg, cHead
  }
}
</script>

<style>

.bannner img{width: 100%;height: auto;}
.main{padding:0.26667rem;margin-top: 1.2rem;}
.infoFill{margin-top: 0.266667rem;}
.infoFill li>.input_group i.xiala{position: absolute;right: 0.24rem;top: 50%;transform:translateY(-50%);color: #808080;}

.choice_tit{font-size:0.37333rem;color: #202020;padding-left:0.28rem;line-height:1.173333rem;}
.choice_con{padding:0.26667rem;overflow: hidden;background:#f1faff;}
.choice_con .radio_group{margin-top:0.36rem;width: 49.999%;}

</style>
