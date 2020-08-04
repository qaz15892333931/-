<template>
  <div class="mine" v-show="userId">
    <div class="mine-top">
      <div class="mine-tx">
        <img :src="headimgUrl" alt />
        <div class="mine-qaz" @click="txClick">
          <span class="mine-name">{{name}}</span>
          <p class="mine-kb"></p>
          <span class="mine-id">ID:{{userId}}</span>
        </div>
      </div>
      <div class="mine-jf">
        <div>
          <p class="jf-num">{{ countNum}}</p>
          <p class="jf-name">我的积分</p>
        </div>
        <div class="jf-fg"></div>
        <div>
          <p class="jf-num">100</p>
          <p class="jf-name">报名参赛</p>
        </div>
      </div>
    </div>
    <div class="mine-body">
      <div @click="itemClick(item.name)" class="mine-nr" v-for="(item,index) in list" :key="index">
        <img :src="item.img" />
        <p class="item-name">{{item.name}}</p>
      </div>
    </div>
    <div class="mine-an">退出登录</div>
  </div>
</template>
<script>
import { getWxUser } from "@/http/mine/mine";

export default {
  data() {
    return {
      // 姓名
      name: "",
      userId: "",
      // 总积分
      countNum: "",
      headimgUrl: "",
      list: [
        {
          img: require("@/assets/img/mine/jiangli.png"),
          name: "个人信息",
        },
        {
          img: require("@/assets/img/mine/duihuanzhongxin-.png"),
          name: "积分兑换",
        },

        // {
        //   img: require("@/assets/img/mine/qiandao.png"),
        //   name: "活动签到"
        // },
        {
          img: require("@/assets/img/mine/bangzhuzhongxin.png"),
          name: "帮助中心",
        },
      ],
      mineInfo: {},
    };
  },
  created() {
    this.getUserInfor();
  },
  methods: {
    // 获取用户信息
    getUserInfor() {
      getWxUser({ openId: localStorage.getItem("openId") }).then((res) => {
        console.log("用户信息", res);
        if (res.code == 200) {
          this.mineInfo = res.data;
          this.name = res.data.nickName;
          this.userId = res.data.id;
          this.countNum = res.data.integral;
          this.headimgUrl = res.data.headimgUrl;
        }
      });
    },
    // 头像点击
    txClick() {
      this.$router.push("/profile");
    },

    itemClick(name) {
      if (name == "帮助中心") {
        this.$router.push("/help");
      } else if (name == "积分兑换") {
        this.$router.push("/point");
      } else if (name == "个人信息") {
        // 获取用户信息
        this.getUserInfor();
        this.$router.push({
          path: "/attprofile",
          query: { mineInfo: this.mineInfo },
        });
      }
    },
  },
};
</script>
<style lang="less">
.mine {
  .mine-top {
    width: 100%;
    height: 230px;
    background: linear-gradient(
      0deg,
      rgba(254, 72, 71, 1) 0%,
      rgba(252, 148, 64, 1) 100%
    );
    border-radius: 0px 0px 75px 75px;
    .mine-tx {
      display: flex;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 30px 20px 0px 22px;
        vertical-align: middle;
      }
      .mine-qaz {
        // width: 900px;
        text-align: center;
        padding-top: 38px;
        text-align: left;
        .mine-name {
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 254, 254, 1);
          letter-spacing: 2px;
        }
        .mine-kb {
          margin: 10px;
        }
        .mine-id {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(255, 254, 254, 1);
        }
      }
    }
    .mine-jf {
      width: 93%;
      height: 68px;
      margin: 65px auto;
      background: #ffffff;
      border-radius: 50px;
      border-bottom: 1px solid rgb(154, 207, 243);
      display: flex;
      justify-content: space-around;
      text-align: center;
      .jf-num {
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(252, 148, 64, 1);
        margin-bottom: 0px;
      }
      .jf-name {
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(48, 48, 48, 1);
        margin-top: 4px;
      }
      .jf-fg {
        width: 2px;
        height: 18px;
        margin-top: 11%;
        background: rgba(252, 148, 64, 1);
      }
    }
  }
  .mine-body {
    margin-bottom: 130px;
    margin-top: 20px;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      padding-right: 20px;
    }
    .mine-nr {
      width: 86%;
      margin: auto;
      .item-name {
        width: 86%;
        padding: 0px 0px 10px 0px;
        display: inline-block;
        border-bottom: 2px solid #f5f5f5;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(35, 35, 35, 1);
        margin-top: 6px;
      }
    }
  }
  .mine-an {
    border-radius: 10px;
    margin: auto;
    width: 86%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(#fc9041 0%, #fe5246 100%);
    // box-shadow: 1px 1px 1px 0px rgba(58, 41, 115, 0.48);
  }
}
</style>