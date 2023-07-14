import { useMemo, useRef, useState } from "react"



function MediaMusic({ src }) {
  const audio = useRef(null),
    [timeStr, setTimeStr] = useState(0)

  const sourceType = useMemo(() => {
    let srcSplit = src.match(/\.([a-z0-9]{1,})$/gi)
    let type = srcSplit[0].toLowerCase()

    switch (type) {
      case '.mp3':
        return 'audio/mpeg'
      case '.ogg':
        return 'audio/ogg'
      default:
        return 'audio/wav'
    }

  }, [src])

  const onAbort = (e) => {
    console.log('加载放弃')
  },
    onCanPlay = (e) => {
      console.log('开始播放', e, e.target)
      e.target && e.target.play()
    },
    onPlay = (e) => {
      console.log('没有停止', e)
    },
    onPlaying = (e) => {
      console.log('当音频/视频在因缓冲而暂停或停止后已就绪时触发', e)
    },
    onProgress = (e) => {
      console.log('下载中', e)
    },
    onSeeked = (e) => {
      console.log('新位置', e)
    },
    onSeeking = (e) => {
      console.log('新位置那点时', e)
    },
    onPause = (e) => {
      console.log('暂停', e)
    },
    onEnded = (e) => {
      console.log('结束', e)
    },
    onVolumeChange = (e) => {
      console.log('音量改变', e)
    },
    onError = (e) => {
      console.log('发生错误', e)
    },
    onTimeUpdate = (e) => {
      // console.log('播放更新时间', e, e.target.currentTime)
      setTimeStr(e.target.currentTime)
    }

  return <div className="flex flex-dir-c music">
    <p>audio 在有onPlay监听时 要手动添加按钮事件 <em>{timeStr}</em></p>
    <audio id='audio' ref={audio} controls autoPlay
      onAbort={e => onAbort(e)}
      // onCanPlay={e => onCanPlay(e)}
      // onPlay={e => onPlay(e)}
      onPlaying={e => onPlaying(e)}
      onProgress={e => onProgress(e)}
      onSeeked={e => onSeeked(e)}
      onSeeking={e => onSeeking(e)}
      onPause={e => onPause(e)}
      onEnded={e => onEnded(e)}
      onVolumeChange={e => onVolumeChange(e)}
      onError={e => onError(e)}
      onTimeUpdate={e => onTimeUpdate(e)}
    >
      <source src={src} type={sourceType} />
    </audio>
  </div>
}

export default MediaMusic
