<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>热门标签</span>
    </div>
    <div class="content">
      <el-tag
        @click="handleClick(item.name)"
        size="small"
        v-for="item in tagItems"
        :key="item.id"
        type="info"
        effect="dark">
        {{ item.name }}
      </el-tag>
    </div>
  </el-card>
</template>

<script>
    export default {
      data() {
        return{
          tagItems: []
        }
      },
      mounted() {
        this.getTags()
      },
      methods: {
        getTags() {
          this.$axios.post('getTags', {id: this.$route.query.id})
            .then(res => {
              if (res.code == 200) {
                this.tagItems = res.data.list
              }
            })
            .catch(err => {})
        },
        handleClick(name) {
          this.$router.push({
            name: 'search',
            query: {
              keyWord: name
            }
          })
          document.documentElement.scrollTop = 0
        }
      }
    }
</script>

<style scoped lang="less">
</style>
