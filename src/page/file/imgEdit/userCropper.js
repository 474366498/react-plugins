

import { Button, InputNumber } from "antd"
import { useEffect, useRef, useState } from "react"
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

var cropperObj = null


function UserCropper({ path, width, height, scale }) {
  path = path || require('@/assets/2022_xxfw_header_bj.png')
  console.log(10, path)
  const imgRef = useRef(),
    [image, setImage] = useState(path),
    [loading, setLoading] = useState(true),
    [rotate, setRotate] = useState(0)


  const defaultOptions = {
    width: width || 400,
    height: height || 400,
    scale: scale || 1,
    viewMode: 0,  // 0~3
    dragMode: 'crop', // crop move none 
    initialAspectRatio: NaN,
    aspectRatio: NaN,
    responsive: true,           // 窗口变化是不是重新渲染
    restore: true,              // 窗口变化是否恢复裁剪的区域
    checkCrossOrigin: false,     // 是否检查为跨域图片
    checkOrientation: true,     // 检查当前图片的Exif 信息中的orientation 信息 没有多大用
    modal: true,                // 是否展示蒙版
    guides: true,               // 裁剪的虚线
    center: true,             // 裁剪中心点
    highlight: true,         // 白色蒙版
    background: true,        // 网格背景
    autoCrop: true,       // 初始化自动裁剪图片
    autoCropArea: .8,    // 定义裁剪区域占图片百分比
    movable: true,       // 是否可移动
    rotatable: true,       // 是否可旋转
    scalable: true,         // 是否可以以中心进行缩放
    zoomable: true,         // 是否可以以边角进行缩放
    zoomOnTouch: true,    // 是否可以拖动进行缩放
    zoomOnWheel: true,    // 是否可以通过鼠标轮进行缩放
    wheelZoomRatio: .1,    // 鼠标轮进行缩放比例
    cropBoxMovable: true,   // 是否可通过拖动移动裁剪框
    cropBoxResizable: true,    //是否可通过拖动调整裁剪框大小
    toggleDragModeOnDblclick: true,    // 是否可双击切换 crop move方式
    minContainerWidth: 200,    // 裁剪框最小宽度
    minContainerHeight: 200,    //裁剪框最小高度
    minCanvasWidth: 0,    //图片canvas 最小宽度
    minCanvasHeight: 0,    //图片canvas 最小高度
    minCropBoxWidth: 0,    // 裁剪框最小宽度 相对于页面
    minCropBoxHeight: 0,    // 裁剪框最小高度 相对于页面
    ready: function () { },
    cropstart: function () { },
    cropmove: function () { },
    cropend: function () { },
    crop: function () { },
    zoom: function () { }
  }

  const options = {
    width: 800,
    height: 'auto',
    viewMode: 1,
    dragMode: 'move',
    initialAspectRatio: 1,
    aspectRatio: NaN,
    // preview :'' ,
    responsive: true,
    background: false,
    // autoCropArea: 0.6,
    modal: true,
    center: true,
    autoCrop: false,
    autoCropArea: 0.6,
    movable: true,
    rotatable: true,
    scalable: true,
    zoomOnWheel: true,
    minContainerWidth: 800,
    minCanvasWidth: 0.5,
    minCropBoxWidth: 0.5,
    ready: function (e) {
      console.log('ready', e)
      if (e) setLoading(false)
    },
    move: function (e) {
      // console.log('move', e)
    },
    cropstart: function (e) {
      // console.log('cropstart', e)
    },
    cropmove: function (e) {
      // console.log('cropmove',e)
    },
    cropend: function (e) {
      // console.log('cropend', e)
    },
    crop: function (e) {
      // console.log(220,e.detail.rotate , rotate )
    },
    zoom: function (e) {
      console.log('zoom', e, e.detail.ratio)
    }
  }

  useEffect(() => {
    console.log(38, image)
    init()
  }, [image])

  const init = () => {
    if (cropperObj) return
    let img = imgRef.current
    console.log(117, cropperObj)
    cropperObj = new Cropper(img, options)
    console.log(119, img, cropperObj)
  }

  const onChangeDragMode = key => {
    if (!cropperObj) return
    console.log(121, key, cropperObj)
    cropperObj.setDragMode(key)
  },
    onHandleMove = (x, y) => {
      if (!cropperObj) return
      cropperObj.move(x, y)
    },
    onHandleRotate = (r) => {
      if (!cropperObj) return
      console.log(cropperObj, r)
      let _r = rotate + r
      setRotate(_r)
      cropperObj.rotate(r)
      let {
        naturalWidth,
        width,
        naturalHeight,
        height
      } = cropperObj.getImageData()
      let _rotate = cropperObj.getImageData().rotate
      cropperObj.zoomTo(_rotate % 180 === 0 ? width / naturalHeight : height / naturalWidth)
    },
    onHandleRotateNumber = (e) => {
      if (!cropperObj) return
      setRotate(e)
      cropperObj.rotateTo(e)
      console.log(140, e)
    }

  const onSave = () => {
    console.log('save')
    if (!cropperObj) return
    let canvasData = cropperObj.getCroppedCanvas({
      imageSmoothingQuality: 'high',
      fillColor: '#ffffff'
    }).toDataURL()
    let canvasFile = baseToFile(canvasData)
    console.log(154, canvasData, canvasFile)


  },
    onReset = () => {
      cropperObj && cropperObj.destroy()
      console.log(168, cropperObj)
      setTimeout(() => {
        cropperObj = null
        init()
      }, 1e2);
    }

  function baseToFile(base, filename = 'what') {
    let arr = base.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], 'what', { type: mime })
  }

  return (
    <div className="flex flex-dir-c flex-jc-c">
      <div>
        <a target='_blank' href="https://blog.csdn.net/qq_41926416/article/details/121331665">cropperJs 中文</a>
        <a target='_blank' href="https://www.npmjs.com/package/cropperjs"> cropperJs npm </a>
      </div>
      <div className="edit-main">
        <img className="edit-img" width={options.width + 'px'} height="auto" ref={imgRef} src={image} />
        {
          loading ? <div> loading... </div> : null
        }
      </div>

      <br />
      <div className="flex flex-jc-sa flex-jc-c edit-opts">
        <Button.Group>
          <Button onClick={e => onChangeDragMode('move')}> move </Button>
          <Button onClick={e => onChangeDragMode('crop')}> crop </Button>
        </Button.Group>
        <Button.Group>
          <Button onClick={e => onHandleMove(-10, 0)}>a</Button>
          <Button onClick={e => onHandleMove(10, 0)}>d</Button>
          <Button onClick={e => onHandleMove(0, -10)}>w</Button>
          <Button onClick={e => onHandleMove(0, 10)}>s</Button>
        </Button.Group>
        <Button.Group>
          <Button onClick={e => onHandleRotate(-90)}>左旋</Button>
          <InputNumber value={rotate} onChange={e => onHandleRotateNumber(e)}></InputNumber>
          <Button onClick={e => onHandleRotate(90)}>右旋</Button>
        </Button.Group>
        <Button.Group>
          <Button onClick={e => onSave()}>save</Button>
          <Button onClick={e => onReset()}>reset</Button>
        </Button.Group>
      </div>
    </div>
  )

}


export default UserCropper


