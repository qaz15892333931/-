<template>
  <div class="womine">
    <div class="womine-list" v-for="(item,index) in list" :key="index">
      <div class="list-left">
        <p class="left-name">{{item.title}}</p>
        <img src="@/assets/img/answer/huiyuanjifen.png" />
        <span class="list-jl">{{item.jl}}</span>
      </div>
      <div class="list-right">
        <p :class="item.an=='已领取' ?'ylq':'item-an'">{{item.an}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "已领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" },
        { title: "宇宙知识星河", jl: "奖励 +10 积分", an: "待领取" }
      ]
    };
  }
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
      .item-an {
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