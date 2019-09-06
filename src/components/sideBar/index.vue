<template>
  <div>
    <!-- eslint-disable -->
    <!--上一句话是为了关闭这个智障报错工具-->
    <!--unique-opened	是否只保持一个子菜单的展开	                                                        boolean	—	false
        menu-trigger	子菜单打开的触发方式(只在 mode 为 horizontal 时有效)	                              string	—	hover
        router	      是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转	boolean	—	false-->
    <el-row>
      <!--<el-col :span="12">
  &lt;!&ndash;      <h5>默认颜色</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>&ndash;&gt;&ndash;&gt;-->
      <el-col class="tac">
        <!--<h5>自定义颜色</h5>-->
        <!--default-active="1-4-1"-->

        <!--router :default-activate 这两句需要加上 否则不可以在el-menu中使用router参数-->
        <!--<el-menu
          router
          :default-active="$route.path"
          default-active="1-4-1"
          :default-openeds=this.open_list
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              &lt;!&ndash;<i class="el-icon-location"></i>&ndash;&gt;
              <span>基础资料</span>
            </template>
            <el-menu-item-group>
              &lt;!&ndash;<template slot="title">基础资料</template>&ndash;&gt;
              <el-menu-item index="1-1" route="/data">评估指标制定</el-menu-item>
              &lt;!&ndash;<el-menu-item index="1-2">功能评量</el-menu-item>
              <el-menu-item index="1-3">体检记录</el-menu-item>&ndash;&gt;
            </el-menu-item-group>
            &lt;!&ndash;          <el-menu-item-group title="目标拟定">
                        <el-menu-item index="2-1">长短期目标</el-menu-item>
                        <el-menu-item index="2-2">iep会议</el-menu-item>
                      </el-menu-item-group>&ndash;&gt;
            <el-submenu index="1-4">
              <template slot="title">课程评量</template>
              <el-menu-item index="1-4-1" route="/school_tables">学生课表查询</el-menu-item>
              <el-menu-item index="1-4-2" route="/creat_school_tables">学生课表制定</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              &lt;!&ndash;<i class="el-icon-location"></i>&ndash;&gt;
              <span>目标拟定</span>
            </template>
            <el-menu-item-group>
              &lt;!&ndash;<template slot="title">基础资料</template>&ndash;&gt;
              <el-menu-item index="2-1" route="/to_be_developed">个人目标</el-menu-item>
              <el-menu-item index="2-2" route="/to_be_developed">长短期目标</el-menu-item>
              <el-menu-item index="2-3" route="/to_be_developed">班级目标</el-menu-item>
              <el-menu-item index="2-4" route="/to_be_developed">iep会议</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              &lt;!&ndash;<i class="el-icon-location"></i>&ndash;&gt;
              <span>综合评量</span>
            </template>
            <el-menu-item-group>
              &lt;!&ndash;<template slot="title">基础资料</template>&ndash;&gt;
              <el-menu-item index="3-1" route="/to_be_developed">短期目标评量</el-menu-item>
              <el-menu-item index="3-2" route="/to_be_developed">定期评估分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>-->
        <el-menu
          :default-active=this.currentPage
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened=openMethod
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
          style="height: 1170px">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-magic-stick"></i>
              <span class="levelOne">多元评估</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-check userIcon"></i>
                <span class="levelTwo">指标选择</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-star-off userIcon"></i>
                <span class="levelTwo">生态评量</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span class="levelOne">课程管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-document userIcon"></i>
                <span class="levelTwo">课程设置</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-edit userIcon"></i>
                <span class="levelTwo">学生课表</span>
              </el-menu-item>

              <!-- <el-submenu index="2-2">
                 <template slot="title">
                   <i class="el-icon-edit userIcon"></i>
                   <span class="levelTwo">课表制定</span>
                 </template>
                 <el-menu-item-group>
                   <el-menu-item index="2-2-1"><span class="levelThree">学生课表查询</span></el-menu-item>
                   <el-menu-item index="2-2-2"><span class="levelThree">学生课表制定</span></el-menu-item>
                 </el-menu-item-group>
               </el-submenu>-->
              <el-menu-item index="2-3">
                <i class="el-icon-chat-line-round userIcon"></i>
                <span class="levelTwo">IEP会议</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span class="levelOne">教学实施</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-s-claim userIcon"></i>
                <span class="levelTwo">课程评量</span>
              </el-menu-item>
              <el-submenu index="3-2">
                <template slot="title">
                  <i class="el-icon-s-order userIcon"></i>
                  <span class="levelTwo">教学计划</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-2-1">
                    <i class="el-icon-s-grid userIcon"></i>
                    <span class="levelThree">集体学科计划</span>
                  </el-menu-item>
                  <el-menu-item index="3-2-2">
                    <i class="el-icon-menu userIcon"></i>
                    <span class="levelThree">个训学科计划</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="3-3">
                <i class="el-icon-s-flag userIcon"></i>
                <span class="levelTwo">教学主题</span>
              </el-menu-item>
              <el-menu-item index="3-4">
                <i class="el-icon-document-copy userIcon"></i>
                <span class="levelTwo">集体学科教学</span>
              </el-menu-item>
              <el-menu-item index="3-5">
                <i class="el-icon-document userIcon"></i>
                <span class="levelTwo">个训学科教学</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span class="levelOne">系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                <i class="el-icon-user-solid userIcon"></i>
                <span class="levelTwo">学校管理</span>
              </el-menu-item>
              <el-menu-item index="4-2">
                <i class="el-icon-user userIcon"></i>
                <span class="levelTwo">用户管理</span>
              </el-menu-item>
              <el-menu-item index="4-3">
                <i class="el-icon-s-check userIcon"></i>
                <span class="levelTwo">指标管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <!--<keep-alive>
      <router-view></router-view>
    </keep-alive>-->
  </div>

