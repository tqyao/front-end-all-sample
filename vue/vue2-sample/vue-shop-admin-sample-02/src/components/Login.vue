<template>
  <div id="login_container">
    <div class="login_box">
      <div class="login_logo">
        <img src="@/assets/logo.png" alt="logo">
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_from" label-width="60px">
        <el-form-item prop="username" label="账号">
          <el-input suffix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input suffix-icon="iconfont icon-lock" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button @click="submitForm" type="primary">登陆</el-button>
          <el-button @click="resetForm" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {setToken} from "@/token";

export default {
  name: 'Login',
  data() {
    return {
      /**
       * 表单对象
       */
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      /**
       * 定义表单验证规则
       */
      loginFormRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    /**
     * 提交表单，发送登录请求
     */
    submitForm() {
      this.$refs.loginFormRef.validate(async validate => {
        if (!validate) return;
        const res = await this.$http.post('/login', this.loginForm)
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.success("登陆成功")
          setToken(res.data.token)
          await this.$router.push('/home')
          return
        }
        this.$message.error("登陆失败")
      })
    },
    /**
     * 重置表单校验
     */
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
#login_container {
  height: 100%;
  background-color: #324a68;

  .login_logo {
    width: 150px;
    height: 150px;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%, -40%);

    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }

  .login_box {
    width: 500px;
    height: 380px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login_from {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;;
    position: absolute;
    bottom: 80px;
  }
  .btns{
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
