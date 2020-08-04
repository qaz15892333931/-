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
        :rules="[{ required: true, message: '请填写验证码' }]"
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
  </div>
</template>
<script>
const TIME_COUNT = 60;
import { phoneSms, checkPhoneCodes } from "@/http/home/home";
import { areaLists } from "@/http/home/home";
export default {
  data() {
    return {
      phone: "",
      password: "",
      pattern: /^1[3456789]\d{9}$/,
      isgetCode: true,
      isActive: false,
      count: 0,
      timer: null,
      ruleForm: {
        mobile: "",
        verify: "",
      },
      codeMsg: "",
    };
  },
  created() {},
  methods: {
    onSubmit() {
      localStorage.setItem("phone", this.phone);
      localStorage.setItem("smsCode", this.password);
      let data = {
        phone: this.phone,
        code: this.password,
      };
      console.log(data);
      checkPhoneCodes(data).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$router.push("/attprofile");
        } else {
          alert(res.msg);
        }
      });
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
        phoneSms({ phone: this.phone }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.codeMsg = res.msg;
            console.log("验证码", this.codeMsg);
          }
        });
      }
    },
  },
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
    top: 70px;
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
    background: linear-gradient(90deg, #fc9440 0%, #fe4746 100%);
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 18px;
  }
}
</style>