<template>
  <div>

    <el-container style="margin-outside: 0">
      <el-aside width="200px">
        <side-bar-router></side-bar-router>
      </el-aside>

      <el-main class="el-main">
        <el-container>
          <el-header style="text-align: center">指标选择</el-header><!--header需要的时候可以添加-->
          <template>
            <div class="custom-tree-container">
              <div class="block">
                <!--<p>使用 render-content</p>-->
                <!--accordion 为手风琴模式-->
                <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2]"
                  accordion
                  :expand-on-click-node="false"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  :render-content="renderContent">
                </el-tree>

                <div class="add">
                  <el-button type="text" @click.prevent>先在下方输入，再在上方需要的地方点击添加</el-button>
                  <el-form v-model="newChild">
                    <el-form-item label="选择关联项" :label-width="formLabelWidth" style="left: auto">
                      <el-cascader
                        :options="data"
                        v-model="selectedOptions2"
                        :props="props"
                        @change="handleChange"
                        class="cas">
                      </el-cascader>
                    </el-form-item>
                    <el-form-item label="指标描述" :label-width="formLabelWidth">
                      <el-input v-model="newChild.label" placeholder="请输入指标"></el-input>
                    </el-form-item>

                    <el-form-item label="指标选项"  :label-width="formLabelWidth">
                      <el-input v-model="newChild.options" placeholder="请用分号间隔"></el-input>
                    </el-form-item>
                  </el-form>
                </div>

                <el-button type="primary" @click="saveSchoolData">保存</el-button>
                <el-main>
                  <!--debug用-->
                  <!--<el-button @click="getCheckedNodes(leafOnly=true)">输出所有选中的结点</el-button>-->
                  <!--<el-button @click="getCheckedKeys">输出所有选中的Key</el-button>-->
                  <el-button @click="packageOne">套餐一</el-button><!--通过 node 设置-->
                  <el-button @click="packageTwo">套餐二</el-button><!--通过 key 设置-->
                  <el-button @click="resetChecked">清空所选项</el-button>
                 <!-- <el-button @click="showList">输出List1&2</el-button>-->
                </el-main>
                <el-main>

                </el-main>
              </div>
            </div>
          </template>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>/* eslint-disable */
import sideBarRouter from '@/components/sideBar/index'
import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown'
import axios from 'axios'
/*import Mock from 'mockjs'*/
let id = 61//这里的id改成表里最大id

export default {
  data () {
    const data=[]
    this.getSchoolData()
    return {
      selectedOptions2: [],//默认选择
      //设置别名
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      props: {
        value: 'id',
        label: 'label',
        children: 'children',
        multiple: true,
        checkStrictly:true,

      },
      dialogFormVisible: false,
      newChild: {
        id: '',
        label: '',
        options: '',
        relevanceID: [],
      },
      formLabelWidth: '120px',
      data: JSON.parse(JSON.stringify(data))
    }
  },

  components: {ElSelectDropdown, sideBarRouter},
  methods: {
    DFSNode (data_1, data, stack, len) {
      const nodes = []//[{},{},{}]
      for (let i = 0; i < len; ++i) {
        if (data.length >= data_1[i] && data[data_1[i] - 1].id === data_1[i]) {
          const node = data[data_1[i] - 1]
          if(node.childrenID.length>0)
            nodes.push({id: node.id,label: node.describeDataForm,relevanceID:node.relevanceID,children: this.DFSNode(node.childrenID, data, stack, node.childrenID.length)})
          else
            nodes.push({id: node.id,label: node.describeDataForm})
        }
      }
      return nodes;
    },
    getSchoolData() {
      const data_1 = [1, 2, 3]
      const stack = []
      //开发测试版本
      //const url = 'http://localhost:8080/schoolStandardDataForm/toSuperDataFormPage'
      //服务器版本
      const url = 'http://47.110.134.247/group2_b/schoolStandardDataForm/toSuperDataFormPage'
      axios.get(url).then((response) => {
        this.data = this.DFSNode(data_1, response.data, stack, data_1.length)
      })
    },

    DFStoArray(){
      const chosenList = this.$refs.tree.getCheckedNodes()
      const dataArray=[]
      for(let i=0;i<chosenList.length;++i){
        const data=chosenList[i]
        const newChild = { id: data.id, describeDataForm: data.label, childrenID:[] ,showType:"",relevanceID:[]}
        if (data.children) {
          for(let j=0;j<data.children.length;++j){
            newChild.childrenID.push(data.children[j].id)
          }
        }
        data.relevanceID=[]
        newChild.relevanceID=data.relevanceID
        dataArray.push(newChild)
      }
      return dataArray
    },
    saveSchoolData () {
      axios({
        method: 'post',
        //开发测试版本
        //url: 'http://localhost:8080/schoolStandardDataForm/createSchoolDataForm',
        //服务器版本
        url:'http://47.110.134.247/group2_b/schoolStandardDataForm/createSchoolDataForm',

        data: this.DFStoArray(),
      })
      alert("保存成功！")
    },

    append (data) {
      if(this.testEmpty()){
        return
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(this.getData())
      this.newChild.id=this.newChild.label=this.newChild.options = ''
    },

    getData(){
      return  {id: id++, label: this.newChild.label, dataOptions: this.newChild.options.split('；'), children: [], relevanceID: this.newChild.relevanceID}
    },

    remove (node, data) {
      /*console.log(node.parent)
      console.log(node.parent.data)
      console.log(node.parent.data.children)*/
      this.$set(data, 'disabled', true)
      /*const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)*/
    },

    recover (data) {
      this.$set(data, 'disabled', false)
    },

    getCheckedNodes(leafOnly=true) {
      console.log("chosenList is:");
      console.log(this.$refs.tree.getCheckedNodes(leafOnly=true));

    },
    getCheckedKeys() {
      //bug：如果其孩子节点都被选择，则父亲节点也会被认为选择
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        /*label: '二级 2-1'*/
      }, {
        id: 9,
        /*label: '三级 1-1-1'*/
      }]);
    },

    packageOne() {
      this.$refs.tree.setCheckedKeys([4,7,22,25,26,13,14,16]);
    },

    packageTwo() {
      this.$refs.tree.setCheckedKeys([8,18,19,14,15,16]);
    },


    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    handleChange(value) {
      console.log(value);
      this.newChild.relevanceID = value
    },

    testEmpty() {
      //判断输入是否为空
      if (!this.newChild.options && !this.newChild.label) {
        this.$alert("指标描述和选项均不可为空！")
        //两个都为空时
        return true//打断判断和添加
      }
      if (!this.newChild.label) {
        this.$alert("指标描述不可为空！")
        return true//打断添加
      }
      if (!this.newChild.options) {
        this.$alert("指标选项不可为空！")
        return true//打断添加
      }
      return false
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
        <span>{node.label}</span>
        <span>
      <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
      <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
      <el-button size="mini" type="text" on-click={ () => this.recover(data) }>恢复</el-button>
      </span>
      </span>);
    }
  }
}
</script>

<style>
  /*
  去掉整个页面的边框

  *{
    padding: 0;
    margin: 0;
  }*/

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px; /*字号*/
    padding-right: 8px; /*右侧宽度*/
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    margin: 0px;
    text-align: center;
    line-height: 60px;
  }


  .el-main {
    background-color: #E9EEF3;
    color: #333;
   /* padding: 0;*/

  }

  .body {
    margin: 0;
  }

  .cas{

  }
</style>
