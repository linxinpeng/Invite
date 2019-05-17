<template>
  <div class="index" v-if="list">
    <div class="i-inner">
      <div class="i-header">
        <img src="../assets/image/标题H5分享页@3x.png" width="100%" />
        <div class="h-swiper">
          <span class="s-left">
            <img v-if="appId == 1" src="../assets/image/yidant@3x.png" width="60px"/>
            <img v-else src="../assets/image/Logo@3x.png" width="60px"/>
          </span>
          <span class="s-right">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(slide, index) in list.radio_info || []" :key="index" style="height: 100%;width: 100%;font-size:.14rem;color: #fff;">{{slide}}</swiper-slide>
            </swiper>
          </span>
        </div>
        <div class="h-more">
          <div class="m-inner">
              <img src="../assets/image/红包@3x.png" width="90%"/>
              <p class="i-title"><span>3</span>人代缴即拼团成功，获得现金红包</p>
              <!-- 已经登录的界面中间信息 -->
              <div v-if="isLogin">
                <div class="i-more">
                  <div class="m-box">
                    <img :src="require(`../assets/image/${list&&list.f_info&&list.f_info.id.toString().substr(0,1)  || '好友更多@3x'}.png`)" />
                    <img v-for="item in list.s_info.slice(0,7) || []" :key="item.id" :src="require(`../assets/image/${item.id.toString().substr(0,1) || '好友更多@3x'}.png`)"/>
                    <img  v-for="i in (7 - (list.s_info.length>8?7:list.s_info.length || 0))" :key="i+10" src="../assets/image/好友拼团@3x.png" />
                    <img src="../assets/image/好友更多@3x.png" />
                    <img src="../assets/image/好友增加@3x.png"  @click="toShare"/>
                  </div>
                  <p class="m-info">{{list.group_num}}人已加入拼团</p>
                  <div class="m-btn" v-if="waibu" style="width: 2.5rem;height: .44rem;" @click="toShare">
                    <img src="../assets/image/按钮1@3x.png" width="100%" height="100%"/>
                    <span>参团成功，去APP下单</span>
                  </div>
                  <span v-else>
                    <div class="m-btn" v-if="list.s_info.length >=2" style="width: 2.5rem;height: .44rem;">
                      <img src="../assets/image/按钮1@3x.png" width="100%" height="100%"/>
                      <!-- <span>{{list.daijiao_success_num >= 3?'拼团成功，下单即可返现':'拼团进行中，去邀请'}}</span> -->
                      <span>拼团成功，请返回首页下单</span>
                    </div>
                    <div class="m-btn" v-else style="width: 2.5rem;height: .44rem;"  @click="toShare">
                      <img src="../assets/image/按钮1@3x.png" width="100%" height="100%"/>
                      <!-- <span>{{list.daijiao_success_num >= 3?'拼团成功，下单即可返现':'拼团进行中，去邀请'}}</span> -->
                      <span>拼团进行中，去邀请</span>
                    </div>
                  </span>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="i-center">
          <div class="c-title">
            <img src="../assets/image/小标题框@3x.png" />
            活动流程
            <img src="../assets/image/小标题框@3x.png" />
          </div>
          <div class="c-active">
           <img src="../assets/image/活动流程2@3x.png" width="100%" />
          </div>
      </div>
      <div class="i-center" style="margin-top: .1rem;">
          <div class="c-title">
            <img src="../assets/image/小标题框@3x.png" />
            活动规则
            <img src="../assets/image/小标题框@3x.png" />
          </div>
          <div class="c-active2">
            <p class="a-p1"> 即日起截止5月31日，用户发起拼团，成功拉2个好友参团即3人成团，参团人数不封顶，成团后参团的3人及以上成功代缴社保每人立返现金35元，每成功邀请一个好友参团代缴成功团长即可获得5元奖金，团员越多团长奖励越多。</p>
            <p>（1）通过活动页面点击【发起拼团】分享邀请好友参团；</p>
            <p>（2）用户成功拉2个及以上好友一起参与拼团，3人即可成团，参团人数不封顶；</p>
            <p>（3）成团后3人及以上成功代缴社保，平台将在1-2个工作日内审核后派送现金红包，用户可自主提现；</p>
            <p>（4）如活动期间内，未达成相应参团人数的团，则该团失败；</p>
            <p>（5）代缴返现与拼团立返优惠仅享受一项；</p>
            <p>（6）本活动最终解释权归本公司所有。</p>
          </div>
      </div>
       <!-- <div class="i-center"  style="margin-top: .1rem;" v-if="list.s_info.length < 1">
          <div class="c-title">
            <img src="../assets/image/小标题框@3x.png" />
            好友拼团榜
            <img src="../assets/image/小标题框@3x.png" />
          </div>
          <div class="c-active3">
           暂无好友
          </div>
      </div> -->
       <div class="i-center"  style="margin-top: .1rem;">
          <div class="c-title">
            <img src="../assets/image/小标题框@3x.png" />
            好友拼团榜
            <img src="../assets/image/小标题框@3x.png" />
          </div>
          <div class="c-active4">
            <div class="c-item">
              <span class="c-s1">
                <img :src="require(`../assets/image/${list.f_info.id.toString().substr(0,1)}.png`) " />
              </span>
              <span class="c-s2">
                <h4>{{list.f_info.name}}<b>团长</b></h4>
                <p><span v-if="list.f_info.money">省{{list.f_info.money}}元</span><span style="padding-left: 3px;" v-else>——</span></p>
              </span>
              <span class="c-s3">
                <span v-if="list.f_info.sum_money != 0">拼团奖励<em>￥{{list.f_info.sum_money}}</em></span><span v-else>——</span>
              </span>
            </div>
            <span v-if="list.s_info.length> 0">
              <div class="c-item" v-for="item in list.s_info || []" :key="item.id">
                <span class="c-s1">
                  <img :src="require(`../assets/image/${item.id.toString().substr(0,1)}.png`)" />
                </span>
                <span class="c-s2">
                  <h4>{{item.name}}</h4>
                  <p><span v-if="item.money">省{{item.money}}元</span><span style="padding-left: 3px;" v-else>——</span></p>
                </span>
                <span class="c-s3">
                  <span v-if="item.addend_money != 0&&item.money">助力团长<em>￥{{item.addend_money}}</em></span><span v-else>——</span>
                </span>
              </div>
            </span>
          </div>
      </div>
    </div>
    <div class="kefu" v-if="!waibu" @click="toKefu" :style="!isShow?'transform: translateX(100%)':'transform: translateX(0)'">
      <img src="../assets/image/客服@3x.png" width="100%"/>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
