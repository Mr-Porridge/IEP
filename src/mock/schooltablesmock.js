const Mock = require("mockjs")
/*const objTest = {
  a:"aa",
  b:"bb",
  c:"cc",
  d:"dd"
}
var arr = [11,22,33];
var fun = function(x){
  return x + 10;
}*/
var class_id=["仁（1）","仁（2）","智（1）","智（2）","礼（1）",]

const studentsInfo=[]
for (let i = 0; i < 11; i++) {
  let person = {
    'studentId':"@id",
    "name": "@cname",
    "classId|1": class_id,//通过重复属性值 arr 生成一个新数组，重复次数大于等于 2，小于等于 3。
    /*studentId:Mock.Random.guid,
    studentName: Mock.Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
    classId: 2,  // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
    /!*c: Mock.Random.city(),  // Random.city() 随机生成一个城市的名字*!/*/
  }
  studentsInfo.push(person)
}

students = {
    "code": 1,
    "message": "success",
    "data": {
    "students": studentsInfo,
    "totalCount": studentsInfo.length,
  }
}


/*Mock.mock("http://dataformmock.com", "get", (config) => {
  console.log("后端接收到：");
  console.log(config);
  return students;
})*/
Mock.mock("http://dataformmock.com",students);


{
  /*"name1|1-3":  'a',
  "name2|2": 'b',
  "name3|+1": 3,
  "name4|1-4": 2,
  "name5|1-4.5-8": 1,
  "name6|1": true,
  "name7|1-3": true,
  "name8|1-4": objTest,
  "name9|2": objTest,
  "name10|1": arr,
  "name11|1-3": arr,
  "name12|2": arr,
  "name13": fun(10),
  "name14": /[a-z][A-Z]/,
  "name15": /\d{1,3}/,
  "name16": "@FIRST",
  "name17": "@LAST",
  "name18": "@email",
  "name19": "@date",
  "name20": "@image",
  "name21":" @name",*/
}
