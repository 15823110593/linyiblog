<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>最新推荐</span>
    </div>
    <div class="content">
      <div v-for="(item, index) in newList" :key="index">
        <a @click="viewDetail(item.id)">{{item.title}}</a>
        <el-divider></el-divider>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
      data() {
        return{
          newList: []
        }
      },
      mounted() {
        this.getNewRecommend()
      },
      methods: {
        getNewRecommend() {
          this.$axios.post('getNewRecommend', {})
            .then(res => {
              if (res.code == 200) {
                this.newList = res.data.list
              }
            })
            .catch(err => {})
        },
        viewDetail(id) {
          this.$router.push({
            name: 'detail',
            query: {
              id
            }
          })
          document.documentElement.scrollTop = 0
        }
      }
    }
</script>

<style scoped lang="less">
</style>
