
import { useRef } from 'react'
import './file.scss'
function FileUpload() {

  const onFileChange = e => {
    let files = [].concat(Array.prototype.slice.apply(e.target.files)) 

    console.log(e.target.files , files)
  }
  var drop = useRef(),
    editor = useRef()
  setTimeout(() => {
    if (drop.current) {
      document.addEventListener('drop', e => e.preventDefault())
      
      drop.current.addEventListener('dragover', e => e.preventDefault())
      drop.current.addEventListener('dragleave', e => e.preventDefault())
      drop.current.addEventListener('drop', function (e) {
        e.preventDefault()
        let files = e.dataTransfer.files
        console.log(18, e,files)
        let list = Array.prototype.slice.call(files)
        console.log(23,list)
      })
      console.log('addevent ')
    }

    if (editor.current) {
      editor.current.addEventListener('paste', function (e) {
        console.log(31, e)
        let data = e.clipboardData || window.clipboardData
        let items = data.items 
        let files = []
        if (items && items.length) {
          for (let i = 0; i < items.length; i++) {
            let item = items[i] 
            files.push(item.getAsFile())
          }
          console.log(40,files)
        }

      })
    }

  }, 1e2);
  return (
    <section className="flex flex-dir-c">
      file upload 
      <h1><a href='https://juejin.cn/post/6844903968338870285#heading-1' target='_blank' >掘金文章</a></h1>
      <p> 文件上传(原始)<input type='file' multiple onChange={onFileChange} /></p>
      <div className='flex flex-jc-sa'>

      <div className='flex flex-jc-c drop' ref={ drop}>
        <span>拖拽文件到页面的操作</span>
      </div>
      <div className='flex flex-jc-c editor' ref={editor}>
        <span> ctrl/c ctrl/v 粘贴内容</span>
      </div>
      </div>
    </section>
  )
}

export default FileUpload

