
import React , { useState} from 'react'

import { Button , message , Upload } from 'antd'
var scale = 1 
export default function AutoCanvasPx() {
  const [base64 , setBase64] = useState() , [newB64,setNewB64] = useState() , [loading,setLoading] = useState(false)
  const onInputChange = e => {
    console.log(9, e)
    let files = e.target.files 
    let file = files[0] || null 
    setLoading(true)
    // filesToBase64(files)
    fileToBase(file)

  },
    onBase64Load = e => {
      // console.log(15, e,e.target.src)
      let img = e.target 
      img.style.transformOrigin = 'left'
      img.style.scale = scale = img.parentElement.clientWidth / img.width
      console.log(21,img.parentNode.clientWidth , img.width , scale)
      let canvas = document.createElement('canvas') ,
        ctx = canvas.getContext('2d') 
      canvas.width = img.width 
      canvas.height = img.height 
      ctx.drawImage(img, 0, 0) 
      let imgData = ctx.getImageData(0, 0, img.width, img.height).data 
      console.log(24, imgData, img.width, img.height, imgData.find((item, i) => item == 0 && i % 4 == 3))
      // createObserveCanvas(img.width,img.height,imgData)
      computedImgAngle(img , imgData) 
    //  computedImgData(img,imgData)
  }
  // 单文件转base64
  function fileToBase(f) {
    if (!f) {
      setLoading(false)
      return
    }
    console.log(149,f)
    let reader = new FileReader()
    reader.readAsDataURL(f)
    reader.onload = function (e) {
      let b = reader.result
      setBase64(b) 
    }
  }

  // 批量转图片为base64  
  function filesToBase64(files) {
    if (!files || !files?.length) {
      setLoading(false)
      return
    }
    console.time()
    for (let i = 0; i < files.length; i++) {
      let file = files[i] 
      if (/^image\/(jpeg|png)$/.test(file.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          createImage(reader.result,file)
        }
      }
    }
  }

  const createImage = (base64, file) => {
    console.log(58,base64,file)
    let image = document.createElement('img')
    image.src = base64 
    image.onload = function () {
      let  canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d') 
        canvas.width = image.width 
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)
      let imgData = ctx.getImageData(0, 0, image.width, image.height).data 
      console.log(66,imgData)
      computedImgData(image,imgData,file)
    }

  }
  /**
   * 计算角度
   * @param {*} img 原图片 image 
   * @param {*} imageData canvas getImageData imageData中的data
   * @param {*} color 颜色对比关键值
   * @param {*} copies 图片横向纵向 分割份数
   */
  function computedImgAngle(img, imageData, color = 192,copies=30) {
    const { width, height } = img 
    const part = {
      horizontal: Math.floor(width / copies), // 横向
      vertical : Math.floor(height / copies)  // 纵向
    }
    console.log(82,width,height,imageData.length )
    let index = 0 
    for (let i = 0; i < imageData.length / 4; i++) {
      let r = imageData[4 * i],
        g = imageData[4 * i + 1],
        b = imageData[4 * i + 2],
        a = imageData[4 * i + 3]
      // console.log(i,r,g,b)
      if (!(r >= color && g >= color && b >= color)) {
        index = i 
        console.log(i)
        break
      }
    }
    console.log(93, index) 
    let firstPos = {
      x: index % width ,
      y: Math.floor(index / width) 
    } 
    console.log(95,firstPos)
    
    const secondPos = findSecondPosition(imageData,width ,height , firstPos,part,color)
    console.log(116, secondPos)
    let a = Math.abs(firstPos.y - secondPos.y),
        c = Math.sqrt(Math.abs((firstPos.x ** 2 + firstPos.y ** 2) - (secondPos.x ** 2 + secondPos.y ** 2)))
    let sin = a / c
    let angle = firstPos.x < width / 2 ? - sin * 180 / Math.PI : sin * 180 / Math.PI 
    console.log(120, sin , a , c ,angle )
    let newImageData = imageData.map(i=>i)
   
    console.log(105,4*index)
    createObserveCanvas(width,height,newImageData,firstPos ,secondPos )
  }
  function findSecondPosition(data,width,height , pos,part ,color) {
    // console.log(124, data, pos, part)
    var index
    let x = pos.x < width /2 ? pos.x + part.horizontal : pos.x - part.horizontal
    while (!index) {
      let verticalData = [] 
      for (let i = 0; i < height; i++) {
        verticalData.push([
          data[4 * x + 4 * i * width],
          data[4 * x + 4 * i * width + 1],
          data[4 * x + 4 * i * width + 2]
        ])
      }
      index = verticalData.findIndex(([r,g,b])=>!(r>=color && g >= color && b >= color))
      // console.log(138,verticalData , index)
      x = pos.x < width/2 ? x + part.horizontal :  x - part.horizontal
    }
    return {
      x,
      y:index 
    }
  }
  // 创建一个观察canvas 
  const createObserveCanvas = (w, h, imgData, pos,Pos,size=4) => {
    // console.log(110, imgData[index])
    for (let i = 0; i < size; i++){
      for (let j = 0; j < size; j++) {
        let index = 4 * w * (pos.y + j) + 4 * pos.x + 4 * i,
            next = 4 * w * (Pos.y + j) + 4 * Pos.x + 4 * i
        imgData[index] = 255 
        imgData[index+1] = 0 
        imgData[index + 2] = 0 

        imgData[next] = 255 
        imgData[next+1] = 0 
        imgData[next+2] = 0 
      }
    }
    let canvas 
    if (document.getElementById('observe-canvas')) {
      canvas = document.getElementById('observe-canvas')
    } else {
      canvas = document.createElement('canvas')
      canvas.id = 'observe-canvas'
      document.getElementById('cropDiv').appendChild(canvas)
    } 
    canvas.style.transformOrigin = 'left'
    canvas.style.scale = scale
    canvas.width = w 
    canvas.height = h  
    let ctx = canvas.getContext('2d')
    // console.log(imgData, ctx, w, h)
    let data = ctx.createImageData(w, h) 
    for (let i = 0; i < data.data.length; i++) {
      data.data[i] = imgData[i]
      // data.data[i] = (i % 4 == 0 || i%4 ==3) ? 255 : 1
    }
    console.log(128,data)
    ctx.putImageData(data,0,0)
  }

  // 通过指针查找 边界点 并创建新的base64 数据图片
  function computedImgData(img, imgData, file, color = 192) {
    let sum = 0
    var lOffset, rOffset = 0, tOffset, bOffset = 0
    if (imgData.find((item, i) =>  item == 0 && i % 4 == 3 ) != undefined) {
        lOffset = img.width, rOffset = 0, tOffset = img.height, bOffset = 0 
        // 去透明
        for (let i = 0; i < img.width; i++) {
          for (let j = 0; j < img.height; j++) {
            let post = (i + img.width * j) * 4
            if (imgData[post] == 255 || imgData[post + 1] == 255 || imgData[post + 2] == 255 || imgData[post+3] == 255) {
              bOffset = Math.max(j, bOffset) 
              rOffset = Math.max(i, rOffset)
              tOffset = Math.min(j, tOffset) 
              lOffset = Math.min(i,lOffset)
            }
            sum++
          }
        }
        let newCanvas = document.createElement('canvas')
        let newCtx = newCanvas.getContext('2d')
        newCanvas.width = rOffset - lOffset 
        newCanvas.height = bOffset - tOffset 

        newCtx.drawImage(img, lOffset, tOffset, newCanvas.width, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height) 
        // console.log(47,newCtx.getImageData(0, 0, img.width, img.height).data)
        let newBase64 = newCanvas.toDataURL() 
        file && createCropFile(file,newBase64)
        console.log(99,newBase64 )
        setNewB64(newBase64)
      } else {
        // A4纸张 标准是 22行 * 28个字 
        /**
         * color canvas getImageData rgb 的数字值 
         * rows 上传图片的高度px 
         * cols 上传图片的宽度px 
         * lOffset 水平方向left指针
         * rOffset 水平方向right 指针
         * tOffset 垂直方向 top 指针 
         * bOffset 垂直方向 bottom 指针
         * 通过对折 从中间往四个方向进行色彩对比(判断rgb是否是大于color的值)
         */
        // const color = 192
        const rows = img.height, cols = img.width 
        lOffset = 0 
        rOffset = cols 
        tOffset = rows/2
        bOffset = rows/2
        // 去行 
        let rowSize = img.height / rows , colSize = img.width / cols
        for (let i = rows / 2; i > 0; i--) {
          /**
           * rowData 当前横向 坐标上所有的 rgba 数值
           * prevRowData 当前横向往上一个像素坐标上所有的 rgba 数值
           * nextRowData 当前横向往下一个像素坐标上所有的 rgba 数值
           */
          let rowData = imgData.slice(4 * i *  rowSize * img.width, Math.ceil(4 * (i + 1) * rowSize * img.width)),
              prevRowData = imgData.slice(4 * (i - 1) * rowSize * img.width, Math.ceil(4 * i * rowSize * img.width)),
              nextRowData = imgData.slice(4 * (rows - i) * rowSize * img.width, Math.ceil(4 * (rows - i + 1) * rowSize * img.width))
          let flg = rowData.filter((item,index)=>index%4 !== 3 && item).every(item => item >= color),
            prevFlg = prevRowData.filter((item, index) => index % 4 !== 3 && item).every(item => item >= color),
              nextFlg = nextRowData.filter((item,index)=>index %4 !== 3 && item).every(item=> item >= color)
          // console.log(i, flg, prevFlg, rowData.filter((item, index) => index % 4 !== 3 && item))
          // console.log('行', rows - 1, bOffset, prevFlg, flg, nextFlg, nextRowData.filter((item, index) => index % 4 !== 3 && item))
          sum++
          if (!prevFlg) {
            tOffset = i-1
          }
          if (!nextFlg) {
            bOffset = rows - i + 1 
          }
        }
        // 去列
        for (let i = cols / 2; i > 0; i--) {
          /**
           * colData 当前纵向坐标上的所有rgb数值 这里没有取 alpha 减少不必要的数值
           * prevColData 当前纵向坐标偏左1px上的所有 rgb数值
           * nextColData 当前纵向坐标偏右1px上的所有 rgb数值 
           * colIndexs 坐标点位置用于调试用
           */
          let colData = [], prevColData = [], nextColData = [] , colIndexs = []; 
          
          for (let j = 0; j < colSize; j++) {
            for (let m = 0; m < img.height; m++) {
              // colIndexs.push( 4 * i + (m * img.width * 4) + j , 4 * i + (m * img.width * 4) + j + 1 )
              colData.push(
                imgData[4 * i + (m * img.width * 4) + j],
                imgData[4 * i + (m * img.width * 4) + j + 1],
                imgData[4 * i + (m * img.width * 4) + j + 2],
              )
              prevColData.push(
                imgData[4 * (i - 1) + (m * img.width * 4) + j],
                imgData[4 * (i - 1) + (m * img.width * 4) + j + 1],
                imgData[4 * (i - 1) + (m * img.width * 4) + j + 2],
              )
              nextColData.push(
                imgData[4 * (i + 1) + (m * img.width * 4) + j],
                imgData[4 * (i + 1) + (m * img.width * 4) + j + 1],
                imgData[4 * (i + 1) + (m * img.width * 4) + j + 2],
              )
              sum++
            }
          }
          
          let flg = colData.every(item => item >= color),
            prevFlg = prevColData.every(item => item >= color),
              nextFlg = nextColData.every(item => item >= color)
          // console.log('列',i, flg, prevFlg,nextFlg ,colData)
            if (!prevFlg) {
              lOffset = i - 1
            }
            if (!nextFlg) {
              rOffset = cols - i +1
            }
          
        }
        // console.log(59,bOffset , rOffset ,tOffset , lOffset)
        let newCanvas = document.createElement('canvas')
        let newCtx = newCanvas.getContext('2d')
        // newCanvas.width = (rOffset - lOffset) * rowSize 
        newCanvas.width = (rOffset - lOffset) * colSize
        newCanvas.height = (bOffset - tOffset ) * rowSize 
  
        newCtx.drawImage(img, lOffset * colSize, tOffset * rowSize, newCanvas.width, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height) 
        let newBase64 = newCanvas.toDataURL() 
        file && createCropFile(file,newBase64)
        console.log(195,newBase64,sum )
        
        setNewB64(newBase64)
    } 
  }

  function createCropFile(file, base64) {
    const fileMap = {
      originalFile: file,
      cropFile : base64ToFile(base64,'crop_'+file.name)
    }
    console.log(206,fileMap)
  }

  function base64ToFile(base, filename) {
    let cropDiv = document.getElementById('cropDiv') 
    let img = document.createElement('img')
    img.alt = filename 
    img.src = base 
    cropDiv.appendChild(img)
    
    let arr = base.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    setTimeout(() => {
       console.timeEnd()
      setLoading(false)
    }, Math.random()*2e2);
   
    return new File([u8arr],filename,{type:mime})
  }



  return <div className="flex flex-dir-c">
    <p className='flex flex-jc-c'> <a href="https://blog.csdn.net/NuoYan3327/article/details/108798924">JS通过canvas自动裁剪png图片多余的空白部分</a></p>
    <div className='flex flex-jc-c'>
      <input type='file' multiple="true" onChange={ e => onInputChange(e)} />
    </div>
    <div className='flex flex-dir-c'>
      <div><img id='img' crossOrigin='' src={base64} onLoad={e=>onBase64Load(e)} /> </div>
      <div><img id='newImg' src={newB64} /> </div>
      <div id='cropDiv'></div>
    </div>
    {/* {loading ? <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,.75)',zIndex:10}}>转换中...</div> : null } */}
  </div>
}
