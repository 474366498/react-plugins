

import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom'
import {Button , Form, Image , InputNumber , Modal, Upload } from 'antd'
import { UploadOutlined , InboxOutlined } from '@ant-design/icons';




import Quill from 'quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react' // https://blog.csdn.net/qq_39634880/article/details/129809551 
import { ImageDrop } from 'quill-image-drop-module'
import QuillBetterTable from 'quill-better-table'

import expandIcons from './expand/ui/icons'

import EmojiBlot from './expand/blot/emoji'

import { blobToDataUri } from '@/utils/file';
// toolbar 图标扩展
const icons = Quill.import('ui/icons')
icons.emoji = expandIcons.emoji
icons.image_upload = expandIcons.image_upload
icons.video_upload = expandIcons.video_upload
icons.better_table = expandIcons.table

// 注册功能模块
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);
Quill.register({'modules/better-table':QuillBetterTable},true)

//  注册格式输入方式
Quill.register('formats/emoji',EmojiBlot)
console.log('useQuill-9',  Quill , ImageResize )

export default class UseQuillEditor extends Component {
  constructor(props) {
    super(props)
    
    this.editor = null 
    this.options = {
      // debug: props?.debug || 'info',
      theme: props?.theme || 'snow',
      modules: {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],        // 切换按钮
            ['blockquote', 'code-block'],

            // [{ 'header': 1 }, { 'header': 2 }],               // 用户自定义按钮值
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // 上标/下标
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // 减少缩进/缩进
            [{ 'direction': 'rtl' }],                         // 文本下划线

            [{ 'size': ['small', false, 'large', 'huge'] }],  // 用户自定义下拉
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // 主题默认下拉，使用主题提供的值
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'image_upload', 'video','video_upload'],
            ['better_table','emoji'],
            ['clean']                                         // 清除格式
          ],
          handlers: {
            emoji: this.showEmojiModel.bind(this) ,
            image_upload: this.showImageUploadModal.bind(this),
            video_upload : this.showVideoUploadModal.bind(this),
            better_table : this.showBetterTableModal.bind(this)
            // 'video': this.showVideoModel.bind(this) ,
          }
        },
        imageResize: {
          parchment: Quill.import('parchment'),
          //  先不要Toolbar这个图片位置调整的按钮，下次初始化编辑的时候会导致style样式丢失
          modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        },
        imageDrop: true,
        // table start 
        table: false,
        'better-table': {
          operationMenu: {
            items: {
              unmergeCells: {
                text: 'Another unmerge cells name'
              }
            },

            color: {
              colors: ['red', 'green', 'yellow', 'white', 'red', 'green', 'yellow', 'white']
            }
          }
        },
        keyboard: {
          bindings: QuillBetterTable.keyboardBindings
        }
        // table end 
      }
    }
    this.defaultValue = `<p>Hello World! 扩展</p><p>Some initial <strong>bold</strong> text</p><p>33</p>`
    this.state = {
      imageModal: false,
      videoModal: false,
      tableModal : false 
    }
  }
  // 表情 emoji
  showEmojiModel(e) {
    console.log(e, this)
    const index = this.editor.getSelection().index 
    this.editor.insertEmbed(index, 'emoji', {
      url: 'https://p2.music.126.net/6foZcR0P2Pdw0HRIdV1aiQ==/109951165914949830.jpg?param=300x300',
      width:'32px'
    })
  }
  // 图片上传 modal 
  showImageUploadModal() {
    this.setState({ imageModal: true })
    // this.editor.insertEmbed(0, 'image', 'https://p2.music.126.net/6foZcR0P2Pdw0HRIdV1aiQ==/109951165914949830.jpg?param=300x300','image')
    
  }
  // 图片上传回调
  onHandlerImageUploadChange({status , file}) {
    this.setState({ imageModal: false })
    if(!status || !file || !file.src) return
    let { src , width , height , name} = file 
    let index = this.editor.getSelection().index 
    // console.log(79,index, file,src)
    this.editor.insertEmbed(index || 0, 'image', src, 'image')
  }
  // 视频
  showVideoUploadModal() {
    this.setState({ videoModal: true })
    // this.editor.insertEmbed(0, 'video', 'https://v2.sohu.com/v/url/449095179_121092871.MP4','video')
  }
  onHandlerVideoUploadChange({ status }) {
    console.log(this.editor)
    this.setState({videoModal:false})
    if(!status) return 
    let index = this.editor.getSelection()?.index || 0
    this.editor.insertEmbed(index || 0, 'video', 
      'https://v2.sohu.com/v/url/449095179_121092871.MP4',
      )
  }

  showBetterTableModal(e) {
    console.log(133, e)
    this.setState({tableModal:true})
  }

  onHandlerTableCallback({ status , data}) {
    if (status) {
      let tableModule = this.editor.getModule('better-table')
      console.log(tableModule, data)
      console.log('%c因quill 版本无法执行 tableModule.insertTable(data.col,data.row)','background-color:pink;color:red;font-weight:bold')
      return 
      // tableModule.insertTable(data.col,data.row)
    }
    this.setState({tableModal:false})
  }
  componentDidMount() {
    console.log(12,this.editorRef)
    if (this.editor) return 
    let el = this.editorRef 
    let opts = this.options
    this.editor = new Quill(el, opts)

    this.editor.on('editor-change', (eventName, ...args) => {
      console.log(`%c${eventName}`,'background-color:pink')
      if (eventName === 'text-change') {
        console.log(`%ctext-change`, 'background-color:gray;color:red')
        console.dir( args )
      } else if (eventName === 'selection-change') {
        console.log('%cselection-change','color:red')
        console.dir( args )
      }
      let delta = this.editor.getContents(),
        text = this.editor.getText(),
        html = this.editor.root.innerHTML
      // console.log(89,delta , text , html)
      
      let {onEditorChange} = this.props
      if (onEditorChange && typeof onEditorChange === 'function') {
        onEditorChange({delta , text , html})
      }
    })

    //  ctrl / c + ctrl / v 
    this.editor.root.addEventListener('paste', event => {
      const files = (event.clipboardData || window.clipboardData).files 
      const text = (event.clipboardData || window.clipboardData).getData('Text')
      console.log(121, files , text)
      if (files && files.length > 0) {
        event.preventDefault()
        Array.from(files).forEach((file,i) => {
          console.log(128, file,i)
          uploadPasteImage(file, res => {
            console.log(res)
            let index = this.editor.getSelection().index 
            console.log(132,index)
            this.editor.insertEmbed(index || 0, 'image', res, 'image')
              
              
          })
        })
      } else {
        console.log('%c文字不管','color:red;font-weight:bold;')
      }
    })
    function uploadPasteImage(file, cb) {
      let xhr = new XMLHttpRequest() 
      let formData = new FormData() 
      formData.append('file', file)
      xhr.open('post', 'upload address')
      xhr.responseType = 'blob'
      xhr.onreadystatechange = () => {
        console.log(149,xhr)
        if (xhr.readyState == 4 && xhr.status === 200) {
          cb(xhr.response)
        } else if(xhr.readyState == 4 && xhr.status === 404) {
          blobToDataUri(file, base64 => {
            cb(base64)
          })
        }
      }
      // blobToDataUri(file, base64 => {
      //       cb(base64)
      //     })
      xhr.send()
    }
  }
  render() {
    return (
      <div>
        {this.state.imageModal
          ? ReactDOM.createPortal(<ImageUploadModal onChange={ e=> this.onHandlerImageUploadChange(e) }>button</ImageUploadModal>, document.documentElement)
          : null
        }
        {this.state.videoModal
          ? ReactDOM.createPortal(<VideoUploadModal onChange={ e=> this.onHandlerVideoUploadChange(e) }>button</VideoUploadModal>, document.documentElement)
          : null
        }
        {
          this.state.tableModal
            ? ReactDOM.createPortal(<BetterTableModal onCallback={e => this.onHandlerTableCallback(e)}>button</BetterTableModal>, document.documentElement)
            :null
        }
        <div ref={el => this.editorRef = el} id="editor" style={{ minHeight: '400px' }}>
          {
            this.defaultValue
              
              ? <span dangerouslySetInnerHTML={{__html:this.defaultValue}}></span>
              : <>
                <p>Hello World! 扩展 </p>
                <p>Some initial <strong>bold</strong> text</p>
                <p><br /> </p>
              </>
            }
          
        </div>

      </div>
    )
  }
}


