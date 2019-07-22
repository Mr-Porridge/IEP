<!--2019.07.10开始开发目标制定功能-->
<template>
  <div>

    <el-container style="margin-outside: 0">
      <el-aside width="200px">
        <side-bar-router></side-bar-router>
      </el-aside>
      <el-main class="el-main">
        <el-button type="primary" @click="mockTest">测试</el-button>
        <el-table
          :data="coursesNames"
          border
          style="width: 100%">
          <el-table-column
            prop="left"
            label="节次\星期"
            :span="4">
          </el-table-column>
          <el-table-column
            prop="Monday"
            label="一"
            :span="4">
          </el-table-column>
          <el-table-column
            prop="Tuesday"
            label="二"
            :span="4">
          </el-table-column>
          <el-table-column
            prop="Wednesday"
            label="三"
            :span="4">
          </el-table-column>
          <el-table-column
            prop="Thursday"
            label="四"
            :span="4">
          </el-table-column>
          <el-table-column
            prop="Friday"
            label="五"
            :span="4">
          </el-table-column>
          <el-table-column
            prop="Saturday"
            label="六"
            :span="4">
          </el-table-column>
          <el-table-column
            prop="Sunday"
            label="日"
            :span="4">
          </el-table-column>
        </el-table>
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
    this.mockTest()//在渲染页面是初始时得到需要展示在前端的后端数据
    return {
      coursesNames:[],
      coursesPictures:[],
      search: '',
      /*url: 'http://dummyimage.com/100x100/4A7BF7&text=Hello',*/
      fit: 'cover',//图片的适应方式
      /*courses:['fill', 'contain', 'cover', 'none', 'scale-down'],*/
    }
  },

  components: {ElSelectDropdown, sideBarRouter},
  methods: {
    mockTest(){
      axios.get('http://coursesmock.com').then((res) => {
        console.log(res.data);
        /*console.log(res.data[0].Monday);*/
        this.coursesNames=res.data;
      })
    },
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
    text-align: center;
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
  }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
