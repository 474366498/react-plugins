import { Button } from "antd"




export function BigFileDownload() {

  const filesList = [
    { name: 'nodejs.rar', src: 'https://yy2.guiren21.com/201611/books/Node.jsqwzn_jb51.rar' },
    { name: '宣传资料.mp4', src: 'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2020-04-13/f7fcc50756a54ff1bb9d83504c8e094b.mp4' },
    { name: '成都北湖礼宴中心.rar', src: 'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/9f68269d7e0d4823aa3d96db86d43f29.rar' },
    { name: '783293%%44#￥￥&&.jpg', src: 'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/8c7a5b5bb9474471b7715ba7f020b9ac.jpg' },
    { name: '内江市公安局市中区分局业务技术用房及救灾物资储备库项目竣工结算审核服务采购项目.doc', src: 'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/7099b7fefd4a43759ad33e99e02e8009.doc' },
    { name: '竣工报告-副本.pdf', src: 'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/1190c4f116c24c1bb25850f3ee00e214.pdf' }
  ]

  const onDownloadFile = (file) => {
    console.log(18, file)
    let { name, src } = file
    download({
      url: src,
      chunkSize: 2 * 1024 ** 2,
      poolLimit: 6
    }).then(buffers => {
      console.log(buffers)
      saveAs({ name, buffers })
    })
  },
    download = async ({ url, chunkSize = 2 * 1024 ** 2, limit }) => {
      const contentLength = await getContentLength(url)
      const chunks = typeof chunkSize === 'number' ? Math.ceil(contentLength / chunkSize) : 1
      const result = await asyncPool(limit, [... new Array(chunks).keys()], (i) => {
        let start = i * chunkSize, end = i + 1 === chunks ? contentLength - 1 : (i + 1) * chunkSize - 1
        return getBinaryContent(url, start, end, i)
      })
      const sortedBuffers = result.map(item => new Uint8Array(item.buffer))
      return concatenate(sortedBuffers)
    },
    getContentLength = async (url) => {
      return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest()
        xhr.open('HEAD', url)
        xhr.send()
        xhr.onload = function () {
          res(~~xhr.getResponseHeader('Content-Length'))
        }
        xhr.onerror = rej
      })
    },
    asyncPool = async (limit, array, fn) => {
      const ret = []
      const executing = []
      for (const item of array) {
        const p = Promise.resolve().then(() => fn(item, array))
        ret.push(p)

        if (limit <= array.length) {
          const e = p.then(() => executing.splice(executing.indexOf(e), 1))
          executing.push(e)
          if (executing.length >= limit) {
            await Promise.race(executing)
          }
        }
      }
      return Promise.all(ret)
    },
    getBinaryContent = (url, start, end, i) => {
      return new Promise((res, rej) => {
        try {
          let xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.setRequestHeader("range", `bytes=${start}-${end}`); // 请求头上设置范围请求信息
          xhr.responseType = "arraybuffer"; // 设置返回的类型为arraybuffer
          xhr.onload = function () {
            res({
              index: i, // 文件块的索引
              buffer: xhr.response, // 范围请求对应的数据
            });
          };
          xhr.send();
        } catch (err) {
          rej(new Error(err));
        }
      })
    },
    concatenate = (arrays) => {
      if (!arrays.length) return null;
      let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
      let result = new Uint8Array(totalLength);
      let length = 0;
      for (let array of arrays) {
        result.set(array, length);
        length += array.length;
      }
      return result;
    }
  const saveAs = ({ name, buffers, mime = "application/octet-stream" }) => {
    const blob = new Blob([buffers], { type: mime });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = name || Math.random();
    a.href = blobUrl;
    a.click();
    URL.revokeObjectURL(blob);
  }

  return (
    <div className="flex flex-dir-c">
      {
        filesList.map(file => (
          <div key={file.name}> <Button onClick={e => onDownloadFile(file)}>{file.name}</Button></div>
        ))
      }
    </div>
  )
}





