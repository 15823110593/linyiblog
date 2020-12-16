<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="摘要：">
        <el-input v-model="form.abstract"></el-input>
      </el-form-item>
      <el-form-item label="图片：">
        <el-upload
          class="upload-demo"
          :action="actionUrl"
          :data="{isSave: false}"
          :on-success="handleSuccess"
          :file-list="pic">
          <span>（160x160）</span>
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="标签：">
        <el-input v-model="form.region"></el-input>
      </el-form-item>
      <el-form-item label="分类：">
        <el-select multiple v-model="form.cate" placeholder="请选择分类">
          <el-option v-for="item in cateList" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告：">
        <el-select v-model="form.notice_flag" placeholder="请选择是否公告">
          <el-option v-for="item in isNotList" :label="item.name" :key="item.id" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="顶置：">
        <el-select v-model="form.top_flag" placeholder="请选择活是否顶置">
          <el-option v-for="item in isNotList" :label="item.name" :key="item.id" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容：">
      </el-form-item>
      <editor v-model="form.content" ref="editor" :init="init"></editor>
    </el-form>
    <div class="btns">
      <el-button @click="onclick" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
  import Editor from '_@tinymce_tinymce-vue@3.2.2@@tinymce/tinymce-vue'
  import config from '@/libs/choseConfig'
  export default {
    components: {
      'editor': Editor
    },
    data() {
      return {
        actionUrl: config.port + 'api/upload',
        isNotList: [
          {id: 0, value: 0, name: '否'},
          {id: 1, value: 1, name: '是'}
        ],
        val: '',
        pic: [],
        form: {
          name: '',
          abstract: '',
          region: '',
          content: '',
          cate: '',
          pic_url: '',
          notice_flag: 0,
          top_flag: 0,
        },
        cateList: [
          {id: 2, tec_share: '0', name: '技术分享'},
          {id: 3, study_note: '0', name: '学习笔记'},
          {id: 4, casual_note: '0', name: '心情随笔'},
          {id: 5, book_share: '0', name: '每日一题'},
        ],
        init: {
          // 组件
          plugins:
            ' lists image colorpicker textcolor wordcount contextmenu ',
          // 工具栏
          toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink image  | removeformat ',
          branding: false,
          min_height: 500,
        }
      }
    },
    methods:{
      onclick() {
        let tec_share = 0, study_note = 0, casual_note = 0, book_share = 0;
        console.log(this.form.cate)
        this.form.cate.forEach(item => {
          switch (item) {
            case 2:
              tec_share = 1
              break;
            case 3:
              study_note = 1
              break;
            case 4:
              casual_note = 1
              break;
            case 5:
              book_share = 1
              break;
          }
        })
        let params = {
          title: this.form.name,
          abstract: this.form.abstract,
          tags: this.form.region,
          pic: this.form.pic_url,
          content: this.form.content,
          user: 'admin',
          read_num: 0,
          com_num: 0,
          create_time: this.$moment(new Date()).format('YYYY-MM-DD'),
          notice_flag: this.form.notice_flag,
          top_flag: this.form.top_flag,
          tec_share,
          study_note,
          casual_note,
          book_share
        }
        console.log(params)
        this.$axios.post('addArticle', params)
          .then(res => {
            if (res.code == 200) {
            
            }
          })
          .catch(err => {})
      },
      handleSuccess(val) {
        this.form.pic_url = val.url
      },
    },
    mounted() {
    
    }
  }
</script>

<style scoped>
 .container{
   width: 100%;
 }
  .btns{
    margin-top: 10px;
    text-align: center;
  }
  .el-select{
    width: 100%;
  }
</style>
