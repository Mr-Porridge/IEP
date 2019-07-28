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
        <el-menu
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
              <!--<i class="el-icon-location"></i>-->
              <span>基础资料</span>
            </template>
            <el-menu-item-group>
              <!--<template slot="title">基础资料</template>-->
              <el-menu-item index="1-1" route="/data">评估指标制定</el-menu-item>
              <!--<el-menu-item index="1-2">功能评量</el-menu-item>
              <el-menu-item index="1-3">体检记录</el-menu-item>-->
            </el-menu-item-group>
            <!--          <el-menu-item-group title="目标拟定">
                        <el-menu-item index="2-1">长短期目标</el-menu-item>
                        <el-menu-item index="2-2">iep会议</el-menu-item>
                      </el-menu-item-group>-->
            <el-submenu index="1-4">
              <template slot="title">课程评量</template>
              <el-menu-item index="1-4-1" route="/school_tables">学生课表查询</el-menu-item>
              <el-menu-item index="1-4-2" route="/creat_school_tables">学生课表制定</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <!--<i class="el-icon-location"></i>-->
              <span>目标拟定</span>
            </template>
            <el-menu-item-group>
              <!--<template slot="title">基础资料</template>-->
              <el-menu-item index="2-1" route="/to_be_developed">个人目标</el-menu-item>
              <el-menu-item index="2-2" route="/to_be_developed">长短期目标</el-menu-item>
              <el-menu-item index="2-3" route="/to_be_developed">班级目标</el-menu-item>
              <el-menu-item index="2-4" route="/to_be_developed">iep会议</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <!--<i class="el-icon-location"></i>-->
              <span>综合评量</span>
            </template>
            <el-menu-item-group>
              <!--<template slot="title">基础资料</template>-->
              <el-menu-item index="3-1" route="/to_be_developed">短期目标评量</el-menu-item>
              <el-menu-item index="3-2" route="/to_be_developed">定期评估分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>/* eslint-disable */
export default {
  data () {
    return {
      open_list: ['1', '2', '3', '1-4'],
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
