

import React, { useState, useRef, useEffect, createRef } from 'react'

import { generateUsers } from '../../../data'

import './index.scss'

export default function UserVirtualizedSmall() {
  const [list] = useState(generateUsers(1e2)),
    [start, setStart] = useState(0),
    [end, setEnd] = useState(0)

  const scrollInfo = useRef({
    height: 500,
    itemHeight: 60,
    renderCount: 1e2,
    bufferSize: 10
  })
  const content = useRef(),
    scroll = useRef(),
    scrollList = useRef()

  useEffect(() => {
    const { height,
      itemHeight,
      renderCount,
      bufferSize } = scrollInfo.current
    const _count = Math.ceil(height / itemHeight) + bufferSize
    scrollInfo.current.renderCount = _count
    setEnd(_count)
  }, [])
  const onScroll = () => {
    const { itemHeight, height, bufferSize, renderCount } = scrollInfo.current
    const { scrollTop } = scroll.current
    let bufferVal = bufferSize / 2
    const newStartIndex = Math.floor(scrollTop / itemHeight)
    const newEndIndex = newStartIndex + renderCount

    if (newEndIndex !== end || newStartIndex !== start) {
      setStart(newStartIndex)
      setEnd(newEndIndex)
    }

    const currentOffset = scrollTop - (scrollTop % itemHeight)

    scrollList.current.style.transform = `translate3d(0,${currentOffset}px,0)`

  }
  const renderList = list.slice(start, end)
  return (<div className='flex flex-dir-c'>
    <div> <a href="https://blog.csdn.net/weixin_45150813/article/details/125784599"> React实现虚拟列表 </a> </div>
    <div ref={content}>
      <div className='scroll_box' ref={scroll} onScroll={onScroll} style={{ height: `${scrollInfo.current.height}px` }}>
        <div className='scroll_hold' style={{ height: `${list.length * scrollInfo.current.itemHeight}px` }}></div>
        <ul className='list' ref={scrollList}>
          {renderList.map(item => <li key={item.index} style={{ height: `${scrollInfo.current.itemHeight}px` }}> {item.index} : ~ {item.name}</li>)}
        </ul>
      </div>
    </div>

  </div>)
}

