<template>
  <div class="voteprofile">
    <div class="profile-body">
      <div class="profile-top">
        <div>
          <img src="@/assets/img/vote/tx.png" alt />
        </div>
        <div>
          <p class="profile-name">名字：李师师</p>
          <p class="profile-num">9</p>
          <p class="profile-pm">排名</p>
        </div>
        <div>
          <p class="profile-id">ID:123456</p>
          <p class="profile-num">123</p>
          <p class="profile-pm">票数</p>
        </div>
      </div>
      <div class="profile-cssm">
        <div class="cssm-title">参赛说明</div>
        <div class="cssm-body">
          2000年5月，图书馆馆长李万春策划了一个全院学生参加的读书活
          动，形式是读书演讲比赛。整个活动没有确定主题，就是为了“鼓
          动”学生多读书。这次活动的大多数参加者是商务英语专业三个班
          的学生，活动效果相当不错英语专业三个班的学生.
        </div>
      </div>
      <div class="profile-cssp">
        <div class="cssp-title">参赛视频</div>
        <div class="cssp-body">
          <video src="@/assets/video/video.mp4" controls="controls"></video>
        </div>
      </div>
      <div class="profile-cstp">
        <div class="cstp-title">参赛图片</div>
        <div class="cstp-body">
          <img v-for="(item,index) in imgs" :key="index" :src="item.img" alt />
        </div>
      </div>
    </div>
    <div class="profile-footer">
      <div class="footer-left" @click="lpClick">
        <p>帮TA拉票</p>
        <p>距离前一位：21票</p>
      </div>
      <div class="footer-right" @click="tpClick">
        <p>投TA一票</p>
        <p>每人每天可投5票</p>
      </div>
    </div>
    <!-- 拉票 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="wrapper-top">投票成功</div>
        <div class="wrapper-body">
          <div class="wrapper-kb"></div>
          <div class="wrapper-bj">
            <span>恭喜你！你获得一次该活动指定抽奖一次</span>
          </div>
          <div class="wrapper-bz">(赶快去抽奖吧)</div>
          <div class="wrapper-an">
            <div>抽奖</div>
            <div>返回首页</div>
          </div>
        </div>
        <div class="wrapper-gb" @click="gbClick">X</div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      imgs: [
        { img: require("@/assets/video/e.png") },
        { img: require("@/assets/video/q.png") },
        { img: require("@/assets/video/r.png") }
      ]
    };
  },
  created() {
    window.document.title = "参赛";
  },
  methods: {
    // 拉票
    lpClick() {},
    // 投票
    tpClick() {
      this.show = true;
    },
    // 关闭
    gbClick() {
      this.show = false;
    }
  }
};
</script>
<style lang="less">
.voteprofile {
  .profile-body {
    margin: auto;
    border-left: 15px solid rgba(238, 238, 238, 1);
    border-right: 15px solid rgba(238, 238, 238, 1);
    border-bottom: 20px solid rgba(238, 238, 238, 1);
    border-top: 10px solid rgba(238, 238, 238, 1);
    margin-bottom: 60px;
    .profile-top {
      width: 100%;
      height: 160px;
      border-top: 2px solid rgba(255, 0, 0, 1);
      border-left: 2px solid rgba(255, 0, 0, 1);
      border-right: 2px solid rgba(255, 0, 0, 1);
      background: linear-gradient(
        0deg,
        rgba(254, 72, 71, 1) 0%,
        rgba(252, 148, 64, 1) 100%
      );
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      display: flex;
      justify-content: space-around;
      text-align: center;
      color: #fff;
      img {
        width: 100px;
        height: 100px;
        padding-top: 20%;
      }
      .profile-name,
      .profile-id {
        margin-top: 25px;
        height: 22px;
        line-height: 22px;
      }
      .profile-num {
        margin-bottom: 0px;
        margin-top: 30px;
      }
      .profile-pm {
        margin-top: 0px;
      }
    }
    .profile-cssm {
      width: 100%;
      border-left: 2px solid rgba(255, 0, 0, 1);
      border-right: 2px solid rgba(255, 0, 0, 1);
      padding-top: 20px;
      .cssm-title {
        font-weight: bold;
        color: rgba(38, 165, 254, 1);
        line-height: 36px;
        padding-left: 16px;
        font-size: 14px;
      }
      .cssm-body {
        line-height: 18px;
        font-size: 12px;
        background: rgba(238, 238, 238, 1);
        border-left: 16px solid #fff;
        border-right: 16px solid #fff;
        border-bottom: 16px solid #fff;
        padding: 8px 2px 20px 4px;
      }
    }
    .profile-cssp {
      width: 100%;
      border-left: 2px solid rgba(255, 0, 0, 1);
      border-right: 2px solid rgba(255, 0, 0, 1);
      .cssp-title {
        font-weight: bold;
        color: rgba(38, 165, 254, 1);
        line-height: 36px;
        padding-left: 16px;
        font-size: 14px;
      }
      .cssp-body {
        border-left: 16px solid #fff;
        border-right: 16px solid #fff;
        border-bottom: 16px solid #fff;
        padding: 8px 2px 20px 4px;
        video {
          width: 100%;
        }
      }
    }
    .profile-cstp {
      width: 100%;
      border-left: 2px solid rgba(255, 0, 0, 1);
      border-right: 2px solid rgba(255, 0, 0, 1);
      border-bottom: 2px solid rgba(255, 0, 0, 1);
      .cstp-title {
        font-weight: bold;
        color: rgba(38, 165, 254, 1);
        line-height: 36px;
        padding-left: 16px;
        font-size: 14px;
      }
      .cstp-body {
        border-left: 16px solid #fff;
        border-right: 16px solid #fff;
        border-bottom: 16px solid #fff;
        padding: 8px 2px 10px 4px;
        img {
          width: 48%;
          padding-right: 2%;
        }
      }
    }
  }
  .profile-footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: flex;
    color: #fff;
    .footer-left,
    .footer-right {
      text-align: center;
      p {
        margin: 6px;
      }
    }
    .footer-left {
      width: 50%;
      color: #ffffff;
      font-size: 16px;
      background: #fe4847;
    }
    .footer-right {
      width: 50%;
      color: #fff;
      font-size: 16px;
      background-color: #fc9440;
    }
  }
  .wrapper {
    margin-top: 100px !important;

    width: 74%;
    margin: auto;
    .wrapper-top {
      background-color: #f5b52c;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
    .wrapper-body {
      width: 100%;
      background: #fff;
      .wrapper-kb {
        height: 20px;
      }
      .wrapper-bj {
        margin: auto;
        width: 80%;
        height: 100px;
        background: #fff4cc;
        margin-bottom: 20px;
        span {
          padding-top: 20px;
          line-height: 30px;
          display: block;
          width: 150px;
          margin: auto;
          color: #f5b52c;
        }
      }
      .wrapper-bz {
        text-align: center;
        font-size: 12px;
        color: #888;
      }
      .wrapper-an {
        padding-top: 30px;
        width: 80%;
        display: flex;
        margin: auto;
        justify-content: space-between;
        font-size: 12px;
        color: #fff;
        padding-bottom: 20px;
        div {
          background: #f5b52c;
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50px;
        }
      }
    }
    .wrapper-gb {
      margin: auto;
      margin-top: 30px;
      color: #f5f5f5;
      border: 2px solid #f5f5f5;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
    }
  }
}
</style>