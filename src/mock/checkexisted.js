const Mock = require('mockjs')

const studentSchoolTable =
  {
    "status": 0,
    "message":"成功",
    "data": {
      "exist":1 //0：不存在 ，1：存在
    }
  }

Mock.mock('http://schoolmock.com', studentSchoolTable)
