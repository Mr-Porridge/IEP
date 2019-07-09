<template>
  <div>
    <el-container class="body">
      <el-header style="height: 0">指标选择</el-header><!--header需要的时候可以添加-->
      <el-container>
        <!--<el-aside>
          <side-bar-router style="width: 200px"></side-bar-router>
        </el-aside>-->
        <side-bar-router style="width: 210px"></side-bar-router>
        <el-main>
          <template>
            <div class="el-main">
              <!--<h1 style="text-align: center;top: 0">请选择需要的指标添加到右侧</h1>
              <div style="text-align: center">
                <el-transfer
                  style="text-align: left; display: inline-block"
                  v-model="value4"
                  :key="key"
                  filterable
                  :titles="['基础指标', '我的指标']"
                  :button-texts="['取消选择', '选择指标']"
                  :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
                  @change="handleChange"
                  :data="index">
                  <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
                  <el-button class="transfer-footer" type="info" slot="left-footer" size="small">请不要修改管理员已定指标
                  </el-button>
                  <el-button class="transfer-footer" type="primary" slot="right-footer" size="small" @click="saveToMySQL;jump()">提交
                  </el-button>
                  &lt;!&ndash;<el-button class="transfer-footer" type="danger" slot="right-footer" size="small" v-model="del">删除</el-button>&ndash;&gt;
                </el-transfer>
              </div>
              <br>
              <el-container class="addDescription">
                <el-input v-model="key" placeholder="请输入key" style="width: 200px;" v-if="showKey"></el-input>
                <el-input v-model="label" placeholder="请输入指标描述" style="width: 500px;" @focus="getKey()"></el-input>
                <el-input v-model="alternatives" placeholder="请输入指标选项" style="width: 500px;"></el-input>
                <el-button type="primary" @click="add()">增加</el-button>
                <el-button type="primary" @click="showKeyFun()">Key输入框</el-button>
              </el-container>-->
              <h2 style="text-align: center;top: 0">学校指标清单</h2>
              <el-container>
                <!--用于显示tempList-->
                <el-table
                  border
                  :data="index"
                  style="width: 100%">
                  <el-table-column
                    prop="key"
                    label="序号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="label"
                    label="指标描述"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="alternatives"
                    label="指标选项">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-popover
                        placement="right"
                        width="20px"
                        trigger="click">
                        <el-table :data="gridData">
                          <el-table-column width="100" property="date" label="指标描述"></el-table-column>
                          <el-table-column width="200" property="name" label="指标选项"></el-table-column>
                        </el-table>
                        <el-button slot="reference" type="primary" size="small" @click="editRow(scope.row)">修改
                        </el-button>
                      </el-popover>
                      <!--<el-button @click="comeBack(scope.row)" type="primary" size="small">修改</el-button>-->
                    </template>
                  </el-table-column>
                </el-table>
              </el-container>
            </div>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>/* eslint-disable */
import sideBarRouter from '@/components/sideBar'
import axios from 'axios'
import qs from 'qs'

