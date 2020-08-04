<template>
  <div class="profile">
    <div class="profile-list">
      <span>头像</span>
      <img src="@/assets/img/mine/touxiang.png" alt />
    </div>
    <div class="profile-list">
      <span>昵称</span>
      <input class="list-input" type="text" value="丽丽" />
    </div>
    <div class="profile-list">
      <span>联系电话</span>
      <input class="list-input" type="text" value="15896336548" />
    </div>
    <div class="profile-an">修改信息</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less">
.profile {
  .profile-list {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    padding: 10px;
    border-bottom: 1px solid #f5f5f5;
    color: #232323;
    .list-input {
      border: 0px;
      width: 100px;
      text-align: right;
    }
  }
  .profile-an {
    margin-top: 200px !important;
    border-radius: 10px;
    margin: auto;
    width: 86%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(#fc9041 0%, #fe5246 100%);
  }
}
</style>