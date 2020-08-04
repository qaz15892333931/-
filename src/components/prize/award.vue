<template>
  <div class="ckgd">
    <div class="kb"></div>
    <div class="body">
      <div
        class="list"
        v-for="(item,index) in lists"
        :key="index"
        :class="index%2==0?'list':'dsList'"
      >
        <p class="item-phone">{{item.phone}}</p>
        <p class="item-name">获得{{item.prizeName}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { desensitizationList } from "@/http/prize/prize";
export default {
  data() {
    return {
      id: "",
      lists: []
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.desensitizationLists();
  },

  methods: {
    // 中奖列表
    desensitizationLists() {
      desensitizationList({
        activityId: this.id
      }).then(res => {
        console.log("中奖列表", res);
        // 前10条数据
        this.lists = res.rows;
      });
    }
  }
};
</script>
<style lang="less">
.ckgd {
  padding-bottom: 20px;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(114, 69, 247, 1) 0%,
    rgba(71, 146, 252, 1) 52%,
    rgba(114, 69, 247, 1) 100%
  );
  .kb {
    width: 100%;
    height: 25px;
  }
  .body {
    margin: 0 auto;
    width: 92%;
    height: 100%;
    border-radius: 10px;
    .list {
      background: #a585fb;
      font-size: 14px;
      color: #ffffff;
      display: flex;
      justify-content: space-around;
    }
    .dsList {
      background: #855cf0;
      font-size: 14px;
      color: #ffffff;
      display: flex;
      justify-content: space-around;
    }
    .item-phone,
    .item-name {
      margin-top: 6px;
      margin-bottom: 6px;
    }
  }
}
</style>