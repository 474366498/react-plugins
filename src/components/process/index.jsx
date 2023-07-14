

import { useRef } from 'react'
import { Progress } from 'antd';

import './process.scss'
import { useEffect  } from 'react';
/**
 * 
 * @param {*} param
 * percent 比例
 * type  横向还是竖向 horizontal 水平 vertical 垂直
 * color 颜色
 * showInfo 是否显示文字内容
 * format 文字内容 格式
 * @returns 
 */
function UseProcess(
  {
    percent = 0,
    type = 'horizontal',
    color = 'skyblue',
    showInfo = true,
    format = () => { },
    onChange = () => { }
  }
) {
  let showText = format() || percent
  const process = useRef()
  
  // useEffect(() => {
  //   console.log(33,showText)
  // },[showText])

  const onHandleClick = e => {
    let target = process.current
    // console.log(20, target, target.getBoundingClientRect());
    let { pageX, pageY } = e

    let { offsetWidth, offsetHeight } = target
    let offset = getOffset(target)
    let clickInfo = {
      x: pageX - offset.x,
      y: pageY - offset.y,
      w: offsetWidth,
      h: offsetHeight,
      ratioX: Math.floor((pageX - offset.x) / offsetWidth * 100),
      ratioY: type === 'horizontal'
        ? Math.floor((pageY - offset.y) / offsetHeight * 100)
        : Math.floor((1 - (pageY - offset.y) / offsetHeight) * 100)
    }
    onChange && onChange(clickInfo)
    // console.log(pageX, pageY, offsetWidth, offsetHeight, offset, clickInfo)
  }

  const getOffset = element => {
    let offset = {
      x: element.offsetLeft,
      y: element.offsetTop
    }
    let parent = element.offsetParent
    while (parent) {
      // console.log(33, parent, parent.offsetLeft, parent.offsetTop)
      offset.x += (parent.offsetLeft || 0)
      offset.y += (parent.offsetTop || 0)
      parent = parent.offsetParent
    }
    // console.log(36, offset)
    return offset
  }

  return (
    <>
      {
        type === 'horizontal'
          ? <div className="flex flex-ai-c use-process-bar use-process-bar-horizontal">
            <div ref={process} className="process-outer" onClick={e => onHandleClick(e)}>
              <div className="process-inner" style={{ backgroundColor: color, width: percent + '%' }}>
                <span className="process-circle" style={{ left: percent + '%', borderColor: color }}></span>
              </div>
            </div>
            {
              showInfo
                ? <span className="process-text">{showText || percent}</span>
                : null
            }
          </div>
          : <div className='flex flex-dir-c flex-ai-c use-process-bar use-process-bar-vertical'>
            <div ref={process} className='flex flex-dir-c flex-jc-fe process-outer' onClick={e => onHandleClick(e)}>
              <div className='process-inner' style={{ backgroundColor: color, height: percent + '%' }}>
                <span className='process-circle' style={{ top: (100 - percent) + '%', borderColor: color }}></span>
              </div>
            </div>
          </div>
      }
    </>
  )
}
export default UseProcess
