const Mock = require('mockjs')
const courseNameList = ['语文', '数学', '英语', '物理', '化学',]

const studentSchoolTable = []
for (let i = 0; i < 6; i++) {
  let line = {
    'left': i + 1,
    'Monday|1': courseNameList,
    'Tuesday|1': courseNameList,
    'Wednesday|1': courseNameList,
    'Thursday|1': courseNameList,
    'Friday|1': courseNameList,
    'Saturday': '无',
    'Sunday': '无',
  }
  studentSchoolTable.push(line)
}

Mock.mock('http://creatschooltablesmock.com', studentSchoolTable)
