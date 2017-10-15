<template>
  <div id="app">
    <cHead :name="name" left="true">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back"></i>
    </cHead>
    <div class="appContent">
      <div class="bannner">
        <img src="./ban.png">
      </div>
      <div class="main">
        <div class="classway">
          <div class="choiceway">
            <span class="way">上课方式</span>
            <span class="radio_group online">
              <input type="radio" name="online" id="online" value="1" v-model="isline"/>
              <label for="online">线上一对一外教</label>
            </span>
            <span class="radio_group">
              <input type="radio" name="online" id="offline" value="2" v-model="isline" disabled="true" />
              <label for="offline"><s>线下阅读中心</s></label>
            </span>
          </div>
          <ul class="infoFill">
            <li class="mg0">
              <span>课程体系</span>
              <div class="input_group">
                <select v-model="kctixi" @change="changetixi">
                  <option v-for="(item, index) in bigtype" :value="item.id">{{item.name}}</option>
                </select>
              </div>
            </li>
            <li v-if="isline=='2'">
              <span>选择城市</span>
              <div class="input_group">
                <select>
                  <option v-for="item in citylist">{{item.typename}}</option>
                </select>
              </div>
            </li>
            <li v-if="isline=='2'">
              <span>阅读馆</span>
              <div class="input_group">
                <select></select>
              </div>
            </li>
            <li>
              <span>上课日期</span>
              <div class="input_group">
                <select v-model="dateval">
                  <template v-for="item in upclassDate">
                      <option :value="item" v-text="item"></option>
                  </template>
                </select>
              </div>
            </li>
          </ul>
        </div>
        <div class="interactionbtn" @click="yuyue">
          <button :disabled="end">立即预约</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHead from '@/components/header.vue'
import { Toast, Indicator } from 'mint-ui'
import { select_bigtype, set_class_play_new, add_demo } from '@/api/api.js'

export default {
  name: 'app',
  data () {
    return {
      name: '预约体验课',
      isline:'1',
      userobj: JSON.parse(localStorage.user),
      bigtype:[],
      // citylist:[],
      kctixi:'',
      timelist:[],
      week:[],
      timelista:['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00' ,'17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
      upclassDate:[],
      dateval:'',
      end:true
    }
  },
  created () {
    this.mweek();
    this.select_bigtype();
  },
  methods: {
    mweek () {
        let nowdate = new Date();
        for(let i=0;i<=6;i++){
          nowdate.setDate(nowdate.getDate()+1);
          let time = nowdate.getFullYear()+'-'+c_mobile.num(nowdate.getMonth()+1)+'-'+c_mobile.num(nowdate.getDate());
          this.week.push(time);
        }
    },
    forE () {
      this.week.forEach((witem,windex) => {
        this.timelista.forEach((titem,tindex) =>{
            let n = (windex*26)+tindex;
            let nowdate = witem+' '+titem;
            // console.log(nowdate+':'+this.timelist[n].date)
            if(nowdate!=this.timelist[n].date){
              this.timelist.splice(n,0,'');
              this.upclassDate.push(nowdate);
            }
        })
      })
    },
    back () {
      history.go(-1);
    },
    yuyue () {
      this.add_demo()
      // window.location.replace('spage.html?time='+'20071200')
    },
    //选择体系之后
    changetixi(){
      this.dateval = ''
      this.set_class_play_new()
    },
    select_bigtype(){
      select_bigtype({type:this.isline,cklogin:this.userobj.data.token}).then(res => {
        let result = res.data
        if(result.status == 1){
          this.bigtype = result.data
          this.kctixi = result.data[0].id
          this.set_class_play_new()
        }
      })
    },
    set_class_play_new(){
      //选择日期
      var day1 = new Date()
      day1.setDate(day1.getDate() + 1)
      var time = day1.getFullYear()+'-'+((day1.getMonth()+1)<10?'0'+(day1.getMonth()+1):day1.getMonth()+1)+'-'+(day1.getDate()<10?'0'+day1.getDate():day1.getDate())
      // console.log(time)
      set_class_play_new({days:7,type:'demo',time:time,cid:l_search.cid,bigtype:this.kctixi,cklogin:this.userobj.data.token}).then(res => {
        // res.data['0'].splice(10,5)
        this.timelist = res.data['0'];
        this.forE();
        this.end = false
      })
    },
    add_demo(){
      if(this.upclassDate.length<=0){
        Toast({
          message: '暂无上课日期',
          position: 'bottom',
          duration: 3000
        })
        return
      }
      if(!this.dateval){
        Toast({
          message: '请选择上课日期',
          position: 'bottom',
          duration: 3000
        })
        return
      }
      Indicator.open()
      add_demo({cid:l_search.cid,bigtype:this.kctixi,subscribe_time:this.dateval,cklogin:this.userobj.data.token}).then(res => {
        Indicator.close()
        var starttime = this.dateval
        starttime = starttime.replace(new RegExp("-","gm"),"/")
        var starttimeHaoMiao = (new Date(starttime)).getTime()
        if(res.data.status==1){
          window.location.replace('spage.html?time='+starttimeHaoMiao)
        }
        else{
          Toast({
            message: res.data.message,
            position: 'bottom',
            duration: 3000
          })
        }
      })
    }
    // select_city(){
    //   select_city({bigtype:this.kctixi,cklogin:this.userobj.data.token}).then( res => {
    //     let result = res.data
    //     if(result.status == 1){
    //       this.citylist = result.data
    //     }
    //   })
    // }
  },
  components: {
    cHead
  }
}
</script>

<style>

.bannner img{width: 100%;height: auto;}
.main{padding:0.26667rem;}
.infoFill li>.input_group i.xiala{position: absolute;right: 0.24rem;top: 50%;transform:translateY(-50%);color: #808080;}

.classway{background:#f1faff;font-size: 0.37333rem;margin-top: 0.266667rem;color: #202020;padding-top:0.26667rem; }
.choiceway{overflow: hidden;height: 1.12rem;padding:0 0.26667rem;}
.choiceway .way{font-size: 0.37333rem;float: left;display:block;width:1.6rem;line-height:1.12rem;margin-right:.266rem;}
.choiceway .radio_group{font-size: 0.37333rem;margin-top: 0.36rem;margin-right: 0.12rem;margin-left:}
.choiceway .online{margin-right:.8rem;}


</style>
