<template>
  <div class="container">
    <div class="main-left">
      <el-card class="box-card">
        <div slot="header" class="title">
          <span>{{title}}</span>
        </div>
        <div class="content">
          <template v-for="(item, index) in cardList">
            <CardListItem :data="item"></CardListItem>
          </template>
        </div>
      </el-card>
      <div>
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="total, prev, pager, next"
          :page-size="pageSize"
          :current-page.sync="page"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="main-right">
      <PublicAccount></PublicAccount>
    </div>
  </div>
</template>

<script>
  import PublicAccount from '@/components/publicAccount'
  import CardListItem from '@/components/cardListItem'
    export default {
      components: {
        PublicAccount,
        CardListItem
      },
      data() {
        return{
          title: this.$route.query.cate,
          cardList: [],
          pageSize: 10,
          page: 1,
          total: 0,
        }
      },
      mounted() {
        this.search()
  
      },
      methods: {
        handleCurrentChange(e) {
          this.page = e
          this.search()
        },
        search() {
          let params = {
            page: this.page,
            pageSize: this.pageSize,
          }
          this.$axios.post('getTecShare', params)
            .then(res => {
              if (res.code == 200) {
                this.page = res.page
                this.total = res.total
                res.data.list.forEach( item => {
                  item.tags = item.tags.split(',')
                })
                this.cardList = res.data.list
              }
            })
            .catch(err => {})
        }
      }
    }
</script>

<style scoped>

</style>
