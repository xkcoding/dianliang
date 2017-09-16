import moment from 'moment'
import mock from 'mockjs'
import _ from 'lodash'

export const predict = [
  {
    path: '/predict',
    data: {
      'array': [{
        date: getWeek()[0],
        data: [
          {
            'name': '天津',
            'value': mock.Random.float(0, 30, 2, 3)
          },
          {
            'name': '上海',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '河北',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '云南',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '安徽',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '新疆',
            'value': mock.Random.float(60, 120, 2, 3)
          },
          {
            'name': '江苏',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '浙江',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '江西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '湖北',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '广西',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '甘肃',
            'value': mock.Random.float(40, 150, 2, 3)
          },
          {
            'name': '内蒙古',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '陕西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '吉林',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '福建',
            'value': mock.Random.float(60, 100, 2, 3)
          },
          {
            'name': '贵州',
            'value': mock.Random.float(0, 60, 2, 3)
          },
          {
            'name': '宁夏',
            'value': mock.Random.float(40, 60, 2, 3)
          }
        ]
      }, {
        date: getWeek()[1],
        data: [
          {
            'name': '天津',
            'value': mock.Random.float(0, 30, 2, 3)
          },
          {
            'name': '上海',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '河北',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '云南',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '安徽',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '新疆',
            'value': mock.Random.float(60, 120, 2, 3)
          },
          {
            'name': '江苏',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '浙江',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '江西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '湖北',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '广西',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '甘肃',
            'value': mock.Random.float(40, 150, 2, 3)
          },
          {
            'name': '内蒙古',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '陕西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '吉林',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '福建',
            'value': mock.Random.float(60, 100, 2, 3)
          },
          {
            'name': '贵州',
            'value': mock.Random.float(0, 60, 2, 3)
          },
          {
            'name': '宁夏',
            'value': mock.Random.float(40, 60, 2, 3)
          }
        ]
      }, {
        date: getWeek()[2],
        data: [
          {
            'name': '天津',
            'value': mock.Random.float(0, 30, 2, 3)
          },
          {
            'name': '上海',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '河北',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '云南',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '安徽',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '新疆',
            'value': mock.Random.float(60, 120, 2, 3)
          },
          {
            'name': '江苏',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '浙江',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '江西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '湖北',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '广西',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '甘肃',
            'value': mock.Random.float(40, 150, 2, 3)
          },
          {
            'name': '内蒙古',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '陕西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '吉林',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '福建',
            'value': mock.Random.float(60, 100, 2, 3)
          },
          {
            'name': '贵州',
            'value': mock.Random.float(0, 60, 2, 3)
          },
          {
            'name': '宁夏',
            'value': mock.Random.float(40, 60, 2, 3)
          }
        ]
      }, {
        date: getWeek()[3],
        data: [
          {
            'name': '天津',
            'value': mock.Random.float(0, 30, 2, 3)
          },
          {
            'name': '上海',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '河北',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '云南',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '安徽',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '新疆',
            'value': mock.Random.float(60, 120, 2, 3)
          },
          {
            'name': '江苏',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '浙江',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '江西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '湖北',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '广西',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '甘肃',
            'value': mock.Random.float(40, 150, 2, 3)
          },
          {
            'name': '内蒙古',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '陕西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '吉林',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '福建',
            'value': mock.Random.float(60, 100, 2, 3)
          },
          {
            'name': '贵州',
            'value': mock.Random.float(0, 60, 2, 3)
          },
          {
            'name': '宁夏',
            'value': mock.Random.float(40, 60, 2, 3)
          }
        ]
      }, {
        date: getWeek()[4],
        data: [
          {
            'name': '天津',
            'value': mock.Random.float(0, 30, 2, 3)
          },
          {
            'name': '上海',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '河北',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '云南',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '安徽',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '新疆',
            'value': mock.Random.float(60, 120, 2, 3)
          },
          {
            'name': '江苏',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '浙江',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '江西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '湖北',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '广西',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '甘肃',
            'value': mock.Random.float(40, 150, 2, 3)
          },
          {
            'name': '内蒙古',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '陕西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '吉林',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '福建',
            'value': mock.Random.float(60, 100, 2, 3)
          },
          {
            'name': '贵州',
            'value': mock.Random.float(0, 60, 2, 3)
          },
          {
            'name': '宁夏',
            'value': mock.Random.float(40, 60, 2, 3)
          }
        ]
      }, {
        date: getWeek()[5],
        data: [
          {
            'name': '天津',
            'value': mock.Random.float(0, 30, 2, 3)
          },
          {
            'name': '上海',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '河北',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '云南',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '安徽',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '新疆',
            'value': mock.Random.float(60, 120, 2, 3)
          },
          {
            'name': '江苏',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '浙江',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '江西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '湖北',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '广西',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '甘肃',
            'value': mock.Random.float(40, 150, 2, 3)
          },
          {
            'name': '内蒙古',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '陕西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '吉林',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '福建',
            'value': mock.Random.float(60, 100, 2, 3)
          },
          {
            'name': '贵州',
            'value': mock.Random.float(0, 60, 2, 3)
          },
          {
            'name': '宁夏',
            'value': mock.Random.float(40, 60, 2, 3)
          }
        ]
      }, {
        date: getWeek()[6],
        data: [
          {
            'name': '天津',
            'value': mock.Random.float(0, 30, 2, 3)
          },
          {
            'name': '上海',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '河北',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '云南',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '安徽',
            'value': mock.Random.float(0, 100, 2, 3)
          },
          {
            'name': '新疆',
            'value': mock.Random.float(60, 120, 2, 3)
          },
          {
            'name': '江苏',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '浙江',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '江西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '湖北',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '广西',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '甘肃',
            'value': mock.Random.float(40, 150, 2, 3)
          },
          {
            'name': '内蒙古',
            'value': mock.Random.float(0, 40, 2, 3)
          },
          {
            'name': '陕西',
            'value': mock.Random.float(0, 20, 2, 3)
          },
          {
            'name': '吉林',
            'value': mock.Random.float(0, 50, 2, 3)
          },
          {
            'name': '福建',
            'value': mock.Random.float(60, 100, 2, 3)
          },
          {
            'name': '贵州',
            'value': mock.Random.float(0, 60, 2, 3)
          },
          {
            'name': '宁夏',
            'value': mock.Random.float(40, 60, 2, 3)
          }
        ]
      }]
    }
  }
]

