<template>
  <el-card class="box-card box-card-first">
    <div class="tag">
      <el-tag
        type="warning"
        effect="dark">
        站点公告
      </el-tag>
    </div>
    <h1>{{info.title}}</h1>
    <p class="info" @click="handleClick(info.id)">{{info.abstract}}</p>
  </el-card>
</template>

<script>
    export default {
      data() {
        return {
          info: {}
        }
      },
      mounted() {
        this.getNotice()
      },
      methods: {
        handleClick(id) {
          this.$router.push({
            name: 'detail',
            query: {
              id
            }
          })
          document.documentElement.scrollTop = 0
        },
        getNotice() {
          this.$axios.post('getNotice', {})
            .then(res => {
              if (res.code == 200 && res.data.list[0]) {
                this.info = res.data.list[0]
              }
            })
            .catch(err => {})
        }
      }
    }
</script>

<style scoped lang="less">
.info{
  cursor: pointer;
  &:hover{
    color: #3399CC;
  }
}
</style>
