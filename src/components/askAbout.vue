<template>
  <div class="askAbout">
    <p class="choice_tit">接受过多久线上英语培训</p>
    <div class="choice_con" id="askAbout">
      <inpgroup v="1" content="没接受过" engcon="without" name="time" istrue="true" :check="peixun[0]==1"></inpgroup>
      <inpgroup v="2" content="一年" engcon="oneyear" name="time" istrue="true" :check="peixun[0]==2"></inpgroup>
      <inpgroup v="3" content="两年" engcon="twoyear" name="time" :check="peixun[0]==3"></inpgroup>
      <inpgroup v="4" content="两年以上" engcon="more" name="time" :check="peixun[0]==4"></inpgroup>
    </div>
    <p class="choice_tit">英语基础如何</p>
    <div class="choice_con" id="englishBase">
      <inpgroup v="1" content="无基础" engcon="groundless" name="basis" istrue="true" :check="peixun[1]==1"></inpgroup>
      <inpgroup v="2" content="能说简单单词" engcon="word" name="basis" istrue="true" :check="peixun[1]==2"></inpgroup>
      <inpgroup v="3" content="能简单交流" engcon="simple" name="basis" :check="peixun[1]==3"></inpgroup>
      <inpgroup v="4" content="能流利交流" engcon="Fluent" name="basis" :check="peixun[1]==4"></inpgroup>
    </div>
    <p class="choice_tit">孩子参与课堂学习的积极程度</p>
    <div class="choice_con" id="childJiji">
      <inpgroup v="1" content="基本不说话" engcon="quiet" name="degree" istrue="true" :check="peixun[2]==1"></inpgroup>
      <inpgroup v="2" content="偶尔说话" engcon="occasionally" name="degree" istrue="true" :check="peixun[2]==2"></inpgroup>
      <inpgroup v="3" content="积极互动" engcon="active" name="degree" :check="peixun[2]==3"></inpgroup>
      <inpgroup v="4" content="没上过课" engcon="noclass" name="degree" :check="peixun[2]==4"></inpgroup>
    </div>
  </div>
</template>

<script>
  import inpgroup from '@/components/inpgroup';

  export default {
    props: ['peixun'],
    data () {
      return {}
    },
    components: {
      inpgroup
    }
  }
</script>

<style>
  .askAbout .choice_tit{font-size:0.37333rem;color: #202020;padding-left:0.28rem;line-height:1.173333rem;}
  .askAbout .choice_con{padding:0.24rem 0.32rem;overflow: hidden;background:#f1faff;}
  .askAbout .choice_con .radio_group{margin-top:0.36rem;width: 49.999%;}
</style>
