<template>
  <div style="width: 840px">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="关于：">
        <el-select v-model="form.cate" placeholder="请选择分类">
          <el-option v-for="item in cateList" :label="item.name" :key="item.id" :value="item.id"></el-option>
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
  export default {
    components: {
      'editor': Editor
    },
    data() {
      return {
        form: {
          cate: '',
          content: '',
        },
        cateList: [
          {id: 1, name: '关于我'},
          {id: 2, name: '关于博客'},
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
        console.log(this.form)
        this.$axios.post('setAbout', this.form)
          .then(res => {
            if (res.code == 200) {
              this.$alert(res.message, '提示')
            }
          })
          .catch(err => {})
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
