

import { useEffect, useState } from 'react'
import mammoth from 'mammoth'
import { Upload } from 'antd'
const { Dragger } = Upload

import './word.scss'


function WordView({ path }) {
  console.log(10, mammoth)

  const [wordInfo, setWordInfo] = useState({
    html: '<h1>This is a heading</h1><p> This is a html.</p>',
    markdown: '<h1>This is a heading</h1><p> This is a markdown.</p>',
    rawText: '<h1>This is a heading</h1><p> This is a rawText.</p>'
  })

  useEffect(() => {
    const filePath = 'http://192.168.2.100:3000/' + path
    console.log(18, filePath)
    downloadFile(filePath)

    return () => {
      console.log('unload')
    }
  }, [path])

  // 通过地址下载文件
  const downloadFile = (url) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url)
    let fileSplit = url.split('/'), filename = fileSplit[fileSplit.length - 1]
    console.log(31, filename)
    xhr.responseType = 'blob'
    // xhr.responseType = 'arrayBuffer'

    xhr.onload = function () {
      console.log(23, xhr.response)
      let blob = xhr.response
      // bufferToInfo(xhr.responseText)
      if (blob.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        blobToBuffer(xhr.response)
      } else {
        let url = window.URL.createObjectURL(blob)
        let file = new File([blob], filename, { type: 'blob' })
        let a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
      }
    }
    xhr.send()
  },
    // blob 转 arraybuffer
    blobToBuffer = (blob) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(blob)
      reader.onload = function () {
        console.log(43, reader.result)
        bufferToInfo(reader.result)
      }
    }


  // 上传
  const onDraggerFile = (e) => {
    console.log(13, e)
    let file = e.file, fileList = e.fileList
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      let reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = function (event) {
        let arrayBuffer = event.target.result
        console.log(18, event, arrayBuffer)
        bufferToInfo(arrayBuffer)
      }
    } else {
      console.log('doc')
    }
  },
    // mammoth 三个接口
    bufferToInfo = async (bf) => {
      let options = {
        convertImage: mammoth.images.imgElement(function (image) {
          console.log(63, image)
          return image.read("base64").then(function (imageBuffer) {
            return {
              src: "data:" + image.contentType + ";base64," + imageBuffer
            };
          });
        })
      }
      try {
        const html = await mammoth.convertToHtml({ arrayBuffer: bf, options }),
          mark = await mammoth.convertToMarkdown({ arrayBuffer: bf, options }),
          rawText = await mammoth.extractRawText({ arrayBuffer: bf });
        console.log(64, html, mark, rawText)
        let newInfo = Object.assign(
          {},
          wordInfo,
          {
            html: html.value,
            markdown: mark.value,
            rawText: rawText.value
          }
        )
        setWordInfo(newInfo)
      } catch (error) {
        console.log(36, error)
      }
    }

  return (
    <div className='flex flex-dir-c'>
      <div>
        <a target='_blank' href="https://www.npmjs.com/package/mammoth?activeTab=readme">npm mammoth</a>
        <a target='_blank' href="https://www.5axxw.com/questions/simple/9h8m7s">Mammoth详细的api文档</a>
        <a target='_blank' href="https://cloud.tencent.com/developer/article/1665581?from=15425&areaSource=102001.6&traceId=Ez0D6uddC0Mryz5C1M20y">在前端如何玩转 Word 文档</a>
        <a target='_blank' href="https://www.jianshu.com/p/e7d5e1db4bac">react--使用mammoth预览word文件</a>
      </div>
      <div>
        <Dragger name='file' accept='.doc , .docx' maxCount={1} onChange={onDraggerFile} beforeUpload={e => false} showUploadList={false}>
          <p>上传文件</p>
        </Dragger>
      </div>
      <div className='flex flex-jc-sb word-info' >
        {
          Object.keys(wordInfo).map(item => {
            let val = wordInfo[item]
            return <div className={'flex-1 ' + item} key={item} dangerouslySetInnerHTML={{ __html: val }} ></div>
          })
        }
      </div>
    </div>
  )
}

export default WordView