<template>
  <div class="startanswer">
    <div class="start-top">
      <span class="start-lj">累计</span>
      <span class="start-rs">{{details.cumulativeDoTopicUser}}</span>
      <span class="start-cyr">人参与答题</span>
      <span @click="handleGz" class="start-gz">答题规则</span>
    </div>
    <div class="gz">
      <!-- 活动进行中 -->
      <div v-if="(name=='答题'&& examProgress=='2')||(name=='再次答题'&& examProgress=='2')">
        <p class="gz-nr">你正在参与{{details.name}}</p>
        <p class="gz-nr">在规定时间内全部答对，将获得</p>
        <p class="gz-jf">{{details.dailyAnswerReward}}</p>
        <p class="gz-fs">
          (共{{details.examTopicNum}}道题，{{prizesList.timeBar}}分钟内完成并全部答对，
          即可获得{{details.dailyAnswerReward}})
        </p>
      </div>
      <!-- 活动未开始 -->
      <div v-if="name=='查看' &&  examProgress=='1'">
        <p class="gz-nr">{{details.name}}</p>
        <p class="gz-nr">活动时间：{{details.answerStartTime}}</p>
        <p class="gz-jf">即将开始</p>
        <p class="gz-fss">(请准时前来报名)</p>
      </div>
      <!-- 已结束  没做题 -->
      <div v-if="name=='查看' &&  examProgress=='3'&& details.userAnswerNum<=0">
        <p class="gz-nr">很遗憾!</p>
        <p class="gz-nr">你没有参与答题</p>
        <p class="gz-fs">
          (共{{details.examTopicNum}}道题，{{prizesList.timeBar}}分钟内完成并全部答对，
          即可获得{{details.dailyAnswerReward}})
        </p>
      </div>
      <!--已结束 做过题  全对-->
      <div v-if="name=='查看' &&  examProgress=='3'&& details.userAnswerNum>0">
        <p class="gz-nr">恭喜您，已完成答题</p>
        <p class="gz-jf">成功获得奖励</p>
        <p class="gz-fs">
          (共{{details.examTopicNum}}道题，{{prizesList.timeBar}}分钟内完成并全部答对，
          即可获得{{details.dailyAnswerReward}})
        </p>
      </div>
    </div>
    <div class="start-an" v-if="name=='答题'">
      <div class="ksdt" @click="imgClick">开始答题</div>
    </div>
    <!-- 活动未开始 -->
    <div class="start-an" v-if="name=='查看' &&  examProgress=='1'">
      <div class="ksdt" @click="shareClick">分享活动</div>
    </div>
    <!-- 活动已结束  -->
    <div class="start-an" v-if="name=='查看' &&  examProgress=='3'">
      <div class="ksjs" @click="shareClick">活动结束</div>
    </div>
    <div class="start-anzcdt" v-if="name=='再次答题'">
      <div class="ckxq" @click="againClick">查看详情</div>
      <div class="zcdt" @click="imgClick">再次答题</div>
    </div>
    <div class="start-phb" v-show="examProgress==3">
      <div>
        <span class="phb">排 行 榜</span>
        <span class="phb-lj">累计</span>
        <span class="phb-rs">{{tableList.length}}</span>
        <span class="phb-lj">人中奖</span>
      </div>
      <div class="phb-table">
        <div class="phn-mine">
          <span class="mime-pm">您的排名</span>
          <span class="mime-mc">{{onlyRank.ranking}}</span>
        </div>
        <div class="table-title">
          <span class="title-pm">排名</span>
          <span class="title-yhm">用户名</span>
          <!-- <span class="title-lj">累计获奖</span> -->
        </div>
        <div class="body">
          <div class="table-body" v-for="(item,index) in tableList" :key="index">
            <span
              class="body-pm"
              :class="item.ranking=='1'?'num1':(item.ranking=='2'?'num2':(item.ranking=='3'?'num3':''))"
            >{{item.ranking}}</span>
            <span class="body-yhm">{{item.username}}</span>
            <!-- <span class="body-lj">{{item.lj}}</span> -->
          </div>
        </div>
      </div>
      <div style="height:20px"></div>
    </div>
    <!-- 规则 -->
    <van-overlay :show="gzshow">
      <div class="wrapper">
        <div class="wrapper-top">活动规则</div>
        <div class="wrapper-body">{{details.answerRulesKey}}</div>
        <div class="wrapper-gb" @click="gbClick">X</div>
      </div>
    </van-overlay>
    <van-overlay :show="shareShow">
      <div class>图标指引</div>
    </van-overlay>
  </div>
