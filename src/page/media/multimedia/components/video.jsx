import { useMemo, useRef , useState } from "react"



function MediaVideo({ src ,width = 600 }) {
  
  const video = useRef(),
        [timeStr , setTimeStr] = useState(0)

  const type = useMemo(() => {
    let srcSplit = src.match(/\.([a-z0-9]{1,})$/gi),
      type = srcSplit[0].toLowerCase() 
    switch (type) {
      case '.mp4':
        return 'video/mp4'
      case '.webm':
        return 'video/webm'
      default:
        return 'video/ogg'
    }
    },[src])
  
  const onAbort = (e) => {
        console.log('加载放弃',e)
    },
    onCanplay = (e) => {
      console.log('可以播放',e)
    },
    onPlay = (e) => {
      console.log('播放',e)
    },
    onPlaying = (e) => {
      console.log('播放时',e)
    },
    onProgress = (e) => {
      console.log('下载进度',e)
    },
    onPause = (e) => {
      console.log('暂停',e)
    },
    onEnded = (e) => {
      console.log('播放完',e)
    },
    onSeeked = (e) => {
      console.log('移动到新位置',e)
    },
    onSeeking = (e) => {
      console.log('移动位置',e)
    },
    onTimeUpdate = (e) => {
      let currentTime = e.target.currentTime 
      setTimeStr(currentTime)
    },
    onVolumeChange = (e) => {
      console.log('改变音量',e)
    }

  return (
    <div className="flex flex-dir-c video">
      <p>{ timeStr }</p>
      <video id='video' ref={video} controls autoPlay width={width}
        onAbort={e=>onAbort(e)}
        onCanplay={e=>onCanplay(e)}
        onPlay={e=>onPlay(e)}
        onPlaying={e=>onPlaying(e)}
        onProgress={e=>onProgress(e)}
        onPause={e=>onPause(e)}
        onEnded={e=>onEnded(e)}
        onSeeked={e=>onSeeked(e)}
        onSeeking={e=>onSeeking(e)}
        onTimeUpdate={ e=>onTimeUpdate(e)}
        onVolumeChange={e => onVolumeChange(e)}
      >
        <source src={src} type={type} />
      </video>
    </div>
  )
} 

export default MediaVideo