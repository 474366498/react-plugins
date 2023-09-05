
import React from 'react' 
import * as Tess from 'tesseract.js'

export default function TesseractDiscern() {
  

  const onChange = e => {
    let file = e.target.files[0] 
    if (file) {
      console.log(11,file)
      const reader = new FileReader() 
      reader.onload = function (r) {
        let img = new Image()
        img.src = r.target.result 
        img.onload = function () {
          // extractTextFromImageEng(img)
          extractTextFromImageCn(img)
        }
      }
      reader.readAsDataURL(file)
    }
  },
    extractTextFromImageEng = image => {
      // Tess.recognize(
      //   'https://tesseract.projectnaptha.com/img/eng_bw.png',
      //   'eng',
      //   {
      //     logger: info => console.log(info)
      //   })
      //   .then((res) => {
      //     console.log(25,res)
      //   })
      //   .catch(error => {
      //     console.log(28,error)
      //   })
      Tess.recognize(
        image,
        'eng',
        {
          logger: info => console.log(41,'en',info)
        })
        .then((res) => {
          console.log(25,res)
        })
        .catch(error => {
          console.log(28,error)
        })
    },
     extractTextFromImageCn = async (image) => {
       const worker = await Tess.createWorker({
        //  langPath : 'https://github.com/tesseract-ocr/tessdata/raw/4.00/chi_sim.traineddata',
         langPath: './tesseract/lang', // 语言包路径 public 下
        //  corePath: '',
         workerPath:'./tesseract/js/dist/worker.min.js',    // web worker 路径 public 下
        logger : info => console.log(52,'cn',info)
       })
       console.log(worker)
       work() 
       async function work() {
         await worker.loadLanguage('chi_sim')
         await worker.initialize('chi_sim')
         const { data } = await worker.recognize(image)
         console.log(59, 'cn', data)
         await worker.terminate()
       }
    }

  return <div className="flex flex-dir-c flex-ai-c">
    <div> tesseract.js <a href="https://www.npmjs.com/package/tesseract.js">npm </a>
      <a href="https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016"> 语言包 </a>
      <a href="https://blog.csdn.net/tangshiyilang/article/details/130618973">
        语言包要.gz 格式的gzip 文件格式 gzip 在win 10安装方法
      </a>
      <a href='https://www.linuxcool.com/gzip'>gzip 常用命令</a>
      <strong style={{color:'red'}}>在网络不稳定或没网可能出现其它情况...</strong>
    </div> 
    <input type="file" accept="image/*" onChange={e=>onChange(e)} />
  </div>
}
