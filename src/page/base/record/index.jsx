

export default function ScreenRecord() {
  
  const chunks = []
  const openRecord = e => {
    // console.log(6, e)
    navigator.mediaDevices.getDisplayMedia({
      video : true,
      audio : true
    }).then(stream => {
      const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm' 
      let mediaRecorder = new MediaRecorder(stream, { mimeType: mime })
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
    

  }

  return <div className="flex flex-dir-c flex-ai-c ">
    <a href="https://www.bilibili.com/video/BV1rq4y1u7W2/?p=2&spm_id_from=pageDriver" target="_blank"> 前端超厉害的新技术，JS实现屏幕录制功能！ </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder" target="_blank"> mdn MediaRecorder api </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices" target="_blank"> mdn mediaDevices api </a>
    
    <video className="video" width="800px" style={{margin:'20px'}} controls > </video> 
    <button className="record-btn" style={{width:'100px',height:'36px'}} onClick={ e => openRecord(e) }> record </button>
  </div>  
}

