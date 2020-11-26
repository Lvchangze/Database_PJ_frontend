<template>
  <el-container>
    <el-main style="height:100%;overflow-y: auto">
      <div class="subject">登记新护士</div>

      <div class="shadowBox" style="padding: 20px;margin-right: 10px;display: flex">
        <div style="margin-top: 13px;margin-left: 400px;text-align: left;width: 290px;color: black;">
          <el-form :model="roomNurseForm" :rules="rules" label-position="top" size=mini ref="applyForm"
                   label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

            <div style="margin-bottom: 10px">护士基本信息</div>

            <el-form-item label="姓名" prop="name" class="form-label" style="text-align: left">
              <el-input type="text" v-model="roomNurseForm.name" autocomplete="off"
                        placeholder="请输入病人姓名"></el-input>
            </el-form-item>

            <el-form-item prop="gender" class="form-label" label="性别" label-width="80px">
              <el-select v-model="roomNurseForm.gender" placeholder="请选择性别" style="width: 330px">
                <el-option
                  v-for="item in genderOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="年龄" prop="age" class="form-label" style="text-align: left">
              <el-input type="text" v-model="roomNurseForm.age" autocomplete="off"
                        placeholder="请输入护士年龄"></el-input>
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
    name: "AddNewRoomNurse",
    created() {
      this.currentId = this.$store.state.currentId;
      // alert(this.currentId)
    },
    data() {
      return {
        currentId : this.$store.state.currentId,
        roomNurseForm: {
          name: '',
          age: '',
          gender: '',
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
        rules: {
          name: [{required: true, message: '姓名不得为空', trigger: 'blur'}],
          gender: [{required: true, message: '性别不得为空', trigger: 'blur'}],
          age: [{required: true, message: '年龄不得为空', trigger: 'blur'}],
        },

      }
    },
    methods: {
      clear() {
        this.roomNurseForm.name = '';
        this.roomNurseForm.age = '';
        this.roomNurseForm.gender = '';
      },
      submit() {
        console.log(this.roomNurseForm)
        if (this.roomNurseForm.name === '' ||
          this.roomNurseForm.age === '' ||
          this.roomNurseForm.gender === ''
        ) {
          this.$message.error("任何一项不得为空")
          return
        }
        this.$axios.post('/addNewRoomNurse', {
          nurseLeaderId: this.currentId,
          name: this.roomNurseForm.name,
          age: this.roomNurseForm.age,
          gender: this.roomNurseForm.gender,
        })
          .then(resp => {
            console.log(resp)
            this.$message({
                message: "提交成功，新增护士的工号为" + resp.data.roomNurse.id,
                type: 'success',
                duration: 6000
              }
            )
            this.clear()
          })
          .catch(error => {
            this.$message.error("提交失败，请重试")
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>

</style>
