/* eslint-disable no-restricted-globals */

// http://www.manongjc.com/detail/19-npaptnquuapkmcv.html
const workerCode = () => {
  console.log(5, self)
  self.onmessage = e => {
    console.log(e)
    let data = e.data
    let result = 0
    for (let i = 0; i < data; i++) {
      result += i
    }
    self && self.postMessage(`累加(data): ${result}`)
  }

  self.onerror = error => {
    console.log(error)
  }
}

let code = workerCode.toString()

code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;