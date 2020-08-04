<template>
  <div class="konedetail">
    <div class="detail-title">{{ konedetailList.newsTitle}}</div>
    <div class="detail-bz">
      <img
        v-show="konedetailList.deptName"
        class="detail-doc"
        :src="$imgUrl+ konedetailList.avatar"
        alt
      />
      <span>{{ konedetailList.deptName}}</span>
      <!--  v-show="konedetailList.deptName" 避免本地图片出来过早 -->
      <img v-show="konedetailList.deptName" class="detail-gk" :src="img" alt />
      <span>{{ konedetailList.readNumber}}</span>
      <span class="detail-date">{{ konedetailList.createTime}}</span>
    </div>
    <div v-html="konedetailList.content" class="detail-centen">{{konedetailList.content}}</div>
  </div>
</template>
<script>
import { safeDetail } from "@/http/safe/safe";
export default {
  data() {
    return {
      parId: "",
      konedetailList: {},
      img: require("@/assets/img/konwledge/guankan.png"),
    };
  },
  created() {
    this.parId = this.$route.query.id;
    this.safeDetails();
  },
  methods: {
    safeDetails() {
      safeDetail({ id: this.parId }).then((res) => {
        console.log("详情", res.data);
        if (res.code == 200) {
          this.konedetailList = res.data;
        }
      });
    },
  },
};
</script>
<style lang="less" >
.konedetail {
  .detail-title {
    font-size: 16px;
    padding: 30px 44px 20px 23px;
    font-family: PingFang SC;
    font-weight: bold;
  }
  .detail-bz {
    height: 40px;
    color: #888888;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    border-bottom: 1px solid #f5f5f5;
    .detail-doc {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      padding-left: 23px;
      vertical-align: middle;
      padding-right: 20px;
    }
    .detail-gk {
      padding-left: 70px;
      padding-right: 10px;
    }
    .detail-date {
      padding-left: 20px;
    }
  }
  .detail-centen {
    padding: 10px 27px 0px 24px;
    color: #474747;
    text-align: left;
    line-height: 24px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
  }
}
</style>