<template>
  <div class="container">
    <div class="main-left">
      <el-card class="box-card">
        <div slot="header" class="title">
          <span>"{{keyWord}}" 的结果, 共{{total}}条</span>
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
  import { Loading } from 'element-ui'

  export default {
    components: {
      PublicAccount,
      CardListItem
    },
    data() {
      return{
        keyWord: this.$route.query.keyWord,
        resultNum: '100',
        cardList: [],
        page: 1,
        pageSize: 10,
        total: 0,
      }
    },
    created() {
      console.log('333')
    },
    mounted() {
      this.search();
    },
    watch: {
      '$route'(n, o){
        this.keyWord = n.query.keyWord
        this.search()
      }
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
          keyWord: this.keyWord
        }
        Loading.service({fullscreen: true})
        this.$axios.post('search', params)
          .then(res => {
            if (res.code == 200) {
              this.page = res.page
              this.total = res.total
              res.data.list.forEach( item => {
                item.tags = item.tags.split(',')
              })
              this.cardList = res.data.list
            }
            Loading.service({fullscreen: true}).close()
          })
          .catch(err => {
            Loading.service({fullscreen: true}).close()
          })
      },
    }
  }
</script>

<style scoped>

</style>
