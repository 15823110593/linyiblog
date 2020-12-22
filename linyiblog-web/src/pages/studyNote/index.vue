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
      <NoticeCard></NoticeCard>
      <FriendLinks></FriendLinks>
      <PublicAccount></PublicAccount>
    </div>
  </div>
</template>

<script>
  import NoticeCard from '@/components/noticeCard'
  import HotTagCard from '@/components/hotTagCard'
  import NewRecomond from '@/components/newRecomond'
  import FriendLinks from '@/components/friendLinks'
  import PublicAccount from '@/components/publicAccount'
  import CardListItem from '@/components/cardListItem'
  import { Loading } from 'element-ui'

  export default {
      components: {
        PublicAccount,
        CardListItem,
        NoticeCard,
        HotTagCard,
        NewRecomond,
        FriendLinks
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
          Loading.service({fullscreen: true})
          this.$axios.post('getStudyNote', params)
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
        }
      }
    }
</script>

<style scoped>

</style>
