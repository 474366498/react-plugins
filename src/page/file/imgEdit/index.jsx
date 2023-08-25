
import { useRef, useState} from 'react' 
import Cropper  , { ReactCropperElement} from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Button, message } from 'antd'
import { useEffect } from 'react'

import UserCropper from './userCropper'
let image = require('@/assets/2022_xxfw_header_bj.png')
const images = [
  image , 
  'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg',
  'https://dss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/331.jpg',
  'https://cstore-public.seewo.com/faq-service/4e3f2924f1d4432f82e760468bf680f0'
  ,'https://cvte-dev-public.seewo.com/faq-service-test/4db524ec93324794b983bf7cd78b2ae1'
  ,'https://cvte-dev-public.seewo.com/faq-service-test/bfdcc5337dfb43ce823a4c9743aba99c'
  , 'https://cvte-dev-public.seewo.com/faq-service-test/bc87ceeb7b1a473da41e025e656af966',
]
function ImgEdit() {

  const [image , setImage] = useState(null)
  const cropperRef = useRef('') 
  const [messageApi, contextHolder] = message.useMessage()
  
  useEffect(() => {
    // console.log(21, image)
    if (!image) {
      let xhr = new XMLHttpRequest() 
      xhr.open('get', images[0])
      xhr.responseType = 'blob'
      xhr.onload = function () { 
        let blob = xhr.response 
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = function (e) {
          // console.log(33,e)
          let base = reader.result 
          // console.log(35,base)
          setImage(base)
        }
      }
      xhr.send()
    }
  },[image])

  const onChange = (e) => {
    e.preventDefault()
    let files 
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files 
    }
    const reader = new FileReader()
    reader.onload = function () {
      // console.log(28,reader.result)
      setImage(reader.result)
    }
    reader.readAsDataURL(files[0])
  }
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper 
    // console.log(16,cropper)
  }

  const onSave = () => {
    const cropper = cropperRef.current?.cropper 
    var data = '', file
    console.log(image , data,cropper)
    if (image ) {
      data = cropper.getCroppedCanvas().toDataURL()  
      file = baseToFile(data)
    } else {
      messageApi.info('请上传图片文件');
    }
    
  }
  function baseToFile(base, filename='what') {
    let arr = base.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n) 
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr],'what',{type:mime})
  }
  console.log(12, Cropper)
  
  return (<div className="flex flex-dir-c flex-ai-c">
    <p>
      还有个 react-advanced-cropper (react + vue )
      <a href="https://www.npmjs.com/package/react-advanced-cropper"> npm react-advanced-cropper</a>
      <a href="https://advanced-cropper.github.io/react-advanced-cropper/docs/guides/recipes/">react-advanced-cropper doc </a>
      <a href="https://advanced-cropper.github.io/react-advanced-cropper/#default-cropper">react-advanced-cropper demo</a>
    </p>
    <div className="flex flex-dir-c flex-ai-c flex-jc-c">
      <input type='file' onChange={onChange} /> 
      <Cropper 
        src={image}
        style={{height:400,width:'100%'}}
        initialAspectRatio={16 / 9}
        aspectRatio={1} 
        viewMode={1}
        minContainerHeight={10}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={true}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
        />
      <Button onClick={ onSave}>save</Button>
    </div>
    <UserCropper  />
    {contextHolder}
  </div>)
}

export default ImgEdit
