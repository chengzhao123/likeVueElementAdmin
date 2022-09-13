<template>
  <div class="login-container">
    <el-form class="login-form" :rules="loginRule" ref="loginForm" :model="loginForm" label-width="80px"
      label-position="left">
      <h1 :style="{ textAlign: 'center' }">程钊 BOOK</h1>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="loginForm.userName" maxlength="20" clearable placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" maxlength="20" clearable show-password placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label-width="0">
        <el-button :loading="loading" type="primary" style="width: 100%" @click="handleLogin">登录</el-button>
      </el-form-item>
      <span>管理员账号admin 密码随意</span>
    </el-form>
  </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loading: false,
      loginRule: {
        userName: [
          { required: true, message: '用户名必输', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必输', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              Message.success('登录成功')
              if(this.$route.query && this.$route.query.redirect) {
                this.$router.push({ path: this.$route.query.redirect })
              } else {
                this.$router.push({ path: '/' })
              }
              this.loading = false
            })
            .catch(err => {
              Message.error( err || '登录失败')
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background: url('../../assets/bg.png') no-repeat;
  background-size: cover;
  background-position: center 0;
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25rem;
    max-width: 100%;
    padding: 1.5rem 2.5rem 0;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0.3rem;
    overflow: hidden;
  }
}
</style>