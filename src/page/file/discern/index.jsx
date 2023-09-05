
import TesseractDiscern from './components/tesseract.jsx'


// 前端实现图片文字识别并提取 https://www.cnblogs.com/zion0707/p/17626380.html 
// HTML5 JavaScript实现图片文字识别与提取 https://blog.51cto.com/u_5112239/5948259
export default function ImageDiscern() { 

  return <div className="flex flex-dir-c flex-jc-c">
    <TesseractDiscern />
    ImageDiscern
  </div>
}