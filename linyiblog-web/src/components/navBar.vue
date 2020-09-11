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
      <el-menu-item class="menu-item-pc-display" index="8">
        <div @click="drawer = true">
          <i class="el-icon-s-fold"></i>
        </div>
      </el-menu-item>
    </el-menu>
    <el-drawer
      ref="drawer"
      :visible.sync="drawer"
      :direction="direction">
  
      <el-menu
        :default-active="getActiveIndex"
        @select="handleSelect"
        class="el-menu-vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <span slot="title">博客首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">技术分享</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">学习笔记</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">心情随笔</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">书籍分享</span>
        </el-menu-item>
        <el-menu-item disabled index="6">
          <span slot="title">博客留言</span>
        </el-menu-item>
        <el-menu-item disabled index="7">
          <span slot="title">关于博客</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        keyWord: '',
        drawer: false,
        direction: 'rtl',
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
        if (key != 8){
          this.$refs.drawer.hide()
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

<style scoped lang="less">
  .el-drawer{
    background-color: rgb(84, 92, 100) !important;
  }
  .nav-bar{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
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
