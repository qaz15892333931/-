<template>
  <div class="vote">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div
        class="vote-list"
        @click="listClick(item.zt,item.id)"
        v-for="(item,index) in list"
        :key="index"
      >
        <span
          class="list-jxz"
          :class="item.zt=='待开启'?'dkq':(item.zt=='已结束'?'yjs':'list-jxz')"
        >{{item.zt}}</span>
        <span class="list-rs">已有{{item.voteCount}}人参与投票</span>

        <div class="list-center">
          <p class="center-name">{{item.title}}</p>
          <p class="center-fqdw">发起单位：{{item.unitId|forUnitId}}</p>
          <p
            class="center-jzsj"
            :class="item.zt=='已结束'?'yjsdate':'center-jzsj'"
          >活动截止时间：{{item.activityEndTime}}</p>
          <p
            class="center-jzsj"
            :class="item.zt=='已结束'?'yjsdate':'center-jzsj'"
          >报名截止时间：{{item.applyEndTime}}</p>
        </div>
        <div class="list-bg"></div>
      </div>
    </van-list>
  </div>
</template>
<script>
let that;
import { voteList } from "@/http/vote/vote";
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
    window.document.title = "投票";
    deptList().then((res) => {
      console.log("发起单位", res);
      if (res.code == 200) {
        this.deptLists = res.rows;
      }
    });
  },
  filters: {
    forUnitId(value) {
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
        this.voteLists();
      }
    },
    // 投票列表
    voteLists() {
      voteList(this.queryParams).then((res) => {
        // 加载状态结束
        this.loading = false;
        this.isload = 1;
        console.log("投票列表", res);
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
            console.log(new Date(item.activityStartTime.replace(reg, "/")));
            console.log(new Date(newDate.replace(reg, "/")));
            if (
              new Date(item.activityStartTime.replace(reg, "/")) >
              new Date(newDate.replace(reg, "/"))
            ) {
              item.zt = "待开启";
            }
            // 当结束时间大于当前时间 活动已结束（已结束）
            else if (
              new Date(item.activityEndTime.replace(reg, "/")) <
              new Date(newDate.replace(reg, "/"))
            ) {
              item.zt = "已结束";
            }
            // 当前时间在时间范围内  （结束倒计时）
            else if (
              new Date(item.activityStartTime.replace(reg, "/")) <
                new Date(newDate.replace(reg, "/")) &&
              new Date(item.activityEndTime.replace(reg, "/")) >
                new Date(newDate.replace(reg, "/"))
            ) {
              // console.log("活动结束时间", item.activityEndTime);
              // let endTime = new Date(item.activityEndTime).getTime();
              // console.log("endTime", endTime);
              // let nowTime = new Date().getTime();
              // console.log("当前时间", nowTime);
              // let bad = endTime - nowTime;
              // console.log("时差", bad);
              // 将时间戳转年月日
              // item.time = bad;
              item.zt = "结束倒计时";
            }
          }
          console.log("this.list", this.list);
        }
      });
    },
    listClick(name, id) {
      this.$router.push({ path: "/votedetail", query: { name: name, id: id } });
    },
  },
};
</script>
<style lang="less">
.vote {
  height: 93vh;
  overflow: scroll;
  .vote-list {
    border-top: 10px solid #eeeeee;
    border-left: 15px solid #eeeeee;
    border-right: 15px solid #eeeeee;
    border-bottom: 6px solid #eeeeee;
    .list-jxz {
      height: 26px;
      line-height: 26px;
      font-size: 14px;
      display: inline-block;
      width: 70px;
      text-align: center;
      background: rgba(255, 17, 17, 1);
      border-top-left-radius: 10px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .dkq {
      background: #ffae58;
    }
    .yjs {
      background: #00a0e9;
    }
    .list-rs {
      float: right;
      color: rgba(136, 136, 136, 1);
      font-size: 12px;
      padding: 6px 10px 0px 0px;
    }
    .list-center {
      width: 90%;
      margin: auto;
      .center-name {
        font-weight: bold;
        color: rgba(35, 35, 35, 1);
        line-height: 36px;
        margin: 8px 0px;
        font-size: 18px;
      }
      .center-fqdw {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(35, 35, 35, 1);
        margin-top: 0px;
        margin-bottom: 8px;
      }
      .center-jzsj {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 158, 19, 1);
      }
      .yjsdate {
        color: #888888;
      }
    }
    .list-bg {
      width: 100%;
      height: 100px;
      background: rgba(132, 204, 201, 1);
      border-radius: 0px 0px 10px 10px;
    }
  }
}
</style>