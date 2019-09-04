<template>
  <div>
    <el-container style="position: absolute;top:0;bottom:0;left:0;width:100%;" direction="vertical">
      <el-header style=" height: 82px;   background: #f1f2f7;">
         <head-bar-router></head-bar-router>
      </el-header>
    <el-container>
      <el-aside width="211px">
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
                <!--:default-expanded-keys="[2]"-->
                <!--check-strictly  父子完全不相连-->
                <el-tree
                  :default-checked-keys="checked"
                  :data="data"
                  show-checkbox
                  node-key="targetId"
                  accordion
                  :expand-on-click-node="false"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  @change="handleCheckChange"
                  :render-content="renderContent">
                </el-tree>
                <div class="add">
                  <el-form v-model="newChild">
                    <el-form-item>
                      <el-button type="text" @click.prevent class="textButton">先在下方输入，再在上方需要的地方点击添加</el-button>
                    </el-form-item>
                    <el-form-item label="指标关联" :label-width="formLabelWidth" style="margin-left: 0">
                      <el-cascader
                        size="medium"
                        :options="data"
                        v-model="selectedOptions2"
                        :props="props"
                        @change="handleChange"
                        class="cas">
                      </el-cascader>
                    </el-form-item>
                    <el-form-item label="指标描述" :label-width="formLabelWidth" style="margin-left: 0">
                      <el-input v-model="newChild.targetDescription" placeholder="请输入指标"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="指标选项"  :label-width="formLabelWidth">
                      <el-input v-model="newChild.options" placeholder="请用分号间隔"></el-input>
                    </el-form-item>-->
                    <el-form-item>
                      <el-button type="primary" @click="editSchoolData" class="textButton" v-if="schoolExisted===true">修改</el-button>
                      <el-button type="primary" @click="createSchoolData" class="textButton" v-if="schoolExisted===false">新建</el-button>
                      <el-button type="danger" @click.prevent class="textButton" v-if="schoolExisted===null">请联系管理员！</el-button>
                      <el-button @click="resetChecked">清空所选项</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <el-main>
                  <!--debug用-->
                  <!--<el-button @click="getCheckedNodes(leafOnly=true)">输出所有选中的结点</el-button>-->
                  <!--<el-button @click="getCheckedKeys">输出所有选中的Key</el-button>-->
                  <!--<el-button @click="packageOne">套餐一</el-button>&lt;!&ndash;通过 node 设置&ndash;&gt;
                  <el-button @click="packageTwo">套餐二</el-button>&lt;!&ndash;通过 key 设置&ndash;&gt;-->
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
    </el-container>
  </div>