const ImageUploadModal = (props) => {
  console.log(108,props)
  if(!props?.onChange) throw '请传入props.onChange 方法'
  const [file , setFile] = useState()
  const [form] = Form.useForm()
  const uploadProps = {
    name: 'file',
    accept:'.png , .jpg , .jpeg , .webp',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    // listType:'picture',
    // fileList ,
    onChange({file,fileList}) {
      // console.log(117, file)
      if (file.status !== 'uploading') {
        console.log('',file,fileList)
      }
      if (file.status === 'done') {
        console.log('success',file)
      } else if (file.status === 'error') {
        console.error('error',file)
      } else if (file.status === 'uploading') {
        console.log('uploading...',file.percent)
      }
    },
    beforeUpload(file, fileList) {
      console.log('before', file)

      return file.size < 2 * 1e5
    },
    customRequest(fileInfo) {
      console.log(127, fileInfo)

      blobToDataUri(fileInfo.file, base64 => {
        // let newFile = [{uid:new Date().getTime() , name : fileInfo.file.name , status :'done',url:base64}]
        console.log(150,form)
        let img = document.createElement('img')
        img.src = base64 
        img.onload = function () {
          console.log(147, img.width, img.height)
          let newFile = {
            name: fileInfo.file.name,
            width: img.width,
            height: img.height,
            scale:img.width / img.height,
            src : base64
          }
          console.log(162,form.getFieldsValue())
          form.setFieldsValue({
            width: img.width,
            height : img.height
          })
          setFile(newFile) 
        }
      })
    }
  }
  
  const 
    onHandleOk = () => { 
      props.onChange({status : true , file : file})
    } ,
    onHandleCancel = () => {
      props.onChange({status : false ,})
    }
  
  const getFormInfo = () => {
    console.log(183, form.getFieldsValue())
    form.setFieldValue({
      width: 1000,
      height:1000
    })
  },
    onChangeSize = (e, key) => {
      console.log(e, key)
      let newFile = Object.assign(file, { [key]: e })
      if (key === 'width') {
        newFile.height = newFile.width * (newFile?.scale||1)
      } else {
        newFile. width= newFile.height  * (newFile?.scale || 1)
      }
      form.setFieldsValue({
        width: newFile.width,
        height : newFile.height
      })
      setFile(newFile)
  }
  return (
      <Modal
        open={true}
        title='自定义上传图片'
        onOk={onHandleOk}
        onCancel={onHandleCancel}
      >
        <Form form={form}  autoComplete='off'>
          <div className='flex flex-jc-c'>
            {
              file 
                ? <Image width={200} src={file.src} />
                
                : <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            }
          </div>
          <div className='flex flex-jc-sb'>
            <Form.Item name="width" label='宽'><InputNumber onChange={e=>onChangeSize(e,'width')}/></Form.Item>
            <Form.Item name="height" label='高'><InputNumber onChange={e=>onChangeSize(e,'height')}/></Form.Item>
        </div>
        <Button onClick={ e=>getFormInfo(e)}>get~info</Button>
        </Form>
      </Modal>
    )
}


