import { useEffect, useState } from "react"
import { useMemo } from "react"
import { useRef } from "react"



function MediaMixed({ list, index = 0 ,loop=true , timeUpdate , changeIndex }) {
  // console.log(5,list,index,changeIndex)
  const mixed = useRef(), audio = useRef(list[index]), video = useRef(list[index])
  const [update , setUpdate] = useState(true)
  const src = useMemo(() => {
    return list[index]
  },[index]), type = useMemo(() => {
    let src = list[index]
    let suffix = src && src.match(/([^\.]{1,})$/gi)[0]

    console.log(11, list, index, src, suffix)
    setUpdate(false)
    setTimeout(() => {
      setUpdate(true)
    }, 1e1);
    switch (suffix) {
      case 'mp3':
          return 'audio/mpeg'
      case 'ogg':
        return 'audio/ogg'
      case 'wav':
        return 'audio/wav'
      case 'mp4':
        return 'video/mp4'
      case 'webm':
        return 'video/webm'
      default:
        return 'video/ogg'
    } 
  }, [index])
 
  
  const onAbort = e => {
        console.log('加载放弃',e)
      },
      onCanPlay = e=>{
        console.log('可以播放',e)
      }, 
      onPlay = e=>{
        console.log('播放',e)
      }, 
      onPlaying = e=>{
        console.log('可以播放',e)
      }, 
      onSeeked = e=>{
        console.log('移动到新位置',e)
      }, 
      onSeeking = e=>{
        console.log('开始移动到新位置',e)
      }, 
      onRateChange = e=>{
        console.log('播放速度修改',e)
      }, 
      onEnded = e=>{
        console.log('播放完毕一个', e)
        
        if (changeIndex && typeof changeIndex === 'function') {
          changeIndex(index)
        }
        
      }, 
      onVolumeChange = e=>{
        console.log('音量修改',e)
      }, 
      onTimeUpdate = e=>{
        if (timeUpdate && typeof timeUpdate === 'function') {
          timeUpdate(e.target.currentTime)
        }
      }

  return (
    <div className="flex flex-dir-c mixed">
      <div ref={mixed}>
        { update ?
          /^audio/.test(type)
            ? <audio id='audio' ref={audio} controls autoPlay  
              onAbort={e=>onAbort(e)}
              onCanPlay={e=>onCanPlay(e)}
              onPlay={e => onPlay(e)}
              onPlaying={e=>onPlaying(e)}
              onSeeked={e => onSeeked(e)}
              onSeeking={e => onSeeking(e)}
              onRateChange={e => onRateChange(e)}
              onEnded={e => onEnded(e)}
              onVolumeChange={e=>onVolumeChange(e)}
              onTimeUpdate={e=>onTimeUpdate(e)}
            >
              <source src={src} type={type} />
            </audio> 
            : /^video/.test(type)
              ? <video id='video' ref={video} controls autoPlay 
                onAbort={e=>onAbort(e)}
                onCanPlay={e=>onCanPlay(e)}
                onPlay={e => onPlay(e)}
                onPlaying={e=>onPlaying(e)}
                onSeeked={e => onSeeked(e)}
                onSeeking={e => onSeeking(e)}
                onRateChange={e => onRateChange(e)}
                onEnded={e => onEnded(e)}
                onVolumeChange={e=>onVolumeChange(e)}
                onTimeUpdate={e=>onTimeUpdate(e)}
              >
                <source src={src} type={type} />
              </video>
              : <span>未知内容</span>
          : <span>update loading ...</span>
        }
        mixed {type}
      </div>
    </div>
  )
} 

export default MediaMixed
