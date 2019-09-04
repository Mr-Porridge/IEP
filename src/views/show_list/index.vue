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
        <el-main>
          <el-tag
            v-for="item in heads"
            :key="item.key"
            :type="item.type"
            effect="dark">
            {{ item.label }}
          </el-tag>

          <!--选择学年学期-->
          <el-button type="text" @click="dialogFormVisible2 = true">选择学年学期</el-button>

          <el-dialog title="选择查询的学年学期" :visible.sync="dialogFormVisible2">
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
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="confirmYears()">确 定</el-button>
            </div>
          </el-dialog>

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
                  <el-button
                    icon="el-icon-edit"
                    circle
                    type="primary"
                    size="medium"
                    @click="chooseLesson(item.id)">
                  </el-button>
                </div>
              </el-col>
            </el-row>

            <el-button type="primary" @click="save()">保存</el-button>

            <div>
              <el-dialog title="选择课程" :visible.sync="dialogFormVisible">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="课程选择">
                    <el-select v-model="formInline.region" placeholder="下拉选择课程">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="confirm">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
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
    this.getParams()
    this.init()//在渲染页面是初始时得到需要展示在前端的后端数据
    this.getOptionalCourses()
    return {
      //页面跳转之后的参数 由他们接收
      year: '',//学年
      semester: 0,//学期
      studentId: '',//id

      st: [],
      choosing: 100,//为了reform学生课表制作
      coursesNames: [],//学生课程表
      dialogFormVisible: false,//弹框的显隐
      courseName: {mes: '暂无课程'},//存放学生课表
      //存放题头---学年  学期
      heads: [
        {type: '', label: '', key: 0},
        {type: '', label: '', key: 1},
      ],
      options: [],//存放可选课程

      formLabelWidth: '120px',
      formInline: {
        user: '',
        region: ''
      },
      test: {},

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
      dialogFormVisible2: false,
      form: {
        year: '2018/2019',
        semester: '1',
      },
    }
  },

  components: {ElSelectDropdown, sideBarRouter, headBarRouter},
  methods: {
    init () {
      axios({
        method: 'get',
        //url: 'http://coursesmock.com',
        //url: 'http://localhost:8082/scheduleSet/personalSchedule/',
        url: 'http://47.110.134.247/group2_b/scheduleSet/personalSchedule/',
        params: {
          /*'year': this.year,
          'semester': this.semester,*/
          'year': '2018/2019',//默认值
          'semester': 1,//默认值
          'studentId': this.studentId,
        }
      }).then((res) => {
        //console.log(res.data.data)
        //console.log(res.data.data.courses)
        //console.log(JSON.parse(res.data.data.courses))
        this.test = res.data.data.courses
        let temp = JSON.parse(res.data.data.courses)
        this.heads[0].type = 'success'
        this.heads[0].label = res.data.data.year
        //console.log("year is: ")
        //console.log(typeof (this.heads[0].label))
        this.heads[1].type = ''
        this.heads[1].label = '第 ' + res.data.data.semester + ' 学期'
        //console.log("semester is: ")
        //console.log(typeof (this.heads[1].label))
        //console.log(temp)
        for (let item in temp) {
          if (temp.hasOwnProperty(item)) {
            //需要检查
            this.coursesNames.push({id: item, mes: temp[item]})
          }
        }
        //console.log(this.coursesNames)
        this.reformList(this.coursesNames)
        //console.log(this.coursesNames)
      })
    },

    getOptionalCourses () {
      //开发用http://chooseablecoursesmock.com
      //测试用http://localhost:8082/scheduleSet/courses/
      axios({
        method: 'get',
        //url: 'http://localhost:8082/scheduleSet/courses/',
        url: 'http://47.110.134.247/group2_b/scheduleSet/courses/',
        params: {
          'pageNumber': '0',
          'pageSize': '10',
        }
      }).then((res) => {
        //console.log(res.data.data.courses)
        this.options = res.data.data.courses
      })
    },

    chooseLesson (buttonId) {
      if(buttonId>=100){
        alert("禁止修改侧边栏！")
        return
      }
      console.log('选课')
      console.log('选课时的id：', buttonId)
      this.choosing = buttonId
      this.dialogFormVisible = true
    },

    confirm () {
      let id = parseInt(this.choosing) + Math.ceil(parseInt(this.choosing) / 7 - 1)
      console.log('确定时的id：', id)
      //因为添加了"第X节课"导致数组下标发生变化但是id不变化
      //所以id = parseInt(this.choosing) + Math.ceil(parseInt(this.choosing) / 7 - 1)
      //this.choosing 被认为是string 所以需要转换为number
      this.coursesNames[id].mes = this.formInline.region
      this.formInline.region = ''
      this.dialogFormVisible = false
      //console.log(typeof (JSON.stringify(this.coursesNames)))
    },

    reformList () {
      this.coursesNames.unshift({id: 101, mes: '第一节课'})
      this.coursesNames.splice(8, 0, {id: 102, mes: '第二节课'})
      this.coursesNames.splice(16, 0, {id: 103, mes: '第三节课'})
      this.coursesNames.splice(24, 0, {id: 104, mes: '第四节课'})
      this.coursesNames.splice(32, 0, {id: 105, mes: '第五节课'})
      this.coursesNames.splice(40, 0, {id: 106, mes: '第六节课'})
      this.coursesNames.splice(48, 0, {id: 107, mes: '第七节课'})
      //console.log(this.coursesNames)
    },

    save () {
      //console.log('保存成功')
      console.log(this.$route.query.row.studentId)
      console.log((typeof (this.$route.query.row.studentId)))
      var map = {}
      for (var index in this.coursesNames) {
        if (this.coursesNames[index].id < 100) {
          map[this.coursesNames[index].id] = this.coursesNames[index].mes
        }
      }
      /* console.log("-----------------test----------------")
       console.log(this.test)
       console.log(JSON.stringify(map))
       console.log(this.test===JSON.stringify(map))
       console.log(typeof (this.heads[1].label))*/
      //console.log(JSON.stringify(this.coursesNames))
      axios({
        method: 'post',
        //url: 'http://localhost:8082/scheduleSet/personalSchedule/save',
        url: 'http://47.110.134.247/group2_b/scheduleSet/personalSchedule/save',
        data: {
          'studentId': this.$route.query.row.studentId,
          'year': this.form.year,
          'semester': this.form.semester,
          'courses': JSON.stringify(map),
        }
      })
      alert('保存成功！')
    },

    getParams () {
      let temp = this.$route.query.row
      //console.log('跳转到show list 了', this.$route.query.row)
      this.studentId = temp.studentId
      console.log(this.studentId)
    },

    confirmYears () {
      this.heads[0].label = this.form.year + ' 学年'
      this.heads[1].label = '第 ' + this.form.semester + ' 学期'
      this.dialogFormVisible2 = false
      //根据选择的学年学期更新课表
      axios({
        method: 'get',
        //url: 'http://localhost:8082/scheduleSet/personalSchedule/',
        url: 'http://47.110.134.247/group2_b/scheduleSet/personalSchedule/',
        params: {
          'year': this.form.year,
          'semester': this.form.semester,
          'studentId': this.studentId,
        }
      }).then((res) => {
        this.coursesNames = []
        this.test = res.data.data.courses
        let temp = JSON.parse(res.data.data.courses)
        this.heads[0].type = 'success'
        this.heads[0].label = res.data.data.year
        this.heads[1].type = ''
        this.heads[1].label = '第 ' + res.data.data.semester + ' 学期'
        for (let item in temp) {
          if (temp.hasOwnProperty(item)) {
            //需要检查
            this.coursesNames.push({id: item, mes: temp[item]})
          }
        }
        this.reformList(this.coursesNames)
      })


    }

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

  .el-col {
    border-radius: 4px;
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
</style>
