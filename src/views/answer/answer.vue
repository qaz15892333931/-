<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="answer-detail">
        <div
          class="answer-list"
          v-for="(item,index) in list"
          :key="index"
          @click="itemClick(item.userAnswerNum,item.id,item.examProgress)"
        >
          <div class="list-detail">
            <span
              class="list-title"
              :class="item.examProgress=='1'?'dkq':(item.examProgress=='3'?'yjs':'list-title')"
            >{{item.examProgress|examProgressList}}</span>
            <!-- @finish="finish" -->
            <van-count-down
              v-if="item.examProgress!='3'&&item.examProgress!='4'"
              class="list-date"
              :class="item.examProgress=='1'?'dkqcolor':(item.examProgress=='3'?'yjscolor':'list-date')"
              :time="item.time"
              format="DD 天 HH 时 mm 分 ss 秒"
            ></van-count-down>
            <!-- <span
            class="list-date"
            :class="item.examProgress=='1'?'dkqcolor':(item.examProgress=='3'?'yjscolor':'list-date')"
            >活动结束时间 {{item.answerEndTime}}</span>-->
          </div>
          <div class="list-body">
            <div>
              <p class="list-his">{{item.name}}</p>
              <!-- <img class="list-jl" :src="img" />
              <span class="list-jf">奖励{{item.rewardIntegral}}积分</span>-->
            </div>
            <p
              class="list-an"
              :class="item.examProgress=='1'?'dkqbgcolor':(item.examProgress=='3'?'yjsbgcolor':'list-an')"
            >{{item.userAnswerNum}}</p>
          </div>
          <div class="list-tj">
            <span class="list-dw">发起单位:{{item.initiatingUnit|initiatingList}}</span>
            <span class="list-cyr">已有{{item.cumulativeDoTopicUser}}人参与答题</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { answerList, deptList, generatePaper } from "@/http/answer/answer";
let that;
export default {
  data() {
    return {
      img: require("@/assets/img/answer/huiyuanjifen.png"),
      list: [],
      ansList: [],
      deptLists: [],
      loading: false,
      finished: false,
      //是否加载中 1 没加载  0  加载
      isload: 1,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        openId: localStorage.getItem("openId"),
      },
    };
  },
  beforeCreate() {
    that = this;
  },
  created() {
    this.getDicts("act_topic_progress").then((res) => {
      this.ansList = res.data;
      console.log("答题活动进度:", this.ansList);
    });
    deptList().then((res) => {
      console.log("发起单位", res);
      if (res.code == 200) {
        this.deptLists = res.rows;
      }
    });
  },
  filters: {
    examProgressList(value) {
      for (var item of that.ansList) {
        if (item.dictValue == value) {
          return item.dictLabel;
          console.log(item.dictLabel);
        }
      }
    },
    initiatingList(value) {
      for (var item of that.deptLists) {
        if (item.id == value) {
          return item.unitName;
        }
      }
    },
  },

  methods: {
    // 滚动到底部加载更多
    onLoad() {
      if (this.finished) {
        return;
      }
      if (this.isload == 1) {
        this.isload = 0;
        console.log("滚动到底部");
        this.loading = true;
        this.answerLists();
      }
    },
    //   去开始答题
    itemClick(userAnswerNum, id, examProgress) {
      this.$router.push({
        path: "/startanswer",
        query: { name: userAnswerNum, id: id, examProgress: examProgress },
      });
    },

    // 列表数据
    answerLists() {
      answerList(this.queryParams).then((res) => {
        console.log("答题列表", res);
        if (res.code == 200) {
          res.rows.forEach((o) => {
            this.list.push(o);
          });

          if (res.rows.length < this.queryParams.pageSize) {
            this.finished = true;
          } else {
            this.queryParams.pageNum++;
          }
          for (var item of this.list) {
            if (item.userAnswerNum <= 0 && item.examProgress == 2) {
              item.userAnswerNum = "答题";
            } else if (item.userAnswerNum > 0 && item.examProgress == 2) {
              item.userAnswerNum = "再次答题";
            } else {
              item.userAnswerNum = "查看";
            }
            console.log("活动结束时间", item.answerEndTime);
            let endTime = new Date(item.answerEndTime).getTime();
            console.log("endTime", endTime);
            let nowTime = new Date().getTime();
            console.log("当前时间", nowTime);
            let bad = endTime - nowTime;
            console.log("时差", bad);
            // 将时间戳转年月日
            item.time = bad;
          }
        }
      });
    },
  },
};
</script>
<style lang="less">
.answer-detail {
  height: 93vh;
  overflow: scroll;
  background: #eee;
}
.answer-list {
  border: 8px solid #eeeeee;
  border-radius: 5px;
  background: #fff;
  .list-detail {
    display: flex;
    justify-content: space-between;
    .list-title {
      display: inline-block;
      padding-left: 11px;
      width: 98px;
      height: 23px;
      line-height: 23px;
      color: #ffffff;
      background: rgba(255, 17, 17, 1);
      border-bottom-right-radius: 15px;
      border-top-left-radius: 5px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
    }
    .dkq {
      display: inline-block;
      padding-left: 11px;
      width: 80px;
      height: 23px;
      line-height: 23px;
      color: #ffffff;
      background: #00a0e9;
      border-bottom-right-radius: 15px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
    }
    .yjs {
      display: inline-block;
      padding-left: 11px;
      width: 60px;
      height: 23px;
      line-height: 23px;
      color: #ffffff;
      background: #888888;
      border-bottom-right-radius: 15px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
    }
    .list-date {
      height: 12px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 17, 17, 1);
      line-height: 18px;
      padding-right: 3%;
    }
    .dkqcolor {
      color: #00a0e9;
    }
    .yjscolor {
      color: #888888;
    }
  }
  .list-body {
    display: flex;
    justify-content: space-between;
  }
  .list-his {
    letter-spacing: 2px;
    display: inline-block;
    width: 100%;
    height: 2px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(35, 35, 35, 1);
    line-height: 18px;
    padding: 4px 0px 10px 10px;
  }
  .list-jl {
    padding: 0px 10px;
    vertical-align: middle;
  }
  .list-jf {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(249, 190, 48, 1);
    line-height: 18px;
  }
  .list-an {
    margin-top: 20px;
    text-align: center;
    color: #ffffff;
    width: 80px;
    line-height: 34px;
    margin-right: 4%;
    background: linear-gradient(90deg, #fc9240 0%, #fe4c46 100%);
    border-radius: 50px;
  }
  .dkqbgcolor {
    background: #fc9440;
  }
  .yjsbgcolor {
    background: #00a0e9;
  }
  .list-tj {
    display: flex;
    justify-content: space-between;
    margin-top: 0px;
    margin-bottom: 10px;
  }
  .list-dw {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(35, 35, 35, 1);
    padding-left: 2%;
  }
  .list-cyr {
    font-size: 9px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
    padding-right: 2%;
  }
}
</style>