import qs from 'qs';
import { setInterval, clearInterval } from 'timers';
export default {
  name: 'index',
  data () {
    return {
      showShare: false,
      isLogin: true,
      isOver: false,
      scrollTop:0,
      timer: null,
      isShow: true,
      appId:0,
      groupId: 0,
      phone:'',
      vCode:'',
      downURL:'',
      expired_time:0,
      fromapp:0,
      waibu: false,
      num:0,
      swiperOption: {
        loop: true, 
        autoplay:true
      },
      list: null
    }
  },
  created(){
    let url = location.href;
    let userAge = navigator.userAgent;
    if(url){
      let a = url.split('?')[1].split('&');
      let arr = a.find( v=> v.indexOf('appid')>-1);
      let us = a.find( v => v.indexOf('group_id')>-1);
      if(us&&arr){
        this.appId = arr.split('=')[1];
        this.groupId = us.split('=')[1];
        this.getInfo();
        //用户注销团失效
          //判断是否在app内部环境
          if(userAge.indexOf('renrenshebaoapp') > -1 || userAge.indexOf('shebaoapp') > -1){
            this.waibu = false;
          }else{
            //外部环境（分享链接进的网页），跳login界面
            this.waibu = true;
            if(!sessionStorage.getItem('isLogin')){
              this.$router.replace(`/login?appid=${this.appId}&group_id=${this.groupId}&goto=2`);
              return;
            }
          }
      }
    }
    
  },
  methods:{
    //客服链接
    toKefu(){
      window.location.href = this.list.web_talk;
    },
    //获取活动页面信息
    async getInfo(){
      let params = qs.stringify({
        appid:this.appId,
        group_id:this.groupId
      })
      const resp = await this.axios.post('api/shebao/daijiao_group/getGroupConfig',params);
      if(resp.data.code == 1){
        this.list = resp.data.data;
         if(resp.data.data.f_info.status == 3){
            window.location.href = "./over?time=not"
          }
     
      }
    },
    //滚动条事件，控制客服显示与否
    handleScroll(){
      clearInterval(this.timer);
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.isShow = false;
      this.timer = setInterval(this.stop, 1000);
      
    },
    //滚动条，控制客服显示与否
    stop(){
      let m1 = document.documentElement.scrollTop || document.body.scrollTop;
      if(m1 == this.scrollTop){
        this.isShow = true;
        clearInterval(this.timer);
      }
    },
    //获取验证码
    async getVrCode(){
        if(!(/^1[3|4|5|8]\d{9}$/.test(this.phone))){
          MessageBox('提示', '请输入正确的手机号码');
          return
        }
        let params = qs.stringify({
          appid:this.appId,
          mobile: this.phone
        })
      const resp = await this.axios.post('api/shebao/daijiao_group/sendVerifyCode',params);
        if(resp.data.code == 1){
          let time = parseInt(resp.data.data.expired_time);
          let timer = setInterval(()=>{ 
            time --
            if(time <=0){
              clearInterval(timer)
            }
            this.expired_time = time;
          },1000)
      }
    },
    //如果是在app外部环境，提示用户下载app,内部分享
    async toShare(){
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
      var isIOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if(u.indexOf('renrenshebaoapp') > -1 || u.indexOf('shebaoapp') > -1){
          if(isAndroid){
            mylistner.show_android_share();
          }else{
            show_ios_share('');
          }
      }else{
        let app_id = this.appId;
        if(isAndroid){
              if(app_id == 1){//社保一点通
                  this.downURL = 'http://zhushou.360.cn/detail/index/soft_id/3976174'
              }else if(app_id == 3){//记加班
                  this.downURL = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.dai58.jijiaban.yidiantong'
              }else if(app_id == 4){//人人社保
                  this.downURL = 'http://zhushou.360.cn/detail/index/soft_id/4004003'
              }else if(app_id == 5){//社保一账通
                  this.downURL = 'http://zhushou.360.cn/detail/index/soft_id/3976174'
              }
          }
          if(isIOS){
              if(app_id == 1){//社保一点通
                  this.downURL = 'itms-apps://itunes.apple.com/app/id1369681341'
              }else if(app_id == 3){//记加班
                  this.downURL = 'itms-apps://itunes.apple.com/app/id1408494878'
              }else if(app_id == 4){//人人社保
                  this.downURL = 'itms-apps://itunes.apple.com/app/id1437622796'
              }else if(app_id == 5){//社保一账通
                  this.downURL = 'itms-apps://itunes.apple.com/app/id1433887224'
              }
          }
        window.location.href = this.downURL
      }    
    }
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll)
  },
  destroyed(){
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index{
    .showModal{
    font-size: .11rem;
    width: 100%;
    p{
      text-align: center;
    }
    .m-top{
      height: 1rem;
      display: flex;
      div{
        flex-grow: 1;
        img{
         width: .48rem;
         height: .48rem;
         display: block;
         margin: .08rem auto;
       }
      }
    }
    .m-bottom{
      height: 1rem;
      display: flex;
       div{
        flex-grow: 1;
        img{
         width: .48rem;
         height: .48rem;
         display: block;
         margin: .08rem auto;
       }
      }
    }
    .m-cancle{
      height: .5rem;
      font-size: .16rem;
      color: #333333;
      text-align: center;
      line-height: .5rem;
      border-top: 0.01rem solid #eee;
    }
  }
    .kefu{
      position: fixed;
      bottom: .2rem;
      right: 0rem;
      width: .8rem;
      height: .81rem;
      z-index: 99;
      transition: all .3s ease;
    }
    .i-inner{
      .i-header{
        position: relative;
        .h-swiper{
          position: absolute;
          top: 1.7rem;
          left: 50%;
          transform: translateX(-50%);
          height: .34rem;
          width: 2.5rem;
          border-radius: 34px;
          background: rgba(0,0,0,.4);
          z-index: 99;
          .s-left{
            float: left;
            width: .36rem;
            height: .34rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
              width: .28rem;
              height: .28rem;
              display: block;
            }
          }
          .s-right{
            float: right;
            width: 2.14rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .h-more{
          position: absolute;
          top: 2.15rem;
          .m-inner{
            position: relative;
            .i-title{
              position: absolute;
              top: .28rem;
              width: 100%;
              text-align: center;
              font-size: .16rem;
              color: #fff444;
              font-family: 'PingFang SC';
              span{
                font-size: .22rem;
              }
            }
            .i-more{
              position: absolute;
              top: 0;
              width: 86%;
              left: 7%;
              .m-box{
                padding-top: .8rem;
                display: flex;
                flex-wrap: wrap;
                img{
                  width: 14%;
                  height: 14%;
                  display: inline-block;
                  margin: 3%;
                }
              }
              .m-info{
                width: 100%;
                text-align: center;
                font-size: .13rem;
                margin-top: .3rem;
                color: #ffffff;
              }
              .m-btn{
                text-align: center;
                font-size: .18rem;
                font-weight: bold;
                color: #a84200;
                margin: .5rem auto;
                position: relative;
                span{
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  display: inline-block;
                  height: 100%;
                  line-height: .44rem;
                  text-align: center;
                }
              }
            }
            .i-more2{
              position: absolute;
              top: 0;
              width: 86%;
              left: 7%;
              .m-input{
                input{
                  width: 2.5rem;
                  height: .44rem;
                  border-radius: 30px;
                  outline: none;
                  background: #ffffff;
                  border: none;
                  padding-left: 20px;
                  box-sizing: border-box;
                }
                div.i-code{
                  position: relative;
                  width: 2.5rem;
                  height: .44rem;
                  margin: .09rem auto;
                  input{
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding-right: .8rem;
                  }
                  span{
                    position: absolute;
                    top: 0;
                    right: .1rem;
                    font-size: .14rem;
                    color: #da442b;
                    height: 100%;
                    line-height: .44rem;
                  }
                }
                .m-btn{
                  text-align: center;
                  font-size: .18rem;
                  font-weight: bold;
                  color: #a84200;
                  margin: .35rem auto;
                  margin-bottom: .15rem;
                  position: relative;
                  span{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    display: inline-block;
                    height: 100%;
                    line-height: .44rem;
                    text-align: center;
                  }
                }
                .m-btn2{
                  border: 2px solid #ffcf00;
                  color: #ffcf00;
                  font-size: .16rem;
                  text-align: center;
                  line-height: .44rem;
                  border-radius: 30px;
                  margin: auto;
                }
              }
            }
          }
        }
      }
      .i-center{
        margin-top: 2.8rem;
        text-align: center;
        .c-title{
          display: flex;
          font-size: .16rem;
          color: #a84200;
          justify-content: center;
          font-weight: bold;
          img{
            width: .1rem;
            height: .1rem;
            margin: 0 5px;
          }
        }
        .c-active{
          width: 90%;
          margin: 10px auto;
          height: 1.5rem;
          overflow: hidden;
          background: #ffffff;
          border-radius: 10px;
          box-sizing: border-box;
      
        }
        .c-active2{
          width: 90%;
          margin: 10px auto;
          min-height: 1.5rem;
          background: #ffffff;
          border-radius: 10px;
          box-sizing: border-box;
          padding: .08rem;
          text-align: left;
          .a-p1{
            font-size: .13rem;
            color: #333333;
            text-indent: .26rem;
            line-height: 1.8;
            padding-bottom: 10px;
          }
          p{
            color: #888888;
            font-size: .13rem;
            line-height: 1.8;
          }
        }
        .c-active3{
          width: 90%;
          margin: 10px auto;
          height: 1.5rem;
          background: #ffffff;
          border-radius: 10px;
          box-sizing: border-box;
          padding: .08rem;
          text-align: center;
          line-height: 1.5rem;
          font-size: .13rem;
          color: #888888;
        }
         .c-active4{
          width: 90%;
          margin: 10px auto;
          background: #ffffff;
          border-radius: 10px;
          box-sizing: border-box;
          padding: .08rem;
          text-align: center;
          font-size: .13rem;
          color: #888888;
          padding-bottom: 30px;
          .c-item{
            display: flex;
            padding: 5px 0px;
            border-bottom: 1px solid #eee;
            height: .7rem;
            box-sizing: border-box;
            align-items: center;
            .c-s1{
              width: .37rem;
              img{
                width: .37rem;
                height: .37rem;
              }
            }
            .c-s2{
              // width: ;
              text-align: left;
              padding-left: 10px;
              h4{
                font-size: .15rem;
                color: #333333;
                font-weight: bold;
                b{
                  background: rgb(136,189,63);
                  color: #ffffff;
                  padding: 3px;
                  font-size: .13rem;
                  font-weight: 400;
                  border-radius: 2px;
                  margin-left: 5px;
                }
              }
              p{
                font-size: .12rem;
                color: #999999;
                margin-top: 3px;
              }
            }
            .c-s3{
              margin-left: auto;
              font-size: .15rem;
              color: #999999;
              em{
                color: red;
              }
            }
          }
        }
      }
    }
  }
</style>

