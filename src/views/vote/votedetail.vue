<template>
  <div class="votedetail">
    <div class="votedetai-bm" v-if="name=='进行中'||name=='待开启'" @click="bmClick">
      <img src="@/assets/img/vote/baoming.png" alt />
      <p>报名</p>
    </div>
    <div class="scroll">
      <img src="@/assets/img/vote/bg.png" alt />
    </div>
    <div class="vote-body">
      <div class="hdmc">活动名称</div>
      <van-tabs>
        <van-tab title="活动描述"></van-tab>
        <van-tab title="活动奖励">
          <div class="hdjl">
            <div>50名入围条件和奖励：</div>
            <div>1.票数：2500票（暂定）</div>
            <div>2.直接拥有道奇商城的会员资格，享受平台会员政策。</div>
            <div>一、50名入围者：</div>
            <div>1.直接拥有道奇商城会员资格，享受平台会员政策。</div>
            <div>2.终身享受道奇针织提供的若艾茵品牌袜供应（每年20双）。</div>
            <div>二、晋级20名半决赛者：</div>
            <div>1.直接拥有道奇商城会员资格，享受平台会员政策。</div>
            <div>2.终身享受道奇针织提供的若艾茵品牌袜供应（每年20双）。</div>
          </div>
        </van-tab>
        <van-tab title="活动规则"></van-tab>
      </van-tabs>
      <div class="jsdate" v-if="name=='进行中'">
        <span class="date-title">距离投票结束还有</span>
        <span class="date-num">19</span>
        天
        <span class="date-num">13</span>
        时
        <span class="date-num">57</span>
        分
      </div>
      <div class="jsdate" v-if="name=='待开启'">
        <span class="date-title">距离活动开始还有</span>
        <span class="date-num">19</span>
        天
        <span class="date-num">13</span>
        时
        <span class="date-num">57</span>
        分
      </div>
      <div class="jsdate" v-if="name=='已结束'">
        <span class="date-title">距离投票结束还有</span>
        <span class="date-num">0</span>
        天
        <span class="date-num">0</span>
        时
        <span class="date-num">0</span>
        分
      </div>
      <div class="vote-fg">
        <div>
          <p>125</p>
          <p>报名人数</p>
        </div>
        <div class="fg-bg"></div>
        <div>
          <p>125</p>
          <p>总票数</p>
        </div>
        <div class="fg-bg"></div>
        <div>
          <p>2555555</p>
          <p>浏览总量</p>
        </div>
      </div>
      <div class="vote-susu" v-if="name=='进行中'||name=='已结束'">
        <input type="text" placeholder="搜索编号" />
        <span class="susu-an">搜索</span>
      </div>
      <div class="vote-footer" v-if="name=='进行中'||name=='已结束'">
        <div class="footer-top">
          <div @click="itemClick(name)">
            <img class="tx-two" src="@/assets/img/vote/tx.png" alt />
            <img class="tx-numtwo" src="@/assets/img/vote/two.png" alt />
            <p class="top-name">熊大</p>
            <p class="top-id">ID 123546</p>
            <p class="top-ps">123455票</p>
            <p class="top-an" :class="name=='已结束'?'nameyjs':'top-an'">投票</p>
          </div>
          <div @click="itemClick(name)">
            <img class="tx-one" src="@/assets/img/vote/tx.png" alt />
            <img class="tx-numone" src="@/assets/img/vote/one.png" alt />
            <p class="top-name">李师师</p>
            <p class="top-id">ID 123546</p>
            <p class="top-ps">123455票</p>
            <p class="top-an" :class="name=='已结束'?'nameyjs':'top-an'">投票</p>
          </div>
          <div @click="itemClick(name)">
            <img class="tx-three" src="@/assets/img/vote/tx.png" alt />
            <img class="tx-numthree" src="@/assets/img/vote/three.png" alt />

            <p class="top-name">莎莎</p>
            <p class="top-id">ID 123546</p>
            <p class="top-ps">123455票</p>
            <p class="top-an" :class="name=='已结束'?'nameyjs':'top-an'">投票</p>
          </div>
        </div>
        <div class="footer-list">
          <div
            @click="itemClick(name)"
            class="footer-vote"
            v-for="(item,index) in list"
            :key="index"
          >
            <div class="box">
              <p>{{item.num}}</p>
            </div>
            <div class="vote-left">
              <img src="@/assets/img/vote/tx.png" alt />
              <div>
                <span class="item-name">{{item.name}}</span>
                <span>ID:{{item.id}}</span>
                <p class="item-ps">{{item.ps}}</p>
              </div>
            </div>
            <div class="vote-right">
              <p class="right" :class="name=='已结束'?'nameyjs':'right'">{{item.an}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="name=='待开启'" class="dkq">
        <div class="dkqan">
          <p>刚刚180****4567用户报名参加比赛</p>
        </div>
        <div class="dkqlist">
          <div class="list-item" v-for="(item,index) in phoneList" :key="index">
            <div class="list-phone">{{item.phone}}</div>
            <div class="list-date">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { voteDetail } from "@/http/vote/vote";
export default {
  data() {
    return {
      name: "",
      list: [
        {
          num: "4",
          name: "李师师",
          ps: "100000票",
          id: "11111",
          an: "投票",
        },
        {
          num: "4",
          name: "李师师",
          ps: "100000票",
          id: "11111",
          an: "投票",
        },
        {
          num: "4",
          name: "李师师",
          ps: "100000票",
          id: "11111",
          an: "投票",
        },
        {
          num: "4",
          name: "李师师",
          ps: "100000票",
          id: "11111",
          an: "投票",
        },
      ],
      phoneList: [
        { phone: "15632456325", date: "1分钟前报名参赛" },
        { phone: "15632456325", date: "1分钟前报名参赛" },
        { phone: "15632456325", date: "1钟前报名参赛" },
        { phone: "15632456325", date: "1分钟前报名参赛" },
        { phone: "15632456325", date: "1分钟前报名参赛" },
        { phone: "15632456325", date: "1分钟前报名参赛" },
        { phone: "15632456325", date: "1分钟前报名参赛" },
        { phone: "15632456325", date: "1分钟前报名参赛" },
        { phone: "15632456325", date: "1分钟前报名参赛" },
        { phone: "15632456325", date: "1分钟前报名参赛" },
      ],
    };
  },
  created() {
    this.name = this.$route.query.name;
    this.id = this.$route.query.id;
    console.log("this.name", this.name);
  },
  methods: {
    // 详情数据
    voteDetail(){},
    itemClick(name) {
      if (name == "进行中") {
        this.$router.push("/voteproflie");
      }
    },
    // 报名
    bmClick() {
      this.$router.push("/apply");
    },
  },
};
</script>
<style lang="less">
.votedetail {
  .votedetai-bm {
    position: fixed;
    right: 20px;
    top: 300px;
    background: rgba(0, 160, 233, 1);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    color: #fff;
    text-align: center;
    z-index: 999;
    img {
      margin-top: 10px;
    }
    p {
      margin-top: 6px;
    }
  }
  .scroll {
    width: 100%;
    height: 164px;
    text-align: center;
  }
  .vote-body {
    background: linear-gradient(
      180deg,
      rgba(254, 72, 71, 1) 0%,
      rgba(252, 148, 64, 1) 100%
    );
    .hdmc {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #ffffff;
      letter-spacing: 2px;
      font-weight: bold;
    }
    .van-tab--active {
      background: linear-gradient(
        188deg,
        rgba(255, 212, 119, 1) 0%,
        rgba(252, 148, 64, 1) 100%
      );
      color: #ffffff !important;
    }
    .van-tabs__line {
      height: 0px;
    }
    .van-tabs {
      margin: auto;
      width: 94%;
      height: 260px;
    }
    .van-tab {
      border-bottom: 2px solid rgba(252, 148, 64, 1);
      color: #232323;
    }
    .hdjl {
      background: #fff;
      padding-bottom: 20px;
      padding-top: 6px;
      div {
        padding-top: 4px;
        padding-left: 12px;
        font-size: 12px;
      }
    }
    .jsdate {
      margin-top: 20px !important;
      text-align: center;
      width: 94%;
      height: 46px;
      line-height: 46px;
      background: rgba(255, 255, 255, 1);
      opacity: 0.6;
      border-radius: 10px;
      margin: auto;
      z-index: 999;
      color: #232323;
      .date-num {
        color: #6582ff;
      }
    }
    .vote-fg {
      padding-top: 20px;
      text-align: center;
      margin: auto;
      width: 88%;
      display: flex;
      justify-content: space-between;
      color: #fff;
      .fg-bg {
        width: 2px;
        height: 60px;
        background: #fff;
        margin: auto;
        opacity: 0.7;
      }
    }
    .vote-susu {
      padding-top: 20px;
      width: 88%;
      margin: auto;
      input {
        height: 30px;
        line-height: 30px;
        background: rgba(255, 255, 255, 1);
        opacity: 0.6;
        border-radius: 10px;
        padding-left: 6px;
        border: none;
        width: 60%;
      }
      .susu-an {
        margin-left: 10%;
        display: inline-block;
        width: 70px;
        height: 30px;
        line-height: 30px;
        background: #febf65;
        border-radius: 50px;
        color: #fff;
        text-align: center;
      }
    }
    .vote-footer {
      background: #fff;
      width: 94%;
      margin: auto;
      margin-top: 20px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      .footer-top {
        display: flex;
        justify-content: space-around;
        padding-top: 20px;
        margin-bottom: 20px;
        position: relative;
        text-align: center;
        p {
          margin: 8px;
          font-family: PingFang SC;
          font-size: 14px;
        }
        .tx-two,
        .tx-three {
          padding-top: 15px;
        }
        .tx-one {
          width: 100px;
          height: 100px;
        }

        .tx-numtwo {
          position: absolute;
          left: 13%;
          top: 42%;
        }
        .tx-numone {
          position: absolute;
          left: 47%;
          top: 42%;
        }
        .tx-numthree {
          position: absolute;
          left: 81%;
          top: 42%;
        }

        .top-ps {
          color: #f1b127;
        }
        .top-an {
          width: 60px;
          height: 26px;
          line-height: 26px;
          margin: auto;
          background: linear-gradient(
            180deg,
            rgba(255, 212, 119, 1) 0%,
            rgba(252, 148, 64, 1) 100%
          );

          border-radius: 18px;
          color: #fff;
        }
        .nameyjs {
          background: #888;
        }
      }
      .footer-list {
        width: 96%;
        margin: auto;
        padding-bottom: 60px;
        .footer-vote {
          border-top: 10px solid #fff;
          border-bottom: 6px solid #fff;
          background: #d0effd;
          display: flex;
          position: relative;
          .box {
            width: 0px;
            height: 0px;
            border: 24px solid;
            border-color: #ea68a2 transparent transparent #ea68a2;
            p {
              position: absolute;
              left: 2px;
              top: 8px;
              margin: 0px;
              font-size: 20px;
              color: #fff;
            }
          }

          .vote-left {
            padding: 15px 0px 20px 0px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(35, 35, 35, 1);
            display: flex;
            img {
              width: 60px;
              height: 60px;
            }
            p {
              margin-top: 4px;
              margin-bottom: 8px;
            }
            .item-name {
              padding-left: 20px;
              padding-right: 10px;
            }
            .item-ps {
              padding-left: 20px;
              padding-top: 8px;
              color: #f1b127;
            }
          }
          .vote-right {
            margin-top: 6%;
            position: absolute;
            right: 4px;
            color: #fff;
            .right {
              font-size: 14px;
              width: 60px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              background: linear-gradient(
                180deg,
                rgba(255, 212, 119, 1) 0%,
                rgba(252, 148, 64, 1) 100%
              );

              border-radius: 18px;
            }
            .nameyjs {
              background: #888;
            }
          }
        }
      }
    }
    .dkq {
      margin-top: 20px;
      padding-bottom: 80px;
      .dkqan {
        width: 70%;
        margin: auto;
        background: rgba(255, 255, 255, 1);
        opacity: 0.6;
        border-radius: 10px;
        text-align: center;
        p {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(35, 35, 35, 1);
          line-height: 36px;
        }
      }
      .dkqlist {
        width: 90%;
        background: #fff;
        margin: auto;
        border-radius: 20px 20px 0px 0px;
        color: rgba(35, 35, 35, 1);
        line-height: 36px;
        font-size: 14px;
        height: 300px;
        overflow: scroll;
        .list-item {
          display: flex;
          justify-content: space-between;
          .list-phone {
            padding-left: 20px;
          }
          .list-date {
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>