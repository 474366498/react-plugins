/* eslint-disable no-restricted-globals */

import { Button } from 'antd'

import WebWorker from 'react-webworker'

import worker_script from './worker/for.js?worker'
import WorkerClass from './worker/class'

console.log(10, WebWorker)

function _WebWorker() {

  function test() {
    console.time()
    let data = 1e5
    let result = []
    for (let i = 0; i < data; i++) {
      let item = { i, label: `这是workerjs中创建的第${i + 1}个` }
      result.push(item)
    }
    console.log(12, result, JSON.stringify(result))
    console.timeEnd()
  }
  // test()

  // 通过js代码字符串伪装
  const onWebWorkerCode = () => {
    const codeFun = () => {
      console.log('12 3' + '\n' + '45 6');
    }

    const codeStr = codeFun.toString().slice(7, -1)

    console.log(15, codeStr)

    const worker = new Worker(`data:application/javascript , ${codeStr}`)
    console.log(worker)
    worker.onmessage = function (e) {
      console.log('message', e)
    }

    worker.onerror = function (error) {
      console.log('error', error)
    }
    worker.postMessage('codeFun')   // 

  },
    // 通过第三文件 转成blob 通过URL.createObjectURL 生成
    onWebWorkerPackage = () => {
      let worker = new Worker(worker_script)
      let params = 1000
      worker.postMessage(params)

      worker.onmessage = function (e) {
        console.log(37, e)
        worker && worker.terminate()
      }

      worker.onerror = function (error) {
        console.log(42, error)
        worker && worker.terminate()
      }

    },
    // 通过一个公共类 在类中 用blob url.createObjectURL 生成 (worker 执行代码与操作放在同一文件)
    onWebWorkerClass = () => {
      let selfWork = function () {
        self.onmessage = function (e) {
          let sum = 0, num = e.data
          for (let i = 1; i < num; i++) {
            sum += i
          }
          self.postMessage(`最后返回${sum}`)
        }
        self.onerror = function (error) {
          console.log(error)
        }
      }
      let worker = new WorkerClass(selfWork)
      worker.postMessage(3000)
      worker.onmessage = function (e) {
        console.log(65, e)
      }
      worker.onerror = function (error) {
        console.log(68, error)
      }
      console.log(63, worker)
    }

  const myWorker = new Worker('./worker.js')
  return (
    <section>
      WebWorker
      <Button.Group>
        <Button type='primary' onClick={onWebWorkerCode}> web~worker~code</Button>
        <Button type='primary' danger onClick={onWebWorkerPackage}>web~worker~package</Button>
        <Button onClick={onWebWorkerClass}> web~worker~class</Button>
      </Button.Group>
      <br></br> <br />
      <Button.Group>
        <WebWorker url='./worker.js'>
          {({ data, error, postMessage }) => {
            if (error) return <Button danger type='text' >`Something went wrong: ${error.message}`</Button>
            if (data) {
              let result = JSON.parse(data, null, 2)
              return (
                <Button type='primary' > 回来的：{result.length}</Button>
              )
            }
            return <Button type='primary' onClick={() => postMessage(1e4)} >npm react-webworker</Button>
          }}
        </WebWorker>
        <WebWorker url='./worker.js'>
          <WebWorker.Pending>
            {({ postMessage }) => <Button onClick={e => postMessage(1e5)}>生成1个10万条数据的数组</Button>}
          </WebWorker.Pending>
          <WebWorker.Data>
            {data => {
              let result = JSON.parse(data, null, 2)
              return <Button type='primary'>data:${result.length}条</Button>
            }}
          </WebWorker.Data>
          <WebWorker.Error>{error => (<p>${error.message}</p>)}</WebWorker.Error>
        </WebWorker>
        <WebWorker worker={myWorker}>
          {({ data, error, postMessage }) => {
            if (error) return <Button danger type='text' >`Something went wrong: ${error.message}`</Button>
            if (data) {
              let result = JSON.parse(data, null, 2)
              return (
                <Button type='primary' > 回来的：{result.length}</Button>
              )
            }
            return <Button type='primary' onClick={() => postMessage(1e4)} > react-webworker worker</Button>
          }}
        </WebWorker>
      </Button.Group>
      <p>react-worker 中的url文件路径 以当前项目地址为根 如url为./worker.js 则workerjs应放置在public 文件夹下</p>
    </section>
  )
}

export default _WebWorker