</template>
<script>/* eslint-disable */
import sideBarRouter from '@/components/sideBar/index'
import headBarRouter from '@/components/head/index'
import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown'
import axios from 'axios/index'
import qs from 'qs'
import Mock from 'mockjs'
let id //这里的id改成表里最大id
let nodeData = []
export default {
  data () {
    this.getSchoolData()
    return {
      selectedOptions2: [],//默认选择
      //设置别名
      defaultProps: {
        children: 'targetChildren',
        label: 'targetDescription',
      },
      props: {
        value: 'targetId',
        label: 'targetDescription',
        children: 'targetChildren',
        multiple: true,
        checkStrictly:true,
      },
      dialogFormVisible: false,
      newChild: {
        targetId:-1,
        targetDescription:'',
        targetShowType:'',
        targetChildren:[],
        targetRelevance:[],
        targetStatus:-1,
        targetOrigin:-1
      },
      formLabelWidth: '120px',
      labelPosition:'left',
      data: [],

      //学校是否已经有一张表
      schoolExisted: null,

      //data 更新：可修改
      checked:[],
      selfCreat:[],
      editFlag:true,
      intervalId:0,
      currentChecked:{},
    }

  },
  components: {ElSelectDropdown, sideBarRouter, headBarRouter},
  methods: {

    /*迭代查找children对应的结点*/
    /**
     * @return {null}
     */
    Iteration(children){
      for(let i=0;i<nodeData.length;++i){
        if (nodeData[i].targetId === children) {
          let node = nodeData.splice(i, 1).pop()
          return node
        }
      }
      return null
    },

    DFSNode (childrenId) {
      const nodes = []//[{},{},{}]
      for (let i = 0; i < childrenId.length; ++i) {
        /*查找childrenID对应的结点*/
        const node=this.Iteration(childrenId[i]);
        /*如果该childrenID对应的结点不存在，则跳过该结点*/
        if(node!=null){
          if(node.targetStatus===1){
            this.checked.push(node.targetId)
            //console.log(this.checked)
          }
          if(node.targetChildren.length>0){
            nodes.push({
              targetId: node.targetId,
              targetDescription: node.targetDescription,
              targetRelevance:node.targetRelevance,
              targetOrigin: node.targetOrigin,
              targetStatus: node.targetStatus,
              targetChildren: this.DFSNode(node.targetChildren)})
          }

          else
            nodes.push({
              targetId: node.targetId,
              targetDescription: node.targetDescription,
              targetRelevance:node.targetRelevance,
              targetOrigin: node.targetOrigin,
              targetStatus: node.targetStatus,})
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
      console.log()
      const nodes=[];
      const url = 'http://47.110.134.247/group2_b/schoolStandardDataForm/getData'
      //const url= 'http://er58rm.natappfree.cc/schoolStandardDataForm/getData'
      axios.post(url,qs.stringify())
      /*axios({
        method: 'post',
        url: 'http://er58rm.natappfree.cc/schoolStandardDataForm/getData',
        //url: 'http://datamock.com',
        data: {
          'schoolId' : 1,
        },
      })*/.then((response) => {
        /*为全部变量赋值，值为后端返回的数据*/
        nodeData=response.data.data.target
        //console.log(response.data.data.exist)
        this.schoolExisted = response.data.data.exist
        //console.log(this.schoolExisted)
        /*设置添加时，新结点的起始id*/
        id=nodeData[nodeData.length-1].targetId+1
        /*
        * 将childrenID列表转换为childrenNode列表
        * 每完全转换一个结点，就将该结点从全局nodeData中删除
        * 直到nodeData中结点全部删除完，则表明数据全部转换完
        * 新转换完成的树，存放于nodes中
        * */
        while (nodeData.length>0){
          const childrenId = [nodeData[0].targetId]
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
      var cnt = 0
      const chosenList = this.$refs.tree.getCheckedNodes()
      console.log(chosenList)
      const dataArray=[]
      for(let i=0;i<chosenList.length;++i){
        const data=chosenList[i]
        const newChild = {
          targetId: data.targetId,
          targetDescription: data.targetDescription,
          targetChildren:[] ,
          showType:"",
          targetRelevance:[],
          targetStatus:data.targetStatus,
          targetOrigin:data.targetOrigin,
        }
        if (data.targetChildren && data.targetChildren.length>0) {
          /*将childrenNode替换为childrenID*/
          for(let j=0;j<data.targetChildren.length;++j){
            newChild.targetChildren.push(data.targetChildren[j].targetId)
          }
        }
        /*如果指标关联不存在，则置为[]*/
        if(data.targetRelevance===undefined || data.targetRelevance===null){
          data.targetRelevance=[]
        }
        newChild.targetRelevance=data.targetRelevance
        //判断是否为新建指标
        if(newChild.targetStatus===2){
          cnt ++
          newChild.targetStatus = 1 //标记为已勾选
          this.selfCreat.push(newChild)
          console.log("i am in ",cnt)
        }
        else {
          //console.log(newChild.targetStatus)
          newChild.targetStatus = 1 //标记为已勾选
          dataArray.push(newChild)
        }

      }
      return dataArray
    },
    /**
     * 保存指标
     * */
    editSchoolData () {
      let edit =this.DFStoArray();
/*
      console.log("原来保存的内容",this.DFStoArray())
*/
      console.log("新建的内容",this.selfCreat)
      if(this.$refs.tree.getCheckedNodes().length<=0){
        alert("请确保您的指标不为空");
        return ;
      }
      var d= {
        'schoolId': 1,
          'updateTarget':edit,
          'addTarget':this.selfCreat
      }
      axios({
        method: 'post',
        url: 'http://47.103.77.143/group2_b/schoolStandardDataForm/updateSchoolDataForm',
        //url: 'http://er58rm.natappfree.cc/schoolStandardDataForm//updateSchoolDataForm',
        contentType: "application/json;charset=UTF-8",
        data: d
      }).then((response) => {
        if(response.status===4){
          alert('指标参数错误');
        }
        /*成功提醒*/
        alert('指标创建'+response.data.message);
      }).catch(function (result) {
          /*异常提醒*/
          alert(result.response.data.message)
        }
      )
    },

    createSchoolData () {
      var combined = this.DFStoArray().concat(this.selfCreat)
      console.log("原来保存的内容",this.DFStoArray())
      console.log("新建的内容",this.selfCreat)
      console.log("全部的内容",combined)
      if(this.$refs.tree.getCheckedNodes().length<=0){
        alert("请确保您选择的指标不为空");
        return ;
      }
      axios({
        method: 'post',
        url: 'http://47.103.77.143/group2_b/schoolStandardDataForm/createSchoolDataForm',
        //url: 'http://er58rm.natappfree.cc/schoolStandardDataForm/createSchoolDataForm',
        data: {
          "schoolId":1,
          "schoolData":combined,
        }
      }).then((response) => {
        if(response.status===4){
          alert('指标参数错误');
        }
        /*成功提醒*/
        alert('指标创建'+response.data.message);
      }).catch(function (result) {
          /*异常提醒*/
          alert(result.response.data.message)
        }
      )
    },



    append (node,data) {
      if(this.testEmpty()){
        return
      }
      if (!data.targetChildren) {
        this.$set(data, 'targetChildren', [])
      }
      this.converterRelevanceID()
      //console.log(this.newChild.relevanceID)
      data.targetChildren.push(this.getData())
      console.log(data.targetChildren)
      this.newChild.targetId=this.newChild.targetDescription= ''
      this.newChild.targetRelevance = []
      this.selectedOptions2 = []
    },
    getData(){
      return  {
        targetId: id++,
        targetDescription: this.newChild.targetDescription,
        //dataOptions: this.newChild.options.split('；'),
        targetRelevance: this.newChild.targetRelevance,
        targetStatus : 2,//0表示未选中    1为选中状态   2为新建指标且待定
        targetOrigin : 1, //1表示用户创建  0为超级管理员创建的元表指标选项
      }
    },
    remove (node, data) {
      /*console.log(node.parent)
      console.log(node.parent.data)
      console.log(node.parent.data.children)*/
      this.$set(data, 'disabled', true)
      this.$set(node, 'checked', false)
      //console.log(data)
      /*const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)*/
    },

    edit (node, data) {
      this.newChild.targetDescription = data.targetDescription
      this.selectedOptions2 = data.targetRelevance
      this.editFlag = false
    },

    editConfirm (node, data) {
      data.targetDescription = this.newChild.targetDescription
      data.targetRelevance = this.newChild.targetRelevance
      this.editFlag = true
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

    handleCheckChange(){
      console.log("Hi")
    },

    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    /**
     * 关联指标
     * */
    handleChange(value) {
      this.newChild.targetRelevance=value
    },
    /**
     * 由于关联指标时，value为二维数组，需要取得其中有价值的relevanceID
     * */
    converterRelevanceID(){
      let relevanceID=this.newChild.targetRelevance
      this.newChild.targetRelevance=[]
      relevanceID.forEach(relevance=>{
        this.newChild.targetRelevance.push(relevance.pop())
      })
    },
    testEmpty() {
      //判断输入是否为空
      if (!this.newChild.targetDescription) {
        this.$alert("指标不可为空！")
        return true
      }
      return false
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
        <span >{node.label}</span>

        <span>
        <el-button size="mini" type="text" on-click={ () => this.append(node,data) }>添加</el-button>
      <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
      <el-button size="mini" type="text" on-click={ () => this.edit(node, data) } >修改</el-button>
      <el-button size="mini" type="text" on-click={ () => this.editConfirm(node, data) } >确认修改</el-button>
      <el-button size="mini" type="text" on-click={ () => this.recover(data) }>恢复</el-button>
      </span>
      </span>);
    }
  },


}
</script>
<style>
  /*去掉整个页面的边框*/
  *{
    padding: 0;
    margin: 0;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px; /*字号*/
    padding-left:  0; /*左侧宽度*/
    padding-right: 30px; /*右侧宽度*/

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
    padding: 0;
  }
  .body {
    padding: 0;
    margin: 0;
  }
  .cas{
    margin-left: 0;
  }
  .textButton{
    margin-left: 50px;
  }


</style>
