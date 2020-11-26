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
          <div v-if="this.currentJob === 0">
            <div style="font-size: 20px">查询护士长</div>
            <el-form :model="searchNurseLeaderForm" label-position="top" size=mini ref="applyForm"
                     label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">
              <el-form-item label="治疗区域" prop="name" class="form-label" style="text-align: left">
                <el-select v-model="searchNurseLeaderForm.treatArea" placeholder="请选择治疗区域" style="width: 330px">
                  <el-option
                    v-for="item in treatAreaOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
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
                <td class="table_content">{{item.id}}</td>
                <td class="table_content">{{item.name}}</td>
                <td class="table_content">{{item.gender}}</td>
                <td class="table_content">{{item.age}}</td>
              </tr>
            </table>
          </div>

          <!--    查询病房护士并显示其结果      -->
          <div v-if="this.currentJob === 0 || this.currentJob === 2">
            <div style="font-size: 20px">查询病房护士</div>
            <el-form :model="searchRoomNurseForm" label-position="top" size=mini ref="applyForm"
                     label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">
              <el-form-item label="治疗区域" prop="name" class="form-label" style="text-align: left">
                <el-select v-model="searchRoomNurseForm.treatArea" placeholder="请选择治疗区域" style="width: 330px">
                  <el-option
                    v-for="item in treatAreaOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
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
              </tr>
            </table>
            <table class="table_head" v-for="item in roomNurseResult">
              <tr class="table_row">
                <td class="table_content">{{item.id}}</td>
                <td class="table_content">{{item.name}}</td>
                <td class="table_content">{{item.gender}}</td>
                <td class="table_content">{{item.age}}</td>
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
    name: "SearchAndModify",
    data() {
      return {
        currentJob: this.$store.state.currentJob,
        currentId: this.$store.state.currentId,

        //开发时临时赋值
        // currentJob: 0,
        // currentId: 4,

        searchPatientForm: {},

        searchNurseLeaderForm: {
          treatArea: '',
        },
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
          // {
          //   id: 6,
          //   name: '刘俊伟',
          //   gender: '男',
          //   age: 10
          // },
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
        ],
      }
    },
    methods: {
      searchNurseLeader() {
        if (this.searchNurseLeaderForm.treatArea === '') {
          this.$message.error('请选择治疗区域')
          return
        }
        this.$axios.post('/searchNurseLeader', {
          treatArea: this.searchNurseLeaderForm.treatArea
        })
          .then(resp => {
            this.nurseLeaderResult = resp.data
            if (this.nurseLeaderResult.gender === 0) {
              this.nurseLeaderResult.gender = '男'
            } else {
              this.nurseLeaderResult.gender = '女'
            }
            this.$message.success("查询成功")
          })
          .catch(error => {
            this.$message.error("查询失败，请重试")
            console.log(error)
          })
      },
      searchRoomNurse() {
        if (this.searchRoomNurseForm.treatArea === '') {
          this.$message.error('请选择治疗区域')
          return
        }
        this.$axios.post('/searchRoomNurse', {
          treatArea: this.searchRoomNurseForm.treatArea
        })
          .then(resp => {
            this.roomNurseResult = resp.data
            if (this.roomNurseResult.gender === 0) {
              this.roomNurseResult.gender = '男'
            } else {
              this.roomNurseResult.gender = '女'
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
