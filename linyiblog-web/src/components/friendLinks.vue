<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>友情链接</span>
    </div>
    <div class="content">
      <div v-for="(item, index) in otherLink" :key="index">
        <a :href="item.url" target="_blank">{{item.name}}</a>
        <el-divider></el-divider>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
      data() {
        return {
          otherLink: []
        }
      },
      mounted() {
        this.getLinks();
      },
      methods: {
        getLinks() {
          this.$axios.post('getLinks', {})
            .then(res => {
              if (res.code == 200) {
                this.otherLink = res.data.list
              }
            })
            .catch(err => {})
        }
      }
    }
</script>

<style scoped lang="less">
</style>
