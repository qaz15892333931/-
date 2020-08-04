<template>
  <div class="safe">
    <div class="safe-tab">
      <van-tabs v-model="titleValue" @click="onClick">
        <van-tab v-for="(item,index) in titles" :key="index" :title="item.dictLabel">
          <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
          <knowledge
            :knowledgeList="knowledgeList"
            @knowledgeOnload="knowledgeOnload"
            :finishLoad="finishLoad"
          ></knowledge>
          <!-- </van-list> -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import knowledge from "@/components/knowledge/knowledge";
import { safeList } from "@/http/safe/safe";
export default {
  components: { knowledge },
  data() {
    return {
      titles: [],
      titleValue: 0,
      knowledgeList: [],
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        newsType: "",
      },
      finishLoad: false,
    };
  },
  created() {
    // 新闻类型
    this.getDicts("journalism_type").then((res) => {
      console.log("新闻类型", res);
      if (res.code == 200) {
        this.titles = res.data;
      }
    });
    this.safeLists();
  },
  methods: {
    // 列表数据
    safeLists() {
      this.queryParams.newsType = this.titleValue;
      safeList(this.queryParams).then((res) => {
        if (res.code == 200) {
          this.knowledgeList = res.rows;
        }
      });
    },
    onClick(dictValue) {
      this.knowledgeList = [];
      console.log("标题", dictValue);
      this.titleValue = dictValue;
      this.safeLists();
    },
    knowledgeOnload(finished) {
      console.log("finished", finished);
      if (finished == false) {
        this.queryParams.pageNum++;
        safeList(this.queryParams).then((res) => {
          if (res.code == 200) {
            console.log("加载数据", res);
            if (res.rows.length < this.queryParams.pageSize) {
              this.finishLoad = true;
            } else {
              this.queryParams.pageNum++;
            }
            res.rows.forEach((o) => {
              this.knowledgeList.push(o);
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="less" >
.safe {
  .safe-tab {
    margin-top: 18px;
    padding: 8px 16px;
    .van-tab__text {
      font-size: 18px;
    }
    .van-tabs--line .van-tabs__wrap {
      height: 32px;
      border: 1px solid rgba(255, 72, 71, 1);
      border-radius: 20px;
    }

    .van-tab--active {
      color: #fffefe !important;
      // background-image: url("../../assets/img/home/jx.png") ;
      background: linear-gradient(90deg, #fe4746 0%, #fc9440 100%);
      // border-bottom: 0px;
    }
    .van-tabs__line {
      height: 0px;
    }
    .van-tabs__nav--line {
      padding-bottom: 16px;
    }
    .van-tabs__line {
      background-color: #ffffff;
    }
  }
}
</style>