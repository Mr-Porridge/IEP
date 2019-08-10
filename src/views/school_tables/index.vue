<!--2019.07.10开始开发目标制定功能-->
<template>
  <div>
    <el-container style="margin-outside: 0">
      <el-aside width="200px">
        <side-bar-router></side-bar-router>
      </el-aside>

      <el-main class="el-main">
        <el-container>
          <el-main>
            <el-header>学生课表</el-header>
            <el-container>
              <div id="searchModal">
                <el-form :inline="true">
                  <el-form-item label="按姓名查询" @submit.native.prevent>
                    <el-input
                      placeholder="请输入学生姓名"
                      v-model="SName"
                      clearable>
                    </el-input>
                  </el-form-item>

                  <el-button type="primary" @click="searchByName()">查询</el-button>

                  <el-form-item label="按学号查询">
                    <el-input
                      placeholder="请输入学生学号"
                      v-model="SId"
                      clearable>
                    </el-input>
                  </el-form-item>

                  <el-button type="primary" @click="searchById()">查询</el-button>

                  <el-form-item label="按班级查询">
                    <el-select v-model="classes" placeholder="班级名称">
                      <el-option
                        v-for="item in allClasses"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchByClass()">查询</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-container>
            <el-table
              :data="presentStudents"
              border
              style="width: 100%">
              <el-table-column
                prop="studentId"
                label="学号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="classId"
                label="班级">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <router-link :to="{name:'show_school_tables' ,params:{'name':'scope.row.name'}}">
                    <el-button
                      size="mini"
                      type="info"
                      @click="handleEdit(scope.$index, scope.row)">查看
                    </el-button>
                  </router-link>
                  <router-link to="/creat_school_tables">
                    <el-button
                      size="mini"
                      type="success"
                      @click="handleEdit(scope.$index, scope.row)">新建
                    </el-button>
                  </router-link>
                  <router-link to="/creat_school_tables">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                  </router-link>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" id="pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total=totalCount>
              </el-pagination>
            </div>
          </el-main>
        </el-container>
        <el-button type="primary" @click="ubc()">测试</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>/* eslint-disable */
import sideBarRouter from '@/components/sideBar/index'
import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown'
/*import Mock from 'mockjs'*/
import axios from 'axios'

export default {
  data () {
    const allStudents = []

    /*this.mockTest()*///在渲染页面是初始时得到需要展示在前端的后端数据
    //因为初始时不需要数据展示，查询后得到数据 所以不需要渲染页面时获取数据

    return {
      allStudents,
      search: '',
      SName: '',
      SId: '',
      classes: '',
      totalCount: 0,
      allClasses: [
        {
          value: '仁（1）',
          label: '仁（1）'
        },
        {
          value: '仁（2）',
          label: '仁（2）'
        },
        {
          value: '仁（3）',
          label: '仁（3）'
        },
        {
          value: '智（1）',
          label: '智（1）'
        },
        {
          value: '智（2）',
          label: '智（2）'
        },
        {
          value: '礼（1）',
          label: '礼（1）'
        },
      ],
      presentStudents: []
    }
  },

  components: {ElSelectDropdown, sideBarRouter},
  methods: {
    mockTest () {
      axios.get('http://dataformmock.com').then((res) => {
        console.log(res.data.data.students)
        this.allStudents = res.data.data.students
      })
      /*axios.get('http://dataformmock.com').then(function(res){
        console.log(res.data);
      });*/
    },
    searchByName () {
      console.log('查询的姓名：' + this.SName)
      //向后端传递将要查询的名字
      axios({
        method: 'get',
        url:'http://dataformmock.com',
        //url: 'http://localhost:8082/scheduleSet/name/student/',
        //用params的形式传递参数而不是data 这样使得传递的参数为原本实参类型而不是json
        //Problem solved！
        /*params:{
          name:this.SName
        },*/
      }).then((res) => {
        console.log(res.data.data)
        console.log(res.data.data.students)
        this.allStudents = res.data.data.students
        this.totalCount = res.data.data.totalCount
        //this.classes = ''
        this.initPagination()
      })/*then((res) => {
        console.log(res.data.data)
        this.allStudents = res.data.data
        console.log(this.allStudents)
        this.totalCount = res.data.data.length
        this.initPagination()
      })*/
    },

    searchById () {
      console.log(this.SId)
      //向后端传递将要查询的id
      axios({
        method: 'get',
        url:'http://dataformmock.com',
        //url: 'http://localhost:8082/scheduleSet/studentId/student/',
        /*params: {
          studentId: this.SId
        }*/
      }).then((res) => {
        this.allStudents=[]
        this.allStudents.push(res.data.data)
        this.totalCount = this.allStudents.length
        this.initPagination()
      })
    },


    searchByClass () {
      console.log("查询的班级："+this.classes)
      //向后端传递将要查询的班级名称
      axios({
        method: 'get',
        url:'http://dataformmock.com',
        //url: 'http://localhost:8082/scheduleSet/classId/student/',
        /*params:{
          classId:this.classes,
          pageNumber:0,
          pageSize:10
        }*/
      }).then((res) => {
        console.log(res.data.data)
        console.log(res.data.data.students)
        this.allStudents = res.data.data.students
        this.totalCount = res.data.data.totalCount
        //this.classes = ''
        this.initPagination()
      })
    },

    initPagination () {
        //在此初始化分页的第一页
        if (this.totalCount < 10) {
          this.presentStudents = this.allStudents.slice(0, this.totalCount)
        } else {
          this.presentStudents = this.allStudents.slice(0, 10)
        }
    },

    handleCurrentChange (val) {
      //该函数再分页按钮改变时触发
      console.log(`当前页: ${val}`)
      //console.log(this.presentStudents);
      let begin = (val - 1) * 10
      let end = val * 10
      console.log('begin is: ' + begin + ' ;end is: ' + end)
      this.presentStudents = this.allStudents.slice(begin, end)
      console.log(this.presentStudents)
    },

    handleEdit (index, row) {
      console.log(index, row)
    },

    handleDelete (index, row) {
      console.log(index, row)
    },

  }
}
</script>

<style>
  /*去除容器最外层8px边框*/
  * {
    padding: 0;
    margin: 0;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    margin: 0px;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #545c64;
  }


  #pagination {
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
  }


</style>
