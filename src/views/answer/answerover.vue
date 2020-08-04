<template>
  <div class="answerover">
    <div class="over-kb"></div>
    <div class="over-body">
      <p class="body-name">恭喜你! 全部答对~</p>
      <p class="body-jl">获得+10 积分</p>
      <p class="body-bz">（奖励已到"我的"领取）</p>
      <p class="body-an">领取奖励</p>
    </div>
  </div>
</template>
<script>
export default {
  date() {
    return {};
  },
  created() {
    window.document.title = "完成答题";
  }
};
</script>
<style lang="less">
.answerover {
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(254, 72, 71, 1) 0%,
    rgba(252, 148, 64, 1) 100%
  );
  .over-kb {
    height: 20px;
  }
  .over-body {
    width: 90%;
    background: #fff;
    height: 240px;
    margin: auto;
    border: 2px solid rgba(255, 0, 0, 1);
    border-radius: 10px;
    text-align: center;
    .body-name {
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(252, 148, 64, 1);
      line-height: 36px;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }
    .body-jl {
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(255, 1, 1, 1);
      line-height: 36px;
      margin-bottom: 8px;
    }
    .body-bz {
      margin-top: 10px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(136, 136, 136, 1);
      font-size: 12px;
      margin-bottom: 24px;
    }
    .body-an {
      font-size: 18px;
      width: 110px;
      color: #fff;
      height: 40px;
      line-height: 40px;
      margin: auto;
      border-radius: 50px;
      background: linear-gradient(
        90deg,
        rgba(252, 148, 64, 1) 0%,
        rgba(254, 72, 71, 1) 100%
      );
    }
  }
}
</style>