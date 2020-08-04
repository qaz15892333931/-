<template>
  <div class="check">
    <p class="check-top">提现到微信：（用）户名</p>
    <p class="check-red">
      ￥3
      <span class="check-dw">元</span>
    </p>
    <div @click="txClick" class="check-an">提现</div>
    <p class="check-bz">预计10分钟内到账</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    window.document.title = "提现";
  },
  methods: {
    //   提现
    txClick() {
      this.$router.push("/proof");
    }
  }
};
</script>
<style lang="less">
.check {
  .check-top {
    font-size: 12px;
    color: #232323;
    padding: 20px;
  }
  .check-red {
    color: #ff0000;
    font-size: 28px;
    text-align: center;
    font-weight: 500;
    .check-dw {
      font-size: 12px;
    }
  }
  .check-an {
    font-weight: bold;
    letter-spacing: 2px;
    border-radius: 4px;
    margin: auto;
    width: 86%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
    background: #22ac38;
    margin-bottom: 20px;
  }
  .check-bz {
    text-align: center;
    color: #888;
    font-size: 10px;
  }
}
</style>