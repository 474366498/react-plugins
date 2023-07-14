import { Component, useEffect, useState } from "react";

import { Editor, Toolbar } from '@wangeditor/editor-for-react'

import {DomEditor } from '@wangeditor/editor'

import '@wangeditor/editor/dist/css/style.css'
import { blobToDataUri } from "@/utils/file";


export default function WangEdit() {
  const [editor, setEditor] = useState(null)
  const [html , setHtml] = useState(`<p>hello wang editor</p>`)
  
  // https://github.com/wangeditor-team/server/blob/main/html/upload-image.html
  const uploadImage = {
    server: 'upload/image',
    timeout: 5e3,
    fieldName: 'custom-fileName',
    meta: { token: 'token str', other: 'other params ' },
    metaWithUrl : true , 
    headers: { Accept: 'text/x-json' },
    maxFileSize: 10 * 1e3 * 1e3 ,
    base64LimitSize: 10 * 1e3,
    onBeforeUpload(file) {
      console.log('before upload', file) 
      return file 
    },
    onProgress(progress) {
      console.log('progress',progress)
    },
    onSuccess(file, res) {
      console.log('success',res,file)
    },
    onFailed(file, res) {
      console.log('failed',res,file)
      
    },
    onError(file, error, res) {
      console.log('error',error,res)
    },

    // 自定义插入
    customInsert(res, insertFn) {
        console.log('customInsert', res)
        const imgInfo = res.data[0] || {}
        const { url, alt, href } = imgInfo
        if (!url) throw new Error(`Image url is empty`)

        console.log('Your image url ', url)
        insertFn(url, alt, href)
    },

    // 自定义上传 ctrl + v 的时候也是在这里调用
    customUpload (file , insertFn) {
      console.log('customUpload', file)
        return new Promise((resolve) => {
          // Simulate async insert image
          setTimeout(() => {
            const src = `https://www.baidu.com/img/flexible/logo/pc/result@2.png?r=${Math.random()}`
            insertFn(src, 'baidu logo', src)
            resolve('ok')
          }, 500)
        })
    },
    // 自定义选择图片
    customBrowseAndUpload(insertFn) {
      console.log('自定义选择图片')
      let input = document.createElement('input')
      input.setAttribute('type', 'file') 
      input.setAttribute('accept', '*')
      input.click()
      input.onchange = function () {
        console.log(this.files)
        let file = this.files[0]
        blobToDataUri(file, base => {
          insertFn(base,'base',base)
        })
      // setTimeout(() => {
      //   const src = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
      //   insertFn(src,'baidu logo',src)
      // }, 5e2);
      }
      
    }
  }
  
  // 图片校验 
  /*
    1. 返回 true ，说明检查通过，编辑器将正常插入图片
    2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
  */
  function customCheckImageFn(src, alt, url) {
    console.log('check',src)
    if (!src) return 
    // if (src.indexOf('http') !== 0) return 
    return true 
  }
  // 转换图片链接
  function customParseImageSrc(src) {
    console.log('parse',src)
    // if (src.indexOf('http') !== 0)   return `http://${src}`
    return src
  }
  
  // 图片插入 
  const insertImage = {
    onInsertedImage(imageNode) {
      console.log('insert',imageNode)
      if (!imageNode) return 
      let { src, alt, url, href } = imageNode
      console.log('insert img' , src , alt , url , href)
    },
    checkImage: customCheckImageFn,
    parseImageSrc : customParseImageSrc
  }

  // 图片编辑
  const editImage = {
    onUpdatedImage(imageNode) {
      console.log('edit', imageNode)
      if (!imageNode) return 
      let { src, alt, url, href } = imageNode
      console.log('insert img' , src , alt , url , href)
    }, 
    checkImage: customCheckImageFn,
    parseImageSrc : customParseImageSrc
  }

  // 自定义视频校验
  function customCheckVideoFn(src, poster) {
    console.log('check',src)
    if (!src) return 
    return true 
  }
  // 自定义视频转换
  function customParseVideoSrc(src) {
    console.log('parse',src)
    if (!src) return 
    return src 
  }

  // 插入视频
  const insertVideo = {
    onInsertedVideo(videoNode) {
      console.log('insert',videoNode)
      if (!videoNode) return 
      
    },
    checkVideo: customCheckVideoFn,
    parseVideoSrc:customParseVideoSrc
  }

  const uploadVideo = {
    server: 'upload/video',
    timeout: 5e3,
    fieldName: 'custom-fileName',
    meta: { token: 'token str', other: 'other params' },
    metaWithUrl: true,
    headers: { Accept: 'text/x-json' },
    maxFileSize: 5 * 1e3 * 1e4,
    onBeforeUpload(file) {
      console.log('before', file)
      return file
    },
    onProgress(progress) {
      console.log('progress',progress)
    },
    onSuccess(file, res) {
      console.log('success',file,res)
    },
    onFailed(file, res) {
      console.log('failed',file,res)
    },
    onError(file, err, res) {
      console.error('error',file,err,res)
    },
    // 自定义插入
    customInsert(res, insertFn) {
      console.log('customInsert', res)
      const videoInfo = res.data || {}
      const { url, poster } = videoInfo
      if (!url) throw new Error(`Video url is empty`)

      console.log('Your video url ', url)
      insertFn(url, poster)
    },
    // 自定义上传
    customUpload(file, insertFn) {
      console.log('customUpload', file)

      return new Promise((resolve) => {
        // Simulate async insert video
        setTimeout(() => {
          const src = `https://www.w3school.com.cn/i/movie.ogg`
          const poster = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
          insertFn(src, poster)
          resolve('ok')
        }, 500)
      })
    },
    // 自定义选择
    customBrowseAndUpload(insertFn) {
      console.log('自定义选择视频')
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', '.mp4,.avi')
      input.click()
      input.onchange = function () {
        let file = this.files[0]
        console.log(file)
        let src = 'https://v2.sohu.com/v/url/449095179_121092871.MP4'
        insertFn(src,'mp4')
      }
    },
  }

  const MENU_CONF = {
    insertImage,
    editImage,
    uploadImage,

    insertVideo,
    uploadVideo
  }

  const toolbarConfig = {}, editorConfig = {

    placeholder: '请输入内容....',
    MENU_CONF
  }
  
  useEffect(() => {
    if (editor) {
      let toolbar = DomEditor.getToolbar(editor) 
      const allMenu = editor.getAllMenuKeys()
      if(!toolbar) return
      const curToolbarConfig = toolbar.getConfig()
      console.log('当前菜单',editor ,allMenu)
      console.log('当前工具栏',toolbar , curToolbarConfig , curToolbarConfig.toolbarKeys) 
    }
    return () => {
      if (!editor) return 
      editor.destroy()
      setEditor(null)
    }
  },[editor])

  return (
    <div className="flex flex-dir-c">
      <p><a href="https://github.com/wangeditor-team/server/blob/main/src/index.js"> wangeditor-react 上传相关 demo</a></p>
      <div style={{ border: '1px solid red',width:'600px', zIndex: 100 }}>
        <Toolbar editor={editor} defaultConfig={toolbarConfig} mode='default' style={{ borderBottom: '1px solid #ccc' }} /> 
        <Editor defaultConfig={editorConfig} value={html} onCreated={setEditor} onChange={editor => setHtml(editor.getHtml())} mode='default' style={{height:'500px',overflowY:'hidden'}} />
      </div>
      <div style={{ marginTop: '20px' }}>{ html }</div>
    </div>
  )
}


// export default class WangEdit extends Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     return (<span> wang edit</span>)
//   }
// }


