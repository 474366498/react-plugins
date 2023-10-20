
import React, { useState } from 'react'
import * as H2C from 'html2canvas'


export default function ScreenCanvas() {

  const [visible, setVisible] = useState(false),
    [images, setImages] = useState([]),
    [index, setIndex] = useState(0),
    [recordInterval, setRecordInterval] = useState(null)
  var replayInterval = null
  const baseImg = []
  const FPS = 30, interval = 1e3 / FPS

  const handleStart = async (e) => {
    reset()
    let timer = setInterval(() => {
      if (images.length > 2e2) {
        handleStop()
        return
      }
      H2C(document.body).then(canvas => {
        let img = canvas.toDataURL()
        // console.log(25, baseImg, img)
        baseImg.push(img)
        setImages(baseImg)
      })
    }, interval);
    setRecordInterval(timer)
  },
    handleStop = e => {
      console.log(33, images, recordInterval)
      recordInterval && clearInterval(recordInterval) && setRecordInterval(null)
    },
    handleReplay = e => {
      handleStop()
      let i = index
      replayInterval = setInterval(() => {
        if (i >= images.length - 1) {
          clearInterval(replayInterval)
          return
        }
        i++
        setIndex(i)
      }, interval);
    },
    reset = e => {
      // state = {
      //   visible: false,
      //   images: [],
      //   num: 0,
      //   recordInterval: null,
      //   replayInterval: null
      // }
      setVisible(false)
      setIndex(0)
      setImages([])
    }


  return (
    <div className="flex flex-dir-c flex-ai-c">
      <div className="flex flex-jc-c">
        <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => handleStart(e)}> 开启录制 </button>
        <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => handleStop(e)}> 停止录制 </button>
        <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => handleReplay(e)}> 播放录制 </button>
      </div>
      {images.length > 0 ? <img style={{ width: '200px', height: 'auto' }} src={images[index | 0]} /> : <p>未加载图片</p>}
      {index} {images.length}
      <p>canvas 截图有较多局限之处，例如无法绘制动画、样式错位、不支持部分CSS样式等；</p>

      <p>截图性能开销较大，可能会导致掉帧，例如我们在尝试中 css 动画有非常明显的卡顿等；</p>

      <p>截图资源体积大，我们尝试中截图时单张图片体积为200k左右，以24帧来算一分钟录制的图片体积将近300MB，对带宽和资源存储都是浪费；</p >

      <p>在需要忽略的元素上增加 data - html2canvas - ignore 属性或者设置 ignoreElements 属性删除特定元素可以对某些特定数据或内容进行脱敏，但会直接删除元素无法做到“有占位但无内容”效果，影响页面布局。</p >
    </div>
  )
}