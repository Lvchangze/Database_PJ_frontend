<template>
  <el-container>
    <el-main style="height:100%;overflow-y: auto">
      <div class="subject">查询与修改</div>
      <div class="shadowbox" style="padding: 20px;margin-right: 0;display: flex">
        <div style="margin-top: 0;margin-left: 350px;text-align: left;width: 400px;color: black;">

          <!--    查询护士长并显示其结果      -->
          <div v-if="this.currentJob == 0">

            <div style="font-size: 20px">查询当前区域护士长</div>
            <el-form label-position="top" size=mini ref="applyForm"
                     label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">
              <el-form-item>
                <el-button type="primary" v-on:click="searchNurseLeader"
                           style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                  查询
                </el-button>
              </el-form-item>
            </el-form>

            <table class="table_head table_border" v-if="nurseLeaderResult.length !== 0">
              <tr>
                <th class="table_content">工号</th>
                <th class="table_content">姓名</th>
                <th class="table_content">性别</th>
                <th class="table_content">年龄</th>
              </tr>
            </table>
            <table class="table_head" v-for="item in nurseLeaderResult">
              <tr class="table_row">
                <td class="table_content">{{ item.id }}</td>
                <td class="table_content">{{ item.name }}</td>
                <td class="table_content">{{ item.gender }}</td>
                <td class="table_content">{{ item.age }}</td>
              </tr>
            </table>
          </div>

          <!--    查询病床并显示其结果      -->
          <div v-if="this.currentJob == 2">
            <div style="font-size: 20px">查询当前区域的病床</div>
            <el-form label-position="top" size=mini ref="applyForm"
                     label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">
              <el-form-item>
                <el-button type="primary" v-on:click="searchSickBed"
                           style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                  查询
                </el-button>
              </el-form-item>
            </el-form>

            <table class="table_head table_border" v-if="sickBedsResult.length !== 0">
              <tr>
                <th class="table_content">床号</th>
                <th class="table_content">所属房号</th>
                <th class="table_content">状态</th>
              </tr>
            </table>
            <table class="table_head" v-for="item in sickBedsResult">
              <tr class="table_row">
                <td class="table_content">{{ item.sickBedId }}</td>
                <td class="table_content">{{ item.sickRoomId }}</td>
                <td class="table_content" v-if="item.patientId !== -1">{{ item.patientId }}号病人使用</td>
                <td class="table_content" v-if="item.patientId === -1">空闲</td>
              </tr>
            </table>

          </div>

          <div v-if="this.currentJob == 0 || this.currentJob == 2">

            <!--    查询当前区域病房护士并显示其结果      -->
            <div>
              <div style="font-size: 20px">查询当前区域病房护士</div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">
                <el-form-item>
                  <el-button type="primary" v-on:click="searchRoomNurse"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                    查询
                  </el-button>
                </el-form-item>
              </el-form>

              <table class="table_head table_border" v-if="roomNurseResult.length !== 0">
                <tr>
                  <th class="table_content">工号</th>
                  <th class="table_content">姓名</th>
                  <th class="table_content">性别</th>
                  <th class="table_content">年龄</th>
                  <th class="table_content" v-if="currentJob == 2">修改该护士</th>
                  <th class="table_content" v-if="currentJob == 2">删除该护士</th>
                </tr>
              </table>
              <table class="table_head" v-for="item in roomNurseResult">
                <tr class="table_row">
                  <td class="table_content">{{ item.id }}</td>
                  <td class="table_content">{{ item.name }}</td>
                  <td class="table_content">{{ item.gender }}</td>
                  <td class="table_content">{{ item.age }}</td>
                  <td class="table_content" v-if="currentJob == 2">
                    <el-button type="text" style="width: 10px" v-on:click="jump(item.id)">
                      修改
                    </el-button>
                  </td>
                  <td class="table_content" v-if="currentJob == 2" v-on:click="deleteRoomNurse(item.id)">
                    <el-button type="text" style="width: 10px">
                      删除
                    </el-button>
                  </td>
                </tr>
              </table>
            </div>

            <!--    查询待转入其他治疗区域的病人并显示其结果      -->
            <div>
              <div style="font-size: 20px">查询<span style="color: red">待转入其他治疗区域</span>的病人</div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">
                <el-form-item>
                  <el-button type="primary" v-on:click="searchSpecialPatient"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                    查询
                  </el-button>
                </el-form-item>
              </el-form>

              <table class="table_head table_border" v-if="specialPatientResult.length !== 0">
                <tr>
                  <th class="table_content">病人id</th>
                  <th class="table_content">姓名</th>
                  <th class="table_content">性别</th>
                  <th class="table_content">年龄</th>
                  <th class="table_content">病情等级</th>
                  <th class="table_content" v-if="currentJob == 0">操作</th>
                </tr>
              </table>
              <table class="table_head" v-for="item in specialPatientResult">
                <tr class="table_row">
                  <td class="table_content">{{ item.patientId }}</td>
                  <td class="table_content">{{ item.name }}</td>
                  <td class="table_content">{{ item.gender }}</td>
                  <td class="table_content">{{ item.age }}</td>
                  <td class="table_content">{{ item.sickLevel }}</td>
                  <td class="table_content" v-if="currentJob == 0"
                      v-on:click="transformPatient(item.patientId)"
                  >
                    <el-button type="text" style="width: 10px">
                      转出
                    </el-button>
                  </td>
                </tr>
              </table>
            </div>

            <!--    查询满足出院的病人并显示其结果      -->
            <div>
              <div style="font-size: 20px">查询<span style="color: red">满足出院条件</span>的病人</div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">
                <el-form-item>
                  <el-button type="primary" v-on:click="searchSatisfiedPatient"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                    查询
                  </el-button>
                </el-form-item>
              </el-form>

              <table class="table_head table_border" v-if="satisfiedPatientResult.length !== 0">
                <tr>
                  <th class="table_content">病人id</th>
                  <th class="table_content">姓名</th>
                  <th class="table_content">性别</th>
                  <th class="table_content">年龄</th>
                  <th class="table_content" v-if="currentJob == 0">操作</th>
                </tr>
              </table>
              <table class="table_head" v-for="item in satisfiedPatientResult">
                <tr class="table_row">
                  <td class="table_content">{{ item.patientId }}</td>
                  <td class="table_content">{{ item.name }}</td>
                  <td class="table_content">{{ item.gender }}</td>
                  <th class="table_content">{{ item.age }}</th>
                  <td class="table_content" v-if="currentJob == 0" v-on:click="deleteSatisfiedPatient(item.patientId)">
                    <el-button type="text" style="width: 10px">
                      出院
                    </el-button>
                  </td>
                </tr>
              </table>
            </div>

          </div>

          <div v-if="this.currentJob == 0 || this.currentJob == 2 || this.currentJob == 3">

            <!--    根据病房护士的id查询病人      -->
            <div>
              <div style="font-size: 20px">根据<span style="color: red">
                <span v-if="this.currentJob == 3">您</span><span v-if="this.currentJob != 3">病房护士</span>的id</span>查询病人
              </div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" style="margin:9px 0 auto;width: 330px;">
                <el-form-item prop="name" class="form-label" label="护士id" label-width="80px"
                              v-if="this.currentJob != 3">
                  <el-input type="text" v-model="roomNurseIdForSearchPatient"
                            auto-complete="off" placeholder="请输入护士id" style="width: 330px"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" v-on:click="searchPatientByRoomNurseId"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                    查询
                  </el-button>
                </el-form-item>
              </el-form>

              <table class="table_head table_border" v-if="patientByRoomNurseIdResult.length !== 0">
                <tr>
                  <th class="table_content">病人id</th>
                  <th class="table_content">姓名</th>
                  <th class="table_content">性别</th>
                  <th class="table_content">年龄</th>
                  <th class="table_content" v-if="currentJob == 0 || currentJob == 3">操作</th>
                </tr>
              </table>
              <table class="table_head" v-for="item in patientByRoomNurseIdResult">
                <tr class="table_row">
                  <td class="table_content">{{ item.patientId }}</td>
                  <td class="table_content">{{ item.name }}</td>
                  <td class="table_content">{{ item.gender }}</td>
                  <td class="table_content">{{ item.age }}</td>
                  <td class="table_content" v-if="currentJob == 0 || currentJob == 3">
                    <el-button type="text" style="width: 10px" v-on:click="jumpToModifyPatient(item.patientId)">
                      登记新信息
                    </el-button>
                  </td>
                </tr>
              </table>
            </div>

          </div>

          <!--    根据病人信息查询病人并显示其结果      -->
          <div>
            <div style="font-size: 20px">根据<span style="color: red">病人信息</span>查询病人</div>
            <el-form :model="searchPatientStateForm" label-position="top" size=mini ref="applyForm"
                     label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

              <el-form-item prop="name" class="form-label" label="病人id" label-width="80px">
                <el-input type="text" v-model="searchPatientStateForm.patientId"
                          auto-complete="off" placeholder="请输入病人id" style="width: 330px"></el-input>
              </el-form-item>

              <el-form-item label="病情评级" prop="sickLevel" class="form-label" style="text-align: left">
                <el-select v-model="searchPatientStateForm.sickLevel" placeholder="请选择病情评级" style="width: 330px">
                  <el-option
                    v-for="item in sickLevelOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="生命状态" prop="sickLevel" class="form-label" style="text-align: left">
                <el-select v-model="searchPatientStateForm.liveState" placeholder="请选择病情评级" style="width: 330px">
                  <el-option
                    v-for="item in liveStateOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" v-on:click="searchPatientByState"
                           style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                  查询
                </el-button>
              </el-form-item>
            </el-form>

            <table class="table_head table_border" v-if="patientByStateResult.length !== 0">
              <tr>
                <th class="table_content">病人id</th>
                <th class="table_content">姓名</th>
                <th class="table_content">性别</th>
                <th class="table_content">年龄</th>
                <th class="table_content" v-if="currentJob == 0 || currentJob == 3">操作</th>
              </tr>
            </table>
            <table class="table_head" v-for="item in patientByStateResult">
              <tr class="table_row">
                <td class="table_content">{{ item.patientId }}</td>
                <td class="table_content">{{ item.name }}</td>
                <td class="table_content">{{ item.gender }}</td>
                <td class="table_content">{{ item.age }}</td>
                <td class="table_content" v-if="currentJob == 0 || currentJob == 3"
                    v-on:click="jumpToModifyPatient(item.patientId)"
                >
                  <el-button type="text" style="width: 10px">
                    登记新信息
                  </el-button>
                </td>
              </tr>
            </table>
          </div>

          <!--    根据治疗区域查询病人，急诊护士专用      -->
          <div v-if="this.currentJob == 1">
            <div style="font-size: 20px"><span style="color: red">急诊护士专用查询</span></div>
            <el-form :model="emergencyNurseSearchForm" label-position="top" size=mini ref="applyForm"
                     label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

              <el-form-item label="治疗区域" prop="sickLevel" class="form-label" style="text-align: left">
                <el-select v-model="emergencyNurseSearchForm.treatArea" placeholder="请选择治疗区域" style="width: 330px">
                  <el-option
                    v-for="item in treatAreaOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" v-on:click="emergencyNurseSearch"
                           style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-right: 10px;">
                  查询
                </el-button>
              </el-form-item>
            </el-form>
            <table class="table_head table_border" v-if="emergencyNurseSearchResult.length !== 0">
              <tr>
                <th class="table_content">病人id</th>
                <th class="table_content">姓名</th>
                <th class="table_content">性别</th>
                <th class="table_content">年龄</th>
              </tr>
            </table>
            <table class="table_head" v-for="item in emergencyNurseSearchResult">
              <tr class="table_row">
                <td class="table_content">{{ item.patientId }}</td>
                <td class="table_content">{{ item.name }}</td>
                <td class="table_content">{{ item.gender }}</td>
                <td class="table_content">{{ item.age }}</td>
              </tr>
            </table>
          </div>

        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Search",
  created() {

  },
  data() {
    return {
      currentJob: this.$store.state.currentJob,
      currentId: this.$store.state.currentId,
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
      treatAreaOption: [
        {
          value: 1,
          label: "轻症区"
        },
        {
          value: 2,
          label: "重症区"
        },
        {
          value: 3,
          label: "危重症区"
        },
        {
          value: 4,
          label: "隔离区"
        }
      ],

      roomNurseIdForSearchPatient: '',

      patientByRoomNurseIdResult: [
        // {
        //   patientId: 1,
        //   name: "哈哈",
        //   age: 7,
        //   gender: "男"
        // }
      ],

      searchPatientStateForm: {
        patientId: null,
        sickLevel: null,
        liveState: null,
      },

      patientByStateResult: [
        // {
        //   patientId: 9,
        //   name: "666",
        //   age: 8,
        //   gender: "男"
        // }
      ],

      satisfiedPatientResult: [
        // {
        //   patientId: 16,
        //   name: 'hhh',
        //   age: 78,
        //   gender: '女',
        // }
      ],

      specialPatientResult: [
        // {
        //   patientId: 16,
        //   name: 'hhh',
        //   age: 78,
        //   gender: '女',
        //   sickLevel: 3,
        // }
      ],

      nurseLeaderResult: [
        // {
        //   id: 5,
        //   name: '杨宇晗',
        //   gender: '男',
        //   age: 10
        // },
      ],

      roomNurseResult: [
        // {
        //   id: 6,
        //   name: '刘俊伟',
        //   gender: '男',
        //   age: 10,
        // },
        // {
        //   id: 7,
        //   name: '刘伟',
        //   gender: '男',
        //   age: 19,
        // },
      ],

      sickBedsResult: [
        // {
        //   sickBedId: 9,
        //   sickRoomId: 5,
        //   patientId: 4
        // },
        // {
        //   sickBedId: 19,
        //   sickRoomId: 15,
        //   patientId: -1
        // }
      ],

      emergencyNurseSearchForm: {
        treatArea: null
      },

      emergencyNurseSearchResult: [
        // {
        //   patientId: 9,
        //   name: "哈哈哈",
        //   age: 78,
        //   gender: "男"
        // }
      ],

    }
  },
  methods: {
    searchNurseLeader() {
      this.$axios.post('/searchNurseLeader', {
        staffId: this.currentId
      })
        .then(resp => {
          console.log(resp)
          this.nurseLeaderResult = []
          if (resp.data.nurseLeader.gender === 0) {
            resp.data.nurseLeader.gender = '男'
          } else {
            resp.data.nurseLeader.gender = '女'
          }
          this.nurseLeaderResult.push(
            {
              id: resp.data.nurseLeader.id,
              name: resp.data.nurseLeader.name,
              gender: resp.data.nurseLeader.gender,
              age: resp.data.nurseLeader.age
            }
          )
          this.$message.success("查询成功")
        })
        .catch(error => {
          this.$message.error("查询失败，请重试")
          console.log(error)
        })
    },

    searchRoomNurse() {
      this.$axios.post('/searchRoomNurse', {
        staffId: this.currentId
      })
        .then(resp => {
          console.log(resp)
          this.roomNurseResult = []
          for (var i = 0; i < resp.data.roomNurses.length; i++) {
            if (resp.data.roomNurses[i].gender === 0) {
              resp.data.roomNurses[i].gender = '男'
            } else {
              resp.data.roomNurses[i].gender = '女'
            }
            this.roomNurseResult.push(
              {
                id: resp.data.roomNurses[i].id,
                name: resp.data.roomNurses[i].name,
                gender: resp.data.roomNurses[i].gender,
                age: resp.data.roomNurses[i].age
              },
            )
          }
          this.$message.success("查询成功")
        })
        .catch(error => {
          this.$message.error("查询失败，请重试")
          console.log(error)
        })
    },

    jump(para) {
      this.$store.commit('setModifyTarget', para);
      this.$router.replace({path: '/ModifyStaff'})
    },

    deleteRoomNurse(para) {
      this.$axios.post('/deleteRoomNurse', {
        staffId: para
      })
        .then(resp => {
          console.log(resp)
          if (resp.data.status === 1) {
            this.$axios.post('/searchRoomNurse', {
              staffId: this.currentId
            })
              .then(resp => {
                console.log(resp)
                this.roomNurseResult = []
                for (var i = 0; i < resp.data.roomNurses.length; i++) {
                  if (resp.data.roomNurses[i].gender === 0) {
                    resp.data.roomNurses[i].gender = '男'
                  } else {
                    resp.data.roomNurses[i].gender = '女'
                  }
                  this.roomNurseResult.push(
                    {
                      id: resp.data.roomNurses[i].id,
                      name: resp.data.roomNurses[i].name,
                      gender: resp.data.roomNurses[i].gender,
                      age: resp.data.roomNurses[i].age
                    },
                  )
                }
              })
            this.$message.success("删除成功")
          } else {
            this.$message.error("删除失败，此护士正在工作")
          }
        })
        .catch(error => {
          this.$message.error("删除失败，请重试")
          console.log(error)
        })
    },

    searchSickBed() {
      this.$axios.post('/searchSickBed', {
        staffId: this.currentId
      })
        .then(resp => {
          console.log(resp)
          this.sickBedsResult = []
          for (var i = 0; i < resp.data.sickBeds.length; i++) {
            this.sickBedsResult.push(
              {
                sickBedId: resp.data.sickBeds[i].id,
                sickRoomId: resp.data.sickBeds[i].sickRoomID,
                patientId: resp.data.sickBeds[i].patientId
              }
            )
          }
          this.$message.success("查询成功")
        })
        .catch(error => {
          this.$message.error("查询失败，请重试")
          console.log(error)
        })
    },

    searchSatisfiedPatient() {
      this.$axios.post('/searchSatisfiedPatient', {
        staffId: this.currentId,
      })
        .then(resp => {
          console.log(resp)
          if (resp.data.patients === null) {
            this.$message.error("暂无可出院病人")
            return
          }
          this.satisfiedPatientResult = [];
          for (var i = 0; i < resp.data.patients.length; i++) {
            if (resp.data.patients[i].gender === 0) {
              resp.data.patients[i].gender = '男'
            } else {
              resp.data.patients[i].gender = '女'
            }
            this.satisfiedPatientResult.push(
              {
                patientId: resp.data.patients[i].patientId,
                name: resp.data.patients[i].name,
                age: resp.data.patients[i].age,
                gender: resp.data.patients[i].gender,
              }
            )
          }
          this.$message.success("查询成功")
        })
        .catch(error => {
          this.$message.error("查询失败，请重试")
          console.log(error)
        })
    },

    deleteSatisfiedPatient(para) {
      this.$axios.post('/deleteSatisfiedPatient', {
        patientId: para,
      })
        .then(resp => {
          this.$axios.post('/searchSatisfiedPatient', {
            staffId: this.currentId,
          })
            .then(resp => {
              console.log(resp)
              this.satisfiedPatientResult = [];
              for (var i = 0; i < resp.data.patients.length; i++) {
                if (resp.data.patients[i].gender === 0) {
                  resp.data.patients[i].gender = '男'
                } else {
                  resp.data.patients[i].gender = '女'
                }
                this.satisfiedPatientResult.push(
                  {
                    patientId: resp.data.patients[i].patientId,
                    name: resp.data.patients[i].name,
                    age: resp.data.patients[i].age,
                    gender: resp.data.patients[i].gender,
                  }
                )
              }
            })
          this.$message.success("删除成功")
        })
        .catch(error => {
          this.$message.error("删除失败，请重试")
          console.log(error)
        })
    },

    searchSpecialPatient() {
      this.$axios.post('/searchSpecialPatient', {
        staffId: this.currentId,
      })
        .then(resp => {
          console.log(resp)
          if (resp.data.patients === null) {
            this.$message.error("暂无待转入其他区域的病人")
            return
          }
          this.specialPatientResult = [];
          for (var i = 0; i < resp.data.patients.length; i++) {
            if (resp.data.patients[i].gender === 0) {
              resp.data.patients[i].gender = '男'
            } else {
              resp.data.patients[i].gender = '女'
            }
            switch (resp.data.patients[i].sickLevel) {
              case 1 : {
                resp.data.patients[i].sickLevel = '轻症'
                break
              }
              case 2 : {
                resp.data.patients[i].sickLevel = '重症'
                break
              }
              case 3 : {
                resp.data.patients[i].sickLevel = '危重症'
                break
              }
            }
            this.specialPatientResult.push(
              {
                patientId: resp.data.patients[i].patientId,
                name: resp.data.patients[i].name,
                age: resp.data.patients[i].age,
                gender: resp.data.patients[i].gender,
                sickLevel: resp.data.patients[i].sickLevel,
              },
            )
          }
          this.$message.success("查询成功")
        })
        .catch(error => {
          this.$message.error("查询失败，请重试")
          console.log(error)
        })
    },

    transformPatient(id) {
      this.$axios.post('/transformPatient', {
        patientId: id,
      })
        .then(resp => {
          if (resp.data.status === 1) {
            this.$message.success("查询成功")
          } else {
            this.$message.error("目标治疗区域无法移入新病人")
          }
        })
        .catch(error => {
          this.$message.error("出错了，请重试")
          console.log(error)
        })
    },

    searchPatientByRoomNurseId() {
      if (this.roomNurseIdForSearchPatient === '' && this.currentJob !== 3) {
        this.$message.error("护士id不得为空")
        return
      }
      if (this.currentJob === 3) {
        this.roomNurseIdForSearchPatient = this.currentId
      }
      this.$axios.post('/searchPatientByRoomNurseId', {
        staffId: this.currentId,
        roomNurseId: this.roomNurseIdForSearchPatient
      })
        .then(resp => {
          console.log(resp)
          if (resp.data.status === 1) {
            this.$message.error("此人不在您的管辖范围内")
            return
          } else if (resp.data.status === -1) {
            this.$message.error("该人不在照顾病人")
            return
          }
          this.patientByRoomNurseIdResult = []
          for (var i = 0; i < resp.data.patients.length; i++) {
            if (resp.data.patients[i].gender === 0) {
              resp.data.patients[i].gender = '男'
            } else {
              resp.data.patients[i].gender = '女'
            }
            this.patientByRoomNurseIdResult.push(
              {
                patientId: resp.data.patients[i].patientID,
                name: resp.data.patients[i].name,
                age: resp.data.patients[i].age,
                gender: resp.data.patients[i].gender,
                sickLevel: resp.data.patients[i].sickLevel,
              },
            )
          }
          this.$message.success("查询成功")
        })
        .catch(error => {
          this.$message.error("查询失败，请重试")
          console.log(error)
        })

    },

    jumpToModifyPatient(para) {
      this.$store.commit('setModifyPatientId', para);
      this.$router.replace({path: '/ModifyPatient'})
    },

    searchPatientByState() {
      if (this.searchPatientStateForm.patientId === null &&
        this.searchPatientStateForm.sickLevel === null &&
        this.searchPatientStateForm.liveState === null) {
        this.$message.error("至少选择一项")
        return
      }
      this.$axios.post('/searchPatientByState', {
        staffId: this.currentId,
        patientId: this.searchPatientStateForm.patientId,
        sickLevel: this.searchPatientStateForm.sickLevel,
        liveState: this.searchPatientStateForm.liveState,
      })
        .then(resp => {
          console.log(resp)
          this.patientByStateResult = [];
          if (resp.data.patients.length === 0) {
            this.$message.error('无这样的病人或您没有全选管辖这个病人')
            return
          }
          for (var i = 0; i < resp.data.patients.length; i++) {
            if (resp.data.patients[i].gender === 0) {
              resp.data.patients[i].gender = '男'
            } else {
              resp.data.patients[i].gender = '女'
            }
            this.patientByStateResult.push(
              {
                patientId: resp.data.patients[i].patientID,
                name: resp.data.patients[i].name,
                age: resp.data.patients[i].age,
                gender: resp.data.patients[i].gender,
              }
            )
          }
          this.$message.success("查询成功")
        })
        .catch(error => {
          console.log(error)
          this.$message.error('查询错误，请重试')
        })
    },

    emergencyNurseSearch() {
      if (this.emergencyNurseSearchForm.treatArea === null) {
        this.$message.error("请选择治疗区域")
        return
      }
      this.$axios.post('/emergencyNurseSearch', {
        treatArea: this.emergencyNurseSearchForm.treatArea
      })
        .then(resp => {
          console.log(resp)
          if (resp.data.patients === null) {
            this.$message.error('无这样的病人')
            return
          }
          this.emergencyNurseSearchResult = [];
          for (var i = 0; i < resp.data.patients.length; i++) {
            if (resp.data.patients[i].gender === 0) {
              resp.data.patients[i].gender = '男'
            } else {
              resp.data.patients[i].gender = '女'
            }
            this.emergencyNurseSearchResult.push(
              {
                patientId: resp.data.patients[i].patientID,
                name: resp.data.patients[i].name,
                age: resp.data.patients[i].age,
                gender: resp.data.patients[i].gender,
              }
            )
          }
          this.$message.success("查询成功")
        })
        .catch(error => {
          console.log(error)
          this.$message.error('查询错误，请重试')
        })
    }
  }
}
</script>

<style scoped>

</style>
