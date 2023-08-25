

import React, { Component } from 'react' 
import { debounce } from '@/utils/events'
import { generateUsers } from '../../../data'
import Item from './item'

const height = 60,
  bufferSize = 6,
  diff = height / 2
 

export default class UserDynamicVirtualizedList extends Component {
  
  constructor(props) {
    super(props)
    this.list = generateUsers(1e2)
    this.state = {
      startOffset: 0,
      endOffset: 0,
      renderList: [],
      startIndex: 0,
      endIndex: 0,
      scrollTop : 0
    }
    this.cache = []
    this.scrollTop = 0
    this.anchorItem = {
      index: 0,
      top: 0,
      bottom : 0
    }
  }

  cachePosition(node, index) {
    const rect = node.getBoundingClientRect()
    console.log(38,rect )
    let flg = !!this.cache.find(item => item.index == index)
    if (!flg) {
      let top = index === 0  ? 0 : this.cache[this.cache.length - 1].bottom
        this.cache.push({
          index,
          top,
          center : top + (rect.height || height / 2) ,
          bottom : top + (rect.height || height)
        })
      
    }
  }
  onHandleScroll(e) {
    let scrollTop = e.target.scrollTop
    // console.log(54, scrollTop)
    if (scrollTop > this.scrollTop) {
      if (scrollTop > this.anchorItem.bottom) {
        this.updateIndex(scrollTop)
        // this.updateRenderList()
      }
      // console.log('down')
    } else if (scrollTop < this.scrollTop) {
      // console.log('up',scrollTop , this.anchorItem.top )
      if (scrollTop < this.anchorItem.top) {
        this.updateIndex(scrollTop)
        // this.updateRenderList()
      }
    }
    this.scrollTop = scrollTop
  }
  updateIndex(top) {
    let { startIndex, count } = this.state
    let anchorItem = this.cache.find(item => item.bottom >= top) || this.cache[this.cache.length - 1]
     
    // console.log(69, top, anchorItem,count)
    this.anchorItem = { ...anchorItem }
    this.updateRenderList(anchorItem.index ,anchorItem.index + count )
    this.setState({
      // scrollTop: top,
      startIndex: anchorItem.index,
      endIndex: anchorItem.index + count
    })
  }

  updateRenderList(s,e) {
    let { startIndex, endIndex, } = this.state

    // console.log(83,startIndex , endIndex)
    this.setState({
      renderList: this.list.slice(s!=null ? s : startIndex, e || endIndex),
      startOffset: this.anchorItem.top,
      endOffset : (this.list.length - endIndex) * height
    })
  }
  componentDidMount() {
    let wrapperInfo = this.wrapper.getBoundingClientRect()
    let count = Math.floor(this.wrapper.clientHeight / height) + bufferSize
    let { startIndex } = this.state
    console.log(93,count)
    this.setState({
      wrapperInfo ,
      count ,
      endIndex : startIndex + count
    }, () => {
      this.updateRenderList()
      // this.computedPositions(1e2)
    })
  }
  computedPositions(s) {
    for (let i = 0; i < s; i++) {
      let flg = !!this.cache.find(item => item.index == i)
      if (!flg) {
        let top = i === 0 ? 0 : this.cache[this.cache.length - 1].bottom
        this.cache.push({
          index:i,
          top,
          center: top + height / 2,
          bottom: top + height
        })
      }
    }
  }

  render() {
    let { startOffset , startIndex , endOffset , renderList , scrollTop } = this.state
    return <div className='flex flex-dir-c'>
      <div>
        list  startIndex:{startIndex} scrollTop: { scrollTop} renderList.size : {renderList.length}
      </div>
      <div className='wrapper' ref={el => this.wrapper = el} style={{ minHeight: '500px', height: '500px', overflowY: 'auto' }} onScroll={e => this.onHandleScroll(e)} >
      
        <div style={{ paddingTop: `${startOffset}px`, paddingBottom: `${endOffset}px`}}>
          {
            renderList.length > 0
              ? renderList.map((item, index) => {
                // return <div key={startIndex + index} style={{height:`${height}px`}}>{ item.index} : { item.name }</div>
                return <Item key={startIndex + index} index={startIndex + index} cachePosition={(el, i) => this.cachePosition(el, i)} >
                  <div >
                    <p style={{ color: 'red' }}>{item.index} : {item.name} : {item.index * height}</p>
                    {item.index % 2 === 0
                      ? <p style={{ color: 'green' }}> longText : {item.longText}</p>
                      : <p style={{ color: 'pink' }}> description :{ item.description} </p>
                    }
                    
                  </div>
                </Item>
              })
              : null
          }
        </div>
      </div>
    </div>
  }


}



