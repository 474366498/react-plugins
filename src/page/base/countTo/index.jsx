

import { Button } from 'antd'

import { useState , useEffect , useImperativeHandle, useRef, forwardRef  } from 'react' 

export default function CountTo() {
  const childRef = useRef()
  
  const reset = () => {
    console.log(12,childRef)
    childRef?.current?.reset()
  }



  return (
    <div className="flex flex-dir-c ">
      <Button onClick={ e=>reset() }> reset </Button>
      <CountToCom ref={ childRef } startNum={1} endNum={1234} duration={ 2.3e3}   />
    </div>
  )
}

const CountToCom = forwardRef((props , ref) => {

  const defaultProps = {
    startNum: 0,        // 开始的数字
    endNum : 0 ,        // 数字跑动的最后结果
    autoplay: true,     // 是否自动开启跑动
    duration: 2e3,      // 数字跑动的时长
    prefix : '' ,       // 前缀 
    suffix: '',         // 后缀
    decimal: '.',        // 小数    如有 . 123 => 123.00  
    separator: ',',    // 分隔符 如 12345 => 12,345
    useEasing : true ,  // 是否开启运动函数
    /**
     * 运动函数 
     * @param {*} t requestAnimationFrame 前后时差
     * @param {*} b 
     * @param {*} c 当前 currentNum 与 endNum 差 
     * @param {*} d 数字跑动的时长
     * @returns 
     */
    easingFn: (t,b,c,d) => {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1)* 1024 ) / 1023 + b
    }
  }

  let options = Object.assign({}, defaultProps, props)
  
  // console.log(27, options)
  const isDecimal = !!options.decimal
  const countDown = options.start < options.endNum  // 判断是否是从小到到运动
  const [currentNum , setCurrentNum ] = useState(options.startNum)
  const [status, setStatus] = useState(null) // 状态 playing(运动中) pause(暂停) stop(停止)
  const [timer, setTimer] = useState(null)
  const [startTime , setStartTime] = useState(null) 


  
  const [state, setState] = useState({
    localStartVal: options.startNum,
    printVal: null ,
    displayValue: isDecimal ? options.startNum.toFixed(2) : options.startNum,
    paused: false,
    localDuration: props.duration,
    startTime: null,
    timestamp: null,
    remaining: null,
    timer : null 
  })


  useEffect(() => {
    
    if (options.autoplay) {
      autoRun()
    }
    
  }, [options.autoplay])
  
  useImperativeHandle(ref, () => ({
    reset
  }))

  const autoRun = () => {
    let { startNum , endNum , duration } = options 
    let _state = Object.assign({}, state) 
    _state.localStartVal = startNum 
    _state.startTime = null 
    _state.localDuration = duration 
    _state.paused = true 
    _state.timer = requestAnimationFrame(count)
    setState(() => _state)
  },
    onCountOperate = () => {
      console.log(85, '操作')
      debugger
      if (!state.paused) {
        console.log('开始')
        resume()
      } else {
        console.log('暂停')
        pause()
      }
    },
    pause = () => {
      let _state = Object.assign({}, state) 
      _state.paused = false 
      setState(() => {
        cancelAnimationFrame(_state.timer) 
        return _state
      })
    },
    resume = () => {
      let _state = Object.assign({}, state) 
      console.log(115,_state)
      _state.localDuration = options.duration
      _state.localStartVal = + state.printVal 
      // debugger
      setState(() => {
        requestAnimationFrame(count) 
        return  _state
      })
    },
    reset = () => {
      cancelAnimationFrame(state.timer)
      setState(() => {
        autoRun()
        setCurrentNum(options.startNum)
        return {
          localStartVal: options.startNum,
          printVal: null ,
          displayValue: isDecimal ? options.startNum.toFixed(2) : options.startNum,
          paused: false,
          localDuration: props.duration,
          startTime: null,
          timestamp: null,
          remaining: null,
          timer : null 
        }
      })
    },
    count = (t) => {
      // console.log(130, t)
      let _state = Object.assign(state)
      // debugger
      console.log(133, _state)
      const { useEasing, easingFn, startNum , endNum , duration } = options 
      if (!_state.startTime) _state.startTime = t 
      _state.timestamp = t 
      let progress = t - _state.startTime 

      _state.remaining = _state.localDuration - progress 

      if (useEasing) {
        if (countDown) {
          _state.printVal = _state.localStartVal - easingFn(progress , 0 , _state.localStartVal - endNum ,_state.localDuration)
        } else {
          _state.printVal  = easingFn(progress , _state.localStartVal , endNum - _state.localStartVal , _state.localDuration)
        }
      } else {
        if (countDown) {
          _state.printVal = _state.localStartVal - (_state.localStartVal - endNum) * (progress / _state.localDuration)
        } else {
          _state.printVal = _state.localStartVal + (endNum - _state.localStartVal) * (progress / _state.localDuration)
        }
      }
      console.log(154, _state , endNum ,  progress , _state.localDuration )
      if (countDown) {
        _state.printVal = _state.printVal < endNum ? endNum : _state.printVal
      } else {
        _state.printVal = _state.printVal > endNum ? endNum : _state.printVal
      }
      _state.paused = true 
      // let val = Math.ceil(_state.printVal)
      _state.printVal = Math.ceil(_state.printVal) 
      setCurrentNum(() => Math.ceil(_state.printVal) )

      if (progress < _state.localDuration) {
        setState(()=> _state)
        _state.timer = requestAnimationFrame(count)
      } else {
        console.log('emit')
      }

  }

  return (
    <div className="flex flex-jc-sa flex-ai-c">
      <p> {currentNum}  {isDecimal ? currentNum.toFixed(2) : currentNum.toFixed(0)} { state?.printVal} </p>
      <Button.Group>
        <Button type='primary' onClick={e=>onCountOperate(e)}> 操作 </Button>
      </Button.Group>
    </div>
  )

} )