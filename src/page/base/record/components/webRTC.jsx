

import React, { useEffect } from 'react' 

export default function ScreenRecord() {
  
  const chunks = []
  var mediaRecorder 
  const openRecord = e => {
    // console.log(6, e)
    navigator.mediaDevices.getDisplayMedia({
      video : true,
      audio : true
    }).then(stream => {
      const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm' 
      mediaRecorder = new MediaRecorder(stream, { mimeType: mime })
      console.log(14, mediaRecorder)
      mediaRecorder.start()
      mediaRecorder.ondataavailable = function (e) {
        console.log(16,e)
        chunks.push(e?.data)
      }
      mediaRecorder.onerror = function (error) {
        console.log('record error', error)
      }
      mediaRecorder.onpause = function () {
        console.log('record pause')
      }
      mediaRecorder.onresume = function () {
        console.log('record resume')
      }
      mediaRecorder.onstart = function () {
        console.log('record start')
      }
      
      mediaRecorder.onstop = function () {
        console.log(23, chunks)
        let blob = new Blob(chunks, {
          type : chunks[0].type 
        })
        let url = URL.createObjectURL(blob)
        let video = document.querySelector('video')
        video.src = url 
        video.play()

        let a = document.createElement('a') 
        a.href = url 
        a.download = 'video.webm' 
        a.click()
        chunks.length = 0 
      }
     
    }).catch(error => {
      console.error(error)
    })  
  },
  pauseRecord = e => {
    console.log(e, mediaRecorder)
    mediaRecorder?.pause()
    },
  resumeRecord = e => {
    mediaRecorder?.resume()
  },
  stopRecord = e => {
    mediaRecorder?.stop()
  }

  

  return <div className="flex flex-dir-c flex-ai-c ">
    <a href="https://www.bilibili.com/video/BV1rq4y1u7W2/?p=2&spm_id_from=pageDriver" target="_blank"> 前端超厉害的新技术，JS实现屏幕录制功能！ </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder" target="_blank"> mdn MediaRecorder api </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices" target="_blank"> mdn mediaDevices api </a>
    
    <video className="video" width="800px" style={{ margin: '20px' }} controls > </video> 
    <div className="flex flex-jc-c">
      <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => openRecord(e)}> 开启录制 </button>
      <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => pauseRecord(e)}> 暂停录制 </button>
      <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => resumeRecord(e)}> 继续录制 </button>
      <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => stopRecord(e)}> 结束录制 </button>
    </div>
    <div>
      <p>由用户感知并控制：通过 WebRTC 提供的 API 所实现的用户行为录制在开始录制前会通过弹窗来让用户完成对所需录制屏幕的授权，所有的录制行为均由用户自主控制，这种让用户感知到系统录制的方式对于我们预期的使用而言是不合适的，我们预期的录制行为对于用户而言应该是无感的，这种技术方案更适用于类似啄木鸟这种反馈系统由用户主动上报问题的场景或者考试系统屏幕监控、在线面试屏幕共享等等。</p>
      <p>录制数据无法脱敏：视频录制过程中直接就将整个页面的内容录制下来，对于一些敏感的数据同样也会直接录制下来，在录制的过程中我们无法进行脱敏，这对于一些数据安全要求比较高或者涉及用户隐私的场景就不适用了。</p>
      <p>WebRTC 兼容性：在实现录制过程中使用的几个 WebRTC API 都具有一定的兼容性要求，不同的浏览器的支持情况各不相同，具体可进行相应的兼容性查询。</p>
    </div>
  </div>  
}

