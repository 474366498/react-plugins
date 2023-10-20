
import WebRTCComponent from './components/webRTC'
import ScreenCanvas from './components/htmlCanvas'
import ScreenRRweb from './components/rrweb'


export default function ScreenRecord() {
  

  return <div className="flex flex-dir-c flex-ai-c ">
    <p> <a href='https://mp.weixin.qq.com/s/kdbhD01m_xgb9jnk5uvtew'> 还原现场 — 前端录制用户行为技术方案 </a></p>
    <WebRTCComponent /> 
    <ScreenCanvas /> 
    <ScreenRRweb /> 
  </div>  
}

