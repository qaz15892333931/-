<template>
  <div class="recedive">
    <div class="merchant">
      <div class="merchant-top">
        <img src="@/assets/img/prize/shangjiaxinxi.png" alt />
        <span class="sjxx">商家信息</span>
      </div>
      <div class="merchant-body">
        <p class="bd-name">【东方华大集团】活动名称</p>
        <div class="bd-top">
          <img class="dizhi" src="@/assets/img/prize/dizhi.png" alt />
          <span class="sjdz">商家地址：龙泉驿北泉路177号东方华大广场2栋1层22号</span>
        </div>
        <div class="bd-bottom">
          <img class="phone" src="@/assets/img/prize/iconfontdianhua1.png" alt />
          <div class="sjdh">
            <span>商家电话：028-8122 6843</span>
            <span class="sj-phone">86-18565423657</span>
          </div>
        </div>
      </div>
    </div>
    <div class="code">
      <div class="code-top">
        <img src="@/assets/img/prize/weibiaoti.png" alt />
        <span class="ewm">二维码</span>
      </div>
      <div class="code-bd"></div>
      <div class="code-bz">
        <span class="bz-name">电子码</span>
        <span :class="name=='待领取'?'bz-num':'bz-ynum'">290012982247</span>
        <span v-show="name=='待领取'" class="bz-wlq">未领取</span>
        <span v-show="name=='已领取'" class="bz-ylq">已领取</span>
      </div>
      <div class="code-cs">到店请主动出示该二维码，领取奖励</div>
    </div>
    <div class="hjxx">
      <div class="merchant-top">
        <img src="@/assets/img/prize/keyanchengguohuojiang.png" alt />
        <span class="sjxx">商家信息</span>
      </div>
      <div class="hjxx-bd">
        <div class="hjxx-list">
          <span class="hjxx-name">获奖用户</span>
          <span>18014563254</span>
        </div>
        <div class="hjxx-list">
          <span class="hjxx-name">获奖数量</span>
          <span>1</span>
        </div>
        <div class="hjxx-list">
          <span class="hjxx-name">联系电话</span>
          <span>18014563254</span>
        </div>
        <div class="hjxx-list">
          <span class="hjxx-name">有效日期</span>
          <span class="hjxx-rq">2020年04月12日-2020年05年12日</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = this.$route.query.name;
    console.log("name", this.name);
  },
};
</script>
<style lang="less">
.recedive {
  letter-spacing: 1px;
  .merchant {
    border-top: 20px solid #eee;
    border-left: 10px solid #eee;
    border-right: 10px solid #eee;
    border-bottom: 20px solid #eee;
    margin: auto;
    height: 200px;
    background: #fff;
    .merchant-top {
      padding: 10px;
      height: 26px;
      border-bottom: 1px solid #eee;
      img {
        padding-right: 14px;
      }
      .sjxx {
        color: #232323;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .merchant-body {
      padding-left: 10px;
      .bd-name {
        font-size: 14px;
        color: #232323;
      }
      .bd-top {
        padding-top: 14px;
        .dizhi {
          padding-right: 12px;
          vertical-align: top;
        }
        .sjdz {
          display: inline-block;
          width: 90%;
          font-size: 14px;
          color: #30a6f9;
        }
      }

      .bd-bottom {
        padding-top: 10px;
        img {
          vertical-align: top;
        }
        .sjdh {
          display: inline-block;
          width: 90%;
          font-size: 14px;
          color: #30a6f9;
          padding-left: 12px;
          .sj-phone {
            padding-left: 20px;
          }
        }
      }
    }
  }
  .code {
    border-left: 10px solid #eee;
    border-right: 10px solid #eee;
    border-bottom: 10px solid #eee;
    margin: auto;
    background: #fff;
    .code-top {
      padding: 10px;
      height: 26px;
      border-bottom: 1px solid #eee;
      margin-bottom: 24px;
      img {
        padding-right: 14px;
      }
      .ewm {
        color: #232323;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .code-bd {
      width: 120px;
      height: 120px;
      margin: auto;
      background: rgba(22, 208, 255, 1);
    }
    .code-bz {
      margin-top: 18px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      padding-left: 10px;
      font-weight: bold;
      .bz-name {
        padding-right: 20px;
        letter-spacing: 2px;
      }
      .bz-num {
        color: #fc9440;
      }
      .bz-ynum {
        color: #888;
      }
      .bz-wlq {
        color: #fc9440;
        float: right;
        padding-right: 20px;
      }
      .bz-ylq {
        color: #888;
        float: right;
        padding-right: 20px;
      }
    }
    .code-cs {
      text-align: center;
      line-height: 54px;
      font-size: 12px;
      color: #888;
      letter-spacing: 1px;
    }
  }
  .hjxx {
    border-left: 10px solid #eee;
    border-right: 10px solid #eee;
    border-bottom: 20px solid #eee;
    margin: auto;
    background: #fff;
    height: 200px;
    .merchant-top {
      padding: 10px;
      height: 26px;
      border-bottom: 1px solid #eee;
      img {
        padding-right: 14px;
      }
      .sjxx {
        color: #232323;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .hjxx-bd {
      padding-left: 14px;
      letter-spacing: 1px;
      .hjxx-list {
        font-size: 14px;
        margin-top: 12px;
        line-height: 20px;
        .hjxx-name {
          padding-right: 20px;
          color: #888;
        }
      }
    }
  }
}
</style>