<template>
  <div class="topic">
    <div class="topic-date">
      <span class="date-title">倒计时</span>
      <van-count-down
        millisecond
        style="color:#fff"
        class="prize-time"
        :time="time"
        format=" HH : mm : ss "
      ></van-count-down>
    </div>
    <div class="topic-body">
      <div class="item-title">
        <span style="padding-right:10px">{{testQuestions.topicNumber}}/{{testQuestions.totalNumber}}</span>
        <span>{{testQuestions.topicName}}</span>
      </div>
      <van-radio-group @change="genderChange" v-if="testQuestions.topicSlaveList" v-model="radio">
        <van-radio
          class="radio"
          v-for="(j ,index) in testQuestions.topicSlaveList"
          :key="index"
          :name="j.responseOptions"
        >{{j.responseOptions|responseOptions}}:{{j.content}}</van-radio>
      </van-radio-group>
    </div>

    <div>
      <p v-show="showan" @click="ckClick" class="ckdtk">查看答题卡</p>
    </div>
    <div v-show="showDtk" class="dtk-body">
      <div class="dtk-top">答题卡</div>
      <div class="dtk-qq">
        <div
          class="dtk-xyq"
          v-for="(item ,index) in answeredQues"
          :key="index"
          @click="handleTarget(item.topicNumber)"
        >
          <div class="dtk-num">{{item.topicNumber}}</div>
          <img v-show="item.isAnswer!=true" src="@/assets/img/answer/dadui.png" alt />
          <img v-show="item.isAnswer==true" src="@/assets/img/answer/dacuo.png" alt />
        </div>
      </div>
    </div>
    <div class="topic-footer">
      <span
        class="syt"
        @click="topClick"
        :class="this.testQuestions.topicNumber!=1?'syt':'dissyt'"
      >上一题</span>
      <!-- v-show="!showDtk" -->
      <span
        @click="xytClick"
        class="xyt"
        :class="this.testQuestions.topicNumber===this.testQuestions.totalNumber?'disxyt': 'xyt'"
      >下一题</span>
      <!-- v-show="showDtk" -->
      <span @click="overClick" class="jq">交卷</span>
    </div>
  </div>