</template>
<script>
import { generatePaper } from "@/http/answer/topic";
import {
  answerDetail,
  selectRanks,
  selectonlyRank,
  statistics,
} from "@/http/answer/answer";
import { nextQuestion } from "@/http/answer/topic";
export default {
  data() {
    return {
      gzshow: false,
      details: {},
      tableList: [],
      name: "",
      ansId: "",
      examProgress: "",
      // 倒计时
      countDown: "",
      shareShow: false,
      prizesList: "",
      onlyRank: {},
    };
  },
  created() {
    this.name = this.$route.query.name;
    console.log(this.name);
    this.ansId = this.$route.query.id;
    this.examProgress = this.$route.query.examProgress;
    this.selectRank();
    this.selectonlyRank();
    this.answerDetail();
    this.statisticss();
  },
  methods: {
    // 积分详情
    statisticss() {
      statistics({
        id: this.ansId,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log("积分详情", res);
        this.prizesList = res.data;
      });
    },
    handleGz() {
      this.gzshow = true;
    },
    // 关闭
    gbClick() {
      this.gzshow = false;
    },
    // 列表详情
    answerDetail() {
      answerDetail({
        id: this.ansId,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log("详情111", res);
        this.details = res.data;
        this.countDown = res.data.timeBar;
      });
    },
    // 分享活动
    shareClick() {
      // this.shareShow = true;
    },
    // 开始答题
    imgClick() {
      generatePaper({
        examPaperId: this.ansId,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log("试题", res);
        if (res.code == 200) {
          this.$router.push({
            path: "/topic",
            query: {
              id: this.ansId,
              countDown: this.countDown,
            },
          });
        } else {
          alert(res.msg);
        }
      });
    },
    // 最近一次做题的详情
    againClick() {
      this.$router.push({
        path: "/resolve",
        query: {
          again: 1,
          masterId: this.ansId,
        },
      });
    },
    // 全部排名
    selectRank() {
      selectRanks({ examPaperId: this.ansId }).then((res) => {
        console.log("全部排名", res);
        if (res.code == 200) {
          this.tableList = res.rows;
        }
      });
    },
    //自己排名
    selectonlyRank() {
      selectonlyRank({
        examPaperId: this.ansId,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log("自己排名", res);
        if (res.code == 200) {
          this.onlyRank = res.data;
        }
      });
    },
  },
};
</script>
<style lang="less">
.startanswer {
  width: 100%;
  height: 100vh;
  background-color: #eeeeee;
  .start-top {
    padding: 20px 0px 10px 0px;
    .start-lj,
    .start-cyr {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(35, 35, 35, 1);
      line-height: 18px;
    }
    .start-lj {
      padding-left: 9%;
    }
    .start-rs {
      color: #fc9440;
      font-size: 12px;
    }
    .start-gz {
      padding-left: 40%;
      width: 47px;
      height: 12px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(136, 136, 136, 1);
      line-height: 18px;
    }
  }
  .gz {
    margin: 0 auto;
    margin-bottom: 30px;
    width: 85%;
    height: 193px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 0, 0, 1);
    border-radius: 5px;
    .gz-nr {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(35, 35, 35, 1);
      line-height: 18px;
      text-align: center;
    }
    .gz-jf {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(252, 148, 64, 1);
      line-height: 18px;
      text-align: center;
    }
    .gz-fs {
      margin: auto;
      width: 200px;
      height: 29px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(136, 136, 136, 1);
      line-height: 18px;
    }
    .gz-fss {
      margin: auto;
      width: 100px;
      height: 29px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(136, 136, 136, 1);
      line-height: 18px;
    }
  }
  .start-an {
    text-align: center;
    padding-bottom: 40px;
    .ksdt {
      margin: auto;
      font-size: 20px;
      border-radius: 5px;
      width: 65%;
      height: 50px;
      line-height: 50px;
      color: #ffffff;
      background: linear-gradient(90deg, #fc9240 0%, #fe4c46 100%);
    }
    .ksjs {
      margin: auto;
      font-size: 20px;
      border-radius: 5px;
      width: 65%;
      height: 50px;
      line-height: 50px;
      color: #eee;
      background: #8a878a;
    }
  }
  .start-anzcdt {
    text-align: center;
    padding: 0px 20px 40px 20px;
    display: flex;
    justify-content: space-around;
    .ckxq,
    .zcdt {
      font-size: 20px;
      border-radius: 5px;
      width: 35%;
      height: 50px;
      line-height: 50px;
      color: #ffffff;
      background: linear-gradient(90deg, #fc9240 0%, #fe4c46 100%);
    }
  }
  .start-phb {
    .phb {
      display: inline-block;
      width: 80px;
      height: 17px;
      padding-left: 40px;
      padding-right: 138px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 800;
      color: rgba(35, 35, 35, 1);
      line-height: 18px;
    }
    .phb-lj {
      width: 101px;
      height: 12px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(35, 35, 35, 1);
      line-height: 18px;
    }
    .phb-rs {
      width: 101px;
      height: 12px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fc9440;
      line-height: 18px;
    }
  }
  .phb-table {
    margin: 0 auto;
    width: 85%;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 0, 0, 1);
    border-radius: 5px;
    .phn-mine {
      line-height: 47px;
      width: 100%;
      height: 47px;
      border: 1px solid rgba(255, 0, 0, 1);
      background: linear-gradient(
        0deg,
        rgba(254, 72, 71, 1) 0%,
        rgba(252, 148, 64, 1) 100%
      );
      border-radius: 5px;

      .mime-pm,
      .mime-fs,
      .mime-lj,
      .mime-mc {
        width: 47px;
        height: 12px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 21px;
      }
      .mime-pm {
        padding-left: 15px;
        padding-right: 26px;
      }
      .mime-lj {
        padding-left: 67px;
        padding-right: 26px;
      }
    }
    .table-title {
      padding-top: 15px;
      display: flex;
      justify-content: space-around;
      .title-pm,
      .title-lj,
      .title-yhm {
        padding: 2px 10px;
        border: 1px solid rgba(255, 0, 0, 1);
        border-radius: 5px;
      }
      .title-pm {
        margin-left: 10px;
      }
      .title-yhm {
        margin-left: 10%;
      }
      .title-lj {
        margin-left: 10%;
      }
    }
    .body {
      height: 30vh;
      overflow: scroll;
      .table-body {
        display: flex;
        justify-content: space-around;
        height: 18px;
        padding-top: 15px;
        .body-pm {
          padding-left: 10px;
          padding-right: 15px;
        }
      }
    }
  }
  .num1,
  .num2,
  .num3 {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 21px;
  }
  .num1 {
    background-image: url("../../assets/img/startanswer/one_huangguan.png");
  }
  .num2 {
    background-image: url("../../assets/img/startanswer/tew_huangguan.png");
  }
  .num3 {
    background-image: url("../../assets/img/startanswer/three_huangguan.png");
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
}
</style>