export function getWeek () {
  let week = []
  for (let i = 0; i < 7; i++) {
    let day = moment().add(i, 'days').format('YYYY-MM-DD')
    week.push(day)
  }
  return week
}

export function generateData () {
  let predicts = []

  for (let i = 0; i < 7; i++) {
    let dayData = {}
    let date = moment().add(i, 'days').format('YYYY-MM-DD')
    dayData.date = date
    dayData.data = []
    for (let j = 0; j < 20; j++) {
      let provinceData = {}
      let province = getProvince()
      let data = mock.Random.float(0, 100, 2, 3)
      provinceData.province = province
      provinceData.data = data
      dayData.data.push(provinceData)
    }

    predicts.push(dayData)
  }

  return predicts
}

export function getProvince () {
  let province = mock.Random.province()
  if (_.endsWith(province, '省')) {
    province = province.replace('省', '')
  } else if (province === '新疆维吾尔自治区') {
    province = '新疆'
  } else if (province === '西藏自治区') {
    province = '西藏'
  } else if (province === '广西壮族自治区') {
    province = '广西'
  } else if (province === '宁夏回族自治区') {
    province = '宁夏'
  } else if (province === '内蒙古自治区') {
    province = '内蒙古'
  } else if (province === '香港特别行政区') {
    province = '香港'
  } else if (province === '澳门特别行政区') {
    province = '澳门'
  }
  return province
}
