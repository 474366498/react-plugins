/* eslint-disable no-constant-condition */
import { Button } from "antd"
import { useRef } from "react"

import './big.scss'


function BigFile() {
  var files = [] 
  const drop = useRef() 

  const onFileChange = e => {
    let _files = e.target.files 
    files=files.concat(Array.prototype.slice.apply(_files))
    console.log(12, _files , files)
  }

  setTimeout(() => {
    if (drop.current) {
      document.addEventListener('drop', e => e.preventDefault())
      drop.current.addEventListener('dragover', e => e.preventDefault())
      drop.current.addEventListener('dragleave', e => e.preventDefault())
      drop.current.addEventListener('drop', e => {
        console.log(22, e)
        let items = e.dataTransfer.items 
        if (items && items.length) {
          for (let i = 0; i < items.length; i++){
            let file = items[i].getAsFile()
            files.push(file)
          }
        }
        console.log(30,files)
      })
    }
  }, 1e2);

  const onSendFiles = () => {
    console.log(37, files)
     drop.current.querySelector('ul').innerHTML = ''
    let newFiles = splitFiles(files)
    console.log(39, newFiles)
    let sendIndex = 0
    for (let i = 0; i < newFiles.length; i++){
      let item = newFiles[i]
      sendFile(item, function () {
        sendIndex += 1 
        if (sendIndex == newFiles.length) {
          console.log('last')
        }
      })
    }
    
  },
    splitFiles = (list) => {
      let result = [] 
      for (let i = 0; i < list.length; i++) {
        let item = list[i] 
        let _item = splitFile(item)
        console.log(_item)
        result = result.concat(_item)
      }
      console.log(48,result)
      return result 
    },
    splitFile = (file, splitSize = 2 * 1024 ** 2) => {
      let { lastModified, name, size } = file

      let chunks = [], chunksItem = {lastModified, name, size , index:0} , start = 0, end = 0;
      if (file.size > splitSize) {
        while (true) {
          end += splitSize 
          let blob = file.slice(start, end < file.size ? end : file.size)
          if (!blob.size) {
            break 
          }
          let _item = {...chunksItem}
          _item.blob = blob
          _item._size = `${start} ~ ${end}`
          chunks.push(_item)
          start += splitSize
          chunksItem.index++
        }
      } else {
        chunksItem._size = `0 ~ ${file.size}`
        chunksItem.blob = file.slice(0)
        chunks.push(chunksItem)
      }
      return chunks
    },
    sendFile = (file, fn) => {
      let ul = drop.current.querySelector('ul')
      setTimeout(() => {
        let li = document.createElement('li')
        li.innerHTML = `<li>${file.index}:${file.name} ----- ${file._size}</li>`
        ul.appendChild(li)
        fn && fn()
        console.log(file)
      }, 3000);
    }




  return (<section className="flex flex-dir-c">
    <h1><a href='https://juejin.cn/post/6844903968338870285#heading-19' target='_blank' >来源</a></h1>
    <div className="flex flex-ai-c flex-dir-c">
      <p>选择文件 <input type='file' multiple onChange={onFileChange} /></p>
      <div className="drop" ref={drop}>
          拖拽文件到页面的操作 <br/>
          拖拽文件到页面的操作 <br/>
          拖拽文件到页面的操作 <br/>
          拖拽文件到页面的操作 <br/>
        拖拽文件到页面的操作 <br />
        <ul></ul>
      </div>
      <Button type='primary' onClick={ onSendFiles } > 文件操作</Button>
    </div>
    big file 
  </section>)

}


export default BigFile