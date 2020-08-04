<template>
  <div class="topic">
    <div class="topic-date">
      <span class="date-title">共用时 {{resolveList.doTime}} 秒</span>
    </div>
    <div class="topic-body">
      <div>
        <div class="item-title">
          <span style="padding-right:10px">{{resolveList.topicNumber}}/{{analysisList.length}}</span>
          <span>{{resolveList.topicName}}</span>
        </div>
        <van-radio-group v-model="radio">
          <van-radio
            class="radio"
            v-for="(item,index) in resolveList.topicSlaveList"
            :key="index"
            :name="item.responseOptions"
          >{{item.responseOptions|responseOptions}}:{{item.content}}</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div>
      <p @click="handleOut" class="out">退出</p>
      <p v-show="showan" @click="ckClick" class="ckdtk">查看答题卡</p>
      <p v-show="showDtk" @click="handleResolver" class="ckdtk">查看答题解析</p>
    </div>
    <div v-show="showDtk" class="dtk-body">
      <div class="dtk-top">答题卡</div>
      <div class="dtk-qq">
        <div class="dtk-xyq" v-for="(item ,index) in analysisList" :key="index">
          <div class="dtk-num" @click="topNumClick(item.id)">{{item.topicNumber}}</div>
          <img v-show="item.isCorrect==1" src="@/assets/img/answer/dadui.png" alt />
          <img v-show="item.isCorrect==2" src="@/assets/img/answer/over.png" alt />
        </div>
      </div>
    </div>
    <div v-show="showan" class="dtk-dnjx">
      <div class="dtk-top">答案解析</div>
      <div class="dtk-qq">
        <p>正确选项 {{trueOption}}</p>
        <p>{{resolveList.analysis}}</p>
      </div>
    </div>
    <div class="topic-footer">
      <span class="syt" :class="resolveList.topicNumber==1?'dissyt':'syt'" @click="sytClick()">上一题</span>
      <span
        @click="xytClick()"
        class="xyt"
        :class="resolveList.topicNumber==analysisList.length?'disxyt':'xyt'"
      >下一题</span>
    </div>
  </div>
