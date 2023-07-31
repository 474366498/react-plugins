

import React , {Component , PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import {Button ,InputNumber , Switch } from 'antd'
import  {AutoSizer , Masonry , WindowScroller , CellMeasurer , CellMeasurerCache , createMasonryCellPositioner as createCellPositioner } from 'react-virtualized'

import {generateUsers} from '../../data' 

console.log(9  ,findDOMNode  )
export default class VirtualizedMasonry extends PureComponent {

  constructor (props,context) {
    super(props,context)

    this._columnCount = 0 

    this._cache = new CellMeasurerCache({
      defaultHeight : 250 ,
      defaultWidth : 200 ,
      fixedWidth : true 
    })
    console.log(22,this._cache)
    this.state = {
      count:1e3 ,
      list : generateUsers(1e3) ,
      windowScroll : false ,
      columnWidth : 150 , 
      height: 300 , 
      gutterSize : 10 ,
      overscanByPixels : 0
    }

    // this.renderMasonry = this.renderMasonry.bind(this)

  }
  calculateColumnCount () {
    const { columnWidth , gutterSize } = this.state 
    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize) )
  }
  resetCellPositioner () {
    const  { columnWidth , gutterSize } = this.state 
    this._cellPositioner.reset({
      columnCount : this._columnCount ,
      columnWidth ,
      spacer : gutterSize 
    })
    console.log(48,this._cellPositioner)
  }
  initCellPositioner () {
    if(!this._cellPositioner) {
      const { columnWidth , gutterSize } = this.state 
      this._cellPositioner = createCellPositioner({
        cellMeasurerCache : this._cache ,
        columnCount : this._columnCount ,
        columnWidth ,
        spacer : gutterSize
      })
    }
  }

  onResize ({width}) {
    this._width = width 
    this.calculateColumnCount() 
    this.resetCellPositioner() 
    this._masonry && this._masonry.recomputeCellPositions()
  } 

  renderAutoSizer ({height,scrollTop=0}) { 
    this._height = height 
    this._scrollTop = scrollTop 
    let { overscanByPixels } = this.state 

    return (
      <AutoSizer 
        disableHeight
        height={height} 
        onResize={e=>this.onResize(e)} 
        overscanByPixels={overscanByPixels}
        scrollTop={scrollTop}
      >
        { e=> this.renderMasonry(e) }
      </AutoSizer>
    )
  }

  renderMasonry ({width}) {
    this._width = width 
    this.calculateColumnCount()
    this.initCellPositioner() 

    const {list , height , overscanByPixels , windowScroll } = this.state
    return (
      <Masonry
        autoHeight={windowScroll}
        cellCount={list.length}
        cellMeasurerCache = {this._cache} 
        cellPositioner={this._cellPositioner}
        cellRenderer={e=>this.cellRender(e)}
        overscanByPixels={overscanByPixels}
        height={height}
        scrollTop={this.scrollTop}
        ref={el=>this._masonry = el }
        width={width}
      />
    )
  }

  cellRender ({index,key,parent,style}) {
    const { list , columnWidth } = this.state
    console.log(111,this._columnCount , columnWidth,style)
    const item = list[index]
    let bgColor = index % 4 === 0 ? 'red' 
                  : index % 4 === 1 ? 'pink' 
                  :index % 4 === 2 ? 'blue' 
                  : 'green' 
    return (
      <CellMeasurer cache={this._cache}  index={index} key={key} parent={parent} >
        <div style={{...style,width:columnWidth}}>
          <div 
            style={{
              backgroundColor:bgColor ,
              borderRadius: '0.5rem',
              height: item.size * 2,
              marginBottom: '0.5rem',
              width: '100%',
              fontSize: 20,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {index}
          </div>
          <p>{item.description}</p>
        </div>
      </CellMeasurer>
    )
    
  }

  render () {
    const {
      windowScroll  ,
      columnWidth  , 
      height  , 
      gutterSize  ,
      overscanByPixels  
    } = this.state 

    let renderEl 
    if(windowScroll) {
        console.log('')
    }else {
      renderEl = this.renderAutoSizer({height})
    }

    return (
      <div className="flex flex-dir-c" style={{width:'800px'}}>
        <div> react-virtualized ~ masonry 原代码是用的 react ~ 16  <code style={{color:'red'}}>columnWidth 改变时有问题....</code></div>
        <div>
          <Button onClick={e=>this.resetList(e)}>Reset List Data</Button>
        </div>
        <br />
        <div >
          <InputNumber disabled={true} style={{width:'200px'}} defaultValue={columnWidth} addonBefore={React.createElement('span', {},'column宽')}  onChange={ e=>this.onChangeInput(e,'columnWidth')} /> 

          <InputNumber style={{width:'200px'}} defaultValue={height} addonBefore={React.createElement('span', {},'高度')}  onChange={e=>this.onChangeInput(e,'height')} /> 

          <InputNumber style={{width:'200px'}} defaultValue={gutterSize} addonBefore={React.createElement('span', {},'间距')}  onChange={
            e=>this.onChangeInput(e,'gutterSize')  } /> 
          <InputNumber style={{width:'200px'}} defaultValue={overscanByPixels} addonBefore={React.createElement('span', {},'偏移')} onChange={e=>this.onChangeInput(e,'overscanByPixels')} /> 
        </div>
        <br />
        { renderEl }
      </div>
    )
  }

  resetList () {
    const HEIGHTS = [-10 , 0 , 10 ]
    let list = this.state.list.map(item => {
      item.size = item.size + HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)]
      item.size = item.size > 20 ? item.size : 20
      return item
    })
    this.setState({list},(e)=>{
      this._cache.clearAll()
      this.resetCellPositioner()
      this._masonry.clearCellPositions() 
    })
  }
  onChangeInput (e,key) {
    this.setState({
      [key] : e
    } , () => {
      console.log(204,key, e , this.state)
      if(['columnWidth','gutterSize'].includes(key)){
        this.calculateColumnCount()
        this.resetCellPositioner()
        if(key === 'columnWidth'){
          this._masonry.clearCellPositions()
        }else{
          this._masonry.recomputeCellPositions();
        }
      }
    })
  }
} 