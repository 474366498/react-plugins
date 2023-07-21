
import { Button } from "antd"
import { useRef, useState } from "react"

function Home() {
  const [constraints, setConstraints] = useState(null),
    [stream, setStream] = useState(null)
  const a1 = useRef(), v1 = useRef()


  const onClick = () => {
    if (navigator.mediaDevices?.getSupportedConstraints) {
      let s = navigator.mediaDevices?.getSupportedConstraints()
      console.log(s)
      setConstraints(s)
    } else {
      console.log(12, '不支持')
      let s = { info: '不支持' }
      setConstraints(s)
    }
  },
    onOpenAudio = () => {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      }).then(stream => {
        let audio = a1?.current
        if (!audio) return
        audio.srcObject = stream
        audio.onloadedmetadata = function () {
          audio.play()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onOpenVideo = () => {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: 720,
          height: 720,
          frameRect: { ideal: 10, max: 15 },
          facingMode: 'user'
        }
      })
        .then((stream) => {
          let video = v1?.current
          if (!video) return
          console.log(36, stream)
          video.srcObject = stream
          video.onloadedmetadata = function () {
            video.play()
          }
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  return (
    <div className='flex flex-dir-c' style={{ border: '1px solid red' }}>
      {constraints && Object.keys(constraints).length > 1
        ? <div >{Object.keys(constraints).length} </div>
        : <div>{constraints?.info || '点按钮'}</div>
      }
      <Button onClick={e => onClick()}> Click </Button>
      <audio id='a1' ref={a1} controls > </audio>
      <video id='v1' ref={v1}> </video>
      <p>{stream ? 'stream' : 'null'}</p>
      <div className="flex flex-jc-sa">
        <Button onClick={e => onOpenAudio()}> Open Audio </Button>
        <Button onClick={e => onOpenVideo()}> Open Video </Button>
      </div>
    </div>
  )
}

export default Home

