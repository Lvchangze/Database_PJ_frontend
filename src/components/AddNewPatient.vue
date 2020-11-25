<template>
  <el-container>
    <el-main style="height:100%;overflow-y: auto">
      <div class="subject">登记新病人</div>

      <div class="shadowBox" style="padding: 20px;margin-right: 10px;display: flex">
        <div style="margin-top: 13px;margin-left: 400px;text-align: left;width: 290px;color: black;">
          <el-form :model="patientForm" :rules="rules" label-position="top" size=mini ref="applyForm"
                   label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

            <div style="margin-bottom: 10px">病人基本信息</div>

            <el-form-item label="姓名" prop="name" class="form-label" style="text-align: left">
              <el-input type="text" v-model="patientForm.name" autocomplete="off"
                        placeholder="请输入病人姓名"></el-input>
            </el-form-item>

            <el-form-item prop="gender" class="form-label" label="性别" label-width="80px">
              <el-select v-model="patientForm.gender" placeholder="请选择性别" style="width: 330px">
                <el-option
                  v-for="item in genderOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="年龄" prop="age" class="form-label" style="text-align: left">
              <el-input type="text" v-model="patientForm.age" autocomplete="off"
                        placeholder="请输入病人年龄"></el-input>
            </el-form-item>

            <div style="margin-bottom: 10px">病人入院状态</div>

            <el-form-item label="入院日期" prop="arriveDate" class="form-label" style="text-align: left">
              <el-date-picker type="date" v-model="patientForm.arriveDate" value-format="yyyy-MM-dd"
                              autocomplete="off" style="width: 330px"
                              :clearable="false" :editable="false"
                              placeholder="请输入病人入院日期"
                              prefix-icon="1"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="体温" prop="temperature" class="form-label" style="text-align: left">
              <el-input type="text" v-model="patientForm.temperature" autocomplete="off"
                        placeholder="请输入病人体温"></el-input>
            </el-form-item>

            <el-form-item label="病情评级" prop="sickLevel" class="form-label" style="text-align: left">
              <el-select v-model="patientForm.sickLevel" placeholder="请选择病情评级" style="width: 330px">
                <el-option
                  v-for="item in sickLevelOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <div style="margin-bottom: 10px">第一次核酸检测信息</div>

            <el-form-item label="检测日期" prop="testDate" class="form-label" style="text-align: left">
              <el-date-picker type="date" v-model="patientForm.testDate" value-format="yyyy-MM-dd"
                              autocomplete="off" style="width: 330px"
                              :clearable="false" :editable="false"
                              placeholder="请输入病人第一次核酸检测日期"
                              prefix-icon="1"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="检测结果" prop="testResult" class="form-label" style="text-align: left">
              <el-select v-model="patientForm.testResult" placeholder="请选择检测结果" style="width: 330px">
                <el-option
                  v-for="item in testResultOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
    name: "AddNewPatient",
    data() {
      return {
        patientForm: {
          name: '',
          age: '',
          gender: '',
          arriveDate: '',
          temperature: '',
          sickLevel: '',
          testDate: '',
          testResult: '',
        },
        sickLevelOption: [
          {
            value: 1,
            label: "轻症"
          },
          {
            value: 2,
            label: "重症"
          },
          {
            value: 3,
            label: "危重症"
          }
        ],
        testResultOption: [
          {
            value: 0,
            label: "阳性"
          },
          {
            value: 1,
            label: "阴性"
          },
        ],
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
          arriveDate: [{required: true, message: '入院日期不得为空', trigger: 'blur'}],
          temperature: [{required: true, message: '体温不得为空', trigger: 'blur'}],
          sickLevel: [{required: true, message: '病情评级不得为空', trigger: 'blur'}],
          testDate: [{required: true, message: '检测日期不得为空', trigger: 'blur'}],
          testResult: [{required: true, message: '检测结果不得为空', trigger: 'blur'}],
        },
        loading: false,
      }
    },
    methods: {
      //重置功能
      clear() {
        this.patientForm.name = '';
        this.patientForm.age = '';
        this.patientForm.gender = '';
        this.patientForm.arriveDate = '';
        this.patientForm.temperature = '';
        this.patientForm.sickLevel = '';
        this.patientForm.testDate = "";
        this.patientForm.testResult = "";
      },
      submit() {
        console.log(this.patientForm)
        this.$axios.post('/addNewPatient', {
          name: this.patientForm.name,
          age: this.patientForm.age,
          gender: this.patientForm.gender,

          arriveDate: this.patientForm.arriveDate,
          temperature: this.patientForm.temperature,
          sickLevel: this.patientForm.sickLevel,

          testDate: this.patientForm.testDate,
          testResult: this.patientForm.testResult,
        })
          .then(resp => {
            this.$message.success("提交成功")
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

<style>
  .demo-ruleForm .form-label .el-form-item__label {
    padding-bottom: 3px;
    color: #888888;
    font-size: 12px;
  }

  input::-webkit-clear-button {
    -webkit-appearance: none;
  }

  .el-message-box__input .el-input__inner {
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 2px;
    height: 30px;
    font-size: 12px;
  }

  .el-message-box__header .el-message-box__title {
    font-size: 14px;
    margin-top: 12px;
  }

  .el-message-box .el-message-box__header {
    padding-bottom: 0;
  }

  .el-message-box__wrapper .el-message-box {
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 23px;
  }

  .el-message-box .el-message-box__content {
    padding-bottom: 5px;
    padding-top: 5px;
  }

  .el-message-box .el-message-box__btns {
    text-align: center;
    padding-top: 0;
  }
</style>
