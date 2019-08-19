<template>
  <div id="app">
    <el-container class="con_section" style="margin-outside: 0">
      <!-- <el-header class="header_style">
         <h2 class="title_style">IEP个性化教育</h2>
         <el-col :span="4" class="userinfo">
           <el-dropdown trigger="hover">
             <span class="el-icon-user userinfo-inner" style="margin-right: 15px;font-size: 15px"></span>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>设置</el-dropdown-item>
               <el-dropdown-item>退出登录</el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
           <span>用户</span>
         </el-col>
       </el-header> -->
      <el-header class="header_style" style="height: 80px">
        <el-col :span="24" class="header">
          <div class="titles">个性化教育</div>
          <div class="ipt">
            <el-input  placeholder="搜索" class="seo"></el-input>
            <span class="search"><img src="../../assets/btn_search_default.png" alt=""></span>
          </div>
          <div class="userinfo">
            <el-dropdown >
					<span class="el-dropdown-link userinfo-inner">
						<img src="../../assets/header_btn_down.png"  alt="">
						<span class="userName">你好，{{sysUserName}}</span>
					</span>
              <!--<el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>-->
              <span></span>
            </el-dropdown>
          </div>
        </el-col>
      </el-header>
      <el-container>
        <el-aside style="width:211px;background-color:#545c64;">
          <el-menu
            :default-openeds=this.open_list
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
            style="height: 1170px">
            <el-submenu index="1">
              <template slot="title">
                <span>多元评估</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">指标选择</el-menu-item>
                <el-menu-item index="1-2">生态评量</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>课程管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">课程设置</el-menu-item>
                <el-submenu index="2-2">
                  <template slot="title"><span>课表制定</span></template>
                  <el-menu-item-group>
                    <el-menu-item index="2-2-1">学生课表查询</el-menu-item>
                    <el-menu-item index="2-2-2">学生课表制定</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2-3">IEP会议</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>教学实施</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">课程评量</el-menu-item>
                <el-submenu index="3-2">
                  <template slot="title"><span>教学计划</span></template>
                  <el-menu-item-group>
                    <el-menu-item index="3-2-1">集体学科计划</el-menu-item>
                    <el-menu-item index="3-2-2">个训学科计划</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="3-3">教学主题</el-menu-item>
                <el-menu-item index="3-4">集体学科教学</el-menu-item>
                <el-menu-item index="3-5">个训学科教学</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title" ><span>系统管理</span> </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">学校管理</el-menu-item>
                <el-menu-item index="4-2">用户管理</el-menu-item>
                <el-menu-item index="4-3">指标管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- <el-main style="background-color: #E9EEF3;">
           <el-container>
             <el-header>{{title_name}}</el-header>
             <el-main style="background-color: #E9EEF3">
               <router-view> </router-view>
             </el-main>
           </el-container>
         </el-main>-->
        <!--     <el-container  style="padding-top: 8px;padding-left: 8px">
            <el-header>{{title_name}}</el-header>
            <el-main style="background-color: #E9EEF3">
              <router-view> </router-view>
            </el-main>
          </el-container>-->
        <el-main>
          <el-container>
            <el-header style="text-align: center;background-color: #b3c0d1;height: 60px;font-size: 24px;"><div style="margin-top: 15px">{{title}}</div></el-header>
            <el-main>
              <router-view> </router-view>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import SideBar from '@/components/sideBar/index'
  export default {
    name: "home",
    data() {
      return {
        title:'IEP',
        open_list:['1','2','2-2','3','3-2','4'],
      }
    },
    components:{SideBar},
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key){
        switch(key){
          case '1-1':
            this.title='指标选择';
            window.location.href='http://47.110.134.247/group2/#/data';
            break;
          case '1-2':
            this.title='生态评量';
            this.$router.push('/newcontact');
            break;
          case '2-1':
            this.title='课程设置';
            window.location.href='http://47.110.134.247/group1/#/CourseManagement';
            break;
          case '2-2-1':
            this.title='学生课表查询';
            window.location.href='http://47.110.134.247/group2/#/school_tables';
            break;
          case '2-2-2':
            this.title='学生课表制定';
            window.location.href='http://47.110.134.247/group2/#/creat_school_tables';
            break;
          case '2-3':
            this.title='IEP会议';
            this.$router.push('/iep_meeting');
            break;
          case '3-1':
            this.title='课程评量';
            this.$router.push('/course_evaluation');
            break;
          case '3-2-1':
            this.title='集体学科计划';
            this.$router.push('/coll_disc_pro');
            break;
          case '3-2-2':
            this.title='个训学科计划';
            this.$router.push('/train_sub_prp');
            break;
          case '3-3':
            this.title='教学主题';
            this.$router.push('/tea_theme');
            break;
          case '3-4':
            this.title='集体学科教学';
            this.$router.push('/coll_sub_tea');
            break;
          case '3-5':
            this.title='个训学科教学';
            this.$router.push('/ind_train_sub');
            break;
          case '4-1':
            this.title='学校管理';
            window.location.href='http://47.110.134.247/group1/#/list8';
            break;
          case '4-2':
            this.title='用户管理';
            window.location.href='http://47.110.134.247/group1/#/UserManagement';
            break;
          case '4-3':
            this.title='指标管理';
            window.location.href='http://47.110.134.247/group1/#/IndicatorManagement';
            break;
        }
      },





      getIEPTitle(title){
        this.title_name = title;
      },

    }
  }
</script>

<style scoped>
  .header{
    background: #f1f2f7;
    display: flex;
    align-items: center;
  }
  .header div{

    background: #f1f2f7;
    height: 80px;
    line-height: 80px;
  }

  .header .titles{

    font-size: 20px;
    font-weight:500;
    margin-left: 19px;
  }

  .header .logo  img{

    width: 209px;
    height: 40px;
    margin-top: 18px;
    margin-left: 20px;
  }

  .header .ipt{
    margin-left: 500px;
    position: relative;
    width: 343px;
  }
  .header .userinfo{
    margin-left: 160px;
  }
  .ipt .search {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .ipt .search img{
    width: 18px;
    height: 18px;
  }



  .con_section{
    position: absolute;
    top:0px;
    bottom:0px;
    left:0px;
    width:100%;
  }
  .header_style{
    height:60px;
    line-height: 60px;
    background-color: #f1f2f7;
  }
  .title_style{
    font-size: 20px;
    float:left;
    height:60px;
    margin: 0 20px;
    width: 300px;
  }

  .home_main{
    padding:10px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    margin-outside: 0px;
    margin: 0px;
  }
</style>
