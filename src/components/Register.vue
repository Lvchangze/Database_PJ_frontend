<template>
  <div id="base_register" style="height: 100%">
    <div class="register_container">
      <el-form :model="registerForm" :rules="rules" label-position="top" size="small"
               style="width: 263px;margin: auto"
               label-width="0px" v-loading="loading" :ref="registerForm">
        <div class="register_title" style="color: black;font-size: 32px">注册</div>
        <el-form-item prop="username" class="form-label" label="用户名" label-width="80px">
          <el-input type="text" v-model="registerForm.username"
                    auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="form-label" label="密码" label-width="80px">
          <el-input type="password" v-model="registerForm.password"
                    auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="fullName" class="form-label" label="姓名" label-width="80px">
          <el-input type="text" v-model="registerForm.fullName"
                    auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item prop="email" class="form-label" label="邮箱" label-width="80px">
          <el-input type="email" v-model="registerForm.email"
                    auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item prop="area" class="form-label" label="地区" label-width="80px">
          <el-input type="text" v-model="registerForm.area"
                    auto-complete="off" placeholder="请输入地区"></el-input>
        </el-form-item>

        <el-form-item prop="unit" class="form-label" label="单位" label-width="80px">
          <el-input type="text" v-model="registerForm.unit"
                    auto-complete="off" placeholder="请输入单位"></el-input>
        </el-form-item>

        <el-form-item style="width: 100%">
          <router-link to="login">
            <el-button type="primary"
                       style="width: 40%;background-color: white;border-color:#ddd;border-radius: 3px;margin-right: 11px;color: black"
            >返回
            </el-button>
          </router-link>
          <el-button type="primary"
                     style="width: 54%;background-color: #356eff;border-color: #356eff;border-radius: 3px"
                     v-on:click="register(registerForm)">注册
          </el-button>
        </el-form-item>

      </el-form>

    </div>


  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        registerForm: {
          username: '',
          password: '',
          fullName: '',
          email: '',
          area: '',
          unit: '',
        },
      }
    }
  }
</script>

<style scoped>
  #base_register {
    background: url("../assets/1.png") repeat center;
    height: 100%;
    width: 100%;
    background-size: contain;
    position: fixed;
  }

  .register_container {
    border-radius: 3px;
    background-clip: padding-box;
    width: 330px;
    top: 50%;
    position: relative;
    margin: -303.8px auto;
    padding: 25px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
  }

  .register_title {
    margin: 0 auto 20px auto;
    text-align: center;
    color: #494e8f;
    font-size: 27px;
  }

  .form-label {
    text-align: left;
  }

</style>
<style>
  .register_container .form-label .el-form-item__label {
    padding-bottom: 8px;
    color: #888888;
    font-size: 12px;
    line-height: 1.5;
  }

  .register_container .form-label .el-input__inner {
    height: 30px;
  }
</style>
