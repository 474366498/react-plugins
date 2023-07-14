





import mergeImages from 'merge-images'
import { Button, Image } from "antd"
import { useRef } from 'react'

export function SaveFilePicker() {
  const files = [
    { name: 'big.jpg', src: 'http://192.168.2.10:8081/static/tender/68fcb2c8dfa442279699ba7612341c64/performance/8ffb11e8ef17498ea60f9ca35e4f9528.jpg' },
    {name:'783293%%44#￥￥&&.jpg',src:'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/8c7a5b5bb9474471b7715ba7f020b9ac.jpg'}
  ]
  const mergedPic = useRef()
  var imgDataUrl = null 

    const mergeFile = async () => {
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
      await saveFile(imgBlob,'face')
    };
  
    // 通过图片地址转base64
    const imgToBase = (url) => {
      return new Promise((res, rej) => {
        let img = document.createElement('img') 
        img.src = url 
        img.setAttribute('crossOrigin', 'anonymous')
        img.onload = function () {
          console.log(img)
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
    },
      saveFile = async (blob,filename) => {
        try {
          const handle = await window.showSaveFilePicker({
          suggestedName: filename,
            types: [
              {
                description: "PNG file",
                accept: {
                  "image/png": [".png"],
                },
              },
              {
                description: "Jpeg file",
                accept: {
                  "image/jpeg": [".jpeg"],
                },
              },
            ],
          })
           const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
          return handle;
        } catch (err) {
          console.log(err)
      }
    }
  
  
  return (
    <div className='flex flex-dir-c'>
      <div>
        <h3>window.showSaveFilePicker</h3>
        <p>window.showSaveFilePicker (兼容性不是很好)  <a target='_blank' href="https://developer.mozilla.org/en-US/docs/Web/API/window/showSaveFilePicker">mdn api </a> <a target='_blank' href='https://github.com/semlinker/file-download-demos/blob/main/save-file-picker/save-file-picker-download.html'>github 实例</a></p>
          <code>
            <p> excludeAcceptAllOption:布尔类型,默认值为 false。默认情况下,选择器应包含一个不应用任何文件类型过滤器的选项（由下面的 types 选项启用）。将此选项设置为 true 意味着 types 选项不可用。</p>
            <p>
              <span className='b'>types:数组类型,表示允许保存的文件类型列表。数组中的每一项是包含以下属性的配置对象:</span>
              <span className='b'>&nbsp;&nbsp;description（可选）:用于描述允许保存文件类型类别。</span>
              <span className='b'>&nbsp;&nbsp;accept:是一个对象,该对象的 key 是 MIME 类型,值是文件扩展名列表。</span>
              </p>
          </code>
      </div>
      <div className="flex flex-jc-sa">
        {files.map(item => (
          <Image width={ 200 } src={item.src+'?'+new Date() } key={ item.name} crossOrigin='anonymous' /> 
        ))}
      </div>
      <div className="flex flex-jc-c"> <img ref={ mergedPic } id='mergedPic' height='256' src='http://via.placeholder.com/256'  /></div>
      <div className="flex flex-jc-c">
        <Button.Group>
          <Button type='primary' onClick={ mergeFile }>合并</Button>
          <Button type='primary' onClick={downloadFile}>下载</Button>
        </Button.Group>
      </div>
    </div>
  )
}

