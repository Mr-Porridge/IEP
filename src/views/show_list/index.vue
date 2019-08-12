<!--2019.07.10开始开发目标制定功能-->
<template>
  <div>
    <el-container style="margin-outside: 0">
       <!--<el-aside width="200px">
         <side-bar-router></side-bar-router>
       </el-aside>-->
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
                      :label="item.id"
                      :value="item.label">
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
  </div>
</template>

<script>/* eslint-disable */
import sideBarRouter from '@/components/sideBar/index'
import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown'
/*import Mock from 'mockjs'*/
import axios from 'axios'

export default {
  data () {
    this.mockTest()//在渲染页面是初始时得到需要展示在前端的后端数据
    this.getOptionalCourses()
    return {
      choosing: 100,//为了reform学生课表制作
      coursesNames: [],//学生课程表
      dialogFormVisible: false,
      courseName: {mes: '暂无课程'},
      formLabelWidth: '120px',
      formInline: {
        user: '',
        region: ''
      },
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
        //url: 'http://coursesmock.com',
        url: 'http://localhost:8082/scheduleSet/personalSchedule/',
        params: {
          'year': '2018/2019',
          'semester': '1',
          'studentId': 'B17049908'
        }
      }).then((res) => {
        //console.log(res.data.data)
        let temp = JSON.parse(res.data.data.courses)
        this.heads[0].type = 'success'
        this.heads[0].label = res.data.data.year + '学年'
        this.heads[1].type = ''
        this.heads[1].label = '第 ' + res.data.data.semester + ' 学期'
        //console.log(temp)
        for(let item in temp){
          if(temp.hasOwnProperty(item)){
            //需要检查
            this.coursesNames.push({id:item, mes:temp[item]})
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
        //url: 'http://coursesmock.com',
        url: 'http://localhost:8082/scheduleSet/courses/',
        params: {
          'pageNumber': '1',
          'pageSize': '10',
        }
      }).then((res) => {
        console.log(res.data.data)
        this.options = res.data.data.courses

      })

    },

    chooseLesson (buttonId) {
      console.log('选课')
      console.log(buttonId)
      this.choosing = buttonId
      this.dialogFormVisible = true
    },

    confirm () {
      let id = this.choosing
      //因为添加了"第X节课"导致数组下标发生变化但是id不变化 所以id = id + Math.floor(id/8)
      this.coursesNames[id + Math.floor(id / 8)].mes = this.formInline.region
      this.formInline.region = ''
      this.dialogFormVisible = false
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
      console.log('保存成功')
      axios({
        method: 'post',
        url: 'http://localhost:8082/scheduleSet/personalSchedule/save',
        params:{
          "studentId": "B17040523",
          "year": this.heads[0].label,
          "semester": this.heads[1].label,
          "courses": JSON.stringify(this.coursesNames),
        }
      })
      //alert('保存成功！')
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
