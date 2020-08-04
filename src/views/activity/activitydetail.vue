<template>
  <div class="activitydetail">
    <div class="detail-jf">
      <div>
        已报名:
        <span class="top-rs">{{activeDetails.participateNumber}}</span>
      </div>
      <div>
        报名:
        <span class="top-rs">-{{activeDetails.applyIntegral}}</span>积分
      </div>
      <div>
        签到:
        <span class="top-rs">{{activeDetails.signIntegral}}</span>积分
      </div>
    </div>
    <!-- <div class="activitydetail-top">
      <span>累计</span>
      <span class="top-rs">{{activeDetails.participateNumber}}</span>
      <span>人报名参与活动</span>
    </div>-->
    <div class="activitydetail-cy">
      <div :class="name=='已结束'?'yjs':'cy-top'">{{activeDetails.activityName}}</div>
      <div class="cy-body">
        <p class="cy-sdjs">活动介绍</p>
        <div>
          {{activeDetails.activityIntroduce
          }}
        </div>
        <div class="div1">
          <div class="div2"></div>
          <span class="all" v-show="moregdShow">
            <label>... ...</label>
            <label @click="moreClick" class="ckgd">查看更多</label>
          </span>
        </div>

        <p class="cy-sdjs">发起单位</p>
        <p>{{activeDetails.unitId|initiatingList}}</p>
        <p class="cy-sdjs">报名时间</p>
        <p class="cy-bmsj">
          <span>{{activeDetails.applyStartTime}}</span>
          至
          <span>{{activeDetails.applyEndTime}}</span>
        </p>
        <p class="cy-sdjs">活动时间</p>
        <p class="cy-hdsj">
          <span>{{activeDetails.activityStartTime}}</span>
          至
          <span>{{activeDetails.activityEndTime}}</span>
        </p>
      </div>
      <!-- 进行中  未报名 -->
      <div v-show="name=='进行中' && !res.data">
        <div @click="handletjClick" class="tj-an">报名参加</div>
      </div>

      <!-- 进行中  提交成功待审-->
      <div
        v-show="name=='进行中'&& res.data && res.data.signed=='1' &&shzt=='待审核'&&res.data.canSignIn==false&&shBtn==false"
      >
        <div class="bm-an">
          <p>报名审核</p>
        </div>
        <p class="bm-bz">(信息需要审核，请耐心等待~)</p>
        <div class="bm-formqd">
          <p class="togoing">审核已经提交成功,待审核！</p>
        </div>
      </div>
      <!-- 进行中 提交报名后显示  提交成功待审-->
      <div v-show="name=='进行中'&& shzt=='待审核' &&shBtn==true">
        <div class="bm-an">
          <p>报名审核</p>
        </div>
        <p class="bm-bz">(信息需要审核，请耐心等待~)</p>
        <div class="bm-formqd">
          <p class="togoing">审核已经提交成功,待审核！</p>
        </div>
      </div>

      <!-- 进行中  已报名  审核成功-->
      <div
        v-if="name=='进行中' && res.data && res.data.signed=='1'&&shzt=='已审核'&&res.data.canSignIn==false&&showOk==false"
      >
        <div class="bm-an">
          <p>报名审核</p>
        </div>
        <p class="bm-bz">(比赛开始，记得前往签到)</p>
        <div class="bm-formqd">
          <p class="togoing">审核已通过！</p>
          <p class="togoing">各位小主，记得去现场签到...</p>
        </div>
        <div @click="reRecognize" class="tj-an">取消报名</div>
      </div>

      <!-- 取消报名  显示报名参赛 -->
      <div v-show="showOk">
        <div @click="handletjClick" class="tj-an">报名参加</div>
      </div>
      <!-- 进行中  已报名  审核未通过-->
      <div
        v-show="name=='进行中' && res.data && res.data.signed=='1'&&shzt=='审核不通过'&&res.data.canSignIn==false"
      >
        <div class="bm-an">
          <p>审核未通过</p>
        </div>

        <div class="bm-formqd" style="margin-top:10px">
          <p class="togoing">{{activeDetails.auditInfo}}</p>
          <!-- <p class="togoing">各位小主，记得去现场签到...</p> -->
        </div>
        <div @click="startRecognize" style="background:#26A5FE" class="tj-an">重新报名</div>
      </div>

      <!-- 进行中 已审核 未签到 -->
      <div
        v-if="name=='进行中' && res.data && res.data.signed=='1'&&shzt=='已审核'&&shBtn==false&&res.data.canSignIn==true"
      >
        <div class="bm-an">
          <p>报名签到</p>
        </div>
        <p class="bm-bz">(记得去现场签到，才能正式开启比赛)</p>
        <div class="bm-formqd">
          <p class="togoing">活动已经开始！</p>
          <p class="togoing">各位小主，赶快去现场签到...</p>
        </div>
        <div @click="startRecognize" class="tj-an">签到</div>
      </div>
      <!-- 进行中 已审核 已签到 -->
      <div
        v-if="name=='进行中' && res.data && res.data.signed=='0'&&shzt=='已审核'&&res.data.canSignIn==true"
      >
        <div class="bm-an">
          <p>报名签到</p>
        </div>
        <p class="bm-bz">(记得去现场签到，才能正式开启比赛)</p>
        <div class="bm-formqd">
          <p class="togoing">活动已经开始！</p>
          <p class="togoing">各位小主，赶快去现场签到...</p>
        </div>
        <div @click="startRecognize" class="tjyqd-an">已签到</div>
      </div>
      <!-- 待开启 -->
      <div v-if="name=='待开启'">
        <div class="bm-an">
          <p>报名条件</p>
        </div>
        <p class="bm-bz">(满足条件者，记得来报名)</p>
        <div class="bm-form">
          <pre>{{activeDetails.applyCondition}}</pre>
        </div>
      </div>
      <div :class="name=='已结束'?'tab-yjs':'cy-tab'">
        <van-tabs>
          <van-tab title="活动规则">
            <div class="tab-body">
              <pre>
            {{activeDetails.activityRule}}
            </pre>
            </div>
          </van-tab>
          <van-tab title="活动流程">
            <div class="tab-body">
              <pre>
            {{activeDetails.activityFlow}}
            </pre>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <van-overlay :show="show">
        <div class="wrapper">
          <div class="wrapper-top">报名成功</div>
          <div class="wrapper-body">
            <div class="wrapper-kb"></div>
            <div class="wrapper-bj">
              <p>成功提交！</p>
            </div>
            <div class="wrapper-bz">(分享活动,让更多的小伙伴参加)</div>
            <div class="wrapper-an">
              <div>立即分享</div>
              <div @click="toHome">返回首页</div>
            </div>
          </div>
          <div class="wrapper-gb" @click="successClick">X</div>
        </div>
      </van-overlay>
      <van-overlay :show="moreshow">
        <div class="morewrapper">
          <div class="morewrapper-body">
            <p>2000年5月，图书馆馆长李万春策划了一个全院学生参加的读书活动，形式是读书演讲比赛。整个活动没有确定主题，就是为了“鼓动”学生多读书。这次活动的大多数参加者是商务英语专业三个班的学生，活动效果相当不错英语专业三个班的学生，活动效果相当不错英语专业三个班的学生，活动效果相当不错2000年5月，图书馆馆长李万春策划了一个全院学生参加的读书活动，形式是读书演讲比赛。整个活动没有确定主题，就是为了“鼓动”学生多读书。这次活动的大多数参加者是商务英语专业三个班的学生.</p>
          </div>
          <div class="wrapper-gb" @click="moregbClick">X</div>
        </div>
      </van-overlay>
      <van-overlay :show="showCancelApply">
        <div class="wrapper">
          <div class="wrapper-top">取消报名</div>
          <div class="wrapper-body">
            <div class="wrapper-kb"></div>
            <div class="wrapper-bj">
              <p>确定取消报名吗！</p>
            </div>
            <div class="wrapper-bz"></div>
            <div class="wrapper-an">
              <div @click="handleOk">确定</div>
              <div @click="handleClacel">取消</div>
            </div>
          </div>
          <div class="wrapper-gb" @click="handleClacel">X</div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>
