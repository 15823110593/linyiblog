<template>
  <div class="container">
    <div class="main-right">
      <div class="info">
        <ul>
          <li @click="changeActive(1,'关于我')" :class="activeMe">关于我</li>
          <li @click="changeActive(2,'关于博客')" :class="activeBl">关于博客</li>
        </ul>
      </div>
    </div>
    <div class="main-left">
      <el-card class="box-card">
        <div slot="header" class="title">
          <span>{{title}}</span>
        </div>
        <div class="content" v-html="content"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          title: '关于我',
          activeMe: 'active-yes',
          activeBl: 'active-no',
          content: '',
        }
      },
      mounted() {
        this.getAboutMe()
      },
      methods: {
        getAboutMe() {
          this.$axios.post('getAboutMe', {})
            .then(res => {
              if (res.code == 200) {
                this.content = res.data.content
              }
            })
            .catch(err => {})
        },
        getAboutBlog() {
          this.$axios.post('getAboutBlog', {})
            .then(res => {
              if (res.code == 200) {
                this.content = res.data.content
              }
            })
            .catch(err => {})
        },
        changeActive(val, title) {
          this.title = title
          if (val == 1){
            this.activeMe = 'active-yes';
            this.activeBl = 'active-no';
            this.getAboutMe()
          }else {
            this.activeMe = 'active-no';
            this.activeBl = 'active-yes';
            this.getAboutBlog()
          }
        },
      }
    }
</script>

<style scoped lang="less">
  .main-right{
    margin-right: 20px;
  }
  .info{
    margin-bottom: 20px;
    ul {
      background-color: #fff;
      li {
        cursor: pointer;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }
    }
  }
  .active-yes{
    background-color: rgb(84, 92, 100);
    color: #fff;
  }
  .active-no{
    background-color: #fff;
  }
  .main-left{
    .box-card{
      min-height: 550px;
    }
  }
</style>
