<template>
  <div>

    <el-container style="margin-outside: 0">
      <el-aside width="200px">
        <side-bar-router></side-bar-router>
      </el-aside>

      <el-main class="el-main">
        <el-container style="margin: 0">
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
                    <el-form-item label="选择关联项" :label-width="formLabelWidth">
                      <el-cascader
                        :options="data"
                        v-model="selectedOptions2"
                        :props="props"
                        @change="handleChange">
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

                <el-button type="primary" @click="saveSchoolData()">保存</el-button>
                <el-button type="primary" @click="testEmpty">test-输入非空</el-button>
                <el-main>
                  <el-button @click="getCheckedNodes">输出所有选中的结点</el-button><!---->
                  <el-button @click="getCheckedKeys">输出所有选中的Key</el-button>
                  <el-button @click="setCheckedNodes">套餐一</el-button><!--通过 node 设置-->
                  <el-button @click="setCheckedKeys">套餐二</el-button><!--通过 key 设置-->
                  <el-button @click="resetChecked">清空所选项</el-button>
                  <el-button @click="showList">输出List1&2</el-button>
                </el-main>
                <el-main>

                </el-main>
              </div>
              <!--<div class="block">
                <p>使用 scoped slot</p>
                <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"

                  :expand-on-click-node="false">
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span>
        <el-button
          type="text"
          size="mini"
          @click="() => append(data)">
          Append
        </el-button>
        <el-button
          type="text"
          size="mini"
          @click="() => remove(node, data)">
          Delete
        </el-button>
      </span>
    </span>
                </el-tree>
              </div>-->
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
let id = 61//这里的id改成表里最大id

