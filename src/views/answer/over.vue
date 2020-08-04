<template>
  <div class="over">
    <div class="over-bd" v-if="acquireScore==totalScore">
      <p class="bd-top">恭喜您！全部答对</p>
      <p class="bd-jf">获得+10积分</p>
      <p class="bd-bz">(奖励已到‘我的’领取)</p>
      <p @click="handleAnClick" class="bd-an">领取奖励</p>
    </div>
    <div class="over-bd" v-if="acquireScore!==totalScore">
      <p class="bd-top">很遗憾！你没全答对</p>

      <p class="bd-bz">别灰心，继续努力</p>
      <p @click="handleClickAgain" class="bd-an">退出答题</p>
    </div>
    <div class="dtk-body">
      <p class="count">答对{{correctNum}}题</p>
      <p class="counts">共计{{analysisList.length}}题</p>

      <div class="dtk-qq">
        <div
          class="dtk-xyq"
          v-for="(item ,index) in analysisList"
          :key="index"
          @click="numClick(item.id)"
        >
          <div class="dtk-num">{{item.topicNumber}}</div>
          <img v-show="item.isCorrect==1" src="@/assets/img/answer/dadui.png" alt />
          <img v-show="item.isCorrect==2" src="@/assets/img/answer/over.png" alt />
        </div>
      </div>
    </div>
    <!-- <div class="over-an">
      <span class="phb" @click="phbClick">排行榜</span>
      <span class="share">分享</span>
    </div>-->
  </div>
</template>
<script>
import { answerDetail } from "@/http/answer/over";
export default {
  data() {
    return {
      acquireScore: "",
      totalScore: "",
      masterId: "",
      analysisList: [],
      correctNumList: [],
      correctNum: "",
      answerUserId: "",
      examPaperId: ""
    };
  },
  created() {
    window.document.title = "完成答题";
    this.acquireScore = this.$route.query.acquireScore;
    this.totalScore = this.$route.query.totalScore;
    this.masterId = this.$route.query.masterId;
    this.answerUserId = this.$route.query.answerUserId;
    this.examPaperId = this.$route.query.examPaperId;
    // 保存上一题的试卷id
    localStorage.setItem("examPaperId", this.examPaperId);
    localStorage.setItem("answerUserId", this.answerUserId);
    localStorage.setItem("masterId", this.masterId);
    if (this.masterId) {
      this.answerDetails();
    }
  },
  methods: {
    // 答题解析
    answerDetails() {
      answerDetail({ masterId: this.masterId }).then(res => {
        console.log("答题解析", res);
        this.analysisList = res.data;
        for (let item of res.data) {
          console.log(item.isCorrect, typeof item.isCorrect);
          if (item.isCorrect == 1) {
            this.correctNumList.push(item);
            console.log(this.correctNumList.length);
            this.correctNum = this.correctNumList.length;
          }
        }
      });
    },
    //   去领取
    handleAnClick() {
      this.$router.push("/woanswer");
    },
    // 排行榜
    phbClick() {
      let name = "查看";
      this.$router.push({ path: "/startanswer", query: { name: name } });
    },
    // 退出答题
    handleClickAgain() {
      let name = "答题";
      this.$router.push({ path: "/answer" });
    },
    // 每题详情
    numClick(id) {
      this.$router.push({
        path: "/resolve",
        query: {
          id: id,
          masterId: this.$route.query.masterId,
          answerUserId: this.answerUserId,
          examPaperId: this.examPaperId
        }
      });
    }
  }
};
</script>
<style lang="less">
.over {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  background: linear-gradient(
    180deg,
    rgba(254, 72, 71, 1) 0%,
    rgba(252, 148, 64, 1) 100%
  );
  .over-bd {
    width: 88%;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 0, 0, 1);
    border-radius: 5px;
    margin: 0 auto;
    padding-bottom: 10px;

    margin-top: 20px;
    text-align: center;
    margin-bottom: 30px;
    .bd-top {
      color: #fb933f;
      margin-top: 24px;
      letter-spacing: 2px;
      font-size: 16px;
      font-weight: bold;
    }
    .bd-jf {
      color: #ff0000;
      font-weight: bold;
      margin-top: 24px;
      letter-spacing: 2px;
    }
    .bd-bz {
      color: #888;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .bd-an {
      margin-top: 28px;
      color: #fff;
      width: 100px;
      font-size: 16px;
      border-radius: 50px;
      margin-left: auto;
      margin-right: auto;
      line-height: 40px;
      background: linear-gradient(
        90deg,
        rgba(252, 148, 64, 1) 0%,
        rgba(254, 72, 71, 1) 100%
      );
    }
  }
  .over-an {
    width: 60%;
    margin: auto;
    color: #fff;
    letter-spacing: 1px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .phb,
    .share {
      display: inline-block;
      border: 1px solid #fff;
      width: 80px;
      text-align: center;
      border-radius: 50px;
      line-height: 36px;
    }
  }
  .dtk-body {
    text-align: center;
    border: 3px solid #ffffff;
    width: 84%;
    margin: auto;
    padding-bottom: 10px;
    margin-bottom: 20px;
    .count {
      letter-spacing: 2px;
      font-weight: 500;
      color: #232323;
      margin-bottom: 0px;
    }
    .counts {
      color: #878787;
      font-size: 12px;
      margin-top: 10px;
      font-weight: 400;
      font-family: PingFang SC;
    }
    .dtk-qq {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin: auto;
      text-align: center;
      padding: 10px 0px;
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
}
</style>