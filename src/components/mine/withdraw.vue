<template>
  <div class="withdraw">
    <div class="point-top">
      <div class="point-nr">
        <div class="kyjf">
          <span class="kyjf-name">兑换规则</span>
        </div>
        <div class="point-fg">
          <div>
            <p class="fg-top">可提现金</p>
            <span class="fg-num">{{money}}</span>
            <span class="fg-dw">元</span>
          </div>

          <div>
            <p class="fg-top">审核中</p>
            <span class="fg-num">3</span>
            <span class="fg-dw">元</span>
          </div>
        </div>
        <div class="withdraw-bz">
          <p>1.汇率:1000积分=1元</p>
          <p>2.提现:满足一定金额才可提现</p>
        </div>
      </div>
    </div>
    <div class="withdraw-je">
      <div v-for="(item,index) in num " :key="index" :class="money>=item ?'item-num':'item-disnum'">
        <div @click="activeClick(item,index)" :class="index==count ?'itam-active':''">
          <span :class="money>=item?'item-body':'item-dis'">
            {{item}}
            <span class="item-dw">元</span>
          </span>
        </div>
      </div>
    </div>
    <div @click="moneyClick" :class="money<3?'withdraw-disan':'withdraw-an'">立即提现</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: "10.08",
      num: [3, 10, 20, 50, 100, 200],
      count: 999,
      dismoney: ""
    };
  },
  created() {
    window.document.title = "积分兑换";
  },
  methods: {
    //   立即提现
    moneyClick() {
      if (this.dismoney == "") {
        alert("请选择提现金额");
      }else{
         this.$router.push('/check') 
      }
    },
    //   选择的提现金额
    activeClick(item, index) {
      if (this.money >= item) {
        this.count = index;
        this.dismoney = item;
        console.log(   this.dismoney)
      }
    }
  }
};
</script>
<style lang="less">
.withdraw {
  .point-top {
    width: 100%;
    height: 230px;
    background: linear-gradient(
      0deg,
      rgba(254, 72, 71, 1) 0%,
      rgba(252, 148, 64, 1) 100%
    );
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    .point-nr {
      width: 90%;
      margin: auto;
      .kyjf {
        padding-top: 15px;
        .kyjf-name {
          font-size: 12px;
          float: right;
          color: #ffffff;
        }
      }
      .point-fg {
        padding-top: 40px;
        width: 60%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        text-align: center;
        color: #ffffff;
        .fg-top {
          font-size: 12px;
          color: rgba(255, 255, 255, 1);
          line-height: 26px;
          letter-spacing: 2px;
        }
        .fg-num {
          font-size: 20px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          letter-spacing: 2px;
        }
        .fg-dw {
          color: #f5f5f5;
          font-size: 14px;
          padding-left: 8px;
        }
        .fg-hl {
          letter-spacing: 2px;
          font-size: 12px;
          margin-top: 16px;
        }
        .fg-tx {
          font-size: 12px;
          border: 1px solid #fff;
          width: 60px;
          text-align: center;
          margin-top: 16px;
        }
        .fg-fg {
          width: 2px;
          height: 22px;
          margin-top: 8%;
          background: #ffffff;
        }
      }
    }
    .withdraw-bz {
      padding: 20px 0px 0px 10px;
      color: #fff;
      font-size: 10px;
      letter-spacing: 2px;
    }
  }
  .withdraw-je {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item-disnum {
      width: 28%;
      line-height: 44px;
      margin: auto;
      font-size: 20px;
      color: #fff;
      text-align: center;
      background: #888;
      margin-bottom: 40px;
      border-radius: 10px;
    }
    .itam-active {
      border: 1px solid red;
      border-radius: 10px;
    }
    .item-num {
      width: 28%;
      line-height: 40px;
      margin: auto;
      font-size: 20px;
      color: #fff;
      text-align: center;
      background: #fc9440;
      margin-bottom: 40px;
      border-radius: 10px;
      .item-dis {
        background: #888;
      }
      .item-body {
        background: #fc9440;
        .item-dw {
          font-size: 10px;
        }
      }
    }
  }
  .withdraw-an {
    border-radius: 10px;
    width: 86%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(#fc9041 0%, #fe5246 100%);
    position: fixed;
    bottom: 10px;
    left: 0px;
    right: 0px;
    margin-left: auto;
    margin-right: auto;
  }
  .withdraw-disan {
    border-radius: 10px;
    width: 86%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
    background: #888;
    position: fixed;
    bottom: 10px;
    left: 0px;
    right: 0px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>