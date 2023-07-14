import React , { Component ,createRef } from "react";

import {createEditor , createToolbar, DomEditor} from '@wangeditor/editor'

import { blobToDataUri } from "@/utils/file";


import ToolbarComponent from './toolbar'

import EditorComponent from './editor'

export default class UseWangEditor extends Component  {
  constructor(props) {
    super(props)
    let toolbarConfig = props?.toolbarConfig || { } 
    let editorConfig = props?.editorConfig || {} 
    let menuConfig = props?.menuConfig || {} 
    let value = props?.defaultValue || `<p> 未输入默认值 </p>`

    let toolbarKeys =  [
      "headerSelect",
      "blockquote",
      "|",
      "bold",
      "underline",
      "italic",
      {
          "key": "group-more-style",
          "title": "更多",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path></svg>",
          "menuKeys": [
              "through",
              "code",
              "sup",
              "sub",
              "clearStyle"
          ]
      },
      "|",
      "color",
      "bgColor",
      "|",
      "fontSize",
      "fontFamily",
      "lineHeight",
      "|",
      "bulletedList",
      "numberedList",
      "todo",
      {
          "key": "group-justify",
          "title": "对齐",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
          "menuKeys": [
              "justifyLeft",
              "justifyRight",
              "justifyCenter",
              "justifyJustify"
          ]
      },
      {
          "key": "group-indent",
          "title": "缩进",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
          "menuKeys": [
              "indent",
              "delIndent"
          ]
      },
      "|",
      "emotion",
      "insertLink",
      {
          "key": "group-image",
          "title": "图片",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
          "menuKeys": [
              "insertImage",
              "uploadImage"
          ]
      },
      {
          "key": "group-video",
          "title": "视频",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z\"></path></svg>",
          "menuKeys": [
              "insertVideo",
              "uploadVideo"
          ]
      },
      "insertTable",
      "codeBlock",
      "divider",
      "|",
      "undo",
      "redo",
      "|",
      "fullScreen"
      ]
      
      let uploadImage = {
        customUpload (file,insertFn) {
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
              insertFn(base, 'base', base)
            })
            // setTimeout(() => {
            //   const src = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
            //   insertFn(src,'baidu logo',src)
            // }, 5e2);
          }
        }
      }
    
    let uploadVideo = {
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
    
    let MENU_CONF = {
      uploadImage,
      uploadVideo
    }

    const defaultConfig = {
      placeholder: '请输入内容....',
      toolbarKeys,
      MENU_CONF
    }
    this.state = {
      toolbarConfig ,
      editorConfig ,
      menuConfig,
      value,
      defaultConfig ,
      editor : null 
    }
  }
  componentDidMount() {
    console.log(52,'componentDidMount')

    // let {editorRef} = this 
    // let {
    //   toolbarConfig,
    //   editorConfig ,
    //   menuConfig,
    //   value ,
    //   editor
    // } = this.state 
    // if (!editorRef.current) return 
    // if (editor !== null) return 
    // if(editorRef.current?.getAttribute('data-w-e-textarea')) return 
    // console.log(32,editorRef.current)
    //   let _editor = createEditor({
    //     selector: editorRef.current,
    //     html: value,
    //     config: editorConfig,
    //     mode:'default'
    //   })
    // this.setState({
    //   editor : _editor
    // })
  }
  componentWillUpdate() {
    console.log(52,'componentWillUpdate')
  }
  componentDidUpdate() {
    let { editor } = this.state
    if (!editor) return 
    console.log(52,'componentDidUpdate')
    setTimeout(() => {
      let toolbar = DomEditor.getToolbar(editor) 
      console.log(50,editor , toolbar )
    }, 5e2);
  }
  
  render() {
    let { editor , defaultConfig , value} = this.state
    return (
      <div className="flex flex-dir-c" >
        <p><a href="https://github.com/wangeditor-team/wangEditor-for-react/blob/main/src/components/Editor.tsx"> wangEditor-for-react git源码</a></p>
        <div className="flex flex-dir-c" style={{width:'520px',border:'1px solid red'}}>

          <ToolbarComponent editor={editor} defaultConfig={ defaultConfig } />
          <EditorComponent defaultConfig={defaultConfig} defaultHtml={value} onCreated={e => this.setState({ editor: e })} onChange={ e => this.setState({value:e})} style={{height:'500px',overflowY:'auto',borderTop:'1px solid red'}} />
        </div>
      </div>
    )
  }
}
