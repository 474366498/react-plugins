import {useEffect , useState} from 'react'

import { Button, Radio } from "antd"

import MediaMusic from './components/music'

import MediaVideo from './components/video'
import MediaMixed from './components/mixed'

function MultiMedia() {
  const mediaData = [
    'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
    'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    'https://media.w3.org/2010/05/sintel/trailer.mp4' ,
    'http://vjs.zencdn.net/v/oceans.mp4',
    ],
    types = [
      {value:'music' , label:'music'} ,
      {value:'video' , label:'video'} ,
      {value:'mixed' , label:'mixed'} ,
    ]
 
  const [mediaType , setMediaType] = useState('music') // music video mixed 
  const [mediaIndex, setMediaIndex] = useState(0) 
  const [mediaSrc, setMediaSrc] = useState(mediaData[mediaIndex])
  const [mediaTime , setMediaTime] = useState(0)
  
  const onChangeType = e => {
    console.log(25, e)
    let value = e.target.value 
    setMediaType(value)
  }

  useEffect(() => {
    var src 
    console.log('first',mediaType)
    switch (mediaType) {
      case 'video':
        src = mediaData[1]
        setMediaSrc(src)
        break;

      default:
        src = mediaData[0]
        setMediaSrc(src)
        break;
    }
  }, [mediaType])
  useEffect(() => {
    let src = mediaData[mediaIndex]
    setMediaSrc(src)
  },[mediaIndex])

  const onHandleIndex = flg => {
    let _index = flg ? mediaIndex + 1 : mediaIndex - 1
    _index = _index < 0 ? mediaData.length - 1 : _index > mediaData.length - 1 ? 0 : _index
    setMediaIndex(_index)
  }

  const onTimeUpdate = n => {
    setMediaTime(n)
  },
    onChangeIndex = n => {
      let _n = n+1
    setMediaIndex(_n)
  }

  return (
    <div className="flex flex-dir-c flex-ai-c ">
      <div className="flex">
        <Radio.Group options={types} value={mediaType} optionType='button' buttonStyle='outline' onChange={ e=>onChangeType(e)}>
          
        </Radio.Group>
      </div>
      <br />
      <div className='flex'>
        <Button.Group>
          <Button onClick={e=>onHandleIndex(false)}>prev</Button>
          <Button onClick={e=>onHandleIndex(true)}> next</Button>
        </Button.Group>
      </div>
      <div className='flex flex-dir-c  flex-jc-c'>
        <p>time:<em>{mediaTime}</em> src:<em>{mediaSrc}</em> index <em>{ mediaIndex }</em></p> 
        {
          mediaType == 'music'
            ? <MediaMusic src={ mediaSrc} />
            : mediaType == 'video'
              ? <MediaVideo src={ mediaSrc} />
              : <MediaMixed list={mediaData} index={mediaIndex}
                timeUpdate={e => onTimeUpdate(e)}
                changeIndex={e => onChangeIndex(e)}
              />
        }
      </div>
        multi media 
    </div>
  )
}

export default MultiMedia

