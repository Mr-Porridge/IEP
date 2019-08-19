<template>
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
						<span class="userName">你好，sysUserName</span>
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
</template>

<script>
  export default {
    name: 'public_head'
  }
</script>

<style scoped>
  .con_section{
    position: absolute;
    top:0px;
    bottom:0px;
    left:0px;
    width:100%;
  }
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
</style>
