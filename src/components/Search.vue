<template>
  <el-container>
    <el-main style="height:100%;overflow-y: auto">
      <div class="subject">查询与修改</div>
      <div class="shadowbox" style="padding: 20px;margin-right: 0;display: flex">
        <div style="margin-top: 0;margin-left: 400px;text-align: left;width: 290px;color: black;">

          <div style="font-size: 20px">查询病人</div>
          <el-form :model="searchPatientForm" label-position="top" size=mini ref="applyForm"
                   label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">
          </el-form>


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

          <!--    查询病房护士并显示其结果      -->
          <div v-if="this.currentJob == 0 || this.currentJob == 2">
            <div style="font-size: 20px">查询当前区域病房护士</div>
            <el-form :model="searchRoomNurseForm" label-position="top" size=mini ref="applyForm"
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
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Search",
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

      searchRoomNurseForm: {
        treatArea: ''
      },
      roomNurseResult: [
        {
          id: 6,
          name: '刘俊伟',
          gender: '男',
          age: 10
        },
        {
          id: 7,
          name: '刘伟',
          gender: '男',
          age: 19
        },
      ],
    }
  },
  methods: {
    searchNurseLeader() {
      this.$axios.post('/searchNurseLeader', {
        doctorId: this.currentId
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
        doctorId: this.currentId
      })
        .then(resp => {
          console.log(resp)
          this.roomNurseResult = []

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
        deleteRoomNurseId: para
      })
        .then(resp => {

        })
    }
  }
}
</script>

<style scoped>

</style>
