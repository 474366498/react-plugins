
import React from "react"

import { Editor } from "@tinymce/tinymce-react"

 // tinymce-react 功能包添加 start 

  import tinymce from 'tinymce/tinymce';

  // // Theme
  import 'tinymce/themes/silver';
  // // Toolbar icons
  import 'tinymce/icons/default';
  // // Editor styles
  import 'tinymce/skins/ui/oxide/skin.min.css';

  // importing the plugin js.
  import 'tinymce/plugins/advlist';
  import 'tinymce/plugins/autolink';
  import 'tinymce/plugins/link';
  import 'tinymce/plugins/image';
  import 'tinymce/plugins/lists';
  import 'tinymce/plugins/charmap';
  import 'tinymce/plugins/hr';
  import 'tinymce/plugins/anchor';
  import 'tinymce/plugins/searchreplace';
  import 'tinymce/plugins/wordcount';
  import 'tinymce/plugins/code';
  import 'tinymce/plugins/fullscreen';
  import 'tinymce/plugins/insertdatetime';
  import 'tinymce/plugins/media';
  import 'tinymce/plugins/nonbreaking';
  import 'tinymce/plugins/print';
  import 'tinymce/plugins/preview';
  import 'tinymce/plugins/media';
  import 'tinymce/plugins/visualblocks';
  import 'tinymce/plugins/paste';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/template';
  import 'tinymce/plugins/help';

  // Content styles, including inline UI like fake cursors
  // import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
  // import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';
  
 // tinymce-react 功能包添加 end 

 import {blobToDataUri} from '@/utils/file'
// 在react 中使用tinyMce富文本编辑器 https://www.ngui.cc/el/2831109.html?action=onClick
// tinymce 关于react https://www.tiny.cloud/docs/integrations/react/#configuringeditorsource 
export default  class ReactTinymce extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorValue : `来自 tinymce tinymce-react 组件`
    }
  }
  
  // 图片上传 success 中回调 上传返回地址
  imageUploadHandler = async (blobInfo, success, failure, progress) => {
    console.log(9, blobInfo, failure, blobInfo.blob(), blobInfo.filename())
    let blob = blobInfo.blob(), filename = blobInfo.filename() 
    
    let formData = new FormData()
    formData.append('file', blob, filename )
    blobToDataUri(blob, base64 => {
      console.log(65, base64)
      let img = `<img alt="${filename}" title="${filename}" src="${base64}" />`
      success(base64) // 
    }) 
    /*
    let res = await upload.file(formData)
    if(res.code === 200){
      success(res.data)
    }else{
      failure('图片上传失败！')
    }

    */
  }

  // 文件上传 图片 媒体 word...   http://tinymce.ax-z.cn/general/upload-images.php
  fileUploadCallback = (callback, value, meta) => {
    // let filetype = `.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4`
    // let uploadUrl = '' 
    console.log(79,value,meta)
    let filetype, uploadUrl;
    switch (meta.filetype) {
      case 'image':
        filetype = '.jpg , .jpeg , .png , .gif'
        uploadUrl = 'upload/image'
        break;
      case 'media':
        filetype = '.mp3 , .mp4 , .avi'
        uploadUrl = 'upload/media'
        break
      default:
        uploadUrl = 'upload/file'
        break;
    }
    
    let input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', filetype) 
    input.click()

    input.onchange = function (event) {
      console.log(100, input, event, this)
      let file = this.files[0]
      console.log(107, file)
      if (meta.filetype === 'image') {
        blobToDataUri(file, base64 => {
          // console.log(115, base64)
          callback(base64)
        })
      } else if(meta.filetype === 'media') {
        callback('https://v2.sohu.com/v/url/449095179_121092871.MP4')
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

  initInstanceCallback = edit => {
    // console.log(54, edit)
    edit.on('paste', env => {
      const items = (env.clipboardData || window.clipboardData).items,
        text = (env.clipboardData || window.clipboardData).getData('Text')
      console.log('ctrl+v', items, text)
      
      const formData = new FormData()

      let fileBase64, isSubmit = false 
      let mark = edit.selection.getBookmark()
      console.log(65,mark)
      let filename = `paste_${new Date().getTime()}.png` 
      for (let i = 0; i < items.length; i++) {
        let item = items[i], type = item.type 
        if (type.indexOf('image') !== -1) {
          const file = item.getAsFile() 
          let url = URL.createObjectURL(file)
          let base64 = blobToDataUri(file, base64 => {
            fileBase64 = base64
            console.log(74,edit)
            let oldVlaue = edit.getContent()
            let img = `<img alt="${filename}" title="${filename}" src="${base64}" />`
            // console.log(77, edit.getContent())
            // edit.setContent(oldVlaue+img)
            console.log(79,img)
            edit.execCommand('mceInsertContent',false,img) // 在光标处插入内容(内容为html字符)
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
  }

  handlerEditorChange = (val) => {
    console.log(12, val)
    this.setState({
      editorValue : val
    })
  }

  render() {
    const tinymceOptions = {
      width:600,
      height: 500,
      menubar: 'file edit view insert format tools table',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | image media | codesample | code | preview print | fullscreen | help',
      codesample_languages: [
        {text:'HTML/XML',value:'markup'},
        {text:'JavaScrip',value:'javascript'},
        {text:'CSS',value:'css'},
        {text:'PHP',value:'php'},
        {text:'RUBY',value:'ruby'},
        {text:'Python',value:'python'},
        {text:'Java',value:'java'},
        {text:'C',value:'c'},
        {text:'#C',value:'csharp'},
        {text:'C++',value:'cpp'},
        {text:'Scala',value:'scala'},
      ],
      language: 'zh_CN',
      image_uploadtab: true,  
      media_live_embeds:true,
      // skin: false,
      // content_css : false ,
      // file_picker_type:'media',
      images_upload_handler: this.imageUploadHandler,
      file_picker_callback:this.fileUploadCallback ,
      init_instance_callback: this.initInstanceCallback,
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }
    let {editorValue} = this.state
    return (
      <Editor
        apiKey="3bvc8kldt03l1fjpcrfrmw9vsj1uomexs6ungqportdrrsm2"
        initialValue={editorValue}
        init={tinymceOptions}
        onEditorChange={this.handlerEditorChange}
      />
    )
  }

}