<template>
  <div class="container">
    <div>
      <el-menu
        :default-active="adminIndexActive"
        class="el-menu-vertical"
        @select="selectMunu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <span slot="title">博客编辑</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">标签管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">博文管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">评价管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">留言管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <span slot="title">轮播图管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <span slot="title">关于博客</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          adminIndexActive: sessionStorage.getItem('adminIndexActive') ? sessionStorage.getItem('adminIndexActive') : '1',
          isCollapse: true
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        selectMunu(e) {
          sessionStorage.setItem('adminIndexActive', e)
          switch (e) {
            case '1':
              this.$router.push({
                name: 'ue'
              })
              break;
            case '2':
              break;
            case '3':
              break;
            case '4':
              break;
            case '5':
              break;
            case '6':
              this.$router.push({
                name: 'sysConfig'
              })
              break;
            case '7':
              this.$router.push({
                name: 'about'
              })
              break;
          }
        }
      }
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    display: flex;
    padding-top: 0px;
    .content{
      background-color: #fff;
      width: 83%;
      margin-left: 10px;
      padding: 20px;
      overflow-x: hidden;
    }
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
</style>