const VideoUploadModal = (props) => {
  console.log(108,props)
  if(!props?.onChange) throw '请传入props.onChange 方法'
  const [file, setFile] = useState()
  
  const uploadProps = {
    name: 'file',
    accept:'.mp4 , .avi ',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    // listType:'picture',
    // fileList ,
    onChange({file,fileList}) {
      console.log(117, file)
      if (file.status !== 'uploading') {
        console.log('',file,fileList)
      }
      if (file.status === 'done') {
        console.log('success',file)
      } else if (file.status === 'error') {
        console.error('error',file)
      } else if (file.status === 'uploading') {
        console.log('uploading...',file.percent)
      }
    },
    beforeUpload(file, fileList) {
      console.log('before', file)

      return file.size < 2 * 1e7
    }
  }
  
  const 
    onHandleOk = () => { 
      props.onChange({status : true })
    } ,
    onHandleCancel = () => {
      props.onChange({status : false ,})
    }
  

  return (
      <Modal
        open={true}
        title='自定义上传视频'
        onOk={onHandleOk}
        onCancel={onHandleCancel}
      >
        <div className='flex flex-jc-c'>
          <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Upload.Dragger>
          
        </div> 
      </Modal>
    )
}


const BetterTableModal = props => {
  if (!props?.onCallback) throw '请传入props.onCallback 方法'
  const [form] = Form.useForm()
  const onHandleOk = () => {
    let data = form.getFieldsValue()
    if (!data.col) {
      data = {
        col: 3,
        row : 3
      }
    }
    console.log(367,data)
    props.onCallback({status:true,data})
  },
  onHandleCancel = () => {
     props.onCallback({status:false,})
    }
  
  return (
    <Modal
      open={true}
      title='表格设置'
      onOk={onHandleOk}
      onCancel={onHandleCancel}
    >
      <Form form={form} autoComplete='off'>
        <div className='flex flex-jc-sa'>
          <Form.Item name='col' label='列'><InputNumber defaultValue="3" min="3" max="20" /></Form.Item>
          <Form.Item name='row' label='行'><InputNumber defaultValue="3" min="3" max="20" /></Form.Item>
        </div>
      </Form>
    </Modal>
  ) 
}
