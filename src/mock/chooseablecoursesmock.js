const Mock = require('mockjs')
const courseNameList = ['语文', '数学', '英语', '物理', '化学',]

const studentSchoolTable = [
  {
    "id": 2,
    "label": "生活语文"
  },
  {
    "id": 12,
    "label": "生活数学"
  },
  {
    "id": 13,
    "label": "生活适应"
  },
  {
    "id": 14,
    "label": "劳动技能"
  },
  {
    "id": 15,
    "label": "绘画与手工"
  }
]


Mock.mock('http://chooseablecoursesmock.com', studentSchoolTable)