</template>

<script>/* eslint-disable */
export default {
  name: 'home',

  data () {
    return {
      currentPage: '',
      openMethod: true
    }
  },
  methods: {
    //获取参数
    getSideBarActive () {
      let urlParams = location.href.split("=")[1]// 0 是前面的地址  1 为第一个参数 2 为第二个参数
      this.currentPage = urlParams
      console.log(urlParams)
    },

    handleOpen (key, keyPath) {
      this.getSideBarActive()
      console.log(key, keyPath)
    },

    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },



    handleSelect (key) {
      switch (key) {
        case '1-1':
          this.title = '指标选择'
          //window.location.href = 'http://localhost:8083/#/data?id=' + key
          window.location.href='http://47.110.134.247/group2/#/data?id=' + key
          break
        case '1-2':
          this.title = '生态评量'
          window.location.href = 'http://47.110.134.247/group3/#/newcontact?id=' + key
          //this.$router.push('/newcontact');
          break
        case '2-1':
          this.title = '课程设置'
          window.location.href = 'http://47.110.134.247/group1/#/CourseManagement?id=' + key
          break
        case '2-2':
          this.title = '学生课表查询'
          //window.location.href = 'http://localhost:8083/#/school_tables?id=' + key
          window.location.href='http://47.110.134.247/group2/#/school_tables?id=' + key
          break
        /*case '2-2-2':
          this.title='学生课表制定';
          window.location.href='http://localhost:8083/#/creat_school_tables';
          //window.location.href='http://47.110.134.247/group2_b/#/creat_school_tables';
          break;*/
        case '2-3':
          this.title = 'IEP会议'
          window.location.href = 'http://47.110.134.247/group3/#/iep_meeting?id=' + key
          //this.$router.push('/iep_meeting');
          break
        case '3-1':
          this.title = '课程评量'
          window.location.href = 'http://47.110.134.247/group3/#/course_evaluation?id=' + key
          //this.$router.push('/course_evaluation');
          break
        case '3-2-1':
          this.title = '集体学科计划'
          window.location.href = 'http://47.110.134.247/group3/#/coll_disc_pro?id=' + key
          //this.$router.push('/coll_disc_pro');
          break
        case '3-2-2':
          this.title = '个训学科计划'
          window.location.href = 'http://47.110.134.247/group3/#/train_sub_prp?id=' + key
          //this.$router.push('/train_sub_prp');
          break
        case '3-3':
          this.title = '教学主题'
          window.location.href = 'http://47.110.134.247/group3/#/tea_theme?id=' + key
          //this.$router.push('/tea_theme');
          break
        case '3-4':
          this.title = '集体学科教学'
          window.location.href = 'http://47.110.134.247/group3/#/coll_sub_tea?id=' + key
          ///this.$router.push('/coll_sub_tea');
          break
        case '3-5':
          this.title = '个训学科教学'
          window.location.href = 'http://47.110.134.247/group3/#/ind_train_sub?id=' + key
          //this.$router.push('/ind_train_sub');
          break
        case '4-1':
          this.title = '学校管理'
          window.location.href = 'http://47.110.134.247/group1/#/list8?id=' + key
          break
        case '4-2':
          this.title = '用户管理'
          window.location.href = 'http://47.110.134.247/group1/#/UserManagement?id=' + key
          break
        case '4-3':
          this.title = '指标管理'
          window.location.href = 'http://47.110.134.247/group1/#/IndicatorManagement?id=' + key
          break
      }
    },
  },


  mounted:function(){
    this.getSideBarActive(); //加载时执行函数方法
  }
}
</script>

<style scoped>
  .header div {

    background: #f1f2f7;
    height: 80px;
    line-height: 80px;
  }

  .header .titles {

    font-size: 20px;
    font-weight: 500;
    margin-left: 19px;
  }

  .header .logo img {

    width: 209px;
    height: 40px;
    margin-top: 18px;
    margin-left: 20px;
  }

  .header .ipt {
    margin-left: 500px;
    position: relative;
    width: 343px;
  }

  .header .userinfo {
    margin-left: 160px;
  }

  .ipt .search {
    position: absolute;
    top: 4px;
    right: 4px;
  }

  .ipt .search img {
    width: 18px;
    height: 18px;
  }

  .levelOne {
    color: #FFFFFF;
  }

  .levelTwo {
    /*color: #FFD04B #F0E68C  #FFD700      #AFEEEE*/
    color: #FFFFFF;
  }

  .levelThree {
    color: #FFFFFF;
  }

  .userIcon {
    margin-left: 20px;
  }


  .con_section {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }

  .header_style {
    height: 60px;
    line-height: 60px;
    background-color: #f1f2f7;
  }

  .title_style {
    font-size: 20px;
    float: left;
    height: 60px;
    margin: 0 20px;
    width: 300px;
  }

  .home_main {
    padding: 10px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    margin-outside: 0px;
    margin: 0px;
  }
</style>
