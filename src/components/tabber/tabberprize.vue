<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" class="active_tab">
      <van-tabbar-item v-for="(item,index) in tabbars" :key="index" @click="tab(index,item.name)">
        <span :class="currIndex == index ? active:''">{{item.title}}</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: "/prize",
          title: "在线抽奖",
          normal: require("@/assets/img/home/bhjaward.png"),
          active: require("@/assets/img/home/bhjaward-active.png")
        },
        {
          name: "/womine",
          title: "我的",
          normal: require("@/assets/img/home/wode.png"),
          active: require("@/assets/img/home/wode-active.png")
        }
      ]
    };
  },
  methods: {
    tab(index, val) {
      this.currIndex = index;
      console.log(val);
      this.$router.push(val);
    }
  }
};
</script>

<style lang="less" >
.active_tab {
  height: 49px;
  background: rgba(249, 249, 249, 1);
  img {
    width: 26px;
    height: 26px;
  }
}
.van-tabbar-item--active {
  color: #ff4847;
}
</style>