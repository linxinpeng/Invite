<template>
  <div class="index">
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
              <p v-if="!isOver" class="i-title"><span>3</span>人代缴即拼团成功，获得现金红包</p>
              <!-- 未登录的界面信息 -->
              <div>
                <div class="i-more2">
                  <div class="m-input">
                    <input style="margin-top: 1.1rem;" type="text" placeholder="请输入手机号码" v-model="phone"  maxlength="11" @input="phone = phone.replace(/\D/g,'')"/>
                    <div class="i-code">
                      <input type="text" v-model="vCode" @input="vCode = vCode.replace(/[^a-z0-9]/g,'')" placeholder="输入验证码" />
                      <span v-if="expired_time == 0" @click="getVrCode">获取验证码</span>
                      <span v-else style="color: #333">{{expired_time}}s后再试</span>
                    </div>
                    <div class="m-btn" style="width: 2.5rem;height: .44rem;" @click="toShare2">
                      <img src="../assets/image/按钮1@3x.png" width="100%" height="100%"/>
                      <span>参与拼团</span>
                    </div>
                    <div class="m-btn2" style="width: 2.5rem;height: .44rem;" @click="onAssemble">
                      我也要发起拼团
                    </div>
                  </div>
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
      userId: 0,
      phone:'',
      groupId:0,
      vCode:'',
      expired_time:0,
      fromapp:0,
      swiperOption: {
        loop: true, 
        autoplay:true
      },
      list: {}
    }
  },
  created(){
    let url = location.href;
    if(url){
        let a = url.split('?')[1].split('&');
        let arr = a.find( v=> v.indexOf('appid')>-1);
        let groupid = a.find( v => v.indexOf('group_id')>-1);
        this.appId = arr.split('=')[1];
        this.groupId = groupid.split('=')[1];
        this.getInfo();
    }
    
  },
  methods:{
    async getInfo(){
      let params = qs.stringify({
        appid:this.appId,
        user_id:"151824421212"
      })
      const resp = await this.axios.post('api/shebao/daijiao_group/createConfig',params);
      if(resp.data.code == 1){
        this.list = resp.data.data;
      }
    },

    handleScroll(){
      clearInterval(this.timer);
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.isShow = false;
      this.timer = setInterval(this.stop, 1000);
      
    },
    stop(){
      let m1 = document.documentElement.scrollTop || document.body.scrollTop;
      if(m1 == this.scrollTop){
        this.isShow = true;
        clearInterval(this.timer);
      }
    },
    async onAssemble(){

      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
      var isIOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
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
          window.location.href = this.downURL;
    },
    async toShare2(){
        if(!(/^1[3|4|5|8|7]\d{9}$/.test(this.phone))){
          MessageBox('提示', '请输入正确的手机号码');
          return
        }
        if(!this.vCode){
          MessageBox('提示','验证码错误，请重新输入。')
          return
        }
        let params = qs.stringify({
            appid:this.appId,
            group_id:this.groupId,
            mobile: this.phone,
            verify_code: this.vCode
        })
      sessionStorage.setItem('isLogin',true)
      const resp = await this.axios.post('api/shebao/daijiao_group/joinGroup',params);
      if(resp.data.code == 1){
        this.$router.push( `/index?&appid=${this.appId}&group_id=${this.groupId}` )
        }else{
            MessageBox.alert(resp.data.msg)
        }
      // 
    },
    async getVrCode(){
        if(!(/^1[3|4|5|8|7]\d{9}$/.test(this.phone))){
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

    toShare(){
      let userAge = navigator.userAgent;
      let isAndroid = userAge.indexOf('Android') > -1 || userAge.indexOf('Linux') > -1; //g
      if(isAndroid){
        mylistner.show_android_share();
      }else{
        show_ios_share();
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
      width: 1rem;
      height: 1.01rem;
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
                  border-radius: 60px;
                  outline: none;
                  background: #ffffff;
                  border: none;
                  padding-left: 30px;
                  box-sizing: border-box;
                  font-size: .14rem;
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
                    font-size: .14rem;
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
                  border: 1px solid #ffcf00;
                  color: #ffcf00;
                  font-size: .16rem;
                  text-align: center;
                  line-height: .44rem;
                  border-radius: 60px;
                  margin: auto;
                  box-sizing: border-box;
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
          font-weight: bold;
          justify-content: center;
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

