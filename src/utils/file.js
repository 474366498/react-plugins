
// file 转 base64
export const blobToDataUri = (blob, cb) => {
  let render = new FileReader()
  render.onload = function (env) {
    let base64 = env.target.result
    cb(base64)
  }
  render.readAsDataURL(blob)
}

