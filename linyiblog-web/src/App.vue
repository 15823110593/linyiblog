<template>
  <div id="app">
    <div ref="header" class="header">
      <NavBar></NavBar>
    </div>
    <div class="cp" :style="{paddingTop: mgTop.height +  'px'}">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/navBar'
  export default {
    components: {
      NavBar
    },
    data() {
      return{
        screenWidth: '',
        timer: '',
        mgTop: {
          height: '61'
        }
      }
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    methods: {
    
    },
    watch:{
      screenWidth(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function(){
            // 打印screenWidth变化的值
            let height = that.$refs.header.offsetHeight
            that.$set(that.mgTop, 'height', height)
            console.log(this.mgTop)
            that.timer = false
          },400)
        }
      }
    }
}
</script>

<style>
  #app{
    height: 100%;
  }
  .header{
    position: fixed;
    z-index: 10000;
    width: 100%;
  }
  .cp{
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
