<template>
  <div>
    <el-container>

      <el-aside width="211px">
        <side-bar-router></side-bar-router>
      </el-aside>
      <el-main class="el-main">
        <el-container>
          <!--<el-header style="text-align: center">指标选择</el-header>--><!--header需要的时候可以添加-->
          <template>
            <div class="custom-tree-node">
              <div class="block">
                <!--<p>使用 render-content</p>-->
                <!--accordion 为手风琴模式-->
                <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2]"
                  :expand-on-click-node="false"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  :render-content="renderContent">
                </el-tree>
                <div class="add">
                  <el-button type="text" @click="addDisplay()">先在下方输入，再在上方需要的地方点击添加</el-button>
                  <el-form v-model="newChild" v-if="addDisplayFlag">
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
                    <el-button type="success" @click="confirmAdd()">确定</el-button>
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

import axios from 'axios/index'

/*import Mock from 'mockjs'*/
let id //这里的id改成表里最大id
let nodeData
export default {
  data () {
    this.getSchoolData()
    return {
      timeOut :-1,//setTimeOut函数是一个number返回值
      dataSaver:{},
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
      formLabelWidth: '120px',
      newChild:{
        id: '',
        label: '',
        options: '',
        relevanceID: [],
      },
      data: [],
      addDisplayFlag:false,

    }

  },
  components: {ElSelectDropdown, sideBarRouter},
  methods: {

    /*迭代查找children对应的结点*/
    /**
     * @return {null}
     */
    Iteration(children){
      for(let i=0;i<nodeData.length;++i){
        if (nodeData[i].id===children){
          return nodeData.splice(i, 1).pop();
        }
      }
      return null;
    },

    DFSNode (childrenId) {
      const nodes = []//[{},{},{}]
      for (let i = 0; i < childrenId.length; ++i) {
        /*查找childrenID对应的结点*/
        const node=this.Iteration(childrenId[i]);
        /*如果该childrenID对应的结点不存在，则跳过该结点*/
        if(node!=null){
          if(node.childrenID.length>0)
            nodes.push({id: node.id,label: node.describeDataForm,relevanceID:node.relevanceID,children: this.DFSNode(node.childrenID)})
          else
            nodes.push({id: node.id,label: node.describeDataForm,relevanceID:node.relevanceID})
        }
      }
      return nodes;
    },
    /*
        oldDFSNode (data_1, data, len) {
          const nodes = []//[{},{},{}]
          for (let i = 0; i < len; ++i) {
            if (data.length >= data_1[i] && data[data_1[i] - 1].id == data_1[i]) {
              const node = data[data_1[i] - 1]
              if(node.childrenID.length>0)
                nodes.push({id: node.id,label: node.describeDataForm,relevanceID:node.relevanceID,children: this.oldDFSNode(node.childrenID, data,  node.childrenID.length)})
              else
                nodes.push({id: node.id,label: node.describeDataForm})
            }
          }
          return nodes;
        },
    */
    /**
     * 从数据库中获取数据
     * */
    getSchoolData() {
      const nodes=[];
      const url = 'http://47.110.134.247/group2_b/schoolStandardDataForm/toSuperDataFormPage'
      axios.get(url).then((response) => {
        /*为全部变量赋值，值为后端返回的数据*/
        nodeData=response.data.data
        /*设置添加时，新结点的起始id*/
        id=nodeData[nodeData.length-1].id+1
        /*
        * 将childrenID列表转换为childrenNode列表
        * 每完全转换一个结点，就将该结点从全局nodeData中删除
        * 直到nodeData中结点全部删除完，则表明数据全部转换完
        * 新转换完成的树，存放于nodes中
        * */
        while (nodeData.length>0){
          const childrenId = [nodeData[0].id]
          /*console.log(childrenId)*/
          nodes.push(this.DFSNode(childrenId).pop())
          /*console.log(nodeData)*/
        }
        this.data=nodes
      })
    },

    /**
     * 将指标由childrenNode列表转换为childrenID列表，存入数据库中
     * */
    DFStoArray(){
      const chosenList = this.$refs.tree.getCheckedNodes()
      const dataArray=[]
      for(let i=0;i<chosenList.length;++i){
        const data=chosenList[i]
        const newChild = { id: data.id, describeDataForm: data.label, childrenID:[] ,showType:"",relevanceID:[]}
        if (data.children && data.children.length>0) {
          /*将childrenNode替换为childrenID*/
          for(let j=0;j<data.children.length;++j){
            newChild.childrenID.push(data.children[j].id)
          }
        }
        /*如果指标关联不存在，则置为[]*/
        if(data.relevanceID===undefined || data.relevanceID===null){
          data.relevanceID=[]
        }
        newChild.relevanceID=data.relevanceID
        dataArray.push(newChild)
      }
      return dataArray
    },
    /**
     * 保存指标
     * */
    saveSchoolData () {
      if(this.$refs.tree.getCheckedNodes().length<=0){
        alert("请确保您的指标不为空");
        return ;
      }
      axios({
        method: 'post',
        url: 'http://47.110.134.247/group2_b/schoolStandardDataForm/createSchoolDataForm',
        data: this.DFStoArray(),
      }).then((response) => {
        /*成功提醒*/
        alert('指标创建'+response.data.message);
      }).catch(function (result) {
          /*异常提醒*/
          alert(result.response.data.message)
        }
      )
    },

    append (data) {
      this.dataSaver = data
      let _this = this //两种方法在setTimeOut中调用vue函数
      const newChild=this.newChild
      console.log("Hello world!")
      console.log(data)
      console.log("Hello world!")
      this.addDisplayFlag = !this.addDisplayFlag

      function testEmpty() {
        //判断输入是否为空
        if (!newChild.options && !newChild.label) {
          alert("指标描述和选项均不可为空！")
          //两个都为空时
          return true//打断判断和添加
        }
        if (!newChild.label) {
          alert("指标描述不可为空！")
          return true//打断添加
        }
        if (!newChild.options) {
          alert("指标选项不可为空！")
          return true//打断添加
        }
        return false
      }

      /**
       * 由于关联指标时，value为二维数组，需要取得其中有价值的relevanceID
       * */
      function converterRelevanceID(){
        let relevanceID=newChild.relevanceID
        newChild.relevanceID=[]
        relevanceID.forEach(relevance=>{
          newChild.relevanceID.push(relevance.pop())
        })
      }

      function add(){
        if(testEmpty()){
          return
        }
        if (!data.children) {
          data.children = []
          /*this.$set(data, 'children', [])*/
        }
        converterRelevanceID()
        console.log(newChild.relevanceID)
        data.children.push(_this.getData())
        newChild.id=newChild.label=newChild.options = ''
      }

      if(this.addDisplayFlag===true){
        _this.timeOut = setTimeout(function(){
          add(data)
        }, 9000 )
      }
      else{
        clearTimeout(_this.timeOut)
        add(data)
      }

    },
  /*  myWindows(data){
      this.addDisplayFlag = !this.addDisplayFlag
      while (time!==0){
        this.append(data)
      }
    },
    mySave(time1){
      time=time1
    },*/


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
    /**
     * 关联指标
     * */
    handleChange(value) {
      this.newChild.relevanceID=value
    },


    addDisplay(){
      this.addDisplayFlag = !this.addDisplayFlag
    },

    confirmAdd(){
      clearTimeout(this.timeOut)
      console.log("confirm stage" +this.dataSaver)
      this.append(this.dataSaver)
    },


    /*<el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>*/
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
        <span>{node.label}</span>
        <span>
        <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
        <el-button size="mini" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
      </span>
      </span>);
    }
  }
}
</script>
<style>
  /*去掉整个页面的边框*/
 /* *{
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
    margin: 0;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* padding: 0;*/
  }
</style>
