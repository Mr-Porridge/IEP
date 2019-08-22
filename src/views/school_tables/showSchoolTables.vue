<!--2019.07.10开始开发目标制定功能-->
<template>
  <div>
    <el-container style="position: absolute;top:0;bottom:0;left:0;width:100%;" direction="vertical">
      <el-header style=" height: 82px;   background: #f1f2f7;">
        <head-bar-router></head-bar-router>
      </el-header>
      <el-container style="margin-outside: 0">
        <el-aside width="211px">
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

            <!--选择学年学期-->
            <el-button type="text" @click="dialogFormVisible = true">查看其它学年学期课表</el-button>

            <el-dialog title="选择查询的学年学期" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="学年" :label-width="formLabelWidth">
                  <el-select v-model="form.year" clearable placeholder="请选择学年" id="chooseSemester">
                    <el-option
                      v-for="item in yearOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="学期" :label-width="formLabelWidth">
                  <el-select v-model="form.semester" clearable placeholder="请选择学期" id="chooseYear">
                    <el-option
                      v-for="item in semesterOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="searchTables()">确 定</el-button>
              </div>
            </el-dialog>

            <div id="creatSchoolTable">
              <el-row>
                <el-col :span="3">
                  <div class="grid-content bg-purple-light">节次\星期</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">一</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">二</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">三</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">四</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">五</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">六</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">日</div>
                </el-col>
              </el-row>
              <el-row :span="3">
                <el-col :span="3" v-for="item in coursesNames" :key="item.id">
                  <div class="grid-content bg-purple-light" :style="randomRgb(item.id)">
                    <span class="courseName">{{item.mes}}</span>
                  </div>
                </el-col>
              </el-row>

            </div>
          </el-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>/* eslint-disable */