export default {
  data () {
    /*const data = [
      {
        id: 1,
        label: '医学诊断',
        children: [
          {
            id: 4,
            label: '智力障碍',
          },
          {
            id: 5,
            label: '肢体障碍',
          },
          {
            id: 6,
            label: '视力障碍',
            children: []
          },
          {
            id: 7,
            label: '听力障碍',
            children: []
          },
          {
            id: 8,
            label: '语言障碍',
            children: []
          },
          {
            id: 9,
            label: '精神障碍',
            children: [
              {
                id: 18,
                label: '自闭症',
                children: []
              },
              {
                id: 19,
                label: '注意力多动症',
                children: []
              }
            ]
          },
          {
            id: 10,
            label: '多重障碍',
            children: []
          },
          {
            id: 11,
            label: '其他障碍',
            children: [
              {
                id: 20,
                label: '阿斯伯格',
                children: []
              },
              {
                id: 21,
                label: '高功能自闭症',
                children: []
              }
            ]
          },]
      },
      {
        id: 2,
        label: '家庭基础信息（家长自评）',
        children: [
          {
            id: 12,
            label: '生态评估',
            children: [
              {
                id: 22,
                label: '基础信息',
                children: [
                  {
                    id: 30,
                    label: '家庭构成',
                    children: [
                      {
                        id: 51,
                        label: '家庭成员',
                        children: []
                      },
                      {
                        id: 52,
                        label: '主要照顾者',
                        children: []
                      },
                      {
                        id: 53,
                        label: '家庭关系',
                        children: []
                      },
                      {
                        id: 54,
                        label: '家庭氛围',
                        children: []
                      },
                      {
                        id: 55,
                        label: '父母管教方式',
                        children: []
                      },
                      {
                        id: 56,
                        label: '经济状况',
                        children: []
                      },
                      {
                        id: 57,
                        label: '户籍地址',
                        children: []
                      },
                      {
                        id: 58,
                        label: '居住地址',
                        children: []
                      },
                    ]
                  },
                  {
                    id: 31,
                    label: '母亲生孕史',
                    children: []
                  },
                  {
                    id: 32,
                    label: '儿童生长发育史',
                    children: []
                  },
                  {
                    id: 33,
                    label: '就医治疗史',
                    children: []
                  },
                ]
              },
              {
                id: 23,
                label: '兴趣偏好',
                children: []
              },
              {
                id: 24,
                label: '能力现状',
                children: [
                  {
                    id: 34,
                    label: '认知',
                    children: []
                  },
                  {
                    id: 35,
                    label: '沟通',
                    children: []
                  },
                  {
                    id: 36,
                    label: '学业',
                    children: []
                  },
                  {
                    id: 37,
                    label: '生活自理',
                    children: []
                  },
                  {
                    id: 38,
                    label: '社会化能力',
                    children: []
                  },
                  {
                    id: 39,
                    label: '动作发展',
                    children: [
                      {
                        id: 59,
                        label: '粗大动作',
                        children: []
                      },
                      {
                        id: 60,
                        label: '精细动作',
                        children: []
                      },
                    ]
                  },
                  {
                    id: 40,
                    label: '其他能力',
                    children: []
                  },
                ]
              },
              {
                id: 25,
                label: '健康状况',
                children: [
                  {
                    id: 41,
                    label: '基础信息',
                    children: []
                  },
                  {
                    id: 42,
                    label: '视觉情况',
                    children: []
                  },
                  {
                    id: 43,
                    label: '听觉情况',
                    children: []
                  },
                  {
                    id: 44,
                    label: '肢体状况',
                    children: []
                  },
                  {
                    id: 45,
                    label: '语言状况',
                    children: []
                  },
                  {
                    id: 46,
                    label: '服药情况',
                    children: []
                  },
                ]
              },
              {
                id: 26,
                label: '支持系统',
                children: [
                  {
                    id: 47,
                    label: '社区服务',
                    children: []
                  },
                  {
                    id: 48,
                    label: '家庭支持',
                    children: []
                  },
                  {
                    id: 49,
                    label: '辅助支持',
                    children: []
                  },
                  {
                    id: 50,
                    label: '其它',
                    children: []
                  },
                ]
              }
            ]
          },
          {
            id: 13,
            label: '社会适应能力情况'
          },
          {
            id: 14,
            label: '家长养育态度',
            children: []
          },
          {
            id: 15,
            label: '感觉统合',
            children: []
          }]
      },
      {
        id: 3,
        label: '专项评估',
        children: [
          {
            id: 16,
            label: '初筛评估',
            children: [
              {
                id: 27,
                label: '发展性评估',
                children: []
              },
              {
                id: 28,
                label: '智力评估',
                children: []
              },
              {
                id: 29,
                label: '其他',
                children: []
              },
            ]
          },
          {
            id: 17,
            label: '子主题'
          }]
      }]*/
    const data=[]
    this.getSchoolData()
    return {

      list1: [
        {
          id: 1,
          label: '医学诊断',
          children: [2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
          id: 2,
          label: '智力障碍',
          children: []
        },
        {
          id: 3,
          label: '肢体障碍',
          children: []
        },
        {
          id: 4,
          label: '视力障碍',
          children: []
        },
        {
          id: 5,
          label: '听力障碍',
          children: []
        },
        {
          id: 6,
          label: '语言障碍',
          children: []
        },
        {
          id: 7,
          label: '精神障碍',
          children: [10, 11]
        },
        {
          id: 8,
          label: '多重障碍',
          children: []
        },
        {
          id: 9,
          label: '其他障碍',
          children: [12, 13]
        },
        {
          id: 10,
          label: '自闭症',
          children: []
        }
        ,
        {
          id: 11,
          label: '注意力多动症',
          children: []
        },
        {
          id: 12,
          label: '阿斯伯格',
          children: []
        }
        ,
        {
          id: 13,
          label: '高功能自闭症',
          children: []
        },
      ],
      list2: [],
      selectedOptions2: [],//默认选择
      //设置别名
      defaultProps: {
        children: 'children',
        label: 'label'
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
            nodes.push({id: node.id,label: node.describeDataForm,children: this.DFSNode(node.childrenID, data, stack, node.childrenID.length)})
          else
            nodes.push({id: node.id,label: node.describeDataForm})
        }
      }
      return nodes;
    },
    getSchoolData() {
      const data_1 = [1, 2, 3]
      const stack = []
      const url = 'http://localhost:8080/schoolStandardDataForm/toSuperDataFormPage'
      axios.get(url).then((response) => {
        this.data = this.DFSNode(data_1, response.data, stack, data_1.length)
      })
    },
    DFStoArray(){
      const dataArray=[]
      const childrenStack=[]
      const chosenList = this.$refs.tree.getCheckedNodes
      for(let i=0;i<chosenList.length;++i){
        const data=chosenList[i]
        childrenStack.unshift(data)
      }
      while(childrenStack.length>0){
        const index=childrenStack.pop()
        const newChild = { id: index.id, describeDataForm: index.label, childrenID:[] ,showType:"",relevanceID:[]}
        if (index.children) {
          while (index.children.length>0) {
            const node=index.children.shift()
            newChild.childrenID.push(node.id)
            childrenStack.unshift(node)
          }
        }
        dataArray.push(newChild)
      }
      console.log(dataArray)
      return dataArray
    },
    toDataArray(){
      const dataArrays=this.DFStoArray()
      console.log("这是dataArrays")
      console.log(dataArrays)
    },
    saveSchoolData () {
      const dataArrays=this.DFStoArray()
      axios({
        method: 'post',
        url: 'http://localhost:8080/schoolStandardDataForm/createSchoolDataForm',
        data: this.DFStoArray(),
      })/*.then((response) => {
        const describeDataForm = response.data[0].describeDataForm
        const optionsDataForm = response.data[0].optionsDataForm
        for (var i = 0; i < describeDataForm.length; ++i) {
          const dataFrom = {key: i + 1, label: describeDataForm[i], alternatives: optionsDataForm[i]}
          console.log(dataFrom)
          console.log('这里是post！结束')
          index.push(dataFrom)
        }
      })*/
    },
    showList(){
      this.saveSchoolData()
    },
    append1 (data) {
      this.dialogFormVisible = true
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(this.getData())
    },

    append (data) {
      console.log(data)
      console.log()
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(this.getData())
      this.newChild.id=this.newChild.label=this.newChild.options = ''
    },

    getData(){
      //判断输入是否为空
      if(this.newChild.label == null || this.newChild.options == null){
        this.$alert("输入不可以为空！")
      }
      else{
        return  {id: id++, label: this.newChild.label, dataOptions: this.newChild.options.split('；'), children: [], relevanceID: this.newChild.relevanceID}
      }
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
      console.log(this.$refs.tree.getCheckedNodes());

    },
    getCheckedKeys() {

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
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3,7,14,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    handleChange(value) {
      console.log(value);
      this.newChild.relevanceID = value
    },
    saveList(){
      console.log(this.$refs.tree.getCheckedKeys());
    },

    testEmpty(){
      //判断输入是否为空
      if(!this.newChild.options && !this.newChild.label){
        this.$alert("指标描述和选项均不可为空！")
        //两个都为空时
        return //打断判断
      }
      if(!this.newChild.label){
        this.$alert("指标描述不可为空！")
      }
      if(!this.newChild.options){
        this.$alert("指标选项不可为空！")
      }
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
        <span>{node.label}</span>
        <span>
        <el-button size="mini" type="text" on-click={ () => this.append1(data) }>实验</el-button>
      <el-button size="mini" type="text" on-click={ () => this.append(data,this.getData()) }>添加</el-button>
      <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
      <el-button size="mini" type="text" on-click={ () => this.recover(data) }>恢复</el-button>
      </span>
      </span>);
    }
  }
}
</script>

