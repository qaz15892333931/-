<template >
  <div class="attestation">
    <van-form @submit="onSubmit">
      <van-field
        class="phone"
        v-model="phone"
        label="手机号码"
        placeholder="请输入手机号码"
        :rules="[{ pattern, message: '请输入正确的手机号码' }]"
      />
      <van-field
        class="password"
        v-model="password"
        label="验证码"
        placeholder="请输入验证密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      ></van-field>
      <span class="hqyzm" @click="getCode()" v-show="isgetCode">获取验证码</span>
      <div v-show="!isgetCode" :class="{ active: isActive }">
        <span class="hqyzm" @click="getCode()" v-show="isActive">重新获取</span>
        <span class="hqyzm-button" v-show="!isActive">{{count}}s 后获取</span>
      </div>
      <div style="margin: 48px;">
        <van-button block native-type="submit">下一步</van-button>
      </div>
    </van-form>
    <!-- 立即抽奖 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="wrapper-top">提现成功</div>
        <div class="wrapper-body">
          <p>预计10分钟之内到账微信钱包</p>
          <div class="wrapper-an" @click="goClick">继续赚积分</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
const TIME_COUNT = 60;
export default {
  data() {
    return {
      phone: "15899995655",
      password: "111",
      pattern: /^1[3456789]\d{9}$/,
      isgetCode: true,
      isActive: false,
      count: 0,
      timer: null,
      ruleForm: {
        mobile: "",
        verify: ""
      },
      show: false
    };
  },
  created() {
    window.document.title = "账户确认";
  },
  methods: {
    onSubmit(values) {
      this.show = true;
    },
    goClick() {
      this.$router.push("/home");
    },
    // 获取验证码
    getCode(ruleForm) {
      if (/^1[3456789]\d{9}$/.test(this.phone)) {
        this.isgetCode = false;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.isActive = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.isActive = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    }
  }
};
</script>
<style lang="less">
.attestation {
  background: #eee;
  height: 100vh;
  .van-cell {
    height: 58px;
  }
  .hqyzm {
    position: fixed;
    right: 10px;
    top: 70px;
    background: #ff7038;
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: #fff;
  }
  .hqyzm-button {
    position: absolute;
    right: 10px;
    top: 13%;
    background: #888888;
    width: 100px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color: #fff;
  }

  .van-button {
    color: #fff;
    border-radius: 4px;
    background: #22ac38;
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 18px;
  }
  .wrapper {
    margin-top: 100px !important;
    width: 74%;
    margin: auto;
    .wrapper-top {
      background-color: #fff;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #232323;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      letter-spacing: 1px;
    }
    .wrapper-body {
      width: 100%;
      background: #fff;
      text-align: center;
      p {
        margin-top: 0px;
        padding: 20px;
        color: #888;
      }
      .wrapper-an {
        font-size: 14px;
        color: #fff;
        background: linear-gradient(#fc9041 0%, #fe5246 100%);
        width: 100%;
        height: 36px;
        line-height: 36px;
      }
    }
  }
}
</style>