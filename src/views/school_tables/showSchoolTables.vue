<!--2019.07.10开始开发目标制定功能-->
<template>
  <div>

    <el-container style="margin-outside: 0">
      <el-aside width="200px">
        <side-bar-router></side-bar-router>
      </el-aside>
      <el-main class="el-main">
        <!--<el-button type="primary" @click="mockTest">测试</el-button>-->
        <el-main>
          <el-tag
            v-for="item in heads"
            :key="item.key"
            :type="item.type"
            effect="dark">
            {{ item.label }}
          </el-tag>
          <div id="creatSchoolTable">
            <el-row>
              <el-col :span="3">
                <div class="grid-content bg-purple">节次\星期</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple-light">一</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">二</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple-light">三</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">四</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple-light">五</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">六</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple-light">日</div>
              </el-col>
            </el-row>
            <el-row :span="3">
              <el-col :span="3" v-for="item in coursesNames" :key="item.id">
                <div class="grid-content bg-purple-light">
                  <span>{{item.mes}}</span>
                </div>
              </el-col>
            </el-row>

          </div>
        </el-main>
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
      coursesNames: [],
      coursesPictures: [],
      search: '',
      /*url: 'http://dummyimage.com/100x100/4A7BF7&text=Hello',*/
      fit: 'cover',//图片的适应方式
      /*courses:['fill', 'contain', 'cover', 'none', 'scale-down'],*/
      options: [],//可选课程
      //题头---学年  学期
      heads: [
        {type: '', label: '', key: 0},
        {type: '', label: '', key: 1},
      ],
    }
  },

  components: {ElSelectDropdown, sideBarRouter},
  methods: {
    mockTest () {
      axios({
        method: 'get',
        url: 'http://coursesmock.com',
        //url: 'http://localhost:8082/scheduleSet/studentId/student/',
        /*params: {
          studentId: this.SId
        }*/
      }).then((res) => {
        this.coursesNames = res.data.courses
        this.heads[0].type = 'success'
        this.heads[0].label = res.data.year + '学年'
        this.heads[1].type = ''
        this.heads[1].label = '第 ' + res.data.semester + ' 学期'
        this.reformList()
      })
    },


    reformList () {
      console.log('Hello')
      this.coursesNames.unshift({id: 101, mes: '第一节课'})
      this.coursesNames.splice(8, 0, {id: 102, mes: '第二节课'})
      this.coursesNames.splice(16, 0, {id: 103, mes: '第三节课'})
      this.coursesNames.splice(24, 0, {id: 104, mes: '第四节课'})
      this.coursesNames.splice(32, 0, {id: 105, mes: '第五节课'})
      this.coursesNames.splice(40, 0, {id: 106, mes: '第六节课'})
      this.coursesNames.splice(48, 0, {id: 107, mes: '第七节课'})
      console.log(this.coursesNames)
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
