




import { Button, Image, Input } from "antd"
import { saveAs } from "file-saver"
import { useRef, useState } from 'react'

export function FileSaverDownload() {
  const files = [
    { name: 'big.jpg', src: 'http://192.168.2.10:8081/static/tender/68fcb2c8dfa442279699ba7612341c64/performance/8ffb11e8ef17498ea60f9ca35e4f9528.jpg' },
    { name: '783293%%44#￥￥&&.jpg', src: 'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/8c7a5b5bb9474471b7715ba7f020b9ac.jpg' }
  ]
  const [text, setText] = useState('')
  const mergedPic = useRef()
  var imgDataUrl = null
  const saveTextFile = () => {
    console.log(text)
    if (!text) return false
    let blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, '测试.txt')
  },
    mergeFile = async () => {
      let images = files.map(item => item.src)
      imgDataUrl = await imgToBase(images[0])
      // try {
      //   imgDataUrl = await mergeImages(images) 
      // } catch (error) {
      //   console.log(24,error)
      // }
      console.log(21, imgDataUrl)
      mergedPic.current.src = imgDataUrl
    },
    downloadFile = async () => {
      if (!imgDataUrl) {
        console.log('先合并取 base64')
        return
      }
      const imgBlob = dataUrlToBlob(imgDataUrl, 'image/png')
      console.log(36, imgBlob)
      saveAs(imgBlob, 'face.png')
      // await saveFile(imgBlob, 'face')
    };
  const imgToBase = (url) => {
    return new Promise((res, rej) => {
      let img = document.createElement('img')
      img.src = url
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = function () {
        let canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, img.width, img.height)
        res(canvas.toDataURL())
      }
    })
  },
    dataUrlToBlob = (base64, mimeType) => {
      let bytes = window.atob(base64.split(",")[1]);
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeType });
    }
  return (
    <div className="flex flex-dir-c">
      <h3>file saver</h3>

      <div className="flex flex-jc-sa">
        {files.map(item => (
          <Image width={200} src={item.src + '?' + new Date()} key={item.name} crossOrigin='anonymous' />
        ))}
      </div>
      <div className="flex flex-jc-c">
        <Input.TextArea rows={5} onChange={e => setText(e.target.value)} />
        <img ref={mergedPic} id='mergedPic' height='256' src='http://via.placeholder.com/256' />
      </div>
      <div className="flex flex-jc-c">
        <Button.Group>
          <Button type='text' onClick={saveTextFile}>保存文本文件</Button>
          <Button type='primary' onClick={mergeFile}>大图转base</Button>
          <Button type='primary' onClick={downloadFile}>下载</Button>
        </Button.Group>
      </div>
    </div>
  )
}











