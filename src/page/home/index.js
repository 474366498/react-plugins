
import { Button } from "antd"
import { useRef, useState } from "react"

function Home() {
  const [constraints, setConstraints] = useState(null),
    [stream, setStream] = useState(null)
  const v1 = useRef()


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
    onOpen = () => {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
        // video: {
        //   width: 720,
        //   height: 720,
        //   frameRect: { ideal: 10, max: 15 },
        //   facingMode: 'user'
        // }
      })
        .then((stream) => {
          let video = v1?.current
          if (!video) return
          console.log(36, stream)
          video.srcObject = stream
          video.onloadedmetadata = function () {
            video.play
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
      <video id='v1' ref={v1}> </video>
      <p>{stream ? 'stream' : 'null'}</p>
      <Button onClick={e => onOpen()}> Open </Button>
    </div>
  )
}

export default Home