<!--<script>/* eslint-disable */
import sideBarRouter from '@/components/sideBar/index'
import axios from 'axios/index'
import qs from 'qs'

export default {
  data () {
    const index = [
      {
        id: 1,
        showType: "",
        describeDataForm: "医学诊断",
        parentID: 0,
        optionsDataForm: [
          "智力障碍",
          "肢体障碍",
          "视力障碍",
          "听力障碍",
          "语言障碍",
          "精神障碍",
          "多重障碍",
          "其他障碍"
        ]
      },
      {
        id: 2,
        showType: "",
        describeDataForm: "家庭基础信息（家长自评）",
        parentID: 0,
        optionsDataForm: [
          "生态评估",
          "社会适应能力（实际年龄以下不达标项目全部显示）",
          "家长教育态度",
          "感觉统合（根据年龄12岁以下儿童需填写）"
        ]
      },
      {
        id: 3,
        showType: "",
        describeDataForm: "专项评估",
        parentID: 0,
        optionsDataForm: [
          "初筛评估",
          "自主题"]
      },
      {
        id: 4,
        showType: "",
        describeDataForm: "智力障碍",
        parentID: 1,
        optionsDataForm: []
      },
      {
        id: 5,
        showType: "",
        describeDataForm: "肢体障碍",
        parentID: 1,
        optionsDataForm: [
          "肢体状况",
          "动作发展"
        ]
      },
      {
        id: 6,
        showType: "",
        describeDataForm: "视力障碍",
        parentID: 1,
        optionsDataForm: [
          "视觉情况"
        ]
      },
      {
        id: 7,
        showType: "",
        describeDataForm: "听力障碍",
        parentID: 1,
        optionsDataForm: [
          "听觉情况"]
      },
      {
        id: 8,
        showType: "",
        describeDataForm: "语言障碍",
        parentID: 1,
        optionsDataForm: [
          "沟通",
          "语言状况"]
      },
      {
        id: 9,
        showType: "",
        describeDataForm: "精神障碍",
        parentID: 1,
        optionsDataForm: [
          "自闭症",
          "注意力多动症"]
      },
      {
        id: 10,
        showType: "",
        describeDataForm: "多重障碍",
        parentID: 1,
        optionsDataForm: [
        ]
      },
      {
        id: 11,
        showType: "",
        describeDataForm: "其他障碍",
        parentID: 1,
        optionsDataForm: [
          "阿斯伯格",
          "高功能自闭症"]
      },
      {
        id: 12,
        showType: "",
        describeDataForm: "生态评估",
        parentID: 2,
        optionsDataForm: [
          "基础信息",
          "兴趣偏好",
          "能力现状",
          "健康状况",
          "支持系统"]
      },
      {
        id: 13,
        showType: "",
        describeDataForm: "社会适应能力情况",
        parentID: 2,
        optionsDataForm: []
      },
      {
        id: 14,
        showType: "",
        describeDataForm: "家长养育态度",
        parentID: 2,
        optionsDataForm: []
      },
      {
        id: 15,
        showType: "",
        describeDataForm: "感觉统合",
        parentID: 2,
        optionsDataForm: []
      },
      {
        id: 16,
        showType: "",
        describeDataForm: "初筛评估",
        parentID: 3,
        optionsDataForm: [
          "发展性评估",
          "智力评估",
          "其他",
          "子主题"
        ]
      },
      {
        id: 17,
        showType: "",
        describeDataForm: "子主题",
        parentID: 3,
        optionsDataForm: []
      },
      {
        id: 18,
        showType: "",
        describeDataForm: "基础信息",
        parentID: 12,
        optionsDataForm: ["家庭构成","母亲生孕史","儿童生长发育史","就医治疗史"]
      },
      {
        id: 19,
        showType: "",
        describeDataForm: "兴趣偏好",
        parentID: 12,
        optionsDataForm: ["心理评估"]
      },
      {
        id: 20,
        showType: "",
        describeDataForm: "能力现状",
        parentID: 12,
        optionsDataForm: ["认知","沟通","学业","生活自理","社会化能力","动作发展","其他能力"]
      },
      {
        id: 21,
        showType: "",
        describeDataForm: "健康状况",
        parentID: 12,
        optionsDataForm: ["基础信息","视觉情乱","听觉情况","肢体状况","语言状况","服药情况"]
      },
      {
        id: 22,
        showType: "",
        describeDataForm: "支持系统",
        parentID: 12,
        optionsDataForm: ["社区服务","家庭支持","辅县支持","其他"]
      }]

    return {
      //index数组用来存放从后端获取的数据
      index,
      schoolList:[],//用于存放学校自定义的指标表单 根据newKey排序
      tempList:[],//用于展示删除的自定义指标
      id: "",
      showType: "",
      describeDataForm: "",
      parentID: "",
      optionsDataForm: [],
      disabled:false,
      showKey:true,
      value: [1],
      value4: [],//最初显示在右侧穿梭框里的内容
    }
  },
  //加载vue组件
  components: {sideBarRouter},

  methods: {
    add () {
      const newIndex = {
        key: this.key,
        label: this.label,
        alternatives: this.alternatives.split('；'),
        disabled:this.disabled
        //用split函数将输入的指标选项切分成数组（为了和数据库里的数据类型保持一致）
      }
      this.index.push(newIndex)//将新添加指标加入到用于穿梭框显示的index数组中
      this.value4.push(this.key)//使新添加的指标直接显示在右侧穿梭框
      this.schoolList.push(newIndex)//将新添加的指标加入到学校自定义指标数组
      console.log(this.schoolList)
      this.label = this.alternatives = ''//清空输入框
      this.key++//添加时不用自行输入key值
    },

    jump(){
      this.$router.push({path:'/show_list'})
    },
    saveToMySQL(){
      const desDF=[]
      const optDF=[]
      for(var j=0;j<this.schoolList.length;++j){
        desDF.push(this.schoolList[j].label)
        optDF.push(this.schoolList[j].alternatives)
      }
      axios({
        method:'post',
        url:'http://localhost:8080/schoolStandardDataForm/createSchoolDataForm',
        data:{'describeDataForm':desDF,'optionsDataForm':optDF},
      }).then((response)=>{
        this.jump()
        alert('提交成功！')
      })
    }
  }
}
</script>-->

<style>
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
    margin-outside: 0px;
    margin: 0px;

  }

  .body {
    margin: 0;
  }
</style>