<script>
let that;
import {
  getMain,
  userAdd,
  findByOpenId,
  signIn,
  cancelApply,
} from "@/http/activity/activity";
import { deptList } from "@/http/answer/answer";
import { share } from "@/http/prize/prize";
var wx = require("weixin-js-sdk");
export default {
  data() {
    return {
      name: "",
      show: false,
      moreshow: false,
      moregdShow: true,
      id: "",
      activeDetails: {},
      deptLists: [],
      userName: "",
      userPhone: "",
      title: "",
      res: {},
      shBtn: false,
      auditList: [],
      // 审核状态
      shzt: "",
      showCancelApply: false,
      showOk: false,
    };
  },
  beforeCreate() {
    that = this;
  },
  created() {
    this.name = this.$route.query.name;
    console.log(" this.name", this.name);
    this.id = this.$route.query.id;
    console.log(this.name);
    this.getMain();
    deptList().then((res) => {
      console.log("发起单位", res);
      if (res.code == 200) {
        this.deptLists = res.rows;
      }
    });
    this.findByOpenIds();
    this.getDicts("audit_status").then((res) => {
      this.auditList = res.data;
      console.log("审核状态:", this.auditList);
    });
    this.shBtn = false;
    console.log("this.shBtn", this.shBtn);
  },
  filters: {
    initiatingList(value) {
      for (var item of that.deptLists) {
        if (item.id == value) {
          return item.unitName;
        }
      }
    },
  },
  mounted() {
    // 立即分享
    share({ url: location.href }).then((res) => {
      console.log("分享", res);
      this.appId = res.appId; // 必填，公众号的唯一标识
      this.timestamp = res.timestamp; // 必填，生成签名的时间戳
      this.nonceStr = res.nonceStr; // 必填，生成签名的随机串
      this.signature = res.signature;
    });
  },
  methods: {
    // 取消报名
    reRecognize() {
      this.showCancelApply = true;
    },
    // 取消报名
    handleClacel() {
      this.showCancelApply = false;
    },
    // 确定取消报名
    handleOk() {
      cancelApply({
        activityId: this.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        if (res.code == 200) {
          this.showOk = true;
          this.showCancelApply = false;
        }
      });
    },
    //初始化扫描控件
    startRecognize() {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.appId, // 必填，公众号的唯一标识
        timestamp: this.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.nonceStr, // 必填，生成签名的随机串
        signature: this.signature, // 必填，签名
        jsApiList: ["checkJsApi", "scanQRCode"], // 必填，需要使用的JS接口列表
      });
      wx.ready(() => {
        //分享朋友圈
        var _this = this;
        wx.checkJsApi({
          jsApiList: ["checkJsApi", "scanQRCode"],
          success: function (res) {
            console.log(res);
          },
        });
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            console.log(result);
            signIn({
              activityId: result,
              activityLatitude: _this.activeDetails.activityLatitude,
              activityLongitude: _this.activeDetails.activityLongitude,
            }).then((res) => {
              if (res.code == 200) {
                alert("签到成功");
              }
            });
          },
        });
      });
    },

    // 是否报名
    findByOpenIds() {
      this.res = {};
      findByOpenId({ activityId: this.id }).then((res) => {
        console.log("是否报名", res);
        if (res.code == 200) {
          this.res = res;
          for (let item of this.auditList) {
            if (res.data.auditStatus) {
              if (item.dictValue == res.data.auditStatus) {
                this.shzt = item.dictLabel;
                console.log(" this.shzt", this.shzt);
              }
            }
          }
        }
      });
    },
    // 详情
    getMain() {
      getMain(this.id).then((res) => {
        console.log("详情", res);
        this.activeDetails = res.data;
      });
    },

    // 提交
    handletjClick() {
      // this.showOk = false;
      userAdd({
        userName: this.userName,
        userPhone: this.userPhone,
        activityId: this.id,
      }).then((res) => {
        console.log("提交结果", res);
        if (res.code == 200) {
          this.show = true;
          this.moregdShow = false;
        } else {
          alert(res.msg);
        }
      });
    },

    // 关闭弹窗
    gbClick() {
      this.show = false;
      this.moregdShow = true;
    },
    // 成功提交
    successClick() {
      this.showOk = false;
      this.show = false;
      this.moregdShow = true;
      this.shBtn = true;
      this.findByOpenIds();
    },
    // 查看更多关闭
    moregbClick() {
      this.moreshow = false;
      this.moregdShow = true;
    },
    // 查看更多
    moreClick() {
      this.moregdShow = false;
      this.moreshow = true;
    },
    // 返回首页
    toHome() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less">
