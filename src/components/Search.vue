<template>
  <el-container>
    <el-main style="height:100%;overflow-y: auto">
      <div class="subject">查询与修改</div>
      <div class="shadowbox" style="padding: 20px;margin-right: 0;display: flex">
        <div style="margin-top: 0;margin-left: 400px;text-align: left;width: 290px;color: black;">

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
                  <th class="table_content" v-if="currentJob == 2">修改</th>
                  <th class="table_content" v-if="currentJob == 2">删除</th>
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

            <!--    查询当前治疗区域待转入其他区域的病人并显示其结果      -->

            <!--    查询当前治疗区域满足出院条件的病人并显示其结果      -->

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
                <td class="table_content">{{item.sickBedId}}</td>
                <td class="table_content">{{item.sickRoomId}}</td>
                <td class="table_content" v-if="item.patientId !== -1">{{ item.patientId }}号病人使用</td>
                <td class="table_content" v-if="item.patientId === -1">空闲</td>
              </tr>
            </table>

          </div>

          <!--    查询病人并显示其结果      -->
          <div style="font-size: 20px">查询病人</div>
          <el-form :model="searchPatientForm" label-position="top" size=mini ref="applyForm"
                   label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">
          </el-form>

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

      //开发时临时赋值
      // currentJob: 0,
      // currentId: 4,

      searchPatientForm: {},

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
        //   age: 10
        // },
        // {
        //   id: 7,
        //   name: '刘伟',
        //   gender: '男',
        //   age: 19
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
          }
          for (var i = 0; i < resp.data.roomNurses.length; i++) {
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

  }
}
</script>

<style scoped>

</style>
