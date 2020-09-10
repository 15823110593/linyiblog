<template>
  <div>
    <el-alert
      title="轮播图配置  注：图片大小 845x350"
      type="success"
      :closable="false">
    </el-alert>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="url-1: ">
        <el-input v-model="form.url1"></el-input>
      </el-form-item>
      <el-form-item label="banner-1: ">
        <el-upload
          class="upload-demo"
          :action="actionUrl"
          :data="{link_url: form.url1, isSave: true}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="form.file1">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import config from '@/libs/choseConfig'
  export default {
      data() {
        return{
          actionUrl: config.port + 'api/upload',
          form: {
            url1: '',
            file1: [],
            url2: '',
            file2: [],
            url3: '',
            file3: [],
            url4: '',
            file4: [],
          },
        }
      },
      mounted() {
      
      },
      methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        submit() {
        
        },
      }
    }
</script>

<style scoped>
  .el-alert{
    margin-bottom: 10px;
  }
  .el-icon-plus{
    font-size: 20px;
    border: 1px solid #cccccc;
    padding: 30px;
  }
</style>
