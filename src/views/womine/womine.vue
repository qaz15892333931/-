<template>
  <div class="womine">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="womine-list" v-for="(item,index) in prizeList" :key="index">
        <div class="list-left">
          <p class="left-name">{{item.activityName}}</p>
          <img src="@/assets/img/answer/huiyuanjifen.png" />
          <span class="list-jl">获得{{item.prizeName}}*{{item.prizeNum}}</span>
        </div>
        <div class="list-right" @click="handleAnClick(item.conversionPrize)">
          <!-- 奖品为积分 -->
          <p
            v-if="item.prizeType!='1'"
            :class="item.conversionPrize=='0'?'ylq':'itemNn'"
          >{{item.conversionPrize|conversionPrize}}</p>
          <!-- 奖品为实物 并且是一二等奖 conversionPrize是否兑换0是-->
          <p
            v-if="item.prizeType=='1'&&(item.prizeRank=='0'||item.prizeRank=='1')&&item.conversionPrize=='0'"
            :class="item.prizeRank=='0'||item.prizeRank=='1'&&item.conversionPrize=='0'?'itemNn':'ylq'"
          >已领取</p>
          <p
            v-if="item.prizeType=='1'&&(item.prizeRank=='0'||item.prizeRank=='1')&&item.conversionPrize=='1'"
            :class="item.prizeRank=='0'||item.prizeRank=='1'&&item.conversionPrize=='0'?'itemNn':'ylq'"
          >待领取</p>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { mineList } from "@/http/prize/womine";
let that;
export default {
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        openId: localStorage.getItem("openId"),
        activityType: 0,
      },
      loading: false,
      finished: false,
      //是否加载中 1 没加载  0  加载
      isload: 1,
      commonYes: [],
      prizeList: [],
    };
  },
  beforeCreate() {
    that = this;
  },
  created() {
    // this.mineLists();
    // 奖品是否兑换
    this.getDicts("common_yes_or_no").then((res) => {
      console.log("奖品是否兑换", res);
      this.commonYes = res.data;
    });
  },
  filters: {
    conversionPrize(value) {
      for (var item of that.commonYes) {
        if (item.dictValue == value) {
          return item.dictLabel;
        }
      }
    },
  },
  methods: {
    // 列表数据
    mineLists() {
      mineList(this.queryParams).then((res) => {
        // 加载状态结束
        this.loading = false;
        this.isload = 1;
        console.log("列表数据", res);
        if (res.code == 200) {
          res.rows.forEach((o) => {
            this.prizeList.push(o);
            // 按钮判断
            // if (
            //   item.prizeRank == "0" ||
            //   (item.prizeRank == "1" && item.conversionPrize == "0")

            // ) {

            // }
          });
          if (res.rows.length < this.queryParams.pageSize) {
            this.finished = true;
          } else {
            this.queryParams.pageNum++;
          }
        }
      });
    },
    // 滚动到底部加载更多
    onLoad() {
      if (this.finished) {
        return;
      }
      if (this.isload == 1) {
        this.isload = 0;
        console.log("滚动到底部");
        this.loading = true;
        this.mineLists();
      }
    },
    // 去领取
    handleAnClick(name) {
      if (name == 1) {
        this.$router.push({ path: "/recedive", query: { name: name } });
      }
    },
  },
};
</script>
<style lang="less">
.womine {
  height: 93vh;
  overflow: scroll;
  background: #eee;
  .womine-list {
    border-left: 12px solid #eeeeee;
    border-right: 12px solid #eeeeee;
    border-top: 6px solid #eeeeee;
    border-bottom: 6px solid #eeeeee;
    border-radius: 5px;
    margin: auto;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .list-left {
      padding-left: 10px;
      .left-name {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(35, 35, 35, 1);
        line-height: 36px;
        margin-top: 10px;
        margin-bottom: 0px;
      }
      img {
        margin-right: 8px;
        margin-top: 10px;
      }
      .list-jl {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(249, 190, 48, 1);
        line-height: 50px;
      }
    }
    .list-right {
      padding: 6% 4%;
      .itemNn {
        font-size: 14px;
        background: #fc9440;
        color: #fff;
        width: 70px;
        height: 30px;
        border-radius: 50px;
        text-align: center;
        line-height: 30px;
      }
      .ylq {
        background: #888;
        font-size: 14px;
        color: #fff;
        width: 70px;
        height: 30px;
        border-radius: 50px;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>