<template>
  <div class="container">
   <div class="main-left">
     <div class="slide">
       <el-carousel arrow="always" indicator-position="outside">
         <el-carousel-item v-for="(item, index) in bannerList" :key="index">
           <a :href="item.link_url" target="_blank"><img style="width: 100%; height: auto;" :src="item.img_url"></a>
         </el-carousel-item>
       </el-carousel>
     </div>
     
     <el-card class="box-card box-card-rec">
       <div class="tag">
         <el-tag
           type="danger"
           effect="dark">
           站主顶置
         </el-tag>
       </div>
       <h1>{{topInfo.title}}</h1>
       <p @click="handleClick(topInfo.id)" class="info" >{{topInfo.abstract}}</p>
     </el-card>
  
     <el-card class="box-card">
       <div slot="header" class="title">
         <span>最新发布</span>
       </div>
       <div class="content">
          <template v-for="(item, index) in cardList">
            <CardListItem :data="item"></CardListItem>
          </template>
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
     </el-card>
     
   </div>
    <div class="main-right">
      <NoticeCard></NoticeCard>
      <HotTagCard></HotTagCard>
      <NewRecomond></NewRecomond>
      <FriendLinks></FriendLinks>
      <PublicAccount></PublicAccount>
    </div>
  </div>
</template>

<script>
  import CardListItem from '@/components/cardListItem'
  import NoticeCard from '@/components/noticeCard'
  import HotTagCard from '@/components/hotTagCard'
  import NewRecomond from '@/components/newRecomond'
  import FriendLinks from '@/components/friendLinks'
  import PublicAccount from '@/components/publicAccount'

  export default {
      components: {
        CardListItem,
        NoticeCard,
        HotTagCard,
        NewRecomond,
        FriendLinks,
        PublicAccount
      },
      data() {
        return {
          bannerList: [],
          cardList: [],
          topInfo: {},
          pageSize: 10,
          page: 1,
          total: 0,
        }
      },
      mounted(){
        console.log("一个人的改变，\n源自于自我的一种积极进取，\n而不是等待什么天赐良机。");
        this.getArticles()
        this.getTop()
        this.getBanner()
      },
      methods: {
        handleCurrentChange(e) {
          this.page = e
          this.getArticles()
        },
        getArticles() {
          let params = {
            page: this.page,
            pageSize: this.pageSize,
          }
          this.$axios.post('getArticles', params)
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
        },
        getTop() {
          this.$axios.post('getTop', {})
            .then(res => {
              if (res.code == 200 && res.data.list[0]) {
                this.topInfo = res.data.list[0]
              }
            })
            .catch(err => {})
        },
        handleClick(id) {
          this.$router.push({
            name: 'detail',
            query: {
              id
            }
          })
          document.documentElement.scrollTop = 0
        },
        getBanner() {
          if (sessionStorage.getItem('bannerList')){
            this.bannerList = JSON.parse(sessionStorage.getItem('bannerList'))
          }else {
            this.$axios.post('getBanner', {})
              .then(res => {
                if (res.code == 200) {
                  this.bannerList = res.data.list
                  sessionStorage.setItem('bannerList', JSON.stringify(this.bannerList))
                }
              })
              .catch(err => {})
          }
        },
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
