<template>
  <el-container style="height: 100%;">
    <el-header width="100%" style="z-index: 99;padding-left: 15px;">
      <div class="left"><img src="../assets/timg.jpg" class="logo" alt="1"></div>
      <h2 style="margin: 0;font-size:26px">阳光医院 信息管理系统</h2>
      <div class="right">
        <div class="items"><span class="txt">你好，{{this.currentId}}号工作人员</span></div>
        <span class="line"></span>

        <div class="login"><span class="txt" v-on:click="quit">退出登录</span></div>
      </div>
    </el-header>

    <div style="display: flex;width: 100%;background-color: #fafbfc;position: absolute; top: 60px; bottom: 0;">
      <div style="width: 200px;height: 100%">
        <el-menu
          style="width: 200px;height:60px;line-height: 60px;background-color: #fafbfc;text-align: left;">
          <span style="padding-left: 32px;color: black">菜单</span>
        </el-menu>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router
                 style="position: absolute; top: 60px; bottom: 0;width: 200px;background-color: #fafbfc">
          <el-menu-item index="/SearchAndModify">
            <em class="el-icon-aim icon"></em><span>查询与修改</span>
          </el-menu-item>
          <el-menu-item index="/AddNewPatient" v-if="this.currentJob === 1">
            <em class="el-icon-user icon"></em><span>登记新病人</span>
          </el-menu-item>
          <el-menu-item index="/AddNewRoomNurse" v-if="this.currentJob === 2">
            <em class="el-icon-user icon"></em><span>登记新病人</span>
          </el-menu-item>
        </el-menu>
      </div>
      <router-view style="margin-left: 10px"></router-view>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: "Main",
    data() {
      return {
        currentJob: this.$store.state.currentJob,
        currentId: this.$store.state.currentId,

        //开发时的临时赋值
        // currentJob: 2,
        // currentId: 4,
        loading: false
      }
    },
    methods: {
      //退出登录功能
      quit() {
        this.$confirm('', '确定要退出登录吗?', {
          customClass: 'exit',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: 'true',
          confirmButtonClass: 'messageButton',
          cancelButtonClass: 'messageButton'
        }).then(() => {
          this.$store.commit('logout');
          this.$router.replace('/login');
        }).catch(() => {

        });
      },
    }
  }
</script>

<style scoped>
  .el-header {
    text-align: center;
    line-height: 60px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .08)
  }

  .right {
    float: right;
  }

  .el-header .right .login {
    margin-left: 20px;
    display: inline-block;
  }

  .el-header .right .login .txt {
    cursor: pointer;
    color: #939699;
    font-size: 13px;
  }

  .el-header .right .login .txt:hover {
    color: black;
  }

  .line {
    border-right: 1px solid #ddd;
    line-height: 16px;
    margin-left: 20px;
  }

  .items {
    display: inline-block;
  }

  .right .items .txt {
    font-size: 14px;
    cursor: pointer;
  }

  .icon {
    padding-right: 5px;
    width: 16px;
    font-size: 14px;
  }

  .left {
    height: 100%;
    position: relative;
    float: left;
    line-height: 60px;
    display: flex;
  }

  .logo {
    margin-top: 0;
    height: 60px;
    width: 60px;
  }

</style>
<style>
  .description {
    height: 18px;
    font-size: 12px;
    color: #888;
    line-height: 18px;
    padding-top: 5px;
  }

  .el-menu-vertical-demo .el-menu-item {
    width: 200px;
    height: 45px;
    line-height: 45px;
    color: black;
    transition: none;
  }

  .el-menu-vertical-demo .el-menu-item em {
    margin-left: -60px;
  }

  .el-menu-vertical-demo .el-menu-item span {
    margin-left: -5px;
  }

  .demo-ruleForm .form-label .el-form-item__label {
    padding-bottom: 3px;
    color: #888888;
    font-size: 12px;
    width: 100%;
  }

  .form-label .el-input__inner {
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 2px;
  }

  .demo-ruleForm .form-label .el-input__inner {
    height: 30px;
  }

  input::-webkit-clear-button {
    -webkit-appearance: none;
  }

  .el-tabs__content {
    height: 100%;
  }

  .exit .el-message-box__header .el-message-box__title {
    font-size: 16px;
    margin-top: 0;
  }

  .exit .el-message-box__content {
    padding: 10px 15px;
  }

  .el-menu-vertical-demo .el-menu-item.is-active {
    color: #0076FB;
  }

  .el-menu-vertical-demo .el-menu-item:hover > i {
    color: #0076FB;
  }

  .el-menu-vertical-demo .el-menu-item:hover {
    color: #0076FB;
  }

  .messageButton {
    width: 62px;
    border-radius: 2px;
  }

  .subject {
    height: 31px;
    font-size: 24px;
    color: #000;
    line-height: 31px;
    margin-top: 4px;
    margin-bottom: 20px;
    text-align: left;
  }

  .table_head {
    table-layout: fixed;
    width: 100%;
    padding-left: 30px;
  }

  .table_border {
    border-bottom: 1px solid #ddd;
    padding-top: 20px;
    padding-bottom: 10px;
  }

  .table_content {
    text-align: left;
    font-size: 14px;
  }

  .table_row {
    height: 52px;
  }

  .text_button {
    color: #006eff;
    cursor: pointer;
  }

  .text_button:hover {
    text-decoration: underline
  }

  .tab_title {
    font-size: 16px;
  }

  .form-label .el-checkbox .el-checkbox__label {
    font-size: 12px;
  }

  .form-label .el-checkbox {
    font-size: 12px;
    color: black;
  }

  .form-label .el-checkbox__input.is-checked + .el-checkbox__label {
    color: black;
  }

</style>
