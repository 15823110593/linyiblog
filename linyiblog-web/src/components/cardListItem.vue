<template>
  <el-card class="box-card-new">
   <div class="box-container">
     <div class="content">
       <p @click="viewDetail(data)" class="h1">{{data.title}}</p>
       <div class="tags">
         <el-tag
           @click="goSearch(item)"
           size="mini"
           v-for="(item, index) in data.tags"
           :key="index"
           type="info"
           effect="dark">
           {{ item }}
         </el-tag>
       </div>
       <p class="p1">{{data.abstract}}</p>
       <div class="other-info">
         <p><i class="el-icon-user-solid"></i><span>{{data.user}}</span></p>
         <p><i class="el-icon-view"></i><span>阅读：{{data.read_num}}</span></p>
         <p><i class="el-icon-chat-square"></i><span>评论：{{data.com_num}}</span></p>
         <p><i class="el-icon-time"></i><span>{{data.create_time | dateformat('YYYY-MM-DD')}}</span></p>
       </div>
     </div>
     <div @click="viewDetail(data)" class="img">
       <img :src="data.pic">
     </div>
   </div>
  </el-card>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
      props: {
        data: {
          type: Object,
          default: function () {
            return {}
          }
        }
      },
      mounted() {
      },
      methods: {
        ...mapActions([
          'changeActiveIndex'
        ]),
        goSearch(keyWord) {
          this.$router.push({
            name: 'search',
            query: {
              keyWord
            }
          })
          document.documentElement.scrollTop = 0
        },
        changeActive(data){
          if(data.tec_share == 1) {
            this.changeActiveIndex('2')
            sessionStorage.setItem('activeIndex', '2')
            return;
          }else if (data.study_note == 1){
            this.changeActiveIndex('3')
            sessionStorage.setItem('activeIndex', '3')
            return;
          } else if (data.casual_note == 1){
            this.changeActiveIndex('4')
            sessionStorage.setItem('activeIndex', '4')
            return;
          }else if (data.book_share == 1){
            this.changeActiveIndex('5')
            sessionStorage.setItem('activeIndex', '5')
            return;
          }
        },
        viewDetail(data) {
          this.$router.push({
            name: 'detail',
            query: {
              id: data.id
            }
          })
          document.documentElement.scrollTop = 0
          this.changeActive(data)
        }
      }
    }
</script>

<style scoped lang="less">
  .box-card-new{
    margin-bottom: 20px;
    .box-container{
      display: flex;
      justify-content: space-around;
      .content{
        width: 590px;
        overflow: hidden;
        .tags{
          margin: 5px 0px;
          .el-tag{
            margin-right: 10px;
            cursor: pointer;
            &:hover{
              color: #e6a23c;
            }
          }
        }
        .p1{
          height: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #5F5F5F;
        }
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
      }
      .h1{
        font-size: 16px;
        color: #333333;
        white-space: nowrap;
        cursor: pointer;
        &:hover{
          color: #3399CC;
        }
      }
      .img, img{
        width: 160px;
        height: 160px;
        cursor: pointer;
      }
    }
  }
</style>