.activitydetail {
  background: #eee;
  height: 100%;
  .detail-jf {
    padding: 20px 0px;
    margin: auto;
    width: 90%;
    display: flex;
    div {
      flex: 1;
      .top-rs {
        color: #fc9440;
      }
    }
  }
  .activitydetail-top {
    text-align: right;
    height: 50px;
    line-height: 50px;
    width: 90%;
    font-size: 12px;
    margin: auto;
    letter-spacing: 1px;
  }
  .activitydetail-cy {
    width: 90%;
    margin: auto;
    .yjs {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-left: 2px solid rgba(255, 0, 0, 1);
      border-top: 2px solid rgba(255, 0, 0, 1);
      border-right: 2px solid rgba(255, 0, 0, 1);
      background: #888888;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: #fff;
    }
    .cy-top {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border: 2px solid rgba(255, 0, 0, 1);
      background: linear-gradient(
        0deg,
        rgba(254, 72, 71, 1) 0%,
        rgba(252, 148, 64, 1) 100%
      );
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: #fff;
    }
    .cy-body {
      margin-bottom: 30px;
      background: rgba(255, 255, 255, 1);
      border-left: 2px solid rgba(255, 0, 0, 1);
      border-right: 2px solid rgba(255, 0, 0, 1);
      border-bottom: 2px solid rgba(255, 0, 0, 1);
      //   border-radius: 10px;
      background: #fff;
      padding: 20px 14px;
      .cy-sdjs {
        margin-top: 0px;
        color: #26a5fe;
      }

      .div1 {
        width: 99%;
        max-height: 80px;
        /* 设置最大高度 A 根据判断 */
        position: relative;
        overflow: hidden;
        margin-bottom: 28px;
      }

      .div2 {
        line-height: 20px;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }

      .all {
        position: absolute;
        bottom: 0px;
        right: 0;
        background-color: #fff;
        // line-height: 20px;
        z-index: 100;
      }
      .all {
        .ckgd {
          font-size: 12px;
          color: #26a5fe;
        }
      }

      .cy-bmsj {
        color: rgba(252, 148, 64, 1);
        font-size: 14px;
      }
      .cy-hdsj {
        font-size: 14px;
        color: #ff4847;
      }
    }
    .bm-an {
      width: 40%;
      height: 44px;
      line-height: 44px;
      margin: auto;
      background: rgba(255, 72, 71, 1);
      color: #fff;
      text-align: center;
      font-weight: 200px;
    }
    .bm-bz {
      letter-spacing: 1px;
      width: 80%;
      height: 40px;
      line-height: 40px;
      margin: auto;
      font-size: 12px;
      color: #888888;
      text-align: center;
    }
    .bm-formqd {
      padding-top: 15px;
      height: 100px;
      margin-bottom: 24px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(255, 0, 0, 1);

      text-align: center;
      background: #fff;
      .togoing {
        color: #fc9440;
      }
    }
    .bm-form {
      padding-top: 30px;
      height: 100px;
      margin-bottom: 24px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(255, 0, 0, 1);

      text-align: center;
      background: #fff;

      .bm-lxdh {
        margin-top: 34px;
      }
      .name,
      .lxdh {
        color: #fc9440;
        font-size: 16px;
        letter-spacing: 2px;
      }
      .name {
        padding-left: 30px;
      }
      input {
        width: 200px;
        border: 2px solid rgba(150, 150, 150, 1);
        padding-left: 6px;
      }
    }
    .tj-an {
      font-weight: 500;
      width: 80%;
      height: 40px;
      line-height: 40px;
      margin: auto;
      text-align: center;
      color: #fff;
      font-size: 16px;
      letter-spacing: 2px;
      background: linear-gradient(90deg, #fc9240 0%, #fe4c46 100%);
      margin-bottom: 30px;
    }
    .tjyqd-an {
      font-weight: 500;
      width: 80%;
      height: 40px;
      line-height: 40px;
      margin: auto;
      text-align: center;
      color: #fff;
      font-size: 16px;
      letter-spacing: 2px;
      background: #eee;
      margin-bottom: 30px;
    }
    .cy-tab {
      margin: auto;
      padding-top: 18px;
      width: 100%;
      margin-bottom: 20px;
      .van-tabs__nav {
        border-left: 2px solid rgba(255, 0, 0, 1);
        border-right: 2px solid rgba(255, 0, 0, 1);
        border-top: 2px solid rgba(255, 0, 0, 1);
      }
      .van-tab {
        letter-spacing: 2px;
        font-size: 16px;
        color: #ff0000;
      }

      .van-tab--active {
        background: linear-gradient(90deg, #fc9240 0%, #fe4c46 100%);
        color: #ffffff !important;
      }
      .van-tabs__line {
        height: 0px;
      }
      .tab-body {
        height: 180px;
        overflow: scroll;
        background: #fff;
        font-size: 12px;
        padding: 12px;
        border-left: 2px solid rgba(255, 0, 0, 1);
        border-right: 2px solid rgba(255, 0, 0, 1);
        border-bottom: 2px solid rgba(255, 0, 0, 1);
        p {
          margin-top: 0px;
        }
      }
    }
    .tab-yjs {
      margin: auto;
      padding-top: 18px;
      width: 100%;
      margin-bottom: 20px;
      .van-tabs__nav {
        border-left: 2px solid rgba(255, 0, 0, 1);
        border-right: 2px solid rgba(255, 0, 0, 1);
        border-top: 2px solid rgba(255, 0, 0, 1);
      }
      .van-tab {
        color: #888;
        letter-spacing: 2px;
        font-size: 16px;
        background: #fff;
      }
      .van-tab--active {
        background: #888;
        color: #ffffff !important;
      }
      .van-tabs__line {
        height: 0px;
      }
      .tab-body {
        height: 180px;
        background: #fff;
        font-size: 12px;
        padding: 12px;
        border-left: 2px solid rgba(255, 0, 0, 1);
        border-right: 2px solid rgba(255, 0, 0, 1);
        border-bottom: 2px solid rgba(255, 0, 0, 1);
        p {
          margin-top: 0px;
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
        line-height: 100px;
        // margin: auto
        text-align: center;
        color: #f5b52c;
      }
      .wrapper-bz {
        text-align: center;
        font-size: 12px;
        color: #888;
      }
      .wrapper-an {
        padding-top: 40px;
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
  .morewrapper {
    margin-top: 100px !important;
    width: 70%;
    margin: auto;
    font-size: 14px;
    line-height: 20px;
    .morewrapper-body {
      background: #fff;
      padding: 10px 20px 30px;
      line-height: 20px;
      border-radius: 10px;
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
</style>