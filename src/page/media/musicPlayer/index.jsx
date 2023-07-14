
import { useEffect , useRef , useState } from "react"
import { PlayCircleFilled, PauseCircleFilled , SoundOutlined } from '@ant-design/icons'
// <NotificationTwoTone /> <SoundOutlined />
import { Button, Progress } from "antd"

import Icon, { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
  scriptUrl:'//at.alicdn.com/t/c/font_4123810_qx1sx9cgti.js'
})

// import UseProcess from './components/process'

import UseProcess from "@/components/process"

import {timeFormat , formatTime}  from '@/utils/time'

import './music.scss'


// icon-xunhuan icon-danxunhuan  icon-shunxubofang icon-suijibofang1
// const types

var AudioEl

function MusicPlayer() {
  const musicList = [
   
    {
      id: '1840192925',
      name: '海底',
      img:'https://p2.music.126.net/6foZcR0P2Pdw0HRIdV1aiQ==/109951165914949830.jpg?param=300x300',
      src: 'http://music.163.com/song/media/outer/url?id=1840192925.mp3',
      lyric: "[00:00.000] 作词 : 一支榴莲\n[00:00.453] 作曲 : 一支榴莲/寿延Ashes\n[00:00.906] 编曲 : 柒玖\n[00:01.360]作词：一支榴莲\n[00:04.580]作曲：一支榴莲/寿延\n[00:08.700]原唱：一支榴莲\n[00:13.320]改编词：唐恬\n[00:16.260]编曲：柒玖\n[00:18.480]OP：网易音乐人 X 青云LAB X 不要音乐\n[00:21.780]\n[00:23.020]散落的月光穿过了云\n[00:30.490]躲着人群\n[00:34.460]铺成大海的鳞\n[00:37.870]海浪打湿白裙\n[00:40.290]试图推你回去\n[00:45.570]海浪唱摇篮曲\n[00:48.200]妄想温暖你\n[00:52.790]往海的深处听\n[00:56.720]谁的哀鸣在指引\n[01:01.119]灵魂没入寂静\n[01:03.719]无人将你吵醒\n[01:08.890]你喜欢海风咸咸的气息\n[01:11.299]踩着湿湿的沙砾\n[01:13.180]你说人们的归处应该回大海里\n[01:16.409]你问我想念会去哪里\n[01:18.970]有没有人爱你\n[01:20.930]世界能否不再\n[01:24.409]总爱对凉薄的人扯着笑脸\n[01:28.220]岸上人们脸上都挂着无关\n[01:32.110]人间昙花一现\n[01:34.620]一切散为烟\n[01:40.370]散落的月光穿过了云\n[01:43.510]凝望人群\n[01:44.519]我们孤独的心\n[01:46.269]有时候像海底\n[01:48.280]悲伤不是三言两语\n[01:50.180]就能感同身受\n[01:52.190]眼泪没有声音\n[01:53.750]但我想抱紧你\n[01:56.310]你是重要的存在\n[01:58.110]是某人的星星\n[02:00.099]当你孤身独行\n[02:01.269]当你说被爱不过是侥幸\n[02:04.000]孩子请你别忘记\n[02:05.230]曾有温暖的声音呼唤你的姓名\n[02:07.689]你问我路会通往哪里\n[02:09.479]路通往我等你\n[02:11.770]\n[02:15.030]散落的月光穿过了云\n[02:22.810]躲着人群\n[02:26.590]溜进海底\n[02:30.039]有光正在找你\n[02:32.470]它想温暖你\n[02:37.849]它说你听你听\n[02:39.949]有人唤你回去\n[02:45.349]你喜欢海风咸咸的气息\n[02:48.110]踩着湿湿的沙砾\n[02:49.960]你说人们的归处应该回大海里\n[02:53.110]你问我想念会去哪里\n[02:55.729]有没有人爱你\n[02:57.660]世界为何如此安静\n[03:01.219]总爱对凉薄的人扯着笑脸\n[03:05.129]岸上人们脸上都挂着明暗\n[03:08.889]人间岁岁年年\n[03:11.259]谁敢说如烟\n[03:19.810]来不及来不及\n[03:23.889]你曾笑着哭泣\n[03:27.610]来不及来不及\n[03:31.490]也要唱给你听\n[03:35.410]春日雨夏蝉鸣\n[03:39.330]明天是个好天气\n[03:43.120]秋风起雪花轻\n[03:47.000]海底看不见四季\n[03:52.949]\n[03:55.259]音乐总监：刘卓\n[03:57.169]乐队总监/program：尹之扬\n[03:59.240]吉他：熊林/高恭鹏\n[04:01.150]贝斯：娄弘荻\n[04:02.849]鼓：祁大为\n[04:04.370]键盘：孙莉\n[04:05.729]和声：李郡洲/王笑文\n[04:06.409]弦乐：靳海音®弦乐团\n[04:07.400]混音：佟尚泽@唯伴音乐\n[04:09.069]音频编辑：石行@唯伴音乐\n"
    },
    {
      id: '436514312',
      name: '成都',
      img:'https://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg?param=300x300',
      src: 'http://music.163.com/song/media/outer/url?id=436514312.mp3',
      lyric: "[00:00.000] 作词 : 赵雷\n[00:01.000] 作曲 : 赵雷\n[00:02.000] 编曲 : 赵雷/喜子\n[00:03.000] 制作人 : 赵雷/喜子/姜北生\n[00:05.409]\n[00:18.744]让我掉下眼泪的\n[00:22.138]不止昨夜的酒\n[00:26.187]让我依依不舍的\n[00:30.218]不止你的温柔\n[00:34.185]余路还要走多久\n[00:38.218]你攥着我的手\n[00:42.176]让我感到为难的\n[00:45.984]是挣扎的自由\n[00:52.186]分别总是在九月\n[00:55.935]回忆是思念的愁\n[00:59.878]深秋嫩绿的垂柳\n[01:03.802]亲吻着我额头\n[01:07.696]在那座阴雨的小城里\n[01:11.835]我从未忘记你\n[01:15.877]成都 带不走的 只有你\n[01:23.740]和我在成都的街头走一走\n[01:31.721]直到所有的灯都熄灭了也不停留\n[01:39.451]你会挽着我的衣袖\n[01:43.392]我会把手揣进裤兜\n[01:47.297]走到玉林路的尽头\n[01:51.364]坐在小酒馆的门口\n[02:31.189]分别总是在九月\n[02:34.726]回忆是思念的愁\n[02:38.523]深秋嫩绿的垂柳\n[02:42.552]亲吻着我额头\n[02:46.530]在那座阴雨的小城里\n[02:50.650]我从未忘记你\n[02:54.459]成都 带不走的 只有你\n[03:02.260]和我在成都的街头走一走\n[03:10.433]直到所有的灯都熄灭了也不停留\n[03:18.294]你会挽着我的衣袖\n[03:22.022]我会把手揣进裤兜\n[03:26.142]走到玉林路的尽头\n[03:30.164]坐在小酒馆的门口\n[03:38.409]和我在成都的街头走一走\n[03:46.065]直到所有的灯都熄灭了也不停留\n[03:54.019]和我在成都的街头走一走\n[04:01.809]直到所有的灯都熄灭了也不停留\n[04:09.659]你会挽着我的衣袖\n[04:13.564]我会把手揣进裤兜\n[04:17.530]走到玉林路的尽头\n[04:21.581]走过小酒馆的门口\n[04:36.177]和我在成都的街头走一走\n[04:43.454]直到所有的灯都熄灭了也不停留\n[04:53.227]\n[04:57.130] 贝斯 : 张岭\n[05:01.033] 鼓 : 贝贝\n[05:04.936] 钢琴 : 柳森\n[05:08.839] 箱琴 : 赵雷/喜子\n[05:12.742] 笛子 : 祝子\n[05:16.645] 弦乐编写 : 柳森\n[05:20.548] 弦乐 : 亚洲爱乐国际乐团\n[05:24.451] 和声 : 朱奇迹/赵雷/旭东\n[05:28.354] 童声 : 朵朵/天天\n" 
    },
    {
      id: '28952154',
      name: 'god is a girl',
      img:'https://p2.music.126.net/R22YAdk0TD4EvttrWsV-1Q==/8888451999281894.jpg?param=300x300',
      src: 'http://music.163.com/song/media/outer/url?id=28952154.mp3',
      lyric: "[00:14.970]Remembering me,\n[00:18.250]Discover and see\n[00:21.500]All over the world,\n[00:24.850]She's known as a girl\n[00:28.110]To those who are free,\n[00:31.550]The mind shall be key\n[00:34.900]Forgotten as the past\n[00:38.240]'Cause history will last\n[00:43.040]God is a girl,\n[00:44.530]Wherever you are,\n[00:46.210]Do you believe it, can you receive it?\n[00:49.680]God is a girl,\n[00:51.380]Whatever you say,\n[00:52.890]Do you believe it, can you receive it?\n[00:56.740]God is a girl,\n[00:58.130]However you live,\n[00:59.840]Do you believe it, can you receive it?\n[01:03.319]God is a girl,\n[01:04.959]She's only a girl,\n[01:06.769]Do you believe it, can you receive it?\n[01:27.200]She wants to shine,\n[01:28.569]Forever in time,\n[01:30.280]She is so driven, she's always mine\n[01:33.688]Cleanly and free,\n[01:35.170]She wants you to be\n[01:36.950]A part of the future,\n[01:38.629]A girl like me\n[01:40.379]There is a sky,\n[01:41.610]illuminating us, someone is out there\n[01:45.650]That we truly trust\n[01:47.438]There is a rainbow for you and me\n[01:50.349]A beautiful sunrise eternally\n[01:55.468]God is a girl\n[01:57.110]Wherever you are,\n[01:58.900]Do you believe it, can you receive it?\n[02:02.260]God is a girl\n[02:03.778]Whatever you say,\n[02:05.558]Do you believe it, can you receive it?\n[02:08.909]God is a girl\n[02:10.719]However you live,\n[02:12.119]Do you believe it, can you receive it?\n[02:15.599]God is a girl\n[02:17.199]She's only a girl,\n[02:18.939]Do you believe it, can you receive it?\n[02:24.569]God is a girl\n[02:26.229]Wherever you are,\n[02:28.970]Do you believe it, can you receive it?\n[02:31.349]God is a girl\n[02:33.610]Whatever you say,\n[02:35.009]Do you believe it, can you receive it?\n[02:38.079]God is a girl\n[02:39.530]However you live,\n[02:42.099]Do you believe it, can you receive it?\n[02:44.849]God is a girl\n[02:46.369]She's only a girl,\n[02:48.110]Do you believe it, can you receive it?\n[02:52.949]God is a girl\n" 
    },
    {
      id: '27731339',
      name: '偏爱',
      img:'https://p2.music.126.net/xDXFDVKPGniFsckE44kZjQ==/109951163076917340.jpg?param=300x300',
      src: 'http://music.163.com/song/media/outer/url?id=5238992.mp3',
      lyric: "[00:00.000] 作词 : 葛大为\n[00:01.000] 作曲 : 陈伟\n[00:02.000] 编曲 : 陈伟\n[00:04.136]\n[00:14.752]把昨天都作废\n[00:17.993]现在你在我眼前\n[00:21.746]我想爱 请给我机会\n[00:28.238]如果我错了也承担\n[00:32.054]认定你就是答案\n[00:36.919]我不怕谁嘲笑我极端\n[00:41.887]相信自己的直觉\n[00:45.766]顽固的人不喊累\n[00:49.187]爱上你 我不撤退\n[00:54.890]我说过 我不闪躲\n[00:58.109]我非要这么做\n[01:00.845]讲不听 也偏要爱\n[01:03.501]更努力爱 让你明白\n[01:08.763]没有别条路能走\n[01:11.642]你决定 要不要陪我\n[01:14.494]讲不听偏爱\n[01:16.267]靠我感觉爱\n[01:17.870]等你的依赖\n[01:21.210]对你偏爱\n[01:28.280]痛也很愉快\n[01:36.856]把昨天都作废\n[01:40.143]现在你在我眼前\n[01:43.945]我想爱 请给我机会\n[01:50.570]如果我错了也承担\n[01:54.367]认定你就是答案\n[01:59.245]我不怕谁嘲笑我极端\n[02:04.220]相信自己的直觉\n[02:08.024]顽固的人不喊累\n[02:11.572]爱上你 我不撤退\n[02:17.171]我说过 我不闪躲\n[02:20.334]我非要这么做\n[02:23.001]讲不听 也偏要爱\n[02:25.655]更努力爱 让你明白\n[02:30.942]没有别条路能走\n[02:33.833]你决定 要不要陪我\n[02:36.778]讲不听偏爱\n[02:38.577]靠我感觉爱\n[02:40.224]等你的依赖\n[02:43.273]不后悔 有把握 我不闪躲\n[02:47.773]我非要这么做\n[02:50.354]讲不听 也偏要爱\n[02:52.881]更努力爱 让你明白\n[02:58.272]没有别条路能走\n[03:01.159]你决定 要不要陪我\n[03:04.177]讲不听偏爱\n[03:05.850]靠我感觉爱\n[03:07.649]等你的依赖\n[03:10.977]对你偏爱\n[03:18.024]痛也很愉快\n"
    },
    {
      id: '187417',
      name: '我',
      img : 'https://p1.music.126.net/ylf_QMnt4u0v_F518pn8Ng==/109951165085876142.jpg?param=300x300',
      src: 'http://music.163.com/song/media/outer/url?id=187417.mp3',
      lyric: "[00:00.00] 作词 : 林夕\n[00:01.00] 作曲 : 张国荣\n[00:02.00] 编曲 : 赵增熹\n[00:04.35]I am what I am\n[00:11.45]我永远都爱这样的我\n[00:45.45]快乐是 快乐的方式不止一种\n[00:55.75]最荣幸是 谁都是造物者的光荣\n[01:06.15]不用闪躲 为我喜欢的生活而活\n[01:17.15]不用粉墨 就站在光明的角落\n[01:27.35]我就是我 是颜色不一样的烟火\n[01:38.05]天空海阔 要做最坚强的泡沫\n[01:48.65]我喜欢我 让蔷薇开出一种结果\n[01:59.15]孤独的沙漠里 一样盛放的赤裸裸\n[02:16.05]多么高兴 在琉璃屋中快乐生活\n[02:26.85]对世界说 什么是光明和磊落\n[02:38.45]我就是我 是颜色不一样的烟火\n[02:50.65]天空海阔 要做最坚强的泡沫\n[03:01.35]我喜欢我 让蔷薇开出一种结果\n[03:11.95]孤独的沙漠里 依然盛放的赤裸裸\n"
    }
  ]
  const modes = [
    'icon-xunhuan',
    'icon-danxunhuan',
    'icon-shunxubofang',
    'icon-suijibofang1'
  ]

  const audio = useRef(null)
  const [index, setIndex] = useState(0)  // 列表序号
  const [load , setLoad] = useState(false)
  const [status, setStatus] = useState(false) // 播放状态 true 为play 
  const [lrc, setLrc] = useState([])  // 歌词
  const [lrcIndex , setLrcIndex] = useState(0) // 歌词序号
  const [currentTime, setCurrentTime] = useState('')  // 当前播放进度时长
  const [duration, setDuration] = useState('')  // 曲目总时长
  const [process, setProcess] = useState(0)    // 音乐进度
  const [volumeShow,setVolumeShow] = useState(false) // 音量开关
  const [volume, setVolume] = useState(80) // 音量
  const [mode , setMode] = useState(modes[0])

  useEffect(() => {
    let { lyric } = musicList[index]
    console.log(61, index, lyric)
    var lyricData = []
    lyric.split('\n').forEach((item,index) => {
      if (item && item.length > 0) {
        let timeReg = /^[[0-9:.]{1,}]/
        let time = item.match(timeReg)
        let lyricItem = {
          index ,
          time: formatTime(time[0].replace(/(\[|\])/g,'')),
          word : item.replace(timeReg,'  ')
        }
        console.log(87, item, lyricItem)
        lyricData.push(lyricItem)
      }
    })
    setLrc(lyricData)
    // AudioInit()
    if (!load) {
      setTimeout(() => {
        setLoad(true)
      }, 1e1);
      setTimeout(() => {
        document.body.addEventListener('click', function (event) {
          if(!audio.current) return
          let el = event.target,
            node = document.getElementById('music-player').querySelector('.volume')
          // console.log(75,node)
          if (elementIsChild(el, node)) {
            // console.log('中')
            setVolumeShow(true)
          } else {
            // console.log('外面 ')
            setVolumeShow(false)
          } 
        })
      }, 2e1);
    }
    
  },[index])

  useEffect(() => {
    if (audio.current) {
      if (status) {
        audio.current.play()
      } else {
        audio.current.pause()
      }
    }
  }, [status])

  useEffect(() => {
    console.log('enter',audio.current)
    return () => {
      console.log('levea')
    }
  },[])
 

  const AudioInit = () => {
    console.log('init')
    var AudioClock = null 
    // document.getElementById('audio') || 
    if (document.getElementById('audio') || AudioEl) {
      AudioEl.play()
      return 
    }
    AudioEl = document.createElement('audio') 
    AudioEl.setAttribute('id','audio')
    AudioEl.setAttribute('controls',true)
    AudioEl.setAttribute('autoplay', true)
    // AudioEl.setAttribute('loop', mode === 'icon-danxunhuan')
    let source = document.createElement('source') 
    source.src = musicList[index].src 
    source.type = 'audio/mp3'
    AudioEl.appendChild(source)
    document.getElementById('music-player').appendChild(AudioEl)

    AudioEl.addEventListener('abort', function () {
      console.log('abort')
    })
    AudioEl.addEventListener('canplay', function (e) {
      console.log(138,e)
      let { currentTime, duration, volume } = AudioEl
      let _currentTime = timeFormat(currentTime), _duration = timeFormat(duration) , process = Math.floor(currentTime / duration * 100) 
        setCurrentTime(_currentTime)
        setDuration(_duration)
        setProcess(process)
        setVolume(volume * 100)
    })
    AudioEl.addEventListener('timeupdate', function (e) {
      if (!AudioClock) {
        AudioClock = setTimeout(() => {
          let { currentTime , duration }= e.target
          let _currentTime = timeFormat(currentTime) , process = Math.floor(currentTime / duration * 100 )
          setCurrentTime(_currentTime)
          setProcess(process)
          // console.log('time',AudioClock, currentTime, duration, process)
          AudioClock = null 
        }, 1e3);
      }
    })
    AudioEl.addEventListener('paly', () => {
       setStatus(true)
    })
    AudioEl.addEventListener('pause', () => {
       setStatus(false)
    })
    AudioEl.onended  = (e) => {
      setLoad(false)
      AudioEl.parentNode.removeChild(AudioEl)
      AudioEl = null 
      var max = musicList.length - 1,
        _index 
      switch (mode) {
        case 'icon-shunxubofang':
          _index = index < max ? index + 1 : index
          setIndex(_index)
          break;
        case 'icon-suijibofang1':
          let randomArr = []
          for (let i = 0; i <= max; i++) {
            if(i !=index) randomArr.push(i)
          }
          _index = randomArr[Math.floor(Math.random() * max)]
          console.log(_index)
          setIndex(_index)
          break;
        case 'icon-xunhuan':
          _index = index < max ? index + 1 : 0
          setIndex(_index)
          break;
        default:
          break;
      }
    }
  }
  
  const onChangeStatus = E => {
      let _status = !status 
      setStatus(_status)
    },
    onChangeProcess = e => {
      // console.log(79, e,audio , audio.current , audio.current.duration , audio.current.currentTime )
      let ratioX = e.ratioX 
      let newTime = ratioX * audio.current.duration / 100 
      let diff = newTime - audio.current.currentTime
      // console.log(newTime , diff , audio.current.currentTime)
      audio.current.currentTime += diff
      setProcess(ratioX)
    },
    onChangeVolume = e => {
      // console.log(91, e,audio.current.volume)
      let ratioY = e.ratioY
      let diff = (ratioY - audio.current.volume * 100 ) / 100 
      audio.current.volume += diff
      setVolume(ratioY)
    },
    onChangeMode = e => {
      let index = modes.findIndex(item => item === mode),
        next = index < modes.length - 1 ? index + 1 : 0,
        nextMode = modes[next] 
      setMode(nextMode)
    },
    onChangeIndex = (i) => {
      console.log(audio.current)
      if (!audio.current) return 
      audio.current.pause()
      setIndex(i)
      setTimeout(() => {
        audio.current.load()
        audio.current.play()
      }, 1e2);
    }
  
  
  var clock = null 
  const onAbort = e => { 
    console.log(136,e)
  },onCanPlay = e => {
    console.log(139, e)
    // e.target  &&  e.target.play()
    // debugger
      if (e.target) {
        let { currentTime, duration , volume } = e.target 
        let _currentTime = timeFormat(currentTime), _duration = timeFormat(duration) , process = Math.floor(currentTime / duration * 100) 
        setCurrentTime(_currentTime)
        setDuration(_duration)
        setProcess(process)
        setVolume(volume * 100)
      }
    },
    onPlay = e => {
      // console.log(76, e)
      setStatus(true)
    },
    onPause = e => {
      // console.log(79, e)
      setStatus(false)
    },
    onTimeUpdate = e => {
      if (!clock) {
        clock = setTimeout(() => {
          let { currentTime , duration }= e.target
          let _currentTime = timeFormat(currentTime) , process = Math.floor(currentTime / duration * 100 )
          setCurrentTime(_currentTime)
          setProcess(process)
          findLrc(lrc , currentTime)
          // console.log('time',lrc , _currentTime, currentTime, duration, process)
          clock = null 
        }, 1e3);
      }
    },
    onSeeked = e => {
      
    },
    onVolumeChange = e => {

    },
    onEnded = e => {
      console.log('一曲完毕....')
      setLoad(false)
      var max = musicList.length - 1,
        _index 
      switch (mode) {
        case 'icon-shunxubofang':
          _index = index < max ? index + 1 : index
          setIndex(_index)
          break;
        case 'icon-suijibofang1':
          let randomArr = []
          for (let i = 0; i <= max; i++) {
            if(i !=index) randomArr.push(i)
          }
          _index = randomArr[Math.floor(Math.random() * max)]
          console.log(_index)
          setIndex(_index)
          break;
        case 'icon-xunhuan':
          _index = index < max ? index + 1 : 0
          setIndex(_index)
          break;
        default:
          break;
      }
      // audio.current.play()
    }
  
  const
    // 查找父节点
    elementIsChild = (el, parentNode) => {
      while (el) {
        if (el === parentNode) {
          return true 
        }
        el = el.parentNode
      }
      return false 
    },
    findLrc = (lrcData, time) => {
      if(!time) return 
      let i = lrcData.findIndex(item => item.time >= time)
      i = i >=0 ? i : lrcData.length - 1
      // console.log(time , i , lrcData[i])
      if (lrcData[i].time > time) {
        i -= 1
      }
      setLrcIndex(i)
    }
  
  return (
    <div className="flex flex-dir-c flex-ai-c">
      MusicPlayer {process} {index} {musicList[index].src}
      <a href="https://github.com/madzadev/audio-player">audio-player github （只试了试 demo）</a>
      <div id='music-player' className="flex flex-dir-c music-player">
        
        { load
          ? <audio
            hidden
          ref={audio}
          controls
          autoPlay
          loop={mode === 'icon-danxunhuan'}
          onAbort={e => onAbort(e)}
          onCanPlay={e => onCanPlay(e)}
          onPlay={e => onPlay(e)}
          onPause={e => onPause(e)}
          onTimeUpdate={e => onTimeUpdate(e)}
          onSeeked={e => onSeeked(e)}
          onVolumeChange={e => onVolumeChange(e)}
          onEnded={e=>onEnded(e)}
        >
          <source src={musicList[index].src} type='audio/mp3' />
        </audio>
        : null 
        }
        <div className="flex flex-ai-fe">
          <div className="album" style={{backgroundImage:'url('+musicList[index].img+')'}}>
            
            <Button
              className={status?'btn-play':'btn-pause'}
              size={status ? 'large' : 'small'}
              shape='circle'
              icon={
                status
                ? <PlayCircleFilled /> 
                : <PauseCircleFilled />
              }
              onClick={e => onChangeStatus(e)}
            />
          </div>
          <div className="flex flex-dir-c music-info">
            <p>{musicList[index].name} </p>
            
            <div className="flex flex-ai-fe music-controller">
              <div className="process">
                <div className="music-lrc">
                  <ul className="lrc" style={{ transform: `translateY(${-lrcIndex * 24 + 12}px)` }}>
                    {lrc && lrc.length > 0
                      ? lrc.map(item => {
                        return <li className={lrcIndex == item.index ? 'current' : ''} key={item.time} time={ item.time} index={item.index}> {item.word}</li>
                      })
                      : null 
                    }
                  </ul>
                </div>
                <UseProcess percent={process} onChange={e => onChangeProcess(e)} format={()=>`${currentTime} / ${duration}` } />
              </div>
              <div className="flex flex-dir-c flex-jc-fe volume" r-data='volume' onClick={() => setVolumeShow(true)}>
                {
                  volumeShow
                    ? <span className="volume-control">
                      <UseProcess type='vertical' percent={volume} onChange={e => onChangeVolume(e)} />
                    </span> 
                    : null
                }
                <SoundOutlined />
              </div>
              <div className="mode">
                {
                  modes.map((item, index) => {
                    return item == mode
                      ? <span key={ item } onClick={e=>onChangeMode(e)}> <IconFont type={item} /> </span>
                      : null 
                  })
                } 
              </div>
            </div>
          </div>
        </div>
        <ul className="flex flex-dir-c music-list">
          {
            musicList.map((item,i) => {
              return (<li className={`flex flex-jc-sb flex-ai-c music-item  ${index == i ? 'music-item-light' : ''}`} key={i + item.id} onClick={ e => onChangeIndex(i)}><span>{i + 1}</span> <p>{item.name}</p> <span>{ item.id}</span></li>)
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default MusicPlayer
