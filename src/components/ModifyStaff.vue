<template>
  <el-container>
    <el-main style="height:100%;overflow-y: auto">
      <div class="subject">修改员工信息</div>

      <div class="shadowBox" style="padding: 20px;margin-right: 10px;display: flex">
        <div style="margin-top: 13px;margin-left: 400px;text-align: left;width: 290px;color: black;">
          <el-form :model="staffForm" :rules="rules" label-position="top" size=mini ref="applyForm"
                   label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

            <el-form-item label="姓名" prop="name" class="form-label" style="text-align: left">
              <el-input type="text" v-model="staffForm.name" autocomplete="off"
                        placeholder="请输入姓名"></el-input>
            </el-form-item>

            <el-form-item prop="password" class="form-label" label="密码" label-width="80px">
              <el-input type="password" v-model="staffForm.password"
                        auto-complete="off" placeholder="请输入密码" style="width: 330px"></el-input>
            </el-form-item>

            <el-form-item prop="gender" class="form-label" label="性别" label-width="80px">
              <el-select v-model="staffForm.gender" placeholder="请选择性别" style="width: 330px">
                <el-option
                  v-for="item in genderOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="年龄" prop="age" class="form-label" style="text-align: left">
              <el-input type="text" v-model="staffForm.age" autocomplete="off"
                        placeholder="请输入年龄"></el-input>
            </el-form-item>

            <el-form-item style="padding-top: 24px">
              <el-button type="primary" v-on:click="submit"
                         style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                提交
              </el-button>
              <el-button type="primary" v-on:click="clear"
                         style="background-color: white;border-color:#ddd;color: black; height: 30px;width: 84px">
                重置
              </el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ModifyStaff",
  // created() {
  //   alert(this.targetId)
  // },
  data() {
    return {
      targetId: this.$store.state.modifyStaffId,
      staffForm: {
        name: '',
        age: '',
        gender: '',
        password: '',
      },
      rules: {
        name: [{required: true, message: '姓名不得为空', trigger: 'blur'}],
        gender: [{required: true, message: '性别不得为空', trigger: 'blur'}],
        age: [{required: true, message: '年龄不得为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不得为空', trigger: 'blur'}],
      },
      genderOption: [
        {
          value: 0,
          label: '男'
        },
        {
          value: 1,
          label: '女'
        },
      ],
    }
  },
  methods: {
    submit() {
      if (this.staffForm.name === '' ||
        this.staffForm.age === '' ||
        this.staffForm.password === '' ||
        this.staffForm.gender === '') {
        this.$message.error('任何一项不得为空')
        return
      }
      this.$axios.post('/modifyStaff', {
        staffId: this.targetId,
        name: this.staffForm.name,
        age: this.staffForm.age,
        gender: this.staffForm.gender,
        password: this.staffForm.password
      })
        .then(resp => {
          this.$message.success('修改成功')
          this.$router.replace({path: '/Main'})
        }).catch(error => {
        this.$message.error('修改错误，请重试')
      })
    },
    clear() {
      this.staffForm.name = '';
      this.staffForm.age = '';
      this.staffForm.gender = '';
      this.staffForm.password = "";
    }
  }
}
</script>

<style scoped>

</style>
