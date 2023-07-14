/* eslint-disable no-restricted-globals */
// react-webworker

self.onmessage = function (e) {
  console.log(4, e)
  console.time()
  let data = e.data
  let result = []
  for (let i = 0; i < data; i++) {
    let item = { i, label: `这是workerjs中创建的第${i + 1}个` }
    result.push(item)
  }
  console.log(12, result, JSON.stringify(result))
  console.timeEnd()
  self.postMessage(JSON.stringify(result))
}
self.onerror = function (error) {
  console.log('error', error)
}


