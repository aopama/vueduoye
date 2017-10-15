/**
 * Created by Administrator on 2017/8/1.
 */
import Vue from 'vue'
import qs from 'querystring'
import axios from 'axios';

const node_env = {
  node_env:'development',
  production:'http://www.qiaoxi.com', //本地
  test:'http://test.chel-c.com/', //灰度
  development:'http://vip.chel-c.com' //线上
}

Vue.prototype.Imgurldizhi = 'http://opcr7ahpg.bkt.clouddn.com/';
Vue.prototype.cImgurldizhi = node_env[node_env.node_env];

axios.defaults.baseURL = node_env[node_env.node_env];
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let Pathname = location.pathname;
if(Pathname.indexOf('protocol.html')==-1&&Pathname.indexOf('ourteacher.html')==-1&&Pathname.indexOf('Tdetails.html')==-1&&Pathname.indexOf('login.html')==-1&&Pathname.indexOf('index.html')==-1&&(!/^\/$/g.test(Pathname))&&Pathname.indexOf('system.html')==-1){
  if(localStorage.user){
    axios.post('/user/login/check_login', qs.stringify({
      cklogin:JSON.parse(localStorage.user).data.token
    })).then(res => {
      let result = res.data;
    if(result.code!=1){
      var u = location.pathname.slice(location.pathname.lastIndexOf('/')+1,location.pathname.lastIndexOf('.'));
      window.location.assign('login.html?reg='+u);
    }
  })
  }else{
    window.location.assign('login.html');
  }
}else{
  companyId().then( res => {
    let result = res.data;
    if(result){
      wx.config({
    //    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.codeinfo.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp:result.codeinfo.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.codeinfo.nonceStr, // 必填，生成签名的随机串
        signature: result.codeinfo.signature,// 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",    //分享到朋友圈
          "onMenuShareAppMessage",  //分享给朋友
          "onMenuShareQQ"          //分享到QQ
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function(){
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: result.shareinfo.sharetitle, // 分享标题
          link: result.shareinfo.shareurl, // 分享链接，该链接域名必须与当前企业的可信域名一致
          imgUrl: result.shareinfo.shareimg, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        //分享给朋友
        wx.onMenuShareAppMessage({
          title: result.shareinfo.sharetitle, // 分享标题
          desc: result.shareinfo.sharedes, // 分享描述
          link: result.shareinfo.shareurl, // 分享链接，该链接域名必须与当前企业的可信域名一致
          imgUrl: result.shareinfo.shareimg, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        //分享到QQ
        wx.onMenuShareQQ({
          title: result.shareinfo.sharetitle, // 分享标题
          desc: result.shareinfo.sharedes, // 分享描述
          link: result.shareinfo.shareurl, // 分享链接
          imgUrl: result.shareinfo.shareimg, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        //
      })
    }
  })
}
/**
 * 微信分享获取企业id
 */
function companyId () {
  return axios.post('/user/index/wxshare');
}

/**
 * 首页接口
 */
const index = () => {
  return axios.post('/user/index');
}

/**
 * 密码登录
 * @param phone: 手机号
 * @param password: 密码
 */
const do_login = ({phone, password}) => {
  return axios.post('/user/Selfofpatriarch/do_login', qs.stringify({
    phone, password
  }))
}

/**
 * 发送验证码
 * @param phone: 手机号
 * @param type: 注册=reg 登录=login 忘记密码=login
 */
const send_sms = ({phone, type}) => {
  return axios.post('/user/Selfofpatriarch/send_sms', qs.stringify({
    phone, type
  }))
}

/**
 * 找回密码
 * @param phone: 手机号
 * @param yzm: 验证码
 * @param password: 密码
 */
const forgetpass = ({phone, yzm, password, verify, rediskey}) => {
  return axios.post('/user/Selfofpatriarch/forgetpass', qs.stringify({
    phone, yzm, password, verify, rediskey
  }))
}
/**
 * 验证码登录接口
 * @param phone: 手机号
 * @param yzm: 验证码
 */
const sms_login = ({phone, yzm, verify, rediskey}) => {
  return axios.post('/user/Selfofpatriarch/sms_login', qs.stringify({
    phone, yzm, verify, rediskey
  }))
}

/**
 * 注册
 * @param phone: 手机号
 * @param password: 密码
 * @param yzm: 验证码
 */
const reg = ({phone, password, yzm, agreement, verify, rediskey}) => {
  return axios.post('/user/Selfofpatriarch/reg', qs.stringify({
    phone, password, yzm, agreement, verify, rediskey
  }))
}

/**
 * 我们的老师列表
 * @param page: 页面
 */
const my_teacher_list = ({page}) => {
  return axios.post('/user/index/my_teacher_list', qs.stringify({
    page
  }))
}

/**
 * 老师详情
 * @param tid: 老师id
 */
const my_teacher_xp = ({tid, cklogin}) => {
  return axios.post('/user/index/my_teacher_xp', qs.stringify({
    tid, cklogin
  }))
}

/**
 * 点击课程体系详情
 * @param bigtype: 课程体系ID
 * @param level: 等级 不是必选
 */
const teaching_system = ({bigtype, level, cklogin}) => {
  return axios.post('/user/index/teaching_system', qs.stringify({
    bigtype, level, cklogin
  }))
}

/**
 *  约课
 *  @param id: 用户id
 *  @param cklogin: cookie
 */
const index_app = ({ id, cklogin }) => {
  return axios.post('/user/patriarch/index_app', qs.stringify({
    id, cklogin
  }))
}

/**
 *  修改密码
 *  @param id: 用户id
 *  @param oldpass: 老密码
 *  @param newpass: 新密码
 */
const resetpass = ({id, oldpass, newpass, cklogin}) => {
  return axios.post('user/Selfofpatriarch/resetpass', qs.stringify({
    id, oldpass, newpass, cklogin
  }));
}

/**
 *  个人资料
 *  @param id: 用户id
 */
const getpersonal = ({ id, cklogin }) => {
  return axios.post('/user/Appofpatriarchself/getpersonal', qs.stringify({
    id, cklogin
  }))
}

/**
 *  修改个人资料
 *  @param id: 用户id
 *  @param faceurl: 头像
 *  @param sex: 1男 2女
 *  @param pname: 用户名
 */
const setpersonal = ({id, sex, pname, cklogin}) =>{
  return axios.post('/user/Appofpatriarchself/setpersonal', qs.stringify({
    id, sex, pname, cklogin
  }))
}

/**
 * 我的宝贝
 * @param id: 用户id
 */
const getChildListById = ({id ,cklogin}) => {
  return axios.post('/user/Appofpatriarchself/getChildListById', qs.stringify({
    id, cklogin
  }))
}
/**
 * 编辑孩子
 * @param cid:用户名id
 * @param age:生日
 * @param cname:中文名
 * @param e_name:英文名
 * @param sex:1男2女
 * @param face:头像
 * @param englishtime_training:1没接受过2一年3两年4两年以上
 * @param english_basic:1无基础2能说简单单词3能简单交流4能流利交流
 * @param classroom_attitude:	1基本不说话2偶尔说话3积极互动4没上过课
 */
const editchildren=({
  cid,age,cname,e_name,sex,face,englishtime_training,english_basic,classroom_attitude
})=>{
  return axios.post('/user/Selfofpatriarch/setchildinfo',qs.stringify({
    cid,age,cname,e_name,sex,face,englishtime_training,english_basic,classroom_attitude
  }))
}
/**
 * 添加孩子
 * @param pid: 用户id
 * @param cname:孩子姓名
 * @param e_name: 孩子英文名
 * @param age: 生日
 * @param sex: 1男2女
 * @param face: 头像
 * @param englishtime_training: 1没接受过 2一年 3两年 4两年以上
 * @param english_basic: 	1无基础 2能说简单单词 3能简单交流 4能流利交流
 * @param classroom_attitude: 	1基本不说话 2偶尔说话 3积极互动 4没上过课
 */
const addchildren = ({
  pid, cname, e_name, age, sex, face,
  englishtime_training, english_basic, classroom_attitude, cklogin
}) => {
  return axios.post('/user/Selfofpatriarch/addchildren', qs.stringify({
    pid, cname, e_name, age, sex, face,
    englishtime_training, english_basic, classroom_attitude, cklogin
  }))
}
/**
 * 查看孩子
 * @param cid:孩子id
 */
const lookchildren=({cid,cklogin})=>{
  return axios.post('/user/Selfofpatriarch/getchildinfo',qs.stringify({
    cid,cklogin
  }))
}
/**
 * 删除孩子
 */
const delchildren = ({ id, cklogin }) => {
  return axios.post('/user/Appofpatriarchself/deleteChildById', qs.stringify({
    id, cklogin
  }))
}
/**
 * 教学方案
 * @param id: 用户id
 */
const getFanganById = ({ id, phone, cklogin }) => {
  return axios.post('/User/Appofpatriarchself/getFanganById', qs.stringify({
    id, phone, cklogin
  }))
}

/**
 * 上课记录
 * @param id: 用户id
 */
const getAllClassInfoByPid = ({ id, cklogin }) =>{
  return axios.post('/user/Appofpatriarchself/getAllClassInfoByPid', qs.stringify({
    id, cklogin
  }))
}

/**
 * 提交评论
 * @param cid:课堂id
 * @param star: 星星
 * @param info: 评语
 */
const sub_evaluate = ({ cid, star, info, cklogin }) => {
  return axios.post('/user/Selfofpatriarch/sub_evaluate', qs.stringify({
    cid, star, info, cklogin
  }))
}

/**
 * 购买记录
 * @param id: 用户id
 */
const getAllorderByPid = ({ id, cklogin }) => {
  return axios.post('/user/Appofpatriarchself/getAllorderByPid', qs.stringify({
    id, cklogin
  }))
}

/**
 * 上课铃
 */
const skl = ({ id, cklogin }) => {
  return axios.post('/user/patriarch/skl',qs.stringify({
    id, cklogin
  }))
}

/**
 * 请假
 * @cid :孩子id
 * @start_time: 请假时间十位时间戳
 * @demo_type: 	如果是体验课就是demo正式课cs
 */
const leave = ({ cid, start_time, demo_type, cklogin }) => {
  return axios.post('/user/patriarch/leave', qs.stringify({
    cid, start_time,demo_type, cklogin
  }))
}

/**
 * 制定上课计划
 * @param time: 日期，周一开始
 * @param cid: 孩子id
 * @param bigtype: 课程体系
 */
const set_class_play_new = ({ time, cid, bigtype, type, days, cklogin }) => {
  return axios.post('/user/patriarch/set_class_play_new', qs.stringify({
    time, cid, bigtype, days, type, cklogin
  }))
}

/**
 * 制定上课计划-勾选
 * @param time: 时间（2017-08-09 16:00）
 * @param cid: 孩子id
 * @param bigtype: 课程体系
 */
const set_time = ({ time, bigtype, cid, cklogin }) => {
  return axios.post('/user/patriarch/set_time', qs.stringify({
    time, bigtype, cid, cklogin
  }))
}

/**
 * 制定上课计划-取消勾选
 * @param time: 时间（2017-08-09 16:00)
 * @param cid: 孩子id
 * @param bigtype：课程体系
 */
const un_time = ({ time, cid, bigtype, cklogin }) => {
  return axios.post('/user/patriarch/un_time', qs.stringify({
    time, cid, bigtype, cklogin
  }))
}

/**
 * 制定上课计划-完成
 * @param cid: 孩子id
 * @param bigtype: 课程体系
 */
const fenke = ({ cid, bigtype, cklogin }) => {
  return axios.post('/user/patriarch/fenke', qs.stringify({
    cid, bigtype, cklogin
  }))
}

/**
 * 线上线下切换接口
 * @param type: 1线上  2线下
 */
const select_bigtype = ({ type, cklogin }) => {
  return axios.post('/user/userconfig/select_bigtype', qs.stringify({
    type, cklogin
  }))
}

/**
 * 课程体系和等级
 * @param bigtype: 	课程体系id
 */
const appselect_combo = ({ bigtype, cklogin }) => {
  return axios.post('/index/appselect_combo', qs.stringify({
    bigtype, cklogin
  }))
}

/**
 * 确认支付
 * @param cklogin: 		登录状态码
 */
const submitpay = ({ cklogin }) => {
  return axios.post('/index/submitpay', qs.stringify({
    cklogin
  }))
}

/**
 * 线下城市下拉列表
 * @param bigtype: 	课程体系id
 */
const select_city = ({ bigtype, cklogin }) => {
  return axios.post('/user/userconfig/select_city', qs.stringify({
    bigtype, cklogin
  }))
}

/**
 * 根据城市ID返回实体店
 * @param cityid: 	城市id
 */
const select_physicalstore = ({ cityid, cklogin }) => {
  return axios.post('/user/userconfig/select_physicalstore', qs.stringify({
    cityid, cklogin
  }))
}

/**
 *  获取上传图片token
*/
const getToken = ({}) => {
  return axios.post('/index.php?g=asset&m=asset&a=uptokens', qs.stringify({

  }))
}

/**
 *  预约体验课
*/
const add_demo = ({ cid, bigtype, subscribe_time, cklogin }) => {
  return axios.post('/user/patriarch/add_demo', qs.stringify({
    cid, bigtype, subscribe_time, cklogin
  }))
}

/**
 *  订单
 *  @param comboid: 课程包id
 *  @param level: 等级
 *  @param cid:孩子id
 *  @param orderid:订单id(修改课时包时必须传)
 *  @param bigtype: 课程体系id
 *  @param storeid: 线下实体店id
 */
const setorder_combo = ({ comboid, level, cid, orderid, bigtype, storeid, cklogin }) => {
  return axios.post('/api/pay/setorder_combo', qs.stringify({
    comboid, level, cid, orderid, bigtype, storeid, cklogin
  }))
}

/**
 *  余额支付
 *  @param orderid: 订单id
 *  @param ordernumber: 订单号
 */
const mymoneypay = ({ orderid, ordernumber, cklogin }) => {
  return axios.post('/api/pay/mymoneypay', qs.stringify({
    orderid, ordernumber, cklogin
  }))
}

/**
 *  微信支付
 *  @param orderid: 订单id
 *  @param ordernumber: 订单号
 */
const wxpaymobile = ({ orderid, ordernumber, cklogin }) => {
  return axios.post('/api/pay/wxpaymobile', qs.stringify({
    orderid, ordernumber, cklogin
  }))
}

/**
 *  支付宝wap支付
 *  @param orderid: 订单id
 *  @param ordernumber: 订单号
 */
const alipaywap = ({ orderid, ordernumber, cklogin }) => {
  return axios.post('/api/pay/alipaywap', qs.stringify({
    orderid, ordernumber, cklogin
  }))
}

/**
 *  用户注册协议
 */
const protocol = () => {
  return axios.post('/user/Selfofpatriarch/regxy', qs.stringify({}))
}

/**
 *  ajax验证图形验证码
 */
const verifycode = ({verify, rediskey }) => {
  return axios.post('/user/login/ajax_check_verify_code', qs.stringify({
    verify, rediskey
  }))
}

export {
  index, do_login, send_sms, forgetpass, sms_login, reg,
  my_teacher_xp, my_teacher_list, teaching_system, index_app,
  resetpass, getpersonal, setpersonal, getChildListById, addchildren,
  getFanganById, getAllClassInfoByPid, sub_evaluate,getAllorderByPid, skl,
  leave, set_class_play_new, set_time, un_time, fenke, select_bigtype,
  appselect_combo, submitpay, select_city, select_physicalstore, getToken,
  setorder_combo, mymoneypay, wxpaymobile, alipaywap, add_demo, protocol,verifycode,lookchildren,
  editchildren,delchildren
}
