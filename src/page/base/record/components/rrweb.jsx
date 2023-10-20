

import React, { useRef ,  useState } from 'react' 
import * as R from 'rrweb' 
import  rrwebPlayer  from 'rrweb-player' 
import 'rrweb-player/dist/style.css' 

export default function ScreenRRweb() {
  
  const replayRef = useRef(),
    [events , setEvents] = useState([]),
    [stopFn , setStopFn] = useState(null)
    // state = useState({
    //   events: [],
    //   stopFn : null 
    // })
  var es = []
  const handleStart = (e) => {
    let stop = R.record({
      emit(event) {
        if (events.length > 10) {
          handleStop()
        } else {
          console.log(24,event)
          es.push(event)
          setEvents(es)
        }
      }
    })
    setStopFn(stop)
  } ,
  handleStop = (e) => {
    stopFn?.()
    setStopFn(null)
  } ,
    handleReplay = (e) => {
    console.log(36, events , replayRef , rrwebPlayer)
    new rrwebPlayer({
      target: replayRef?.current,
      //target:document.body , 
      props: {
        events : events
      }
    })
  } 

  return (
    <div className="flex flex-dir-c flex-ai-c">
      <div className="flex flex-jc-c">
        <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => handleStart(e)}> 开启录制 </button>
        <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => handleStop(e)}> 停止录制 </button>
        <button className="record-btn" style={{ width: '100px', height: '36px' }} onClick={e => handleReplay(e)}> 播放录制 </button>
      </div>
      <div ref={ replayRef }> ref </div>
    </div>
  )
}