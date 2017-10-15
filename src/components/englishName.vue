<template>
  <div class="englishName">
    <div class="zhezhao" @click="toggle"></div>
    <div class="ContentEnglishName">
      <div class="englishNameNav">
        <ul class="englishNameNavList">
          <li :class="{'active':show=='1'}" @click="dianji(1)">男孩</li>
          <li :class="{'active':show=='2'}" @click="dianji(2)">女孩</li>
        </ul>
        <i class="iconfont icon-weibiaoti101" @click="toggle"></i>
      </div>
      <div class="EnglishNameSex">
        <ul class="EnglishGirl" v-if="show==1">
          <li v-for="item in childSex.boy" v-text="item" @click="name(item)"></li>
        </ul>
        <ul class="EnglishBoy" v-if="show==2">
          <li v-for="item in childSex.girl" v-text="item"  @click="name(item)"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [''],
    data () {
      return {
        childSex: {
          boy: ['Andrew 安德鲁', 'Anthony 安东尼', 'Christopher 克里斯托弗', 'Daniel 丹尼尔', 'Ethan 伊桑', 'Jacob 雅各布', 'Joshua 乔舒亚', 'Matthew 马修', 'Michael 迈克尔', 'William 威廉'],
          girl: ['Emma 爱玛', 'Sophia 索菲亚', 'Madison 麦迪森', 'Isabella 伊莎贝拉', 'Olivia 奥利维娅', 'Ava 爱娃', 'Madeline 麦德琳', 'Addison 艾迪森', 'Hailey 海莉', 'Lily 莉莉']
        },
        show: 1
      }
    },
    methods: {
      dianji (i) {
        if(i!=this.show){
          this.show = i;
        }
      },
      name (name) {
        let childName = name.split(' ')[0];
        this.$emit('childNameb', childName);
        this.$emit('toggle', false)
      },
      toggle () {
        this.$emit('toggle', false)
      }
    }
  }
</script>

<style>
  .englishName{position:fixed;top:0;left:0;width:100%;height:100%;z-index: 666;}
  .englishName .zhezhao{width:100%;height: 100%;background: #000000;opacity: .5;}

  .englishName .ContentEnglishName{max-width:650px;max-height:510px;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;width:8.6rem;height:6.66rem;background:#ffffff;border-radius:.3rem;}
  .englishName .ContentEnglishName .englishNameNav{position:relative;}
  .englishName .ContentEnglishName .englishNameNav .englishNameNavList{width:2.24rem;margin:auto;margin-top:.293rem;border:1px solid #008bd9;overflow: hidden;}
  .englishName .ContentEnglishName .englishNameNav .englishNameNavList li{width:49.9999999%;padding:.15rem 0;float:left;font-size:.32rem;text-align:center;color:#008bd9;}
  .englishName .ContentEnglishName .englishNameNav .englishNameNavList li.active{background:#008bd9;color:#ffffff;}

  .englishName .ContentEnglishName .englishNameNav .iconfont{position:absolute;top:0px;right:10px;font-size:.266rem;}

  .englishName .ContentEnglishName .EnglishNameSex{height:5.33rem;max-height: 400px;overflow-x: hidden;}
  .englishName .ContentEnglishName .EnglishNameSex ul{}
  .englishName .ContentEnglishName .EnglishNameSex ul li{color:#000000;font-size:.346rem;text-align:center;border-bottom:1px solid #eaeaea;padding:.266rem 0;}
</style>
