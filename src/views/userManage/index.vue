/*
 * @Author: liuyr 
 * 用户管理页面
 * @Date: 2019-12-23 20:59:21 
 * @Last Modified by: Lisa
 * @Last Modified time: 2019-12-28 19:08:39
 */
<template>
  <div id="userManage">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户列表" name="user">
        <span slot="label" style="padding: 0 40px;font-size: 1.2em;">用户列表</span>
      </el-tab-pane>
    </el-tabs>
    <!-- 选项卡体部 -->
    <div class="tbl-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "userManage",
  data() {
    return {
      activeName: "user"
    };
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      console.log(tab.name);
      this.$router.push("/userManage/index/" + tab.name);
    }
  }
};
</script>
<style lang="scss" scoped>
 /deep/ .el-tabs__item {
    height: 45px;
    line-height: 45px;
}
</style>