</template>
<script>
let that;
import {
  generatePaper,
  nextQuestion,
  answeredQuestions,
  carryOut
} from "@/http/answer/topic";
export default {
  data() {
    return {
      radio: "",
      showDtk: false,
      showan: true,
      sqId: "",
      testQuestions: {},
      chooseOption: [],
      time: "",
      answeredQues: []
    };
  },
  beforeCreate() {
    that = this;
  },
  created() {
    for (var i = 0; i <= 5; i++) {
      var num = i;
      this.count = num;
    }
    this.sqId = this.$route.query.id;
    this.time = this.$route.query.countDown * 60 * 1000;
    console.log(" this.time", this.time);
    this.generatePapers();
    this.getDicts("act_topic_type_choose").then(res => {
      console.log("回答选项", res);
      this.chooseOption = res.data;
    });
  },
  filters: {
    responseOptions(value) {
      for (var item of that.chooseOption) {
        if (item.dictValue == value) {
          return item.dictLabel;
        }
      }
    }
  },
  methods: {
    // 查询试题
    generatePapers() {
      generatePaper({
        examPaperId: this.sqId,
        openId: localStorage.getItem("openId")
      }).then(res => {
        console.log("试题", res);
        this.testQuestions = res.data;
      });
    },
    // 点击查看答题卡
    ckClick() {
      answeredQuestions({
        answerUserId: this.testQuestions.answerUserId,
        examPaperId: this.sqId,
        masterId: this.testQuestions.masterId
      }).then(res => {
        console.log("做题情况", res);
        this.answeredQues = res.data;
      });
      this.showan = false;
      this.showDtk = true;
    },
    genderChange(value) {
      console.log(value);
    },
    // 下一题
    xytClick() {
      nextQuestion({
        topicNumber: this.testQuestions.topicNumber,
        answerResult: this.radio,
        masterId: this.testQuestions.masterId,
        answerUserId: this.testQuestions.answerUserId,
        examPaperId: this.sqId,
        targetNumber: this.testQuestions.topicNumber + 1
      }).then(res => {
        console.log(res);
        this.testQuestions = res.data;
        if (this.showan == false) {
          this.ckClick();
        }
        if (res.data.answerResult != null) {
          this.radio = res.data.answerResult;
        } else {
          this.radio = "";
        }
      });
    },
    // 上一题
    topClick() {
      if (this.testQuestions.topicNumber != 1) {
        nextQuestion({
          topicNumber: this.testQuestions.topicNumber,
          answerResult: this.radio,
          masterId: this.testQuestions.masterId,
          answerUserId: this.testQuestions.answerUserId,
          examPaperId: this.sqId,
          targetNumber: this.testQuestions.topicNumber - 1
        }).then(res => {
          console.log(res);
          this.testQuestions = res.data;
          if (this.showan == false) {
            this.ckClick();
          }
          if (res.data.answerResult != null) {
            this.radio = res.data.answerResult;
          } else {
            this.radio = "";
          }
        });
      }
    },
    //点击数标去答题
    handleTarget(index) {
      console.log(index);
      nextQuestion({
        masterId: this.testQuestions.masterId,
        topicNumber: this.testQuestions.topicNumber,
        answerResult: this.radio,
        answerUserId: this.testQuestions.answerUserId,
        examPaperId: this.sqId,
        targetNumber: index
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.testQuestions = res.data;
          this.ckClick();
          if (res.data.answerResult != null) {
            this.radio = res.data.answerResult;
          } else {
            this.radio = "";
          }
        }
      });
    },
    //倒计时结束
    // finish() {
    //   alert("时间已到");
    //   this.overClick();
    // },
    // 交卷
    overClick() {
      nextQuestion({
        topicNumber: this.testQuestions.topicNumber,
        answerResult: this.radio,
        masterId: this.testQuestions.masterId,
        answerUserId: this.testQuestions.answerUserId,
        examPaperId: this.sqId,
        targetNumber: this.testQuestions.topicNumber + 1
      }).then(res => {
        if (res.code == 200) {
          carryOut({
            examPaperId: this.sqId,
            openId: localStorage.getItem("openId"),
            answerUserId: this.testQuestions.answerUserId,
            id: this.testQuestions.masterId
          }).then(res => {
            console.log("交卷结果", res);
            if (res.code == 200) {
              this.$router.push({
                path: "/over",
                query: {
                  acquireScore: res.data.acquireScore,
                  totalScore: res.data.totalScore,
                  masterId: this.testQuestions.masterId,
                  answerUserId:res.data.answerUserId,
                  examPaperId:this.sqId
                }
              });
            }
          });
        }
      });

      // let name = "900";
    }
  }
};
</script>
<style lang="less">
.topic {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  background: linear-gradient(
    180deg,
    rgba(254, 72, 71, 1) 0%,
    rgba(252, 148, 64, 1) 100%
  );
  .topic-date {
    .date-title {
      display: inline-block;
      padding: 20px 10px 10px 55%;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
  .topic-body {
    width: 84%;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 0, 0, 1);
    border-radius: 5px;
    margin: 0 auto;
    padding-left: 21px;
    padding-bottom: 10px;
    .item-title {
      width: 86%;
      padding: 20px 0px;
    }
    .radio {
      padding: 6px;
    }
  }
  .ckdtk {
    float: right;
    margin-right: 20px;
    font-size: 14px;
    border-radius: 50px;
    width: 100px;
    color: rgba(252, 148, 64, 1);
    background: #ffffff;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .dtk-body {
    padding-top: 40px;
    width: 84%;
    margin: auto;
    padding-bottom: 50px;
    .dtk-top {
      text-align: center;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(35, 35, 35, 1);
      line-height: 36px;
      background: rgba(255, 255, 255, 1);
      border: 4px solid rgba(255, 255, 255, 1);
      border-radius: 10px 10px 0px 0px;
    }
    .dtk-qq {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin: auto;
      text-align: center;
      border-left: 3px solid #ffffff;
      border-right: 3px solid #ffffff;
      border-bottom: 3px solid #ffffff;
      // height: 300px;
      overflow: auto;
      .dtk-xyq {
        margin: 6px 5px 10px 5px;
        width: 14%;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 50%;
        .dtk-num {
          margin-top: 12px;
          color: #ffffff;
          line-height: 20px;
        }
        img {
          padding-left: 16px;
        }
      }
    }
  }
  .topic-footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: flex;
    .syt,
    .xyt,
    .jq {
      flex: 1;
      display: inline-block;
      line-height: 44px;
      text-align: center;
      color: rgba(252, 148, 64, 1);
      font-size: 16px;
      background: #fff;
    }
    .dissyt,
    .disxyt {
      display: inline-block;
      line-height: 44px;
      text-align: center;
      color: rgba(252, 148, 64, 1);
      font-size: 16px;
      background: #888;
    }
  }
  .van-count-down {
    display: inline-block;
  }
  .colon {
    display: inline-block;
    margin: 0 4px;
    color: #fff;
    font-weight: bold;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #ff0000;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    margin: 0 2px;
  }
}
</style>