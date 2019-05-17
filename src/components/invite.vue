<template>
  <div class="index">
    <div class="i-inner">
      <div class="i-header">
        <img src="../assets/image/head.png" width="100%">
        <div class="h-swiper">
          <span class="s-left">
            <img v-if="appId == 1" src="../assets/image/yidant@3x.png" width="60px">
            <img v-else src="../assets/image/Logo@3x.png" width="60px">
          </span>
          <span class="s-right">
            <swiper :options="swiperOption">
              <swiper-slide
                v-for="(slide, index) in list.radio_info || []"
                :key="index"
                style="height: 100%;width: 100%;font-size:.14rem;color: #fff;"
              >{{slide}}</swiper-slide>
            </swiper>
          </span>
        </div>
        <div class="h-more">
          <div class="m-inner">
            <img src="../assets/image/红包@3x.png" width="90%">
            <p v-if="!isOver" class="i-title">
              <span>3</span>人代缴即拼团成功，获得现金红包
            </p>
            <p v-else class="i-title" style="font-size: .23rem;color: #fff444;">活动已结束！</p>
            <!-- 已经登录的界面中间信息 -->
            <div>
              <div class="i-more">
                <div class="m-box">
                  <img v-for="i in 8" :key="i" src="../assets/image/好友拼团@3x.png">
                  <img src="../assets/image/好友更多@3x.png">
                  <img src="../assets/image/好友增加@3x.png">
                </div>
                <p class="m-info">0人已成功拼团</p>
                <div class="m-btn" style="width: 2.5rem;height: .44rem;" @click="goTo">
                  <img src="../assets/image/按钮1@3x.png" width="100%" height="100%">
                  <span>发起拼团</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="i-center">
        <div class="c-title">
          <img src="../assets/image/小标题框@3x.png">
          活动流程
          <img src="../assets/image/小标题框@3x.png">
        </div>
        <div class="c-active">
          <img src="../assets/image/活动流程2@3x.png" width="100%">
        </div>
      </div>
      <div class="i-center" style="margin-top: .1rem;">
        <div class="c-title">
          <img src="../assets/image/小标题框@3x.png">
          活动规则
          <img src="../assets/image/小标题框@3x.png">
        </div>
        <div class="c-active2">
          <p
            class="a-p1"
          >即日起截止5月31日，用户发起拼团，成功拉2个好友参团即3人成团，参团人数不封顶，成团后参团的3人及以上成功代缴社保每人立返现金35元，每成功邀请一个好友参团代缴成功团长即可获得5元奖金，团员越多团长奖励越多。</p>
          <p>（1）通过活动页面点击【发起拼团】分享邀请好友参团；</p>
          <p>（2）用户成功拉2个及以上好友一起参与拼团，3人即可成团，参团人数不封顶；</p>
          <p>（3）成团后3人及以上成功代缴社保，平台将在1-2个工作日内审核后派送现金红包，用户可自主提现；</p>
          <p>（4）如活动期间内，未达成相应参团人数的团，则该团失败；</p>
          <p>（5）代缴返现与拼团立返优惠仅享受一项；</p>
          <p>（6）本活动最终解释权归本公司所有。</p>
        </div>
      </div>
      <div class="i-center" style="margin-top: .1rem;">
        <div class="c-title">
          <img src="../assets/image/小标题框@3x.png">
          好友拼团榜
          <img src="../assets/image/小标题框@3x.png">
        </div>
        <div class="c-active3">暂无好友</div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" style="background: transparent;">
      <div style="width:2.7rem;height: 3.01rem;">
        <img src="../assets/image/弹窗@3x.png" width="100%" height="100%">
      </div>
    </mt-popup>
    <div
      class="kefu"
      v-if="isInner"
      @click="toKefu"
      :style="!isShow?'transform: translateX(100%)':'transform: translateX(0)'"
    >
      <img src="../assets/image/客服@3x.png" width="100%">
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { setTimeout } from "timers";
export default {
  name: "index",
  data() {
    return {
      popupVisible: false,
      showShare: false,
      isLogin: true,
      isInner: false,
      isOver: false,
      scrollTop: 0,
      timer: null,
      isShow: true,
      appId: 0,
      userId: 0,
      phone: "",
      vCode: "",
      downURL:"#",
      swiperOption: {
        loop: true,
        autoplay: true
      },
      list: {}
    };
  },
  created() {
    let url = location.href;
    if (url) {
      let a = url.split("?")[1].split("&");
      let arr = a.find(v => v.indexOf("appid") > -1);
      let us = a.find(v => v.indexOf("user_id") > -1);
      if (us && arr) {
        this.appId = arr.split("=")[1];
        this.userId = us.split("=")[1];
      }
    }

    //判断当前环境是否在APP内部
    const userAgent = navigator.userAgent;
    if (
      userAgent.includes("renrenshebaoapp") ||
      userAgent.includes("shebaoapp")
    ) {
      this.isInner = true;
    } else {
      this.isInner = false;
    }

    this.getInfo();
  },
  methods: {
    toKefu() {
      window.location.href = this.list.web_talk;
    },
    //设置开团配置
    async getInfo() {
      let params = qs.stringify({
        appid: this.appId,
        user_id: this.userId
      });
      const resp = await this.axios.post(
        "api/shebao/daijiao_group/createConfig",
        params
      );
      if (resp.data.code == 1) {
        this.list = resp.data.data;
      }
    },
    //监听控制条事件，显示或隐藏客服
    handleScroll() {
      clearInterval(this.timer);
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.isShow = false;
      this.timer = setInterval(this.stop, 1000);
    },
    //滚动条停止1秒后，显示客服按钮
    stop() {
      let m1 = document.documentElement.scrollTop || document.body.scrollTop;
      if (m1 == this.scrollTop) {
        this.isShow = true;
        clearInterval(this.timer);
      }
    },
    //去拼团
    async goTo() {
      const userAgent = navigator.userAgent;
      var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1;
      var isIOS = userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (!(userAgent.includes("renrenshebaoapp") ||userAgent.includes("shebaoapp"))){
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
      } else {
        this.popupVisible = true;
        sessionStorage.setItem("isLogin", true);
        let that = this;
        let params = qs.stringify({
          appid: this.appId,
          user_id: this.userId
        });
        const resp = await this.axios.post(
          "api/shebao/daijiao_group/createGroup",
          params
        );
        if (resp.data.code == 1) {
          console.log("in");
          setTimeout(() => {
            console.log("in set");
            if (window.location.href.includes("asse.app.shebao.info")) {
              window.location.href = `http://asse.app.shebao.info/index?appid=${
                resp.data.data.appid
              }&group_id=${resp.data.data.group_id}&goto=share`;
            } else {
              window.location.href = `http://asse.html.shebao.info/index?appid=${
                resp.data.data.appid
              }&group_id=${resp.data.data.group_id}&goto=share`;
            }
            // that.$router.push({path:`/index?appid=${resp.data.data.appid}&group_id=${resp.data.data.group_id}&goto=2`})
          }, 2500);
        }
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index {
  .showModal {
    font-size: 0.11rem;
    width: 100%;
    p {
      text-align: center;
    }
    .m-top {
      height: 1rem;
      display: flex;
      div {
        flex-grow: 1;
        img {
          width: 0.48rem;
          height: 0.48rem;
          display: block;
          margin: 0.08rem auto;
        }
      }
    }
    .m-bottom {
      height: 1rem;
      display: flex;
      div {
        flex-grow: 1;
        img {
          width: 0.48rem;
          height: 0.48rem;
          display: block;
          margin: 0.08rem auto;
        }
      }
    }
    .m-cancle {
      height: 0.5rem;
      font-size: 0.16rem;
      color: #333333;
      text-align: center;
      line-height: 0.5rem;
      border-top: 0.01rem solid #eee;
    }
  }
  .kefu {
    position: fixed;
    bottom: 0.2rem;
    right: 0rem;
    width: 1rem;
    height: 1.01rem;
    z-index: 99;
    transition: all 0.3s ease;
  }
  .i-inner {
    .i-header {
      position: relative;
      .h-swiper {
        position: absolute;
        top: 1.7rem;
        left: 50%;
        transform: translateX(-50%);
        height: 0.34rem;
        width: 2.5rem;
        border-radius: 34px;
        background: rgba(0, 0, 0, 0.4);
        z-index: 99;
        .s-left {
          float: left;
          width: 0.36rem;
          height: 0.34rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.28rem;
            height: 0.28rem;
            display: block;
          }
        }
        .s-right {
          float: right;
          width: 2.14rem;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .h-more {
        position: absolute;
        top: 2.15rem;
        .m-inner {
          position: relative;
          .i-title {
            position: absolute;
            top: 0.28rem;
            width: 100%;
            text-align: center;
            font-size: 0.16rem;
            color: #fff444;
            font-family: "PingFang SC";
            span {
              font-size: 0.22rem;
            }
          }
          .i-more {
            position: absolute;
            top: 0;
            width: 86%;
            left: 7%;
            .m-box {
              padding-top: 0.8rem;
              display: flex;
              flex-wrap: wrap;
              img {
                width: 14%;
                height: 14%;
                display: inline-block;
                margin: 3%;
              }
            }
            .m-info {
              width: 100%;
              text-align: center;
              font-size: 0.13rem;
              margin-top: 0.3rem;
              color: #ffffff;
            }
            .m-btn {
              text-align: center;
              font-size: 0.18rem;
              font-weight: bold;
              color: #a84200;
              margin: 0.5rem auto;
              position: relative;
              span {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                display: inline-block;
                height: 100%;
                line-height: 0.44rem;
                text-align: center;
              }
            }
          }
          .i-more2 {
            position: absolute;
            top: 0;
            width: 86%;
            left: 7%;
            .m-input {
              input {
                width: 2.5rem;
                height: 0.44rem;
                border-radius: 30px;
                outline: none;
                background: #ffffff;
                border: none;
                padding-left: 20px;
                box-sizing: border-box;
              }
              div.i-code {
                position: relative;
                width: 2.5rem;
                height: 0.44rem;
                margin: 0.09rem auto;
                input {
                  position: absolute;
                  top: 0;
                  left: 0;
                  padding-right: 0.8rem;
                }
                span {
                  position: absolute;
                  top: 0;
                  right: 0.1rem;
                  font-size: 0.14rem;
                  color: #da442b;
                  height: 100%;
                  line-height: 0.44rem;
                }
              }
              .m-btn {
                text-align: center;
                font-size: 0.18rem;
                font-weight: bold;
                color: #a84200;
                margin: 0.35rem auto;
                margin-bottom: 0.15rem;
                position: relative;
                span {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  display: inline-block;
                  height: 100%;
                  line-height: 0.44rem;
                  text-align: center;
                }
              }
              .m-btn2 {
                border: 2px solid #ffcf00;
                color: #ffcf00;
                font-size: 0.16rem;
                text-align: center;
                line-height: 0.44rem;
                border-radius: 30px;
                margin: auto;
              }
            }
          }
        }
      }
    }
    .i-center {
      margin-top: 2.8rem;
      text-align: center;
      .c-title {
        display: flex;
        font-size: 0.16rem;
        color: #a84200;
        justify-content: center;
        font-weight: bold;
        img {
          width: 0.1rem;
          height: 0.1rem;
          margin: 0 5px;
        }
      }
      .c-active {
        width: 90%;
        margin: 10px auto;
        height: 1.5rem;
        overflow: hidden;
        background: #ffffff;
        border-radius: 10px;
        box-sizing: border-box;
      }
      .c-active2 {
        width: 90%;
        margin: 10px auto;
        min-height: 1.5rem;
        background: #ffffff;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0.08rem;
        text-align: left;
        .a-p1 {
          font-size: 0.13rem;
          color: #333333;
          text-indent: 0.26rem;
          line-height: 1.8;
          padding-bottom: 10px;
        }
        p {
          color: #888888;
          font-size: 0.13rem;
          line-height: 1.8;
        }
      }
      .c-active3 {
        width: 90%;
        margin: 10px auto;
        height: 1.5rem;
        background: #ffffff;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0.08rem;
        text-align: center;
        line-height: 1.5rem;
        font-size: 0.13rem;
        color: #888888;
      }
      .c-active4 {
        width: 90%;
        margin: 10px auto;
        background: #ffffff;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0.08rem;
        text-align: center;
        font-size: 0.13rem;
        color: #888888;
        padding-bottom: 30px;
        .c-item {
          display: flex;
          padding: 5px 0px;
          border-bottom: 1px solid #eee;
          height: 0.7rem;
          box-sizing: border-box;
          align-items: center;
          .c-s1 {
            width: 0.37rem;
            img {
              width: 0.37rem;
              height: 0.37rem;
            }
          }
          .c-s2 {
            // width: ;
            text-align: left;
            padding-left: 10px;
            h4 {
              font-size: 0.15rem;
              color: #333333;
              font-weight: bold;
              b {
                background: rgb(136, 189, 63);
                color: #ffffff;
                padding: 3px;
                font-size: 0.13rem;
                font-weight: 400;
                border-radius: 2px;
                margin-left: 5px;
              }
            }
            p {
              font-size: 0.12rem;
              color: #999999;
              margin-top: 3px;
            }
          }
          .c-s3 {
            margin-left: auto;
            font-size: 0.15rem;
            color: #999999;
            em {
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>

