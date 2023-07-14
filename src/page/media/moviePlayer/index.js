import { useState } from "react"
import { useEffect, useMemo, useRef } from "react"
import { Dropdown } from "antd"
import Icon, { createFromIconfontCN } from '@ant-design/icons'
import { SoundOutlined } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4123810_qx1sx9cgti.js'
})

import UseProcess from "@/components/process"

import { timeFormat, formatTime } from '@/utils/time'


import './movie.scss'

const movieList = [
  // {
  //   title: '宣传视频',
  //   src: 'http://saas.cdxyun.cn/files/xc.mp4'
  // },
  // {
  //   title: 'pfk30h29965i5p5i',
  //   src: 'https://644-52.vod.tv.itc.cn/sohu/v1/Tmw7o6I4RhcAupb4DKkvZpcCMKXXoLxVhScmP2ALlm47fFoGRM1O0r.mp4?'
  // },
  {
    title: '周杰伦攒钱买他的CD,一首歌成就张学友，庾澄庆巅峰时有多牛',
    src: 'https://v2.sohu.com/v/url/441179526_120538294.MP4',
  },
  {
    title: '身穿吊带的美女车模小姐姐，身材火辣，曲线凹凸，性感迷人',
    src: 'https://v2.sohu.com/v/url/449095179_121092871.MP4'
  },
  {
    title: '毛主席和我们在一起',
    src: 'https://v2.sohu.com/v/url/455966782_121351824.MP4'
  },
  {
    title: '曾华倩颜值巅峰有多美？34年前老歌《还有明天》，又见俏丽丁灵琳',
    src: 'https://v2.sohu.com/v/url/455737191_121347171.MP4'
  },
  {
    title: '这么多年我们都低估她了？王心凌2022再次爆火，开口甜到发齁',
    src: 'https://v2.sohu.com/v/url/455853587_120934218.MP4'
  }
]


