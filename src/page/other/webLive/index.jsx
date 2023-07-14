import { Button } from "antd"
import { useEffect, useRef } from "react"

import Streamer from 'rtmp-streamer'

var StreamerObj

function WebLive() {
  const streamer = useRef() 
  let videoNum = 0, microphoneNum = 0,
    Surl = 'rtmp://127.0.0.1:1935/live/',
    Sname = 'bbb';

  useEffect(() => {
    let el = streamer.current
    StreamerObj = new Streamer(el)
    console.log(17,navigator , StreamerObj)
    // navigator.mediaDevices.enumerateDevices().then(devices => {
    //   // 可以检测摄像头和麦克风数量
    //   devices.forEach(device => {
    //     if (device.kind === 'videoinput') videoNum = 1
    //     if (device.kind === 'audioinput') microphoneNum = 1
    //     console.log('videoinput' + videoNum)
    //     console.log('audioinput' + microphoneNum)
    //   })
    // }).catch(function (err) {
    //   window.console.log(err.name + ': =======' + err.message)
    // })

  })
  const publish = () => {
      if (videoNum && microphoneNum) {
        streamer.publish(Surl, Sname)
        // streamer.play(msg.livePush, msg.safeUrl);
      } else if (!videoNum) {
        window.console.log('未检测到摄像头设备，无法直播!')
      } else {
        window.console.log('未检测到音频输入设备，无法直播!')
      }

  }
  return (
    <div className="flex flex-dir-c flex-ai-c">
      <p> <a href="https://gitee.com/adonggege/live/tree/master"> gitee vue直播的推拉流</a></p>
      <Button onClick={e => publish(e)}></Button>
      <object wmode="transparent" ref={ streamer } id="rtmp-streamer" type="application/x-shockwave-flash" data="https://imgcache.qq.com/open/qcloud/video/act/live_web_push/RtmpStreamer.swf" style={{"width": "800px","height":"800px"}}>
        <param value="always" name="allowScriptAccess" />
        <param value="https://imgcache.qq.com/open/qcloud/video/act/live_web_push/RtmpStreamer.swf" name="movie" />
        <param value="high" name="quality" />
      </object>

    </div>
  )
}

export default WebLive