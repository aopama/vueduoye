<template>
  <div class="formulate">
    <cHead :name="name" left="true" right="true">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back"></i>
      <a slot="headerRight" class="c-white" href="javascript:;" @click="fenke" >完成</a>
    </cHead>
    <div class="appContent">
      <div class="mianbaoxie">
        <button class="zhouBtn prevZhou" :class="{'active':xbiao>0}" @click="prevornext(false)">上周</button>
        <div class="mianbaoxienav">
            <span :class="{'active':xbiao==0}" @click="getTime(0)">1</span>
            <em></em>
            <span :class="{'active':xbiao==1}" @click="getTime(1)">2</span>
            <em></em>
            <span :class="{'active':xbiao==2}" @click="getTime(2)">3</span>
            <em></em>
            <span :class="{'active':xbiao==3}" @click="getTime(3)">4</span>
        </div>
        <button class="zhouBtn nextZhou" :class="{'active':xbiao<3}"  @click="prevornext(true)">下周</button>
      </div>
      <div class="selectBox">
        <ul class="selectBoxWeek">
          <li><p>日期</p><p>时间</p></li>
          <li v-for="item in week"><p>{{item.week}}</p><span>{{item.data}}</span></li>
        </ul>
        <div class="selectContent">
          <ul class="selectContentDate">
            <li v-for="item in timelist">{{item}}</li>
          </ul>
          <ul v-for="(item,index) in week" class="selectContentItem">
            <li v-for="(timeitem,indexA) in timelist" :class="sClass(item.time+' '+timeitem)" :time="item.time+' '+timeitem" :week="item.week" :data="item.data" @click="clickT(item.time+' '+timeitem)"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cHead from '@/components/header'
  import { Toast, Indicator } from 'mint-ui'
  import { set_class_play_new, set_time, un_time, fenke} from '@/api/api.js'

  export default {
    name: '',
    props: [],
    data () {
      return {
        user:{},
        name: '制定上课计划',
        xbiao:null ,
        dataTime: null,
        week:[],
        timelist:['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00' ,'17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
        forpd:[],
        success: false
      }
    },
    created () {
      this.user = JSON.parse(localStorage.user).data;
      this.getTime(0);
    },
    methods: {
      back () {
        history.go(-1)
      },
      sClass (n,b) {
        if(this.forpd.length==0){
          return {'on000':true}
        };
        const pd = res => {
          var O = {};
          if(res.ismy==1){
            O['on01']=true;
            return O;
          }else if(res.on==1){
            if(res.num>0){
              O['on11']=true;
              O['bg-white']=true;
              return O;
            }else{
              O['on01']=true;
            }
            return O;
          }else {
            return {'on000':true}
          }
        }
        let now = n;
        let data = this.forpd;
        var boo = null;
        for(let i=0;i<data.length;i++){
          if(data[i].date==now){
            boo = pd(data[i]);
            break;
          }else {
            boo = 0;
          }
        }
        if(boo==0){
          return {'bg-white':true};
        }else{
          return boo;
        }
      },
      getTime (n) {
        if(n==this.xbiao){
          return ;
        }
        var weekN = ['日', '一', '二', '三', '四', '五', '六'];
        const g = (d) => {
          return {
            week: weekN[d.getDay()],
            data: c_mobile.num((d.getMonth()+1))+'-'+ c_mobile.num(d.getDate()),
            time: d.getFullYear()+'-'+c_mobile.num((d.getMonth()+1))+'-'+ c_mobile.num(d.getDate())
          }
        }
        let weekDate = [];
        let newTime = new Date();
        let day = newTime.getDay();
        newTime.setDate((newTime.getDate()+(n*7))-day);
        for(let i=0;i<=6;i++){
          newTime.setDate(newTime.getDate()+1);
          weekDate.push(g(newTime))
        }
        this.week = weekDate;
        //请求数据
        this.xbiao = n;
        this.getData(weekDate[0].time, n);
      },
      prevornext (t) {
        //true下周  false上周
        var num = this.xbiao;
        if(t){
          if(this.xbiao>=3) return ;
          num++
        }else{
          if(this.xbiao<=0) return ;
          num--;
        }
        this.getTime(num);
      },
      getData (time, n) {
        //缓存数据
        if(dataCache.formulate['data'+n]){
          this.forpd = dataCache.formulate['data'+n]['0'];
          this.xbiao = n;
          return ;
        }
        Indicator.open();
        set_class_play_new({
          time: time,
          cid: l_search.cid,
          bigtype: l_search.bigtype,
          cklogin: this.user.token
        }).then(res => {
          Indicator.close();
          this.xbiao = n;
          var result = res.data;
          dataCache.formulate['data'+n] = result;
          this.forpd = dataCache.formulate['data'+n]['0'];
        }, () => {
          this.xbiao = n-1;
          Indicator.close();
          Toast('数据请求失败,请检查网络是否正常')
        })
      },
      clickT (t) {
        let data = this.forpd;
        var oneitem = false;  //flase为可以选择  true为取消选择
        var nnn = 0;
        for(let i=0;i<data.length;i++){
          if(data[i].date==t){
            nnn = i;
            oneitem = data[i];
            break;
          }
        }
        if(oneitem) {
          if(oneitem.on==1){
            if(oneitem.num>0){
              Indicator.open();
              un_time({time: t, cid: l_search.cid, bigtype: l_search.bigtype, cklogin: this.user.token}).then( res => {
                var result = res.data;
                if(result.state==1){
                  this.forpd.splice(nnn,1);
                  dataCache.formulate['data'+this.xbiao][0] = this.forpd;
                }
                Indicator.close();
              }, () => {
                Toast('系统繁忙')
                Indicator.close();
              });
            }
          }
        }else {
          Indicator.open();
          set_time({time: t, cid: l_search.cid, bigtype: l_search.bigtype, cklogin: this.user.token}).then( res => {
            var result = res.data;
            if(result.state==1){
              this.forpd.push({
                date:t,
                ismy:0,
                on:1,
                num:1
              })
              dataCache.formulate['data'+this.xbiao][0] = this.forpd;
              Indicator.close();
            }
          }, () => {
            Toast('系统繁忙')
            Indicator.close();
          })
          this.success = true;
        }
      },
      fenke () {
        if(!this.success) {
          Toast('请制定上课计划');
          return ;
        }
        Indicator.open();
        fenke({cid: l_search.cid, bigtype: l_search.bigtype, cklogin: this.user.token}).then( res => {
          Indicator.close();
          let result = res.data;
          if(result.state==1){
            setTimeout(function(){
              location.assign('syllabus.html');
            },2000)
          }
          Toast(result.message)
        }, () => {
          Indicator.close();
        })
      }
    },
    components: {
      cHead
    }
  }
</script>

<style>
  html,body{background:#f0f0f0;}
  .mianbaoxie{padding:.36rem 1.088rem;background:#ffffff;display: flex;}
  .mianbaoxie .zhouBtn{font-size:.346rem;border-radius:.1rem;background:#ffffff;color:#808080;border:1px solid #808080;padding:.1rem .266rem;}
  .mianbaoxie .zhouBtn.active{color:#008bd9;border:1px solid #008bd9;}
  .mianbaoxie .mianbaoxienav{flex:1;display: flex;justify-content: center;align-items: center;}
  .mianbaoxie .mianbaoxienav span,.mianbaoxie .mianbaoxienav em{display: block;}
  .mianbaoxie .mianbaoxienav span{width:.4rem;height:.4rem;font-size:.266rem;text-align:center;line-height:.4rem;border-radius:100%;background:#eaeaea;color:#a2a2a2;}
  .mianbaoxie .mianbaoxienav span.active{background:#7acfff;color:#ffffff;}
  .mianbaoxie .mianbaoxienav em{width:0.213rem;height:0.08rem;background:#eaeaea;border-radius:.1rem;margin:0 .066rem;}

  .selectBox{border-top:1px solid #eaeaea;border-right:1px solid #eaeaea;}
  .selectBox .selectBoxWeek{overflow: hidden;}
  .selectBox .selectBoxWeek li{position:relative;width:12.499%;height:.777rem;float:left;font-size:.266rem;text-align: center;border-bottom:1px solid #eaeaea;border-left:1px solid #eaeaea;background:#f0faff;}
  .selectBox .selectBoxWeek li p{font-weight: bold;margin-top: .05rem;}
  .selectBox .selectBoxWeek li span{font-size:.24rem;color:#8e8f90;}
  .selectBox .selectBoxWeek li:first-child p{position:absolute;}
  .selectBox .selectBoxWeek li:first-child p:first-child{top:0;right:0;margin-top:0;}
  .selectBox .selectBoxWeek li:first-child p:last-child{bottom:0;left:0;}

  .selectBox .selectContent{display: flex;}
  .selectBox .selectContent ul{width:12.499%;background:#ffffff;}
  .selectBox .selectContent .selectContentDate{background:#f0faff;}
  .selectBox .selectContent .selectContentDate li{text-align:center;font-size:.24rem;}

  .selectBox .selectContent ul li{position:relative;border-bottom:1px solid #eaeaea;border-left:1px solid #eaeaea;height:.653rem;line-height:.653rem;}
  .selectBox .selectContent ul.selectContentItem li{background:#f5f5f5;}
  .selectBox .selectContent ul.selectContentItem li.on11:after,.selectBox .selectContent ul.selectContentItem li.on01:after{content:"";position:absolute;z-index:1;top:0;left:0;right:0;bottom:0;margin:auto;display:block;width:.4rem;height:.4rem;background:#008bd9;border-radius:100%;}
  .selectBox .selectContent ul.selectContentItem li.on11:before,.selectBox .selectContent ul.selectContentItem li.on01:before{content:"";position:absolute;z-index:2;top:-.05rem;left:0;right:0;bottom:0;margin:auto;display:block;width:.2rem;height:.1rem;border:1px solid #ffffff;border-top:0;border-right:0;transform: rotate(-45deg)}

  .selectBox .selectContent ul.selectContentItem li.on01{background:#f5f5f5;}
  .selectBox .selectContent ul.selectContentItem li.on000{background:#f5f5f5;}
</style>