export default {
  data () {

    const index = []
    const count = []
    const url = 'http://localhost:8080/schoolStandardDataForm/toSchoolTable'
    axios.get(url).then((response) => {
      const describeDataForm = response.data[0].describeDataForm
      const optionsDataForm = response.data[0].optionsDataForm
      for (var i = 0; i < describeDataForm.length; ++i) {
        const dataFrom = {
          key: i + 1,
          label: describeDataForm[i],
          alternatives: optionsDataForm[i],
          newKey: 0,
          disabled: false
        }
        index.push(dataFrom)
      }
      count.push(i + 1)
      /*由于生命周期问题 count在获取数据前被创建 所以return中得不到index数组的长度*/
      /*通过数组传递获取到的index数组长度*/
    })
    return {
      //index数组用来存放从后端获取的数据
      index,
      schoolList: [],//用于存放学校自定义的指标表单 根据newKey排序
      tempList: [],//用于展示删除的自定义指标
      key: 0,//key值从后端获取时通过count拿到最大的key值并赋给它
      count,
      newKey: 0,//在schoolList里用于排列顺序
      label: '',//指标描述
      alternatives: '',//指标选项or内容
      disabled: false,
      showKey: true,
      value: [1],
      value4: [],//最初显示在右侧穿梭框里的内容
    }
  },
  //加载vue组件
  components: {sideBarRouter},

  methods: {
    handleChange (value, direction, movedKeys) {
      /*console.log(value, direction, movedKeys) 可以使用的三个变量 value为右边框中所有key值的数组*/
      /*这里movedKeys是一个数组，当移动的数量为1时，movedKeys为一个整数*//*搞了一晚上，排雷，祝你好运*/
      /*console.log("keys"+movedKeys)
      console.log(this.index[movedKeys-1])*/
      /*//此方法只能每次选中一个移动*/
      // 已经可以实现多个选中的指标一起添加到学校自定义指标列表里了
      if (direction === 'right') {
        //用于循环movedKeys数组
        for (let i = 0; i < movedKeys.length; i++) {
          this.schoolList.push(this.index[movedKeys[i] - 1])//将index数组中被选中的元素放入到schoolList中
          this.index[movedKeys[i] - 1].newKey = this.newKey++//并使得该元素获得按顺序排列的newKey值
        }
        //调试
        console.log('schoolList：')
        console.log(this.schoolList)
      }
      if (direction === 'left') {
        for (let j = 0; j < movedKeys.length; j++) {

          //这里的splice有BUG！！！

          //删除之后，被删除的元素回到原来的index数组即穿梭框左侧--这个无需自己写
          //若本删除元素的key值大于数据库中获取的最大的key值，即其为学校自定义的指标，被删除后放入到temp数组里
          //将其在下方进行显示
          //恢复功能 再议
          //同时，其所有在schoolList中它后面的元素的neyKey值更新 即-1
          //它本身的newKey值置空
          if (movedKeys[j] >= this.count[0]) {
            this.index[movedKeys[j] - 1].disabled = !this.index[movedKeys[j] - 1].disabled
            this.tempList.push(this.index[movedKeys[j] - 1])//将index数组中被选中的元素放入到tempList中
            console.log('temp is ')
            console.log(this.tempList)
          }
          this.schoolList.splice(this.schoolList.length - 1, 1)
          //删除学校自定义指标数组的最后一个元素，用temp来解决删除不对应的问题
        }
        console.log(this.schoolList.length)
        console.log(this.schoolList)
      }
    },
    /*自定义添加指标和指标描述*/
    add () {
      const newIndex = {
        key: this.key,
        label: this.label,
        alternatives: this.alternatives.split('；'),
        disabled: this.disabled
        //用split函数将输入的指标选项切分成数组（为了和数据库里的数据类型保持一致）
      }
      this.index.push(newIndex)//将新添加指标加入到用于穿梭框显示的index数组中
      this.value4.push(this.key)//使新添加的指标直接显示在右侧穿梭框
      this.schoolList.push(newIndex)//将新添加的指标加入到学校自定义指标数组
      console.log(this.schoolList)
      this.label = this.alternatives = ''//清空输入框
      this.key++//添加时不用自行输入key值
    },
    del () {
      const temp = this.list.findIndex(item => {
        if (item.key === key) {
          return true
        }
      })
      this.list.splice(temp, 1)
    },
    getKey () {
      //获取从数据库拿到的列表的长度
      this.key = this.count[0]
    },
    showKeyFun () {
      this.showKey = !this.showKey
    },
    comeBack (row) {
      this.index[row.key - 1].disabled = !this.index[row.key - 1].disabled
      this.tempList.splice(this.tempList.length - 1, 1)
    },
    jump () {
      this.$router.push({path: '/two'})
    },
    saveToMySQL () {
      const desDF = []
      const optDF = []
      for (var j = 0; j < this.schoolList.length; ++j) {
        desDF.push(this.schoolList[j].label)
        optDF.push(this.schoolList[j].alternatives)
      }
      axios({
        method: 'post',
        url: 'http://localhost:8080/schoolStandardDataForm/createSchoolDataForm',
        data: {'describeDataForm': desDF, 'optionsDataForm': optDF},
      }).then((response) => {
        alert('提交成功！')
      })
    }
  }
}
</script>

<style scoped>
  .el-popover {
    height: 10px;
    overflow: auto;
  }

  .body {
    margin: 0;
  }

  .el-header, .el-footer {
    background-color: #3e74ff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #ffff;
    color: #333;
    /*  text-align: center;*/
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

</style>
