<template>
  <el-container>
    <el-main style="height:100%;overflow-y: auto">
      <div class="subject">修改病人信息</div>
      <div class="shadowbox" style="padding: 20px;margin-right: 0;display: flex">
        <div style="margin-top: 0;margin-left: 350px;text-align: left;width: 400px;color: black;">

          <div v-if="currentJob == 0">
            <!-- 修改病情评级-->
            <div>
              <div style="font-size: 20px">修改病情评级</div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

                <el-form-item label="病情评级" prop="sickLevel" class="form-label" style="text-align: left">
                  <el-select v-model="newSickLevel" placeholder="请选择病情评级" style="width: 330px">
                    <el-option
                      v-for="item in sickLevelOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" v-on:click="submitNewSickLevel"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                    提交
                  </el-button>
                </el-form-item>

              </el-form>
            </div>

            <!-- 修改生命状态-->
            <div>
              <div style="font-size: 20px">修改生命状态</div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

                <el-form-item label="生命状态" prop="sickLevel" class="form-label" style="text-align: left">
                  <el-select v-model="newLiveState" placeholder="请选择生命状态" style="width: 330px">
                    <el-option
                      v-for="item in liveStateOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" v-on:click="submitNewLiveState"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                    提交
                  </el-button>
                </el-form-item>

              </el-form>
            </div>
          </div>

          <div v-if="currentJob == 3">
            <div style="font-size: 20px">登记病人每日信息</div>
            <el-form :model="dailyInformation" label-position="top" size=mini ref="applyForm"
                     label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

              <el-form-item label="生命状态" class="form-label" style="text-align: left">
                <el-select v-model="dailyInformation.liveState" placeholder="请选择生命状态" style="width: 330px">
                  <el-option
                    v-for="item in liveStateOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="病情评级" class="form-label" style="text-align: left">
                <el-select v-model="dailyInformation.sickLevel" placeholder="请选择病情评级" style="width: 330px">
                  <el-option
                    v-for="item in sickLevelOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="体温" class="form-label" style="text-align: left">
                <el-input type="text" v-model="dailyInformation.temperature" autocomplete="off"
                          placeholder="请输入病人体温" style="width: 330px" autosize></el-input>
              </el-form-item>

              <el-form-item label="症状" class="form-label" style="text-align: left">
                <el-input type="textarea" v-model="dailyInformation.symptom" autocomplete="off"
                          placeholder="请输入病人今日症状" style="width: 330px;"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" v-on:click="submitDailyInformation"
                           style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                  提交
                </el-button>
              </el-form-item>

            </el-form>
          </div>

          <!-- 添加核酸检测单-->
          <div v-if="currentJob == 0 || currentJob == 3">
            <div style="font-size: 20px">登记新核酸检测单</div>
            <el-form :model="testForm" label-position="top" size=mini ref="applyForm"
                     label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

              <el-form-item label="检测日期" prop="testDate" class="form-label" style="text-align: left">
                <el-date-picker type="date" v-model="testForm.testDate" value-format="yyyy-MM-dd"
                                autocomplete="off" style="width: 330px"
                                :clearable="false" :editable="false"
                                placeholder="请输入病人核酸检测日期"
                                prefix-icon="1"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="核酸检测结果" prop="testDate" class="form-label" style="text-align: left">
                <el-select v-model="testForm.testResult" placeholder="请选择检测结果" style="width: 330px">
                  <el-option
                    v-for="item in testResultOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="病情评级" class="form-label" style="text-align: left">
                <el-select v-model="testForm.sickLevel" placeholder="请选择病情评级" style="width: 330px">
                  <el-option
                    v-for="item in sickLevelOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" v-on:click="submitNewTest"
                           style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                  提交
                </el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ModifyPatient",
  data() {
    return {
      patientId: this.$store.state.modifyPatientId,
      currentId: this.$store.state.currentId,
      currentJob: this.$store.state.currentJob,
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
      liveStateOption: [
        {
          value: 0,
          label: "出院"
        },
        {
          value: 1,
          label: "正在治疗"
        },
        {
          value: 2,
          label: "死亡"
        },
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

      newSickLevel: '',
      newLiveState: '',
      dailyInformation: {
        temperature: '',
        symptom: '',
        liveState: '',
        sickLevel: '',
      },

      testForm: {
        sickLevel: '',
        testResult: '',
        testDate: ''
      }

    }
  },
  methods: {
    submitNewSickLevel() {
      if (this.newSickLevel === '') {
        this.$message.error("请选择治疗区域")
        return
      }
      this.$axios.post('/modifySickLevel', {
        patientId: this.patientId,
        newSickLevel: this.newSickLevel
      })
        .then(resp => {
          if (resp.data.status === 1) {
            this.$message.success("修改成功")
            this.newSickLevel = ''
          } else {
            this.$message.success("修改错误，请重试")
          }
        })
    },

    submitNewLiveState() {
      if (this.newLiveState === '') {
        this.$message.error("请选择生命状态")
        return
      }
      this.$axios.post('/modifyLiveState', {
        patientId: this.patientId,
        newLiveState: this.newLiveState
      })
        .then(resp => {
          if (resp.data.status === 1) {
            this.$message.success("修改成功")
            this.newLiveState = ''
          } else {
            this.$message.success("修改错误，请重试")
          }
        })
    },

    submitDailyInformation() {
      if (this.dailyInformation.temperature === '' ||
        this.dailyInformation.symptom === '' ||
        this.dailyInformation.liveState === '' ||
        this.dailyInformation.sickLevel === '') {
        this.$message.error("任何一项不得为空")
        return
      }
      this.$axios.post('/submitDailyInformation', {
        patientId: this.patientId,
        temperature: this.dailyInformation.temperature,
        symptom: this.dailyInformation.symptom,
        liveState: this.dailyInformation.liveState,
        sickLevel: this.dailyInformation.sickLevel,
      })
        .then(resp => {
          if (resp.data.status === 1) {
            this.$message.success("提交成功")
            this.dailyInformation.temperature = ''
            this.dailyInformation.symptom = ''
            this.dailyInformation.liveState = ''
            this.dailyInformation.sickLevel = ''
          } else {
            this.$message.error("今日已提交，无法重复提交")
          }
        })
    },

    submitNewTest() {
      if (this.testForm.testDate === '' ||
        this.testForm.testResult === '' ||
        this.testForm.sickLevel === '') {
        this.$message.error("任何一项不得为空")
        return
      }
      this.$axios.post('/submitNewTest', {
        patientId: this.patientId,
        sickLevel: this.testForm.sickLevel,
        testResult: this.testForm.testResult,
        testDate: this.testForm.testDate
      })
        .then(resp => {
          if (resp.data.status === 1) {
            this.$message.success("提交成功")
            this.testForm.testDate = ''
            this.testForm.testResult = ''
            this.testForm.sickLevel = ''
          } else {
            this.$message.error("今日已提交，无法重复提交")
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
