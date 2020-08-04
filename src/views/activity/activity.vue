<template>
  <div class="activity">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div
        class="answer-list"
        v-for="(item,index) in list"
        :key="index"
        @click="itemClick(item.title,item.id)"
      >
        <div class="list-detail">
          <span
            class="list-title"
            :class="item.title=='待开启'?'dkq':(item.title=='已结束'?'yjs':(item.title=='进行中')?'jxz':'list-title')"
          >{{item.title}}</span>
          <span v-if="item.dt=='查看'" class="list-date">签到</span>
        </div>
        <div class="list-body">
          <div class="bd-left">
            <p class="list-his">{{item.activityName}}</p>
            <p class="list-dw">发起单位:{{item.unitId|initiatingList}}</p>
            <p class="list-jssj">结束时间：{{item.applyEndTime}}</p>
          </div>
          <div class="bd-right">
            <p class="list-an">{{item.detailBtnText}}</p>
            <p class="list-tj">已有{{item.participateNumber}}人参与报名</p>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
let that;
import { activeList } from "@/http/activity/activity";
import { deptList } from "@/http/answer/answer";
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
      deptLists: [],
    };
  },
  beforeCreate() {
    that = this;
  },
  created() {
    window.document.title = "活动报名";
    deptList().then((res) => {
      console.log("发起单位", res);
      if (res.code == 200) {
        this.deptLists = res.rows;
      }
    });
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
        this.activeLists();
      }
    },
    // 活动报名列表
    activeLists() {
      activeList(this.queryParams).then((res) => {
        console.log("活动报名列表", res);
        // 加载状态结束
        this.loading = false;
        this.isload = 1;
        if (res.code == 200) {
          res.rows.forEach((o) => {
            this.list.push(o);
          });

          if (res.rows.length < this.queryParams.pageSize) {
            this.finished = true;
          } else {
            this.queryParams.pageNum++;
          }
          let newDate = this.$yuns.format(new Date(), "yyyy-MM-dd hh:mm:ss");
          for (let item of this.list) {
            let reg = new RegExp("-", "g");
            //开始时间大于当前时间  活动即将开始 (待开启)
            if (
              new Date(item.applyStartTime.replace(reg, "/")) >
              new Date(newDate.replace(reg, "/"))
            ) {
              item.title = "待开启";
            }
            // 当结束时间大于当前时间 活动已结束（已结束）
            else if (
              new Date(item.applyEndTime.replace(reg, "/")) <
              new Date(newDate.replace(reg, "/"))
            ) {
              console.log("已结束");
              item.title = "已结束";
            }
            // 当前时间在时间范围内  （正在进行中）
            else if (
              new Date(item.applyStartTime.replace(reg, "/")) <
                new Date(newDate.replace(reg, "/")) &&
              new Date(item.applyEndTime.replace(reg, "/")) >
                new Date(newDate.replace(reg, "/"))
            ) {
              console.log("活动结束时间", item.applyEndTime);
              let endTime = new Date(item.applyEndTime).getTime();
              console.log("endTime", endTime);
              let nowTime = new Date().getTime();
              console.log("当前时间", nowTime);
              let bad = endTime - nowTime;
              console.log("时差", bad);
              // 将时间戳转年月日
              item.time = bad;
              item.title = "进行中";
            }
          }
        }
      });
    },
    itemClick(name, id, title) {
      this.$router.push({
        path: "/activitydetail",
        query: { name: name, id: id, title: title },
      });
    },
  },
};
</script>
<style lang="less">
.activity {
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
        width: 120px;
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
      .jxz {
        display: inline-block;
        padding-left: 11px;
        width: 60px;
        height: 23px;
        line-height: 23px;
        color: #ffffff;
        background: #76b64c;
        // border-bottom-right-radius: 15px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
      }
      .dkq {
        display: inline-block;
        padding-left: 11px;
        width: 60px;
        height: 23px;
        line-height: 23px;
        color: #ffffff;
        background: #ffae58;
        // border-bottom-right-radius: 15px;
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
        background: #00a0e9;
        border-bottom-right-radius: 15px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
      }
      .list-date {
        height: 18px;
        width: 40px;
        text-align: center;
        font-size: 10px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 17, 17, 1);
        line-height: 18px;
        margin: 4px 2%;
        border: 1px solid rgba(255, 17, 17, 1);
        border-radius: 20px;
      }
    }
    .list-body {
      display: flex;
      justify-content: space-between;
      .bd-left {
        padding-left: 20px;
        .list-his {
          letter-spacing: 2px;
          display: inline-block;
          width: 100%;
          height: 2px;
          margin-top: 10px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(35, 35, 35, 1);
          line-height: 18px;
          padding-bottom: 4px;
        }
        .list-dw {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #232323;
          padding-bottom: 4px;
          margin: 8px 0px;
        }
        .list-jssj {
          margin-top: 1px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(255, 158, 19, 1);
        }
      }
      .bd-right {
        .list-an {
          margin: 24px 2px 34px 20px;
          text-align: center;
          color: #ffffff;
          width: 78px;
          height: 28px;
          line-height: 28px;
          background: linear-gradient(90deg, #fc9240 0%, #fe4c46 100%);
          border-radius: 50px;
        }
        .list-tj {
          padding-right: 1px;
          font-size: 9px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #888888;
        }
      }
    }
  }
}
</style>