
import { Component, createRef } from 'react'
import { blobToDataUri } from '../../../utils/file'

// https://www.cnblogs.com/katydids/p/12676111.html
export default class UseTinymce extends Component {
  constructor(props) {
    super(props)
    let menubar = props?.menubar || 'file edit insert view format table tools help',
      plugins = props?.plugins || [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar = props?.toolbar || 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | image media | codesample | code | preview print | fullscreen | help',
      height = props?.height || 500,
      width = props?.width || 600,
      value = props?.defaultValue || 'props 没有传入 defaultValue',
      onEditorChange = props?.onEditorChange || function (e) { console.log('on~change', e) }

    let tinymceId = `editor-tinymce-${this.props.id ? this.props.id : new Date().getTime()}`
    this.state = {
      tinymceId,
      editor: null,
      menubar,
      plugins,
      toolbar,
      height,
      width,
      language: 'zh_CN',
      value,
      onEditorChange
    }
  }

  componentDidMount() {
    console.log(28, window.tinymce)
    let {
      tinymceId,
      menubar,
      plugins,
      toolbar,
      height,
      width,
      language,
      value,
      onEditorChange
    } = this.state

    window.tinymce.init({
      selector: `#${tinymceId}`,
      language,
      height,
      width,
      min_height: 400,
      resize: true,
      menubar,
      plugins,
      toolbar,
      media_live_embeds: true,
      init_instance_callback: editor => {
        console.log(51, editor)
        if (value) {
          editor.setContent(value)
        }
        editor.on('beforeinput', () => {
          console.log('beforeinput')
        })
        editor.on('focus input blur', () => {
          console.log('focus blur', editor.getContent())
          let value = editor.getContent()
          this.setState({
            value
          })
        })
        editor.on('paste', event => {
          console.log('paste', event)
          let items = (event.clipboardData || window.clipboardData).items
          let text = (event.clipboardData || window.clipboardData).getData('Text')

          const formData = new FormData()
          let fileBase64, isSubmit
          let filename = `paste_${new Date().getTime()}.png`
          for (let i = 0; i < items.length; i++) {
            let item = items[i], type = item.type
            if (type.indexOf('image') !== -1) {
              const file = item.getAsFile()
              // let url = URL.createObjectURL(file) 
              blobToDataUri(file, base64 => {
                fileBase64 = base64
                console.log(base64)
                let img = `<img alt="${filename}" title="${filename}" src="${base64}" />`
                editor.execCommand('mceInsertContent', false, img)
              })

              let newFile = new File([file], filename, { type: file.type })
              formData.append('file', newFile)
              isSubmit = true
            }

          }
          if (!isSubmit) {
            console.log('没有图片 不用上传')
          } else {
            console.log('调用图片上传 上传成功后通过 edit.getContent().replace(fileBase64:base图片src , fileUrl:上传成功的返回图片路径)')
          }
        })
      },
      paste_enable_default_filters: true,
      images_upload_handler: (blobInfo, success, failure) => {
        console.log(64, blobInfo)
        let blob = blobInfo.blob(), filename = blobInfo.filename()
        let formData = new FormData()
        formData.append('file', blob, filename())
        blobToDataUri(blob, base64 => {
          success(base64)
        })
        /*
          let res = await upload.file(formData)
          if(res.code === 200){
            success(res.data)
          }else{
            failure('图片上传失败！')
          }
        */
      },
      file_picker_callback: (cb, value, meta) => {
        let filetype, uploadUrl
        switch (meta.filetype) {
          case 'image':
            filetype = ` .jpg , .jpeg , .png , .gif `
            uploadUrl = 'upload/image'
            break;
          case 'media':
            filetype = ` .mp3 , .mp4 , .avi `
            uploadUrl = 'upload/media'
            break;
          default:
            uploadUrl = 'upload/file'
            break;
        }
        console.log(129, meta, value)
        let input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', filetype)
        input.click()
        input.onchange = function () {
          let file = this.files[0]
          console.log(107, file)
          if (meta.filetype === 'image') {
            blobToDataUri(file, base64 => {
              // console.log(115, base64)
              cb(base64)
            })
          } else if (meta.filetype === 'media') {
            cb('https://v2.sohu.com/v/url/449095179_121092871.MP4')
          } else {
            console.log('没有遇到 遇到再说...')
          }

          /* 正常调用
          let xhr, formData = new FormData() 
          formData.append('file', file, file.name );
          
          xhr = new XMLHttpRequest()
          xhr.withCredentials = false 
          xhr.open('POST', uploadUrl)
          xhr.onload = function() {
              var json;
              if (xhr.status != 200) {
                  console.log('HTTP Error: ' + xhr.status);
                  return;
              }
              json = JSON.parse(xhr.responseText);
              if (!json || typeof json.location != 'string') {
                  console.log('Invalid JSON: ' + xhr.responseText);
                  return;
              }
              callback(json.location);
          }; 
          
          xhr.send(formData);
          */

        }
      }
    }).then(res => {
      console.log(73, res)
      this.setState({
        editor: res[0]
      })
    })
  }

  componentWillUnmount() {
    let { editor } = this.state
    if (!editor) return
    editor?.destroy()
    this.setState({ editor: null })
  }

  render() {
    let { tinymceId } = this.state
    return (
      <textarea id={tinymceId} value="aljfdlksajfklasjd"></textarea>
    )
  }
}




