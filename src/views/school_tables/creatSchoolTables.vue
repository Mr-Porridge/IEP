<!--2019.07.10开始开发目标制定功能-->
<template>
  <div>
    <el-container style="margin-outside: 0">
      <el-aside width="200px">
        <side-bar-router></side-bar-router>
      </el-aside>
      <el-main>
        <div id="creatSchoolTable">
          <el-row>
            <el-col :span="3"><div class="grid-content bg-purple">节次\星期</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light">一</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple">二</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light">三</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple">四</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light">五</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple">六</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light">日</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                第一节课
                <!--<span :value="ttt[0].mes">{{ttt[0].mes}}</span>
                <span>
                  <el-button id="button0" icon="el-icon-edit" circle type="primary" size="medium" @click="chooseLesson(ttt[0].id)">
                </el-button></span>-->
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-light">
                <span :value="ttt[1].mes">{{ttt[1].mes}}</span>
                <el-button id="button1" icon="el-icon-edit" circle type="primary" size="medium" @click="chooseLesson(ttt[1].id)">
                </el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <span :value="ttt[2].mes">{{ttt[2].mes}}</span>
                <el-button id="button2" icon="el-icon-edit" circle type="primary" size="medium" @click="chooseLesson(ttt[2].id)">
                </el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-light">
                <span :value="ttt[3].mes">{{ttt[3].mes}}</span>
                <el-button id="button3" icon="el-icon-edit" circle type="primary" size="medium" @click="chooseLesson(ttt[3].id)">
                </el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <span :value="ttt[4].mes">{{ttt[4].mes}}</span>
                <el-button id="button4" icon="el-icon-edit" circle type="primary" size="medium" @click="chooseLesson(ttt[4].id)">
                </el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-light">
                <span :value="ttt[5].mes">{{ttt[5].mes}}</span>
                <el-button id="button5" icon="el-icon-edit" circle type="primary" size="medium" @click="chooseLesson(ttt[5].id)">
                </el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <span :value="ttt[6].mes">{{ttt[6].mes}}</span>
                <el-button id="button6" icon="el-icon-edit" circle type="primary" size="medium" @click="chooseLesson(ttt[6].id)">
                </el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-light">
                <span :value="ttt[7].mes">{{ttt[7].mes}}</span>
                <el-button id="button7" icon="el-icon-edit" circle type="primary" size="medium" @click="chooseLesson(ttt[7].id)">
                </el-button>
              </div>
            </el-col>
            <!--<el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>-->
          </el-row>

          <!--<el-row>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>-->
          <div>
            <el-dialog title="选择课程" :visible.sync="dialogFormVisible">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="课程选择">
                  <el-select v-model="formInline.region" placeholder="下拉选择课程">
                    <el-option label="英语" value="英语"></el-option>
                    <el-option label="计算机" value="计算机"></el-option>
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
import Mock from 'mockjs'
import axios from 'axios'

export default {
  data () {
    this.mockTest()//在渲染页面是初始时得到需要展示在前端的后端数据
    return {
      choosing: 100,
      coursesNames: [],
      ttt: [
        {
          id: 0,
          mes: '暂无课程'
        },
        {
          id: 1,
          mes: '暂无课程'
        },
        {
          id: 2,
          mes: '暂无课程'
        },
        {
          id: 3,
          mes: '暂无课程'
        },
        {
          id: 4,
          mes: '暂无课程'
        },
        {
          id: 5,
          mes: '暂无课程'
        },
        {
          id: 6,
          mes: '暂无课程'
        },
        {
          id: 7,
          mes: '暂无课程'
        }

      ],
      yyy: 'I changed!',
      dialogFormVisible: false,
      courseName: {mes: '暂无课程'},
      formLabelWidth: '120px',
      formInline: {
        user: '',
        region: ''
      }
    }
  },

  components: {ElSelectDropdown, sideBarRouter},
  methods: {
    mockTest () {
      axios.get('http://creatschooltablesmock.com').then((res) => {
        console.log(res.data)
        /*console.log(res.data[0].Monday);*/
        this.coursesNames = res.data
      })
    },

    chooseLesson (buttonId) {
      /*console.log('选课')
      console.log(buttonId)*/
      this.choosing = buttonId
      this.dialogFormVisible = true
    },

    confirm () {
      this.ttt[this.choosing].mes = this.formInline.region
      this.dialogFormVisible = false
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
