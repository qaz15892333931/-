<template>
  <div class="home">
    <div class="home-scroll">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="home-mar"></div>
    <div class="home-body">
      <van-grid :column-num="2">
        <van-grid-item
          v-for="(value,index) in values"
          :key="index"
          :to="value.url"
          :text="value.text"
          :icon="value.icon"
        ></van-grid-item>
      </van-grid>
    </div>
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="wrapper-top">您还未认证信息</div>
        <div class="wrapper-an" @click="rzClick">认证</div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getAccessToken, getJsapiTicker } from "@/http/acessToken";
import { authentification, getUser } from "@/http/home/home";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      text: {
        access_token: "",
        expires_in: "",
      },
      ticket: {
        ticket: "",
        expires_in: "",
      },
      show: false,
      images: [require("@/assets/img/home/banner.png")],
      values: [
        {
          text: "事件上报",
          icon: require("@/assets/img/home/shijianshangbao.png"),
        },
        {
          text: "平安建设",
          icon: require("@/assets/img/home/pinganjianshe.png"),
          url: "/safe",
        },
        {
          text: "在线抽奖",
          icon: require("@/assets/img/home/zaixianchoujiang.png"),
          url: "/prize",
        },
        {
          text: "有奖答题",
          icon: require("@/assets/img/home/youjiangdati.png"),
          url: "/answer",
        },
        {
          text: "活动报名",
          icon: require("@/assets/img/home/huodongbaoming.png"),
          url: "/activity",
        },
        {
          text: "投票",
          icon: require("@/assets/img/home/touqiao.png"),
          url: "/vote",
        },
      ],
      openId: "",
    };
  },
  created() {
    window.document.title = "平安龙泉驿";
  },
  mounted() {
    this.getOpenId();
    getUser({ openId: this.openId }).then((res) => {
      console.log(res);
      if (res.data.token == null) {
        localStorage.setItem("sex", res.data.wxUser.sex);
        this.show = true;
      } else {
        this.show = false;
        localStorage.setItem("token", res.data.token);
      }
    });
  },

  methods: {
    // 获取openId
    getOpenId() {
      if (window.location.search) {
        console.log("地址栏", window.location.search);
        this.openId = window.location.search.split("=")[1];
        localStorage.setItem("openId", this.openId);
      } else {
        this.openId = localStorage.getItem("openId", this.openId);
      }
    },

    // 点击认证
    rzClick() {
      this.$router.push("/attestation");
    },
  },
};
</script>
<style lang="less" >
.home {
  .home-scroll {
    background-color: #ff4847;
    height: 160px;
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      background: #ff4847;
      img {
        width: 100%;
      }
    }
  }
  .home-mar {
    height: 10px;
    background: rgba(238, 238, 238, 1);
  }
  .home-body {
    height: 68vh;
    overflow: scroll;
    .van-grid-item {
      height: 126px;
      border-left: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      .van-icon {
        img {
          width: 39px;
          height: 39px;
          padding-bottom: 10px;
        }
      }
      .van-grid-item__text {
        color: #232323;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
  .wrapper {
    margin-top: 180px !important;
    width: 76%;
    margin: auto;
    .wrapper-top {
      width: 100%;
      background: #fff;
      line-height: 100px;
      text-align: center;
      color: #fe4847;
      letter-spacing: 2px;
      font-size: 18px;
    }
    .wrapper-an {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: linear-gradient(180deg, #fc9440 0%, #fe4746 100%);
      color: #fff;
    }
  }
}
</style>