<template>
  <div class="container">
    <div class="main-left">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <p>{{details.title}}</p>
          <p> <el-tag
            @click="handleClick(item)"
            size="mini"
            v-for="(item, index) in details.tags"
            :key="index"
            type="info"
            effect="dark">
            {{ item }}
          </el-tag></p>
          <div class="other-info">
            <p><i class="el-icon-user-solid"></i><span>{{details.user}}</span></p>
            <p><i class="el-icon-view"></i><span>阅读：{{details.read_num}}</span></p>
            <p><i class="el-icon-chat-square"></i><span>评论：{{details.com_num}}</span></p>
            <p><i class="el-icon-time"></i><span>{{details.create_time | dateformat('YYYY-MM-DD')}}</span></p>
          </div>
        </div>
        <div class="alert">
          <el-alert
            type="success"
            :closable="false">
            摘要：{{details.abstract}}
          </el-alert>
        </div>
        <div class="detail-img" v-html="details.content">
        </div>
      </el-card>
    </div>
    <div class="main-right">
<!--      <NoticeCard :info="noticeInfo"></NoticeCard>-->
      <HotTagCard></HotTagCard>
      <NewRecomond></NewRecomond>
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

  export default {
      components: {
        NoticeCard,
        HotTagCard,
        NewRecomond,
        FriendLinks,
        PublicAccount,
      },
      data() {
        return {
          id: this.$route.query.id,
          details: {},
        }
      },
    watch: {
      '$route'(n, o){
        this.id = n.query.id
        this.getDetail()
      }
    },
      mounted() {
        this.getDetail()
      },
      methods: {
        handleClick(name) {
          this.$router.push({
            name: 'search',
            query: {
              keyWord: name
            }
          })
          document.documentElement.scrollTop = 0
        },
        getDetail() {
          this.$axios.post('getDetail', {id: this.id})
            .then(res => {
              if (res.code == 200) {
                res.data.list.forEach( item => {
                  item.tags = item.tags.split(',')
                })
                this.details = res.data.list[0]
              }
            })
            .catch(err => {})
        },
      }
    }
</script>

<style scoped lang="less">
  .other-info{
    margin-top: 10px;
    display: flex;
    align-items: center;
    p{
      font-size: 13px;
      color: #5F5F5F;
      font-family: "Helvetica Neue";
      margin-right: 10px;
      line-height: 18px;
      span{
        margin-left: 5px;
      }
    }
  }
  .main-left{
    width: 845px;
    float: left;
    .el-tag{
      margin-right: 10px;
      cursor: pointer;
      margin-top: 10px;
      &:hover{
        color: #e6a23c;
      }
    }
  }
  
  .main-right{
    width: 260px;
    margin-left: 30px;
    float: left;
  }
  
  @media screen and  (min-width:860px) and (max-width:1148px) {
    .main-right{
      float: left;
      width: 845px;
      margin-left: 0px ;
    }
  }
</style>
