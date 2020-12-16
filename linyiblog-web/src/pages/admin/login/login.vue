<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          form: {
            username: '',
            password: '',
          },
          rules: {
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
            ],
          }
        }
      },
      mounted() {
      
      },
      methods: {
        onSubmit() {
         this.$refs['form'].validate( valid => {
           if (valid) {
             this.$axios.post('login', this.form)
               .then(res => {
                 if (res.code == 200) {
                    sessionStorage.setItem('isLogin', true)
                    this.$router.push({
                      name: 'ue'
                    })
                 }else {
                   this.$alert(res.message,'提示')
                 }
               })
               .catch(err => {
                 this.$alert(res.message,'提示')
               })
           }
         })
        },
      }
    }
</script>

<style scoped>

</style>