import sideBarRouter from '@/components/sideBar/index'
import headBarRouter from '@/components/head/index'
import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown'
/*import Mock from 'mockjs'*/
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
      //学年学期选择
      yearOptions: [
        {
          value: '2016/2017',
          label: '2016/2017学年'
        },
        {
          value: '2017/2018',
          label: '2017/2018学年'
        },
        {
          value: '2018/2019',
          label: '2018/2019学年'
        },
        {
          value: '2019/2020',
          label: '2019/2020学年'
        },
      ],
      semesterOptions: [
        {
          value: '1',
          label: '第一学期'
        }, {
          value: '2',
          label: '第二学期'
        }, {
          value: '3',
          label: '第三学期'
        }, {
          value: '4',
          label: '第四学期'
        },
      ],
      //弹框表单内
      dialogFormVisible: false,
      form: {
        year: '2018/2019',
        semester: '1',
      },
      formLabelWidth: '120px',
      //随机颜色课表
      colorMap: ['#FFB6C1', '#6495ED', '#FFA500', '#FF7F50',],

      colorMap2: ['#C7EDE9', '#AFD7ED', '#5CA7BA', '#FF425D', '#93E0FF'],

      colorMap3: ['#F4E8C1', '#A0C1B8', '#B7DAE0', '#E6E6FA',
        '#FFD8EB', '#87CEFA', '#FFE4E1'],
    }

  },

  components: {ElSelectDropdown, sideBarRouter, headBarRouter},
  methods: {
    mockTest () {
      axios({
        method: 'get',
        //url: 'http://coursesmock.com',
        // url: 'http://localhost:8082/scheduleSet/personalSchedule/',
        url: 'http://47.110.134.247/group2_b/scheduleSet/personalSchedule/',
        params: {
          /*'year': this.form.year,
          'semester': this.form.semester,*/
          'year': '2018/2019',
          'semester': '1',
          'studentId': this.$route.query.row.studentId
        }
      }).then((res) => {
        if (res.data.data === null) {
          alert('该学生暂无' + '2018/2019学年 第 1 学期 ' + '课表！请查看其他学期课表！')
          return
        }
        //console.log(res.data.data)
        let temp = JSON.parse(res.data.data.courses)

        this.heads[0].type = 'success'
        this.heads[0].label = res.data.data.year + '学年'
        this.heads[1].type = ''
        this.heads[1].label = '第 ' + res.data.data.semester + ' 学期'
        //console.log(temp)
        for (let item in temp) {
          if (temp.hasOwnProperty(item)) {
            //需要检查
            this.coursesNames.push({id: item, mes: temp[item]})
          }
        }
        //console.log(this.coursesNames)
        this.coursesNames.unshift({id: 101, mes: '第一节课'})
        this.coursesNames.splice(8, 0, {id: 102, mes: '第二节课'})
        this.coursesNames.splice(16, 0, {id: 103, mes: '第三节课'})
        this.coursesNames.splice(24, 0, {id: 104, mes: '第四节课'})
        this.coursesNames.splice(32, 0, {id: 105, mes: '第五节课'})
        this.coursesNames.splice(40, 0, {id: 106, mes: '第六节课'})
        this.coursesNames.splice(48, 0, {id: 107, mes: '第七节课'})
        //console.log(this.coursesNames)
      })
    },
    getParams () {
      let temp = this.$route.query.row
      console.log('跳转到show list 了', this.$route.query.row)
      this.studentId = temp.studentId
      console.log(this.form)
    },
    searchTables () {
      this.dialogFormVisible = false
      axios({
        method: 'get',
        //url: 'http://coursesmock.com',
        // url: 'http://localhost:8082/scheduleSet/personalSchedule/',
        url: 'http://47.110.134.247/group2_b/scheduleSet/personalSchedule/',
        params: {
          /*'year': this.form.year,
          'semester': this.form.semester,*/
          'year': this.form.year,
          'semester': this.form.semester,
          'studentId': this.$route.query.row.studentId
        }
      }).then((res) => {
        if (res.data.data === null) {
          alert('该学生暂无' + this.form.year + '学年 第 ' + this.form.semester + ' 学期 ' + '课表！请查看其他学期课表！')
          return
        }
        this.coursesNames = []
        //console.log(res.data.data)
        let temp = JSON.parse(res.data.data.courses)
        this.heads[0].type = 'success'
        this.heads[0].label = res.data.data.year + '学年'
        this.heads[1].type = ''
        this.heads[1].label = '第 ' + res.data.data.semester + ' 学期'
        //console.log(temp)
        for (let item in temp) {
          if (temp.hasOwnProperty(item)) {
            //需要检查
            this.coursesNames.push({id: item, mes: temp[item]})
          }
        }
        //console.log(this.coursesNames)
        this.coursesNames.unshift({id: 101, mes: '第一节课'})
        this.coursesNames.splice(8, 0, {id: 102, mes: '第二节课'})
        this.coursesNames.splice(16, 0, {id: 103, mes: '第三节课'})
        this.coursesNames.splice(24, 0, {id: 104, mes: '第四节课'})
        this.coursesNames.splice(32, 0, {id: 105, mes: '第五节课'})
        this.coursesNames.splice(40, 0, {id: 106, mes: '第六节课'})
        this.coursesNames.splice(48, 0, {id: 107, mes: '第七节课'})
        //console.log(this.coursesNames)
      })
    },
    randomRgb (id) {
      if (id < 100) {
        //左右相邻不同色
        this.coursesNames[id].color = -1
        this.coursesNames[id].color = Math.floor((Math.random() * 7) + 1) - 1
        while (this.coursesNames[id].color === this.coursesNames[id - 1].color) {
          this.coursesNames[id].color = ((this.coursesNames[id].color) % 7) + 1
        }
        //console.log(this.coursesNames[id].color)
        return {
          background: this.colorMap3[this.coursesNames[id].color]
        }
      } else {
        return {
          background: '#d3dce6'
        }
      }
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
    margin: 0;
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

  .courseName {

  }


</style>
