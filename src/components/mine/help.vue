<template>
  <div class="help">
    <div class="help-list" v-for="(item,index) in list" :key="index">
      <p class="item-title">{{item.title}}</p>
      <p class="item-name">{{item.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: "1.如何进行投票?",
          name:
            "如何进行投票如何进行投票如何进行投票如何进行投票如何进行投票如何进行投票"
        },
        { title: "2.如何报名参与成为选手?", name: "如何报名参与成为选手" }
      ]
    };
  },
  created() {
    window.document.title = "帮助中心";
  }
};
</script>
<style lang="less">
.help {
  padding-top: 20px;
  .help-list {
    width: 90%;
    margin: auto;

    .item-title {
      color: #303030;
    }
    .item-name {
      font-size: 14px;
      color: #888888;
    }
  }
}
</style>