<template>
  <div class="menu-container">
    <el-menu
      :default-active="getActiveIndex"
      class="nav-bar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item class="no-hover">
        <div class="logo"></div>
      </el-menu-item>
      <el-menu-item class="menu-item-display" index="1">博客首页</el-menu-item>
      <el-menu-item class="menu-item-display" index="2">技术分享</el-menu-item>
      <el-menu-item class="menu-item-display" index="3">学习笔记</el-menu-item>
      <el-menu-item class="menu-item-display" index="4">心情随笔</el-menu-item>
      <el-menu-item class="menu-item-display" index="5">书籍分享</el-menu-item>
      <el-menu-item disabled class="menu-item-display" index="6">博客留言</el-menu-item>
      <el-menu-item disabled class="menu-item-display" index="7">关于博客</el-menu-item>
      <el-menu-item class="no-hover menu-item-display">
        <div class="search">
          <el-input @keyup.enter.native="goSearch" placeholder="请输入内容" v-model="keyWord" class="input-with-select">
            <el-button @click="goSearch" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-menu-item>
<!--      <el-menu-item index="8">-->
<!--        <el-button @click="drawer = true">button</el-button>-->
<!--      </el-menu-item>-->
    </el-menu>
<!--    <el-drawer-->
<!--      title="我是标题"-->
<!--      :visible.sync="drawer"-->
<!--      :direction="direction">-->
<!--      <span>我来啦!</span>-->
<!--    </el-drawer>-->
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        keyWord: '',
        drawer: false,
        direction: 'ttb',
      }
    },
    computed: {
      ...mapGetters(['getActiveIndex'])
    },
    mounted(){
    },
    methods: {
      ...mapActions([
        'changeActiveIndex'
      ]),
      handleSelect(key, keyPath) {
        switch (key) {
          case '1':
            this.$router.push({
              name: 'home'
            })
            this.changeActiveIndex(key)
            sessionStorage.setItem('activeIndex', key)
            break;
          case  '2':
            this.$router.push({
              name: 'tecShare',
              query: {
                cate: '技术分享'
              }
            })
            this.changeActiveIndex(key)
            sessionStorage.setItem('activeIndex', key)
            break;
          case '3':
            this.$router.push({
              name: 'studyNote',
              query: {
                cate: '学习笔记'
              }
            })
            this.changeActiveIndex(key)
            sessionStorage.setItem('activeIndex', key)
            break;
          case  '4':
            this.$router.push({
              name: 'casualNote',
              query: {
                cate: '心情随笔'
              }
            })
            this.changeActiveIndex(key)
            sessionStorage.setItem('activeIndex', key)
            break;
          case '5':
            this.$router.push({
              name: 'bookShare',
              query: {
                cate: '书籍分享'
              }
            })
            this.changeActiveIndex(key)
            sessionStorage.setItem('activeIndex', key)
            break;
          case  '6':
            // this.$router.push({
            //   name: '',
            //   query: {
            //     cate: '博客留言'
            //   }
            // })
            this.activeIndex = key
            sessionStorage.setItem('activeIndex', key)
            break;
          case  '7':
            // this.$router.push({
            //   name: '',
            //   query: {
            //     cate: '关于博客'
            //   }
            // })
            this.activeIndex = key
            sessionStorage.setItem('activeIndex', key)
            break;
          default:
            break;
        }
      },
      goSearch() {
        this.$router.push({
          name: 'search',
          query: {
            keyWord: this.keyWord.trim()
          }
        })
        document.documentElement.scrollTop = 0
      },
    }
  }
</script>

<style scoped>
  .menu-container{
    height: 60px;
    max-width: 2560px;
    display: flex;
    justify-items: center;
    background-color: rgb(84, 92, 100);
    overflow: hidden;
  }
  .logo{
    width: 240px;
    height: 60px;
    background: url("../assets/img/logo.png") 100% 100% no-repeat;
  }
  
  .search{
    width: 260px;
  }
  
  .no-hover:hover{
    background-color: #545C64 !important;
    cursor: default !important;
  }
</style>
