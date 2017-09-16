import Mock from 'mockjs'

import { predict } from './mock.predict.js'

function addToMock (list) {
  list.forEach(n => {
    Mock.mock(n.path, n.data)
  })
}

addToMock(predict)

export default Mock