function MoviePlayer() {
  const video = useRef()
  const [index, setIndex] = useState(0)
  const [src, setSrc] = useState(movieList[0].src)
  const [volumeShow, setVolumeShow] = useState(false)
  const [full, setFull] = useState(false) // 页面全屏 
  const [videoPic, setVideoPic] = useState(false) // video 画中画
  const [fullscreen, setFullScreen] = useState(false)  // 全屏

  const items = [
    {
      key: '.5',
      label: .5
    },
    {
      key: '.75',
      label: .75
    },
    {
      key: '1.0',
      label: 1.0
    },
    {
      key: '1.25',
      label: 1.25
    },
    {
      key: '1.5',
      label: 1.5
    },
    {
      key: '1.75',
      label: 1.75
    },
    {
      key: '2.0',
      label: 2.0
    },
  ]


  const [videoInfo, setVideoInfo] = useState({
    status: false, // play pause
    playbackRate: 1,
    volume: 100,  // 音量
    process: 1, // 进度比例
    current: 0,   // 进度时间
    timeStr: '', // 进度时间 几分几秒
    duration: 100, // 总时长
    timeEndStr: '', // 总时长 几分几秒 
  })

  useEffect(() => {
    let movie = document.getElementById('movie')
    let width = parseInt(getComputedStyle(movie).width)
    console.log(54, video.current, movie, getComputedStyle(movie).width)
    if (width <= 880) {
      video.current.style.width = 680 + 'px'
    } else {
      video.current.style.width = width - 180 + 'px'
    }
    window.addEventListener('resize', function () {
      let w = parseInt(getComputedStyle(movie).width)
      console.log(w, video.current)
      if (w <= 880) {
        video.current.style.width = '680px'
      } else {
        video.current.style.width = (w - 180) + 'px'
      }
    })
    document.getElementById('movie').addEventListener('click', function (e) {
      if (!video.current) return
      let el = e.target, node = document.getElementById('movie').querySelector('.volume')
      if (elementIsChild(el, node)) {
        setVolumeShow(true)
      } else {
        setVolumeShow(false)
      }
    })
    return () => {
      console.log('componentWillUnmounted')
      window.removeEventListener('resize', function () {
        console.log('remove resize')
      })
    }
  }, [])
  // src监听
  useEffect(() => {
    console.log('重新加载', src)
    video.current.src = src
    video.current.load()
  }, [src])
  // 画中画
  useEffect(() => {
    video.current.addEventListener('enterpictureinpicture', (event) => {
      let pipWindow = event.pictureInPictureWindow
      console.log('video enter', event, pipWindow)
      pipWindow.addEventListener('resize', onResizePipWindow)
    })
    video.current.addEventListener('leavepictureinpicture', (event) => {
      console.log('video leave', event, video.current.paused)
      video.current.play()
    })
    function onResizePipWindow(event) {
      console.log('pip window resize', event)
    }
  }, [videoPic])


  var clock = null
  const onAbort = e => {
    console.log('加载放弃')
  },
    onCanPlay = e => {
      console.log(102, e)
    },
    onPlay = e => {
      console.log('play', e)
      let { currentTime, duration } = e.target
      let timeStr = timeFormat(currentTime), timeEndStr = timeFormat(duration)
      console.log(108, timeEndStr)
      setVideoInfo({ ...videoInfo, status: true, current: currentTime, duration, timeStr, timeEndStr })
    },
    onPause = e => {
      console.log('pause', e)
      setVideoInfo({ ...videoInfo, status: false })
    },
    onTimeUpdate = e => {
      if (videoInfo.status) {
        if (!clock) {
          clock = setTimeout(() => {
            let { currentTime, duration, playbackRate, volume, paused } = e.target
            let timeStr = timeFormat(currentTime), timeEndStr = timeFormat(duration)
            // console.log('timechange', videoInfo, paused)
            let process = Math.floor(currentTime / duration * 100)
            setVideoInfo({ ...videoInfo, status: !paused, current: currentTime, timeStr, timeEndStr, process, playbackRate, volume: volume * 100 })
            clock = null
          }, 1e3);
        }
      } else {
        setVideoInfo({ ...videoInfo, status: false })
      }
    },
    onVolumeChange = e => {
      console.log('音量change')
    },
    onEnded = e => {
      console.log('end')
      let _index = index < movieList.length - 1 ? index + 1 : 0
      let _src = movieList[_index].src
      setIndex(_index)
      setSrc(_src)
    }

  const onChangeProcess = e => {
    console.log(139, e, video.current)
    let newTime = video.current.duration * e.ratioX / 100
    let diffTime = newTime - video.current.currentTime
    let newTimeStr = timeFormat(newTime)
    video.current.currentTime += diffTime
    setVideoInfo({ ...videoInfo, current: newTime, timeStr: newTimeStr })
  },
    onClickMovie = e => {
      e.stopPropagation()
      console.log(e.target)
      let status = videoInfo.status
      if (videoInfo.status) {
        video.current.pause()
      } else {
        video.current.play()
      }
      setVideoInfo({ ...videoInfo, status: !status })
    },
    onChangeVideoStatus = (e) => {
      e.stopPropagation()
      console.log(videoInfo.status)
      if (videoInfo.status) {
        video.current.pause()
      } else {
        video.current.play()
      }
      let newStatus = !videoInfo.status
      console.log(157, newStatus)
      setVideoInfo({ ...videoInfo, status: newStatus })
    },
    onChangeIndex = (e) => {
      e.stopPropagation()
      let _index = index < movieList.length - 1 ? index + 1 : 0
      let _src = movieList[_index].src
      setIndex(_index)
      setSrc(_src)
    },
    onChangePlayBackRate = (e) => {
      console.log(193, e)
      let newPlayBackRate = e.key
      video.current.playbackRate = newPlayBackRate
      setVideoInfo({ ...videoInfo, playbackRate: newPlayBackRate })
    },
    onChangeVolume = e => {
      let { ratioY } = e
      let diff = (ratioY - video.current.volume * 100) / 100
      video.current.volume += diff
      setVideoInfo({ ...videoInfo, volume: ratioY })
      setVolumeShow(false)
    },
    onChangeFull = e => {
      console.log(217, e)
      let _full = !full
      setFull(_full)
    },
    onSwitchPictureInPicture = async (e) => {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture()
        } else {
          await video.current.requestPictureInPicture()
        }
        let newVideoPic = !videoPic
        setVideoPic(newVideoPic)
      } catch (error) {
        console.log(error)
      }
    },
    onChangeFullScreen = e => {
      console.log(265, e, fullscreen)
      // 开全屏
      let v = video.current
      if (!fullscreen) {
        let videoFull = v.requestFullScreen || v.webkitRequestFullScreen || v.mozRequestFullScreen || v.msRequestFullScreen
        if (videoFull) {
          videoFull.call(v)
        } else if (typeof window.ActiveXObject != 'undefined') {
          let wscript = new window.ActiveXObject('WScript.Shell')
          wscript && wscript.SendKeys('F11')
        } else {
          console.log('什么玩意！！！')
        }
        setFullScreen(true)
      } else {
        let videoExitFull = v.exitFullScreen || v.webkitExitFullScreen || v.mozCancelFullScreen || v.msExitFullScreen
        if (videoExitFull) {
          videoExitFull.call(v)
        } else if (typeof window.ActiveXObject != 'undefined') {
          let wscript = new window.ActiveXObject('WScript.Shell')
          wscript && wscript.SendKeys('Esc')
        } else {
          console.log('什么玩意！！！')
        }
        setFullScreen(false)
      }
    }


  const elementIsChild = (el, parentNode) => {
    while (el) {
      if (el === parentNode) {
        return true
      }
      el = el.parentNode
    }
    return false
  }

  return (
    <div className={`flex flex-dir-c flex-ai-c ${full ? 'full' : ''}`} id='movie'>
      {/* <div>{Object.keys(videoInfo).map(key => {
        return (<><span key={key}> {key} : {videoInfo[key] ? videoInfo[key] : 'false'}</span><br /> </>)
      })}</div>
      <div>{src}</div> */}
      <div className="flex flex-jc-sa movie" onClick={e => onClickMovie(e)}>
        <div className='movie-view'>
          <video ref={video} autoPlay
            onAbort={e => onAbort(e)}
            onCanPlay={e => onCanPlay(e)}
            onPlay={e => onPlay(e)}
            onPause={e => onPause(e)}
            onTimeUpdate={e => onTimeUpdate(e)}
            onVolumeChange={e => onVolumeChange(e)}
            onEnded={e => onEnded(e)}
          >
            <source src={src} type='video/mp4' />
            <source src={src} type='video/webm' />
            <source src={src} type='video/ogg' />
          </video>
          <div className="flex flex-dir-c  video-control" onClick={e => e.stopPropagation()}>
            <><UseProcess percent={videoInfo.process} onChange={e => onChangeProcess(e)} format={() => `${videoInfo.timeStr} / ${videoInfo.timeEndStr}`} /> </>

            <div className="flex flex-jc-sb flex-ai-c">
              <span className="base" onClick={e => onChangeVideoStatus(e)}>
                {
                  videoInfo.status
                    ? <IconFont className='movie-btn' type='icon-pause' />
                    : <IconFont className='movie-btn' type='icon-play' />
                }
                <IconFont onClick={e => onChangeIndex(e)} className='movie-btn' type='icon-next' />

              </span>
              <span className="flex flex-ai-c opts" >
                <Dropdown menu={{ items, selectable: true, defaultSelectedKeys: ['1.0'], onClick: e => onChangePlayBackRate(e) }} placement='top' arrow>
                  <span className='movie-btn' style={{ lineHeight: "20px", height: "20px" }}>{videoInfo.playbackRate}X</span>
                </Dropdown>
                <div className="flex flex-dir-c flex-jc-fe volume" >
                  {
                    volumeShow
                      ? <span className="volume-control">
                        <UseProcess type='vertical' percent={videoInfo.volume} onChange={e => onChangeVolume(e)} />
                      </span>
                      : null
                  }
                  <SoundOutlined className='movie-btn' onClick={e => setVolumeShow(true)} />
                </div>
                {/* <span className='movie-btn'>设置</span> */}
                <IconFont className='movie-btn' title={full ? '退出' : '页面全屏'} type='icon-fullcopy' onClick={e => onChangeFull(e)} />
                <IconFont onClick={e => onSwitchPictureInPicture(e)} title={videoPic ? '关闭画中画' : '开启画中画'} className='movie-btn' type='icon-huazhonghua' />
                {/* 画中画  https://www.zhangxinxu.com/wordpress/2018/12/html5-video-play-picture-in-picture/ */}

                {
                  fullscreen
                    ? <IconFont onClick={e => onChangeFullScreen(e)} className='movie-btn' type='icon-fullscreen-shrink' />
                    : <IconFont onClick={e => onChangeFullScreen(e)} className='movie-btn' type='icon-fullscreen-expand' />
                }
                {/* https://www.cnblogs.com/share123/p/4738897.html */}
              </span>
            </div>
          </div>
        </div>
        <div className="movie-list" style={{ display: full ? 'none' : 'inline-flex' }}>
          <ul className="list">
            {
              movieList && movieList.length
                ? movieList.map((item, i) => {
                  return (<li className={`${index === i ? 'active' : ''}`} key={i} title={item.title}><p>{item.title}</p></li>)
                })
                : null
            }
          </ul>
        </div>
      </div>
    </div >
  )
}

export default MoviePlayer