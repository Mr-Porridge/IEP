<!--2019.07.10开始开发目标制定功能-->
<template>
  <div>
    <el-container style="margin-outside: 0">
      <el-aside width="211px">
        <side-bar-router></side-bar-router>
      </el-aside>
      <el-main>
        <!--<el-button type="primary" @click="checkExisted()">测试</el-button>-->
        <span>标题</span><el-input>标题</el-input>
        <span>文章</span><el-input>文章</el-input>
      </el-main>
    </el-container>
  </div>
</template>

<script>/* eslint-disable */
import sideBarRouter from '@/components/sideBar/index'
import Mock from 'mockjs'
import axios from 'axios'

export default {
  data () {
    return {
    }
  },

  components: {sideBarRouter},
  methods: {
    getSession(){
      if (window.sessionStorage["searchIndex"]){
        console.log(JSON.parse(window.sessionStorage.getItem("searchIndex")))
      }
    },


    /**
     * 检查学校id 以区分新建和修改
     * */
    checkExisted () {
      console.log("I am in ")
      axios({
        method: 'get',
        url: 'http://schoolmock.com',
        data: {
          'schoolId': 1,
        }
      }).then((res) => {
        console.log(res)
      })
    },
  },

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


  .el-main {
    text-align: center;
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
  }

</style>
