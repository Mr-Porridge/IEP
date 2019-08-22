const Mock = require('mockjs')

const data =
  {
    'status': 0,
    'message': '成功',

    'data': {
      "exist": true,
      'target':[
      {
        'targetId': 1,
        'targetDescription': 'nihao ',
        'targetShowType': null,
        'targetChildren': [2,3],
        'targetRelevance': [],
        'targetStatus': 0,
        'targetOrigin': 0,
      },
      {
        'targetId': 2,
        'targetDescription': 'kyoyi ',
        'targetShowType': null,
        'targetChildren': [],
        'targetRelevance': [],
        'targetStatus': 1,
        'targetOrigin': 0,
      },
      {
        'targetId': 3,
        'targetDescription': 'tusmi ',
        'targetShowType': null,
        'targetChildren': [],
        'targetRelevance': [],
        'targetStatus': 0,
        'targetOrigin': 0,
      },
    ]
  }}

Mock.mock('http://datamock.com', data)
