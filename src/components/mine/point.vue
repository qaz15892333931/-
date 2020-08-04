<template>
  <div class="point">
    <div class="point-top">
      <div class="point-nr">
        <div class="kyjf">
          <!-- <span class="kyjf-name">可用积分</span> -->
          <img src="@/assets/img/mine/point.png" alt />
        </div>
        <!-- <div class="kyjffs">
          <span class="kyjffs-num">680</span>
          <span class="kyjffs-f">分</span>
        </div>-->
        <!-- <div class="ljdh">
          <p class="ljdh-num">立即兑换</p>
        </div>-->
        <div class="point-fg">
          <div>
            <p class="fg-top">积分收益</p>
            <span class="fg-num">680</span>
            <span class="fg-dw">分</span>
            <p class="fg-hl">汇率:1000积分=1元</p>
          </div>

          <div>
            <p class="fg-top">现金收益</p>
            <span class="fg-num">0.88</span>
            <span class="fg-dw">元</span>
            <p @click="tiClick" class="fg-tx">去提现</p>
          </div>

          <!-- <div>
            <p>可兑换金额</p>
            <p>68.00元</p>
          </div>-->
        </div>
      </div>
    </div>
    <div class="point-body">
      <div>
        <van-tabs>
          <van-tab title="消耗积分">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div class="point-tab" v-for="(item,index) in list" :key="index">
                <span class="item-name">{{item.source| capsource}}</span>
                <span>{{item.createTime}}</span>
                <span class="item-money">{{item.produceType|produceTypes}}{{item.produceIntegral}}</span>
              </div>
            </van-list>
          </van-tab>
          <van-tab title="现金明细">
            <div class="point-tab" v-for="(item,index) in listtx" :key="index">
              <span class="item-name">{{item.name}}</span>
              <span>{{item.date}}</span>
              <span :class="item.name=='提现成功'?'item-money':'item-redmoney'">{{item.money}}</span>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { integralList } from "@/http/mine/point";
let that;
export default {
  data() {
    return {
      list: [],
      listtx: [
        { name: "积分兑换现金", date: "2020/04/15 19:09", money: "+300.00元" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-10元" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-300" },
        { name: "积分兑换现金", date: "2020/04/15 19:09", money: "+300" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-10" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-10" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-10" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-300" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-10" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-300" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-300" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-10" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-10" },
        { name: "提现成功", date: "2020/04/15 19:09", money: "-10" }
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        openId: localStorage.getItem("openId")
      },
      sourceList: [],
      loading: false,
      finished: false,
      //是否加载中 1 没加载  0  加载
      isload: 1,
      total: ""
    };
  },
  beforeCreate() {
    that = this;
  },

  created() {
    window.document.title = "积分兑换";
    this.getDicts("wx_integral_source").then(res => {
      this.sourceList = res.data;
      console.log("积分来源", this.sourceList);
    });
  },
  filters: {
    capsource(value) {
      for (var item of that.sourceList) {
        if (item.dictValue == value) {
          return item.dictLabel;
        }
      }
    },
    produceTypes(value) {
      if (value == 1) {
        return "-";
      } else {
        return "+";
      }
    }
  },
  methods: {
    // 滚动到底部加载更多
    onLoad() {
      if(this.finished){
        return;
      }
      if (this.isload == 1) {
        this.isload = 0;
        console.log("滚动到底部");
        this.loading = true;
        this.integralLists();
      }
    },
    // 消耗积分列表
    integralLists() {
      integralList(this.queryParams).then(res => {
        // 加载状态结束
        this.loading = false;
        this.isload = 1;
        console.log("消耗积分列表", res);
        if (res.code == 200) {
          this.total = res.total;
          res.rows.forEach(o => {
            this.list.push(o);
          });
          console.log(this.list.length, this.total);
          if (res.rows.length < this.queryParams.pageSize) {
            this.finished = true;
          } else {
            this.queryParams.pageNum++;
          }
        }
      });
    },
    tiClick() {
      this.$router.push("/withdraw");
    }
  }
};
</script>
<style lang="less">
.point {
  .point-top {
    width: 100%;
    height: 230px;
    background: linear-gradient(
      0deg,
      rgba(254, 72, 71, 1) 0%,
      rgba(252, 148, 64, 1) 100%
    );
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    .point-nr {
      width: 90%;
      margin: auto;
      .kyjf {
        padding-top: 15px;
        img {
          float: right;
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
        .kyjf-name {
          color: #ffffff;
        }
      }
      .kyjffs {
        height: 65px;
        line-height: 65px;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        .kyjffs-num {
          font-weight: bold;
          font-size: 24px;
          padding-right: 6px;
          letter-spacing: 2px;
        }
        .kyjffs-f {
          font-size: 14px;
        }
      }
      .ljdh {
        text-align: center;
        color: #ffffff;
        font-size: 10px;
        .ljdh-num {
          margin: auto;
          width: 58px;
          height: 14px;
          line-height: 14px;
          background: #fd6244;
        }
      }
      .point-fg {
        padding-top: 40px;
        width: 80%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        text-align: center;
        color: #ffffff;

        .fg-top {
          font-size: 14px;
          color: rgba(255, 255, 255, 1);
          line-height: 26px;
          letter-spacing: 2px;
        }
        .fg-num {
          font-size: 20px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          letter-spacing: 2px;
        }
        .fg-dw {
          color: #f5f5f5;
          font-size: 14px;
          padding-left: 8px;
        }
        .fg-hl {
          letter-spacing: 2px;
          font-size: 12px;
          margin-top: 16px;
        }
        .fg-tx {
          font-size: 12px;
          border: 1px solid #fff;
          width: 60px;
          text-align: center;
          margin-top: 16px;
        }
        .fg-fg {
          width: 2px;
          height: 22px;
          margin-top: 8%;
          background: #ffffff;
        }
      }
    }
  }
  .point-body {
    margin: auto;
    padding-top: 18px;
    width: 88%;
    .van-tab__pane {
      padding-top: 10px;
    }
    .van-tab {
      letter-spacing: 2px;
      font-size: 16px;
      border: 1px solid #fc9440;
    }
    .van-tab--active {
      background: #fc9440;
      color: #ffffff;
    }
    .van-tabs__line {
      height: 0px;
    }
    .point-tab {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #fc9440;
      margin-bottom: 2px;
      padding-top: 8px;

      .item-name {
        width: 80px;
      }
      .item-money {
        color: #09a96b;
      }
      .item-redmoney {
        color: #ff0300;
      }
    }
  }
}
</style>