</template>
<script>
let that;
import { answerNewDetail } from "@/http/answer/answer";
import { nextQuestion } from "@/http/answer/topic";
import { answerDetail, answerById } from "@/http/answer/over";
export default {
  data() {
    return {
      radio: "",
      analysisList: [],
      showDtk: false,
      showan: true,
      masterId: "",
      id: "",
      resolveList: {},
      chooseOption: [],
      trueOptions: "",
      trueOption: "",
      answerUserId: "",
      examPaperId: "",
      againList: {},
      lsmasterId: "",
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
    this.id = this.$route.query.id;
    this.masterId = this.$route.query.masterId;
    this.answerUserId = this.$route.query.answerUserId;
    this.examPaperId = this.$route.query.examPaperId;
    this.getDicts("act_topic_type_choose").then((res) => {
      console.log("回答选项", res);
      this.chooseOption = res.data;
    });
    // 如果again=1  说明是查看上一次题
    if (this.$route.query.again == 1) {
      nextQuestion({
        topicNumber: "",
        answerResult: "",
        masterId: localStorage.getItem("masterId"),
        answerUserId: localStorage.getItem("answerUserId"),
        examPaperId: localStorage.getItem("examPaperId"),
        targetNumber: 1,
      }).then((res) => {
        console.log("上一题的详情", res);
        this.resolveList = res.data;
        this.id = res.data.id;
        console.log("creatr");
        this.answerByIds();
      });
    }
  },
  mounted() {
    this.answerDetails();
    this.answerByIds();
  },
  filters: {
    responseOptions(value) {
      for (var item of that.chooseOption) {
        if (item.dictValue == value) {
          return item.dictLabel;
        }
      }
    },
  },
  methods: {
    // 重新答题
    answerNewDetails() {
      answerNewDetail({ masterId: this.masterId }).then((res) => {
        console.log("最新一条记录", res);
      });
    },
    // 退出
    handleOut() {
      this.$router.push({ path: "/answer" });
    },
    // 答题卡解析
    topNumClick(topNumId) {
      this.id = topNumId;
      this.answerByIds();
    },
    // 答题卡
    answerDetails() {
      if (this.$route.query.again == 1) {
        answerDetail({ masterId: localStorage.getItem("masterId") }).then(
          (res) => {
            console.log("答题解析", res);
            if (res.code == 200) {
              this.analysisList = res.data;
            }
          }
        );
      } else {
        answerDetail({ masterId: this.masterId }).then((res) => {
          console.log("答题解析", res);
          if (res.code == 200) {
            this.analysisList = res.data;
          }
        });
      }
    },

    // 获取相应题的信息
    answerByIds() {
      answerById(this.id).then((res) => {
        console.log("单题详情解析", res);
        if (res.code == 200) {
          this.resolveList = res.data;
          this.radio = res.data.answerResult;
          for (let item of res.data.topicSlaveList) {
            if (item.isAnswer == 1) {
              this.trueOptions = item.responseOptions;
              for (var j of that.chooseOption) {
                if (j.dictValue == this.trueOptions) {
                  this.trueOption = j.dictLabel;
                }
              }
            }
          }
        }
      });
    },
    // 点击查看答题卡
    ckClick() {
      this.showan = false;
      this.showDtk = true;
    },
    // 查看答题解析
    handleResolver() {
      this.showan = true;
      this.showDtk = false;
    },
    // 上一题
    sytClick() {
      if (this.resolveList.topicNumber != 1) {
        if (this.$route.query.again == 1) {
          nextQuestion({
            topicNumber: this.resolveList.topicNumber,
            answerResult: "",
            masterId: localStorage.getItem("masterId"),
            answerUserId: localStorage.getItem("answerUserId"),
            examPaperId: localStorage.getItem("examPaperId"),
            targetNumber: this.resolveList.topicNumber - 1,
          }).then((res) => {
            console.log("上一题的详情", res);
            if (res.code == 200) {
              this.resolveList = res.data;
              this.id = res.data.id;
              this.answerByIds();
            }
          });
        } else {
          nextQuestion({
            topicNumber: this.resolveList.topicNumber,
            answerResult: "",
            masterId: this.masterId,
            answerUserId: this.answerUserId,
            examPaperId: this.examPaperId,
            targetNumber: this.resolveList.topicNumber - 1,
          }).then((res) => {
            console.log("上一题的详情", res);
            this.id = res.data.id;
            this.answerByIds();
          });
        }
      }
    },
    // 下一题
    xytClick() {
      if (this.resolveList.topicNumber != this.analysisList.length) {
        if (this.$route.query.again == 1) {
          console.log("this.againList.topicNumber", this.againList.topicNumber);
          nextQuestion({
            topicNumber: this.resolveList.topicNumber,
            answerResult: "",
            masterId: localStorage.getItem("masterId"),
            answerUserId: localStorage.getItem("answerUserId"),
            examPaperId: localStorage.getItem("examPaperId"),
            targetNumber: this.resolveList.topicNumber + 1,
          }).then((res) => {
            console.log("下一题的详情", res);
            if (res.code == 200) {
              this.resolveList = res.data;
              this.id = res.data.id;
              this.answerByIds();
            }
          });
        } else {
          nextQuestion({
            topicNumber: this.resolveList.topicNumber,
            answerResult: "",
            masterId: this.masterId,
            answerUserId: this.answerUserId,
            examPaperId: this.examPaperId,
            targetNumber: this.resolveList.topicNumber + 1,
          }).then((res) => {
            console.log("下一题的详情", res);
            this.id = res.data.id;
            this.answerByIds();
          });
        }
      }
    },
  },
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
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 0, 0, 1);
    border-radius: 5px;
    margin: 0 auto;
    padding-left: 21px;
    padding-bottom: 10px;
    height: 200px;
    .item-title {
      width: 86%;
      padding: 20px 0px;
    }
    .radio {
      padding: 6px;
    }
  }
  .out {
    float: right;
    margin-right: 20px;
    font-size: 14px;
    border-radius: 50px;
    width: 60px;
    color: rgba(252, 148, 64, 1);
    background: #ffffff;
    height: 30px;
    line-height: 30px;
    text-align: center;
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
    padding-top: 60px;
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
      margin-top: 10px;
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
      padding: 10px 0px;
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
  .dtk-dnjx {
    padding-top: 60px;
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
      padding-left: 10px;
      border-left: 3px solid #ffffff;
      border-right: 3px solid #ffffff;
      border-bottom: 3px solid #ffffff;
      // height: 300px;
      overflow: auto;
      font-size: 14px;
      color: #fff;
    }
  }
  .topic-footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    .syt,
    .xyt {
      display: inline-block;
      line-height: 44px;
      text-align: center;
      color: rgba(252, 148, 64, 1);
      font-size: 16px;
      background: #fff;
    }
    .dissyt {
      background: #888;
    }
    .disxyt {
      background: #888;
    }
    .syt {
      width: 50%;
    }
    .xyt {
      width: 50%;
    }
  }
}
</style>