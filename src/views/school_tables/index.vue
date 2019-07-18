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
              <!--<el-button></el-button>-->
            </el-container>
            <el-table
              :data="students.filter(data => !search || data.studentId.toLowerCase().includes(search.toLowerCase()))"
              border
              style="width: 100%">
              <el-table-column
                prop="studentId"
                label="学号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="studentName"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="classId"
                label="班级">
              </el-table-column>
              <el-table-column>
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入学号搜索"></el-input>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleEdit(scope.$index, scope.row)">新建</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
        <!--<el-button type="primary" @click="mockTest">测试</el-button>-->
      </el-main>
    </el-container>
  </div>
</template>

<script>/* eslint-disable */
import sideBarRouter from '@/components/sideBar/index'
import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown'
import Mock from 'mockjs'
import axios from 'axios'

export default {
  data () {
    const students=[]
    this.mockTest()//在渲染页面是初始时得到需要展示在前端的后端数据
    return {
      students,
      search: ''
    }
  },

  components: {ElSelectDropdown, sideBarRouter},
  methods: {
    mockTest(){
      axios.get('http://dataformmock.com').then((res) => {
        console.log(res.data);
        this.students=res.data
      })
      /*axios.get('http://dataformmock.com').then(function(res){
        console.log(res.data);
      });*/
    },
    handleEdit(index, row){
      console.log(index, row);
    },
    handleDelete(index, row){
      console.log(index, row);
    }
  }
}
</script>

<style>
  /*去除容器最外层8px边框*/
  *{
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


  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
  }


</style>
