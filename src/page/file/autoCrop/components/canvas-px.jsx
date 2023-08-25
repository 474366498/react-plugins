
import React , { useState} from 'react'

import { Button , message , Upload } from 'antd'

export default function AutoCanvasPx() {
  const [base64 , setBase64] = useState() , [newB64,setNewB64] = useState()
  const onInputChange = e => {
    console.log(9, e)
    let files = e.target.files 
    let file = files[0] || null 
    filesToBase64(files)
    fileToBase(file)

  },
    onBase64Load = e => {
      // console.log(15, e,e.target.src)
      let img = e.target 
      let canvas = document.createElement('canvas') ,
        ctx = canvas.getContext('2d') 
      canvas.width = img.width 
      canvas.height = img.height 
      ctx.drawImage(img, 0, 0) 
      let imgData = ctx.getImageData(0, 0, img.width, img.height).data 
      console.log(24, imgData,img.width,img.height , imgData.find((item, i) =>  item == 0 && i % 4 == 3 ))
      
     computedImgData(img,imgData)
  }
  // 单文件转base64
  function fileToBase(f) {
    if (!f) return 
    console.log(149,f)
    let reader = new FileReader()
    reader.readAsDataURL(f)
    reader.onload = function (e) {
      let b = reader.result
      setBase64(b) 
      // cropBase64(b)
    }
  }

  // 批量转图片为base64  
  function filesToBase64(files) {
    if (!files || !files?.length) return 
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

  function computedImgData(img, imgData, file, color = 192) {
    console.time()
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
    console.timeEnd()
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
    return new File([u8arr],filename,{type:mime})
  }



  return <div className="flex flex-dir-c">
    <p className='flex flex-jc-c'> <a href="https://blog.csdn.net/NuoYan3327/article/details/108798924">JS通过canvas自动裁剪png图片多余的空白部分</a></p>
    <div className='flex flex-jc-c'>
      <input type='file' multiple="true" onChange={ e => onInputChange(e)} />
    </div>
    <div className='flex flex-dir-c'>
      <div><img  src={base64} onLoad={e=>onBase64Load(e)} /> </div>
      <div><img src={newB64} /> </div>
      <div id='cropDiv'></div>
    </div>
  </div>
}
