<template>
  <div id="base_login"
       style="height: 100%;">
    <div class="login_container">
      <el-form :model="loginForm"
               :rules="rules"
               label-position="top"
               label-width="0px"
               size="small"
               style="width: 260px;margin: auto"
               v-loading="loading">
        <div class="login_title" style="">登录</div>
        <el-form-item prop="id" label="类别" class="form-label" style="text-align: left"
                      label-width="80px">
          <el-select v-model="loginForm.job" placeholder="请选择类型">
            <el-option
              v-for="item in jobOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="id" label="工号" class="form-label" style="text-align: left"
                      label-width="80px">
          <el-input type="text"
                    v-model="loginForm.id"
                    auto-complete="off"
                    placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" class="form-label" style="text-align: left" label-width="80px">
          <el-input type="password"
                    v-model="loginForm.password"
                    auto-complete="off"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary"
                     style="background-color: #356eff;border-color: #356eff;width: 260px;border-radius: 3px;margin-top: 25px;margin-bottom: 5px"
                     v-on:click="login" round>登录
          </el-button>
          <router-link to="register"
                       style="color: #006FFF;font-size: 12px;text-decoration: none;width: 100px">
            <a>注册</a>
          </router-link>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data() {
      return {
        loginForm: {
          job: null,
          id: '',
          password: ''
        },
        rules: {
          job: [{required: true, message: '类型不得为空', trigger: 'blur'}],
          id: [{required: true, message: '工号不得为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不得为空', trigger: 'blur'}]
        },
        loading: false,
        jobOption: [
          {
            value: 0,
            label: '主治医生'
          },
          {
            value: 1,
            label: '急诊医生'
          },
          {
            value: 2,
            label: '护士长'
          },
          {
            value: 3,
            label: '病房护士'
          },
        ],
      }
    },

    methods: {
      login() {
        if (this.loginForm.job === '' ||
          this.loginForm.id === "" ||
          this.loginForm.password === "") {
          this.$message.error('类型、工号和密码均不得为空');
          return;
        }
        console.log(this.loginForm)
        this.$axios.post('/login', {
          job: this.loginForm.job,
          id: this.loginForm.id,
          password: this.loginForm.password
        })
          .then(resp => {
            if (resp.data.hasOwnProperty("code")) {
              const stateCode = resp.data.code;
              if (stateCode === 404) {//404——NOTFOUND
                this.$message.error('工号不存在');
              } else if (stateCode === 403) {//403——FORBIDDEN
                this.$message.error('密码错误');
              }
            } else if (resp.status === 200) {
              this.$store.commit('setCurrentUser', this.loginForm);
              this.$router.replace({path: '/Main'})
            }
          })
          .catch(error =>
            console.log(error));
      }
    },
  }
</script>

<style scoped>
  #base_login {
    background: url("../assets/1.png") repeat center;
    height: 100%;
    width: 100%;
    background-size: contain;
    position: fixed;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .login_container {
    border-radius: 3px;
    background-clip: padding-box;
    top: 50%;
    position: relative;
    height: 450px;
    margin: -250px auto;
    width: 330px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
  }

  .login_title {
    margin: 5px auto 45px auto;
    text-align: center;
    font-size: 32px;
    color: black;
  }
</style>
<style>
  .login_container .form-label .el-form-item__label {
    padding-bottom: 3px;
    color: #888888;
    font-size: 12px;
  }
</style>
