<template>
  <!-- :finished="finished" finished-text="没有更多了" @load="onLoad" v-model="loading" -->
  <van-list>
    <div class="knowledge" v-if="knowledgeList">
      <div
        class="knowledge-list"
        v-for="(item,index) in knowledgeList"
        :key="index"
        @click="listClick(item.id)"
      >
        <div class="list-left">
          <div class="list-content">{{item.newsTitle}}</div>
          <p>
            <span class="list-date">{{item.createTime}}</span>
            <img class="list-img" :src="img" />
            <span class="list-num">{{item.readNumber}}</span>
          </p>
        </div>

        <div class="list-right">
          <img :src="$imgUrl+ item.img" alt />
        </div>
      </div>
    </div>
  </van-list>
</template>
<script>
import { safeList } from "@/http/safe/safe";
export default {
  props: {
    knowledgeList: {
      type: Array, //可指定接收类型，如:Array.
      //可设置默认值
    },
    finishLoad: {
      type: Boolean,
    },
  },
  data() {
    return {
      img: require("@/assets/img/konwledge/guankan.png"),
      loading: false,
      finished: false,
      //是否加载中 1 没加载  0  加载
      isload: 1,
    };
  },
  created() {},
  methods: {
    listClick(id) {
      this.$router.push({ path: "/konedetail", query: { id: id } });
    },
    // 滚动到底部加载更多
    onLoad() {
      console.log("滚动到底部");
      // if (this.finishLoad) {
      //   this.finished = true;
      // }
      // if (this.isload == 1) {
      //   this.isload = 0;
      //   this.loading = true;
      //   console.log("调用表格");
      //   this.$emit("knowledgeOnload", this.finished, this.isload, this.loading);
      // }
    },
  },
};
</script>
<style lang="less" >
.knowledge {
  height: 88vh;
  overflow: auto;
  .knowledge-list {
    font-family: PingFang SC;
    padding-top: 20px;
    height: 100px;
    border-bottom: 1px solid #f5f5f5;
    .list-left,
    .list-right {
      display: inline-block;
    }
    .list-left {
      width: 60%;
      padding-right: 30px;
      .list-content {
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden; /*超出的文本隐藏*/
        text-overflow: ellipsis; /* 溢出用省略号*/
        -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
        color: #303030;
        font-size: 13px;
        width: 206px;
        // height: 36px;
      }
      .list-date,
      .list-img,
      .list-num {
        padding-top: 30px;
        color: #888888;
        font-size: 10px;
      }
      .list-img {
        padding-left: 80px;
        padding-right: 6px;
      }
    }
    .list-right {
      img {
        border-radius: 5px;
        width: 99px;
        height: 89px;
        vertical-align: text-b;
      }
    }
  }
}
</style>