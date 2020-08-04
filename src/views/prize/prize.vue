<template>
  <div class="prize">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="prize-detail">
        <div class="prize-list" v-for="(item,index) in list" :key="index" @click="listClick(item)">
          <div class="prize-left">
            <img :src="$imgUrl+item.img" alt />
          </div>
          <div class="prize-right">
            <!-- <div class="prize-date" v-if="item.title=='开始倒计时'">
            <span class="prize-title">{{item.title}}</span>
            <van-count-down class="prize-time" :time="item.time" />
            </div>-->
            <div class="prize-datejs" v-if="item.title=='结束倒计时'">
              <span class="prize-title">{{item.title}}</span>
              <van-count-down class="prize-time" :time="item.time" format="DD 天 HH 时 mm 分 ss 秒"></van-count-down>
            </div>
            <div class="prize-dateyjs" v-if="item.title=='已结束'">
              <span class="prize-title">{{item.title}}</span>
            </div>
            <div class="prize-datedkq" v-if="item.title=='待开启'">
              <span class="prize-title">{{item.title}}</span>
            </div>
            <div class="prize-name">{{item.activityName}}</div>
            <div class="prize-zx">已有{{item.numberParticipantsCount}}人参与抽奖</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { prizeList } from "@/http/prize/prize";
import { format } from "@/utils";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      //是否加载中 1 没加载  0  加载
      isload: 1,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    console.log("this.openId", localStorage.getItem("openId"));
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
        this.prizeLists();
      }
    },
    // 倒计时结束时
    // finish() {
    //   this.prizeLists();
    // },
    // 获取列表数据
    prizeLists() {
      prizeList(this.queryParams).then((res) => {
        // 加载状态结束
        this.loading = false;
        this.isload = 1;
        console.log("列表数据", res);
        // this.list = res.rows;
        if (res.code == 200) {
          this.total = res.total;
          res.rows.forEach((o) => {
            this.list.push(o);
          });

          if (res.rows.length < this.queryParams.pageSize) {
            this.finished = true;
          } else {
            this.queryParams.pageNum++;
          }
        }
        let newDate = this.$yuns.format(new Date(), "yyyy-MM-dd hh:mm:ss");
        for (let item of this.list) {
          let reg = new RegExp("-", "g");
          //开始时间大于当前时间  活动即将开始 (待开启)
          if (
            new Date(item.activityStartTime.replace(reg, "/")) >
            new Date(newDate.replace(reg, "/"))
          ) {
            item.title = "待开启";
          }
          // 当结束时间大于当前时间 活动已结束（已结束）
          else if (
            new Date(item.activityEndTime.replace(reg, "/")) <
            new Date(newDate.replace(reg, "/"))
          ) {
            console.log("已结束");
            item.title = "已结束";
          }
          // 当前时间在时间范围内  （结束倒计时）
          else if (
            new Date(item.activityStartTime.replace(reg, "/")) <
              new Date(newDate.replace(reg, "/")) &&
            new Date(item.activityEndTime.replace(reg, "/")) >
              new Date(newDate.replace(reg, "/"))
          ) {
            console.log("活动结束时间", item.activityEndTime);
            let endTime = new Date(item.activityEndTime).getTime();
            console.log("endTime", endTime);
            let nowTime = new Date().getTime();
            console.log("当前时间", nowTime);
            let bad = endTime - nowTime;
            console.log("时差", bad);
            // 将时间戳转年月日
            item.time = bad;
            item.title = "结束倒计时";
          }
        }
        console.log("列表数据", this.list);
      });
    },
    listClick(item) {
      this.$router.push({
        path: "/prizedetail",
        query: {
          id: item.id,
          name: item.title,
        },
      });
    },
  },
};
</script>
<style lang="less">
.prize {
  .prize-detail {
    height: 93vh;
    overflow: scroll;
    .prize-list {
      display: flex;
      border: 8px solid #eeeeee;
      .prize-left,
      .prize-right {
        display: inline-block;
      }
      .prize-left {
        margin-left: 12px;
        width: 100px;
        line-height: 100px;
        height: 100px;

        img {
          vertical-align: middle;
          width: 80px;
          height: 80px;
        }
      }

      .prize-right {
        flex: 1;
        .prize-date {
          float: right;
          width: 130px;
          height: 28px;
          line-height: 28px;
          background: rgba(118, 182, 76, 1);
          border-bottom-left-radius: 15px;
          color: #ffffff;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          margin-bottom: 10px;
          .prize-title {
            padding-left: 6px;
          }
        }
        .prize-datejs {
          float: right;
          width: 220px;
          height: 28px;
          line-height: 28px;
          background: #ff1111;
          border-bottom-left-radius: 15px;
          color: #ffffff;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          margin-bottom: 10px;
          .prize-title {
            padding-left: 6px;
          }
        }
        .prize-dateyjs {
          float: right;
          width: 80px;
          height: 28px;
          line-height: 28px;
          background: #00a0e9;
          border-bottom-left-radius: 15px;
          color: #ffffff;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          margin-bottom: 10px;
          .prize-title {
            padding-left: 20px;
          }
        }
        .prize-datedkq {
          float: right;
          width: 80px;
          height: 28px;
          line-height: 28px;
          background: #ffae58;
          border-bottom-left-radius: 15px;
          color: #ffffff;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          margin-bottom: 10px;
          .prize-title {
            padding-left: 20px;
          }
        }
        .prize-time {
          padding-right: 6px;
          float: right;
          height: 28px;
          line-height: 28px;
          color: #fff;
          font-size: 10px;
          font-family: PingFang SC;
          font-weight: 400;
        }
        .prize-name {
          padding-top: 38px;
          width: 229px;
          height: 34px;
          color: #232323;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
        }
        .prize-zx {
          padding-top: 16px;
          padding-bottom: 10px;
          float: right;
          padding-right: 12px;
          color: #888888;
          font-size: 9px;
        }
      }
    }
  }
}
</style>