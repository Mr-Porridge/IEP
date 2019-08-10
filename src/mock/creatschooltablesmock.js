const Mock = require('mockjs')

const studentSchoolTable =
  {
    "year": "2018/2019",
    "semester": 1,
    "courses": [
      {
        id: 1,
        mes: '生活语文',
      },
      {
        id: 2,
        mes: '康复训练',
      },
      {
        id: 3,
        mes: '生活适应',
      },
      {
        id: 4,
        mes: '信息技术',
      },
      {
        id: 5,
        mes: '生活数学',
      },
      {
        id: 6,
        mes: '信息技术',
      },
      {
        id: 7,
        mes: '生活数学',
      },
      {
        id: 8,
        mes: '生活数学',
      },
      {
        id: 9,
        mes: '艺术休闲',
      },
      {
        id: 10,
        mes: '生活数学',
      },
      {
        id: 11,
        mes: '生活数学',
      },
      {
        id: 12,
        mes: '生活适应',
      },
      {
        id: 13,
        mes: '生活数学',
      },
      {
        id: 14,
        mes: '唱游与律动',
      },
      {
        id: 15,
        mes: '生活适应',
      },
      {
        id: 16,
        mes: '生活数学',
      },
      {
        id: 17,
        mes: '康复训练',
      },
      {
        id: 18,
        mes: '康复训练',
      },
      {
        id: 19,
        mes: '绘画与手工',
      },
      {
        id: 20,
        mes: '生活数学',
      },
      {
        id: 21,
        mes: '生活数学',
      },
      {
        id: 22,
        mes: '生活数学',
      },
      {
        id: 23,
        mes: '绘画与手工',
      },
      {
        id: 24,
        mes: '康复训练',
      },
      {
        id: 25,
        mes: '艺术休闲',
      },
      {
        id: 26,
        mes: '生活适应',
      },
      {
        id: 27,
        mes: '康复训练',
      },
      {
        id: 28,
        mes: '生活适应',
      },
      {
        id: 29,
        mes: '信息技术',
      },
      {
        id: 30,
        mes: '生活适应',
      },
      {
        id: 31,
        mes: '绘画与手工',
      },
      {
        id: 32,
        mes: '唱游与律动',
      },
      {
        id: 33,
        mes: '绘画与手工',
      },
      {
        id: 34,
        mes: '信息技术',
      },
      {
        id: 35,
        mes: '唱游与律动',
      },
      {
        id: 36,
        mes: '劳动技能',
      },
      {
        id: 37,
        mes: '生活适应',
      },
      {
        id: 38,
        mes: '劳动技能',
      },
      {
        id: 39,
        mes: '康复训练',
      },
      {
        id: 40,
        mes: '劳动技能',
      },
      {
        id: 41,
        mes: '生活适应',
      },
      {
        id: 42,
        mes: '信息技术',
      },
      {
        id: 43,
        mes: '生活适应',
      },
      {
        id: 44,
        mes: '生活适应',
      },
      {
        id: 45,
        mes: '绘画与手工',
      },
      {
        id: 46,
        mes: '康复训练',
      },
      {
        id: 47,
        mes: '生活适应',
      },
      {
        id: 48,
        mes: '生活适应',
      },
      {
        id: 49,
        mes: '康复训练',
      },]
  }




Mock.mock('http://creatschooltablesmock.com', studentSchoolTable)
