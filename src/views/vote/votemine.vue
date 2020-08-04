<template>
  <div class="votemine">
    <van-tabs>
      <van-tab title="我的参赛"></van-tab>
      <van-tab title="我的投票">
        <div class="mine-vote" v-for="(item,index) in list" :key="index">
          <div class="box">
            <p>{{item.num}}</p>
          </div>
          <div class="vote-left">
            <p>活动名称：{{item.name}}</p>
            <p>发起单位：{{item.dw}}</p>
            <p>参赛名称：{{item.csmc}}</p>
            <p>ID：{{item.id}}</p>
            <p>总票数：{{item.zps}}</p>
          </div>
          <div class="vote-right">
            <p  @click='handleItemClick' :class="item.an=='已结束'?'right-yjs':'right'">{{item.an}}</p>
          </div>
        </div>
        <div class="mine-help">
          帮助中心
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          num: "4",
          name: "我的第一支舞",
          dw: "我的第一支舞",
          csmc: "我的第一支舞",
          zps: "我的第一支舞",
          id: "11111",
          an: "查看"
        },
        {
          num: "4",
          name: "我的第一支舞",
          dw: "我的第一支舞",
          csmc: "我的第一支舞",
          zps: "我的第一支舞",
          id: "11111",
          an: "已结束"
        },
        {
          num: "974",
          name: "我的第一支舞",
          dw: "我的第一支舞",
          csmc: "我的第一支舞",
          zps: "我的第一支舞",
          id: "11111",
          an: "查看"
        },
        {
          num: "132",
          name: "我的第一支舞",
          dw: "我的第一支舞",
          csmc: "我的第一支舞",
          zps: "我的第一支舞",
          id: "11111",
          an: "查看"
        }
      ]
    };
  },
  methods:{
    handleItemClick(){
      this.$router.push('/voteproflie')
    }
  }
};
</script>
<style lang="less">
.votemine {
  height: 92vh;
  overflow: scroll;
  padding-top: 10px;
  background: #eeeeee;
  .van-tab__pane {
    padding-top: 10px;
  }
  .van-tab {
    letter-spacing: 2px;
    font-size: 16px;
    border: 1px solid #fc9440;
  }
  .van-tab--active {
    background: linear-gradient(
      0deg,
      rgba(254, 72, 71, 1) 0%,
      rgba(252, 148, 64, 1) 100%
    );
    color: #ffffff;
  }
  .van-tabs__line {
    height: 0px;
  }
  .van-tabs {
    margin: auto;
    width: 94%;
  }
  .mine-vote {
    border-top: 10px solid #eeeeee;
    border-bottom: 6px solid #eeeeee;
    background: #d0effd;
    display: flex;
    position: relative;
    font-size: 14px;
    .box {
      width: 0px;
      height: 0px;
      border: 30px solid;
      border-color: #ea68a2 transparent transparent #ea68a2;
      p {
        position: absolute;
        left: 2px;
        top: 8px;
        margin: 0px;
        font-size: 16px;
        color: #fff;
      }
    }

    .vote-left {
      padding: 15px 0px 20px 0px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(35, 35, 35, 1);
      p {
        margin-top: 6px;
        margin-bottom: 2px;
      }
    }
    .vote-right {
      margin-top: 12%;
      position: absolute;
      right: 4px;
      color: #fff;
      .right {
        width: 80px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: linear-gradient(
          180deg,
          rgba(255, 212, 119, 1) 0%,
          rgba(252, 148, 64, 1) 100%
        );

        border-radius: 18px;
      }
      .right-yjs {
        text-align: center;
        width: 80px;
        height: 34px;
        line-height: 34px;
        background: rgb(126, 122, 122);
        border-radius: 18px;
      }
    }
  }
  .mine-help {
    font-size: 12px;
    position: fixed;
    z-index: 999;
    right: 20px;
    bottom: 50px;
    color: #fff;
    background: rgba(0, 160, 233, 1);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
}
</style>