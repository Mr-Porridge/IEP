<template>
  <!--<div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-input
      type="text"
      placeholder="空"
      v-model="text"
      maxlength="3"
      show-word-limit
      class="input-num"
    ></el-input>
  </div>-->
  <div>
    <el-row v-for="i in 4" :key=i>
      <el-input
        v-for="j in Math.pow(2,i-1)"
        :key=i*10+j
        type="text"
        placeholder="空"
        v-model="text"
        maxlength="3"
        show-word-limit
        class="input-num"
        :style="padding(i)"
      ></el-input>
    </el-row>
    <!--<el-row id="2">
      <el-input
        type="text"
        placeholder="空"
        v-model="text"
        maxlength="3"
        show-word-limit
        class="input-num"
        :style="paddingLeft(id)"
      ></el-input>
      <el-input
        type="text"
        placeholder="空"
        v-model="text"
        maxlength="3"
        show-word-limit
        class="input-num"
        :style="paddingLeft(id)"
      ></el-input>
    </el-row>-->

  </div>
</template>

<script>/* eslint-disable */
import {stringify} from "qs";

export default {
  data() {
    return {
      mykey: 0,
      inputNum: '',
      text: '',
      rowNum: [1, 2, 3, 4, 5]
    }
  },

  components: {},
  methods: {
    /*getSession() {
      if (window.sessionStorage["searchIndex"]) {
        console.log(JSON.parse(window.sessionStorage.getItem("searchIndex")))
      }
    },*/
    /**
     * 检查学校id 以区分新建和修改
     * */
    /*checkExisted() {
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
    },*/

    padding(num) {
      console.log(num);
      return {
        marginLeft: String((1260 / num - 81) / 2) + 'px ',
        marginRight: String((1260 / num - 81) / 2) + 'px '
      }
    },
  },

}

</script>

<style>
  .input-num {
    /*width: 80px;*/
    width: 80px;
  }

  .el-row {
    margin-bottom: 20px;
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
`
