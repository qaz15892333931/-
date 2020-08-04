<template>
  <div class="detail">
    <div class="detail-title">幸运大转盘</div>
    <div class="detail-mintitle">天天迎好运</div>
    <div class="detail-jf">
      <van-swipe style="height: 28px;" :autoplay="3000" vertical>
        <van-swipe-item
          v-for="(item,index) in swipeList"
          :key="index"
        >刚刚{{item.phone}}获得{{item.prizeName}}</van-swipe-item>
      </van-swipe>
    </div>
    <div class="detail-wq">
      <div class="detail-dd"></div>
      <div class="detail-nq">
        <div
          class="detail-nr"
          v-for="(item,index) in awards"
          :key="index"
          :class="['award'+index,{'active': index==current}]"
        >
          <p class="award">{{item.prizeName}}*{{item.prizeNum}}</p>
          <div
            v-if="freeNum!=0"
            @click="start(index)"
            :class="name=='已结束'?'isdisabled':(name=='待开启'?'isdisabled':'detail-ljcj')"
          >
            <p class="ljcj">立即抽奖</p>
            <span class="sycs">免费次数</span>
            <span>{{freeNum}}</span>
          </div>
          <div
            v-if="freeNum==0"
            @click="exchangSstart(index)"
            :class="useNum=='0'?'disableduser':'useNumDisabled'"
          >
            <p class="ljcj">积分兑换</p>
            <span class="sydhcs">剩余次数</span>
            <span>{{useNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="name=='结束倒计时'" class="jfgz">
      <div class="zjf">总积分：{{zjf}}</div>
      <div @click="jfdhClick" class="an" :class="zjf>=10?'an':'andisabled'">抽奖兑换</div>
      <p class="angz">每兑换一次抽奖消耗10积分</p>
    </div>-->
    <div v-if="name=='待开启'||'结束倒计时'" class="dkq">
      <!-- <div class="an" @click="handleShare">立即分享</div> -->
      <p class="angz">分享成功后可获得抽奖次数</p>
    </div>
    <div class="zjmd">
      <div class="zjmd-title">
        <p class="title">中奖榜单</p>
        <p class="gd" @click="ckgdClick">查看更多>></p>
      </div>
      <div class="zjmd-top"></div>
      <div class="zjmd-body">
        <div class="body-top">
          <span>累计中奖</span>
          <span class="rs">{{total}}</span>
          <span>次</span>
        </div>
        <div class="body">
          <div class="list" v-for="(item,index) in lists" :key="index">
            <p>{{item.phone}}</p>
            <p>获得{{item.prizeName}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hdgz">
      <div class="hdgz-title">
        <p class="title">活动规则</p>
      </div>
      <div class="hdgz-body">
        <div class="kb"></div>
        <div class="hdgz">
          <div class="gz">
            <pre>{{gzList}}</pre>
          </div>
        </div>
      </div>
    </div>
    <!-- 抽奖 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="wrapper-top">总积分：{{countNum}}</div>
        <div class="wrapper-body">
          <div class="wrapper-kb"></div>
          <div class="wrapper-bj" v-show="countNum>=oncePoint">
            <span>你将消耗{{oncePoint}}积分兑换一次抽奖机会？</span>
          </div>
          <div class="wrapper-bj" v-show="countNum<oncePoint">
            <span>需要{{oncePoint}}积分才能兑换一次抽奖机会，您的积分不足</span>
          </div>
          <div class="wrapper-an" v-show="countNum>=oncePoint">
            <div @click="zxxClick">再想想</div>
            <div @click="qrClick">确认</div>
          </div>
        </div>
        <div class="wrapper-gb" @click="gbClick">X</div>
      </div>
    </van-overlay>
    <!-- 抽奖成功 -->
    <van-overlay :show="successshow">
      <div class="wrapper">
        <div class="wrapper-top">总积分：579</div>
        <div class="wrapper-body">
          <div class="wrapper-kb"></div>
          <div class="wrapper-bj">
            <span>恭喜您，兑换成功! 赶快去抽奖吧</span>
          </div>
          <div class="wrapper-an">
            <div @click="jxdhClick">继续兑换</div>
            <div @click="qcjClick">去抽奖</div>
          </div>
        </div>
        <div class="wrapper-gb" @click="gbClick">X</div>
      </div>
    </van-overlay>
    <!-- 立即抽奖 -->
    <van-overlay :show="cjshow">
      <div class="wrapper">
        <div class="wrapper-top" v-if="award.name=='谢谢参与'">你与奖品擦肩而过</div>
        <div class="wrapper-top" v-else>恭喜您，中奖啦</div>
        <div class="wrapper-body">
          <div class="wrapper-kb"></div>
          <div class="wrapper-bj">
            <span v-if="award.name=='谢谢参与'">谢谢参与</span>
            <span v-else>{{award.name}}*{{award.prizeNum}}</span>
          </div>
          <div class="wrapper-bz" v-if="award.name=='谢谢参与'">小主,分享活动可获得抽奖次数哟</div>
          <div class="wrapper-bz" v-else>奖品详情，请前往“我的”查看</div>
          <div class="wrapper-an">
            <div @click="ljfxClick">我的</div>
            <div @click="ljcjClick">继续抽奖</div>
          </div>
        </div>
        <div class="wrapper-gb" @click="gbClick">X</div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
var wx = require("weixin-js-sdk");
import {
  prizeDetails,
  drawAwards,
  desensitizationList,
  share,
  getWxUser,
  shareSuccess,
} from "@/http/prize/prize";
// 获取用户的总积分

export default {
  data() {
    return {
      show: false,
      successshow: false,
      cjshow: false,
      current: 999,
      awards: [
        // 奖品数组
      ],
      speed: 200,
      diff: 15,
      award: {},
      time: 0,
      lists: [],
      swipeList: [],
      gzList: "",
      id: "",
      name: "",
      zjf: 100,
      //免费次数
      freeNum: "",
      // 总积分
      countNum: "",
      // 积分兑换次数
      useNum: "",
      //需要多少积分兑换
      oncePoint: "",
      // 中奖人数
      total: "",
      going: false,
      appId: "", // 必填，公众号的唯一标识
      timestamp: "", // 必填，生成签名的时间戳
      nonceStr: "", // 必填，生成签名的随机串
      signature: "",
    };
  },
  created() {
    window.document.title = "";
    this.name = this.$route.query.name;
    this.id = this.$route.query.id;
    console.log(this.$route.query);
    this.prizeDetail();
    this.getUsers();
    this.desensitizationLists();
    this.swipelists();
  },
  mounted() {
    // 立即分享
    share({ url: location.href }).then((res) => {
      console.log("分享", res);
      this.appId = res.appId; // 必填，公众号的唯一标识
      this.timestamp = res.timestamp; // 必填，生成签名的时间戳
      this.nonceStr = res.nonceStr; // 必填，生成签名的随机串
      this.signature = res.signature;
      this.shard();
    });
  },
  methods: {
    shard() {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.appId, // 必填，公众号的唯一标识
        timestamp: this.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.nonceStr, // 必填，生成签名的随机串
        signature: this.signature, // 必填，签名
        jsApiList: [
          "updateTimelineShareData",
          "updateAppMessageShareData",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
        ], // 必填，需要使用的JS接口列表
      });
      wx.ready(() => {
        //分享朋友圈
        var _this = this;
        wx.onMenuShareTimeline({
          title: "222",
          desc: "1",
          link: location.href,
          imgUrl:
            "https://s.gravatar.com/avatar/749c6b1b5b84de3fa9414ada586149d9?size=100&default=retro",
          success: function () {
            // 用户点击了分享后执行的回调函数
            //回调要执行的代码
            shareSuccess({
              activityId: _this.id,
              openId: localStorage.getItem("openId"),
            }).then((res) => {
              if (res.code == 200) {
                alert("分享成功");
                _this.freeNum = res.data.freeNum;
              } else {
                alert(res.msg);
              }
            });
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            alert("分享取消");
          },
        });
        // 分享给盆友
        wx.onMenuShareAppMessage({
          success: () => {
            //回调要执行的代码
            shareSuccess({
              activityId: _this.id,
              openId: localStorage.getItem("openId"),
            }).then((res) => {
              if (res.code == 200) {
                alert("分享给盆友成功");
                _this.freeNum = res.data.freeNum;
              } else {
                alert(res.msg);
              }
            });
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            alert("分享取消给盆友");
          },
        });
      });
    },
    // 中奖列表
    desensitizationLists() {
      desensitizationList({
        activityId: this.id,
        pageNum: 1,
        pageSize: 10,
      }).then((res) => {
        console.log("中奖列表", res);
        // 前10条数据
        this.lists = res.rows;
      });
    },
    // 轮播
    swipelists() {
      desensitizationList({
        activityId: this.id,
      }).then((res) => {
        console.log("中奖列表", res);
        this.swipeList = res.rows;
        this.total = res.total;
      });
    },
    // 获取总积分
    getUsers() {
      getWxUser({ openId: localStorage.getItem("openId") }).then((res) => {
        console.log("用户信息", res);
        if (res.code == 200) {
          this.countNum = res.data.integral;
        } else {
          alert(res.msg);
        }
      });
    },
    // 详情数据
    prizeDetail() {
      console.log("this.openId", localStorage.getItem("openId"));
      prizeDetails({
        activityId: this.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.gzList = res.data.activityInfo;
          this.awards = res.data.activityPrizeVoList;
          //免费次数
          this.freeNum = res.data.activityUser.freeNum;
          // 积分兑换次数
          this.useNum = res.data.activityUser.useNum;
          this.oncePoint = res.data.oncePoint;
          console.log("兑换金额", this.oncePoint);
        }
      });
    },
    // 关闭
    gbClick() {
      this.show = false;
      this.successshow = false;
      this.cjshow = false;
      this.current = 999;
    },
    // 再想想
    zxxClick() {
      this.current = 999;
      this.show = false;
    },
    // 确认
    qrClick() {
      this.current = 999;
      this.show = false;
      this.start();
      // this.successshow = true;
    },
    // 继续兑换
    jxdhClick() {
      this.successshow = false;
      if (this.going == false) {
        this.show = true;
      }
    },
    // 去抽奖
    qcjClick() {
      this.successshow = false;
    },
    // 立即抽奖-立即分享
    ljfxClick() {
      this.$router.push({ path: "/womine" });
    },
    // 积分兑换
    exchangSstart() {
      if (this.useNum != 0 && this.going == false) {
        this.show = true;
      }
    },
    // 立即抽奖-继续抽奖
    ljcjClick() {
      this.current = 999;
      this.cjshow = false;
      this.show = false;
    },
    // 查看更多
    ckgdClick() {
      this.$router.push({
        path: "/award",
        query: {
          id: this.id,
        },
      });
    },
    // 抽奖
    start() {
      if (this.going == false) {
        if (this.name == "开始倒计时" || this.name == "结束倒计时") {
          // 开始抽奖
          this.going = true;
          this.drawAward();
          this.time = Date.now();
          this.speed = 200;
          this.diff = 15;
        }
      }
    },
    drawAward() {
      // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
      setTimeout(() => {
        drawAwards({
          activityId: this.id,
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          if (res.code == 200) {
            console.log("抽奖结果", res);
            this.award = {
              id: res.data.wxLdPrizeBase.id,
              name: res.data.wxLdPrizeBase.prizeName,
              prizeNum: res.data.wxLdPrizeBase.prizeNum,
            };
            this.move();
            this.getUsers();
            this.freeNum = res.data.activityUser.freeNum;
            this.useNum = res.data.activityUser.useNum;
          } else {
            alert(res.msg);
          }
        });
      }, 0);
    },
    move() {
      window.timeout = setTimeout(() => {
        this.current++;
        if (this.current > 7) {
          this.current = 0;
        }
        // 若抽中的奖品id存在，则开始减速转动
        if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
          this.speed += this.diff; // 转动减速
          // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来！
          if (
            (Date.now() - this.time) / 1000 > 4 &&
            this.award.id == this.awards[this.current].prizeId
          ) {
            clearTimeout(window.timeout);
            setTimeout(() => {
              // alert("恭喜你，抽中了" + this.award.name);
              this.cjshow = true;
              this.going = false;
            }, 0);
            return;
          }
          // 若抽中的奖品不存在，则加速转动
        } else {
          this.speed -= this.diff;
        }

        this.move();
      }, this.speed);
    },
    // 积分兑换
    jfdhClick() {
      if (this.zjf >= 10) {
        this.show = true;
      }
    },
  },
};
</script>
<style lang="less">
.detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(114, 69, 247, 1) 0%,
    rgba(71, 146, 252, 1) 52%,
    rgba(114, 69, 247, 1) 100%
  );
  .detail-title {
    letter-spacing: 8px;
    font-size: 30px;
    line-height: 68px;
    font-family: HuXiaoBo-NanShen;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
  .detail-mintitle {
    letter-spacing: 6px;
    text-align: center;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 10px;
  }
  .detail-jf {
    color: #dd2929;
    text-align: center;
    margin: 0 auto;
    width: 240px;
    height: 30px;
    line-height: 30px;
    background: rgba(255, 255, 255, 1);
    border-radius: 30px;
    font-size: 12px;
  }
  .detail-wq {
    margin: 20px auto;
    width: 92%;
    height: 340px;
    background: rgba(241, 231, 114, 1);
    box-shadow: 0px 5px 8px 0px rgba(58, 41, 115, 0.48);
    border-radius: 30px;
    margin-bottom: 20px;
    .detail-dd {
      width: 92%;
      width: 10px;
      height: 10px;
    }
    .detail-nq {
      width: 96%;
      height: 95%;
      background: rgba(222, 124, 64, 1);
      border-radius: 25px;
      position: relative;
      margin: auto;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .active {
        background: #ffd2af !important;
        border: 3px solid #05b7ed;
      }
      .detail-nr {
        text-align: center;
        line-height: 90px;
        color: #ff1010;
        margin-top: 10px;
        width: 30%;
        height: 90px;
        background: rgba(255, 246, 246, 1);
        border-radius: 10px;
        .award {
          margin: 0px;
        }
      }
      .award4 {
        margin-left: 100px;
      }
      .detail-ljcj {
        position: absolute;
        top: 35%;
        left: 37%;
        margin: auto;
        color: rgba(221, 41, 41, 1);
        line-height: 30px;
        margin-top: 10px;
        width: 90px;
        height: 90px;
        background: rgba(255, 246, 246, 1);
        border-radius: 50%;
        .ljcj {
          margin-bottom: 0px;
        }
        .sycs {
          font-size: 10px;
          padding-right: 4px;
        }
        .sydhcs {
          font-size: 10px;
        }
      }
      .isdisabled {
        position: absolute;
        top: 35%;
        left: 37%;
        margin: auto;
        color: rgba(221, 41, 41, 1);
        line-height: 36px;
        margin-top: 10px;
        width: 90px;
        height: 90px;
        background: #a0a0a0 !important;
        border-radius: 50%;
        .ljcj {
          margin-bottom: 0px;
        }
        .sycs {
          font-size: 10px;
        }
      }
      .disableduser {
        position: absolute;
        top: 35%;
        left: 37%;
        margin: auto;
        color: rgba(221, 41, 41, 1);
        line-height: 36px;
        margin-top: 10px;
        width: 90px;
        height: 90px;
        background: #a0a0a0 !important;
        border-radius: 50%;
        .ljcj {
          margin-bottom: 0px;
        }
        .sydhcs {
          font-size: 10px;
        }
      }
      .useNumDisabled {
        position: absolute;
        top: 35%;
        left: 37%;
        margin: auto;
        color: rgba(221, 41, 41, 1);
        line-height: 34px;
        margin-top: 10px;
        width: 90px;
        height: 90px;
        background: #fff !important;
        border-radius: 50%;
        .ljcj {
          margin-bottom: 0px;
        }
        .sydhcs {
          font-size: 10px;
        }
      }
    }
  }
  .jfgz {
    width: 100%;
    .zjf {
      text-align: center;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(253, 253, 253, 1);
      line-height: 28px;
      padding-bottom: 8px;
    }
    .an {
      background: rgba(235, 97, 0, 1);
      box-shadow: 0px 5px 8px 0px rgba(58, 41, 115, 0.48);
      border-radius: 45px;
      width: 45%;
      height: 40px;
      font-size: 20px;
      letter-spacing: 6px;
      font-family: PingFang SC;
      font-weight: 800;
      color: rgba(253, 253, 253, 1);
      line-height: 40px;
      margin: auto;
      text-align: center;
    }
    .andisabled {
      background: #888888;
      box-shadow: 0px 5px 8px 0px rgba(58, 41, 115, 0.48);
      border-radius: 45px;
      width: 45%;
      height: 40px;
      font-size: 20px;
      letter-spacing: 6px;
      font-family: PingFang SC;
      font-weight: 800;
      color: rgba(253, 253, 253, 1);
      line-height: 40px;
      margin: auto;
      text-align: center;
    }
    .angz {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(253, 253, 253, 1);
      line-height: 28px;
      text-align: center;
      margin-top: 4px;
    }
  }
  .dkq {
    .an {
      background: #eb6100;
      box-shadow: 0px 5px 8px 0px rgba(58, 41, 115, 0.48);
      border-radius: 45px;
      width: 45%;
      height: 40px;
      font-size: 20px;
      letter-spacing: 6px;
      font-family: PingFang SC;
      font-weight: 800;
      color: rgba(253, 253, 253, 1);
      line-height: 40px;
      margin: auto;
      text-align: center;
    }
    .angz {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(253, 253, 253, 1);
      line-height: 28px;
      text-align: center;
      margin-top: 10px;
    }
  }
  .zjmd {
    .zjmd-title {
      display: flex;
      justify-content: space-between;
      .title {
        margin: 10px;
        letter-spacing: 5px;
        font-family: PingFang SC;
        font-weight: 800;
        font-size: 28px;
        color: rgba(221, 215, 41, 1) !important;
        padding-left: 10%;
      }
      .gd {
        color: #ffffff;
        margin: auto;
        padding-left: 20%;
        font-size: 14px;
      }
    }
    .zjmd-top {
      margin: 0 auto;
      width: 90%;
      height: 6px;
      background: rgba(70, 40, 150, 1);
      border-radius: 6px;
    }
    .zjmd-body {
      margin: 0 auto;
      width: 88%;
      height: 400px;
      background: rgba(165, 133, 251, 1);
      box-shadow: 0px 5px 8px 0px rgba(58, 41, 115, 0.48);
      margin-bottom: 50px;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      .body-top {
        color: #ffffff;
        padding-top: 20px;
        text-align: right;
        padding-right: 5%;
        padding-bottom: 2px;
        .rs {
          color: #ddd729;
          letter-spacing: 1px;
        }
      }
      .body {
        margin: 0 auto;
        width: 88%;
        height: 340px;
        overflow: scroll;
        background: rgba(113, 71, 225, 1);
        border-radius: 10px;
        .list {
          font-size: 14px;
          width: 98%;
          color: #ffffff;
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
  .hdgz {
    .hdgz-title {
      display: flex;
      justify-content: space-between;
      .title {
        margin: 10px;
        letter-spacing: 5px;
        font-family: PingFang SC;
        font-weight: 800;
        font-size: 28px;
        color: rgba(221, 215, 41, 1) !important;
        padding-left: 10%;
      }
    }

    .hdgz-body {
      margin: 0 auto;
      width: 88%;
      height: 360px;
      background: rgba(165, 133, 251, 1);
      box-shadow: 0px 5px 8px 0px rgba(58, 41, 115, 0.48);
      margin-bottom: 50px;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      .kb {
        height: 20px;
      }
      .hdgz {
        margin: 0 auto;
        width: 88%;
        height: 300px;
        overflow: scroll;
        background: rgba(113, 71, 225, 1);
        border-radius: 10px;
        font-size: 14px;
        color: #ffffff;
        .gz {
          width: 94%;
          margin: auto;
          line-height: 20px;
        }
      }
    }
  }
  .wrapper {
    margin-top: 100px !important;
    width: 74%;
    margin: auto;
    .wrapper-top {
      background-color: #f5b52c;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
    .wrapper-body {
      width: 100%;
      height: 240px;
      background: #fff;
      .wrapper-kb {
        height: 20px;
      }
      .wrapper-bj {
        margin: auto;
        width: 80%;
        height: 100px;
        background: #fff4cc;
        margin-bottom: 20px;
        span {
          padding-top: 20px;
          line-height: 30px;
          display: block;
          width: 200px;
          text-align: center;
          margin: auto;
          color: #a30303;
        }
      }
      .wrapper-bz {
        text-align: center;
        font-size: 12px;
        color: #888;
      }
      .wrapper-an {
        padding-top: 30px;
        width: 80%;
        display: flex;
        margin: auto;
        justify-content: space-between;
        font-size: 12px;
        color: #fff;
        padding-bottom: 20px;
        div {
          background: #f5b52c;
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50px;
        }
      }
    }
    .wrapper-gb {
      margin: auto;
      margin-top: 30px;
      color: #f5f5f5;
      border: 2px solid #f5f5f5;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
    }
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
.van-swipe__indicators--vertical {
  display: none;
}
</style>