import React , { Component } from "react";
import { InputNumber, Switch } from "antd";

import {AutoSizer ,  List } from 'react-virtualized'

import {generateUsers} from '../../data' 

// const users = generateUsers(1e3)
export default class VirtualizedListClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoRowHeight: false,
      placeholder: false,
      rowCount: 1e3,
      scrollIndex: 0,
      height: 400,
      rowHeight: 50,
      overscan: 10,
      users : generateUsers(1e3)
    }
    this.rowRender = this.rowRender.bind(this)
    this.getRowHeight = this.getRowHeight.bind(this)
  }
  onSwitchChange(e,key) {
    console.log(e, key)
    this.setState({
      [key]:e
    })
  }
  onInputChange(e,key) {
    console.log(e, key)
    if (key === 'rowCount' && e > 1e3) {
      this.setState({
        users: generateUsers(e),
        [key]:e
      })
      return 
    }
    this.setState({
      [key]:e
    })
  }
  noRowsRender () {
    return <p>没有数据</p>
  }
  rowRender({ key, index, style, isScrolling, isVisible }) {
    let { autoRowHeight, placeholder , users } = this.state 
    let item = users[index]
    if (placeholder && isScrolling) {
      return (
        <div key={key} style={style}> scrolling...</div>
      )
    }
    // console.log(index, users[index],style)
    
    return (<div className="flex " key={key} style={{ ...style, backgroundColor: item?.bgColor||'#f5f5f5' }}>
        <div style={{minWidth:'120px'}}>
          <span>Row:{index} </span>
          <span>{item.name}</span>
        </div>
      <p style={{ margin: 0 , color: autoRowHeight && index % 3 === 0 ? 'red': ''}}>{ autoRowHeight ? item.longText : item.longText.substr(0,50)}</p>
      </div>)
  }
  getRowHeight({ index }) {
    let {users} = this.state
    console.log(61,users[index]) 
    return Math.ceil(users[index].longText.length / 35) * 25 
  }
  render() {
    let  {
      autoRowHeight,
      placeholder,
      rowCount,
      scrollIndex,
      height,
      rowHeight,
      overscan,
      users 
    } = this.state 
    return (

     <div className="flex flex-dir-c">
      <div > react-virtualized ~ list class </div>
      <div className="flex flex-jc-sa">
        <div className="flex flex-dir-c" style={{ width: '400px' }}>
          <div>
            <Switch checkedChildren='行高自动' unCheckedChildren='默认高度' onChange={e=>this.onSwitchChange(e,'autoRowHeight')}></Switch>
            <Switch checkedChildren='placeholder 开' unCheckedChildren='placeholder 关' onChange={e=>this.onSwitchChange(e,'placeholder')}></Switch>
          </div>
          <div>
            <InputNumber style={{width:'120px',margin:'10px 20px 0 0'}} defaultValue={rowCount} addonBefore={React.createElement('span', {},'条数')} onChange={ e=> this.onInputChange(e,'rowCount') } />
            <InputNumber style={{width:'120px',margin:'10px 20px 0 0'}} defaultValue={scrollIndex} addonBefore={React.createElement('span', {},'滚动到')} onChange={ e=> this.onInputChange(e,'scrollIndex') } />
            <InputNumber style={{width:'120px',margin:'10px 20px 0 0'}} defaultValue={height} addonBefore={React.createElement('span', {},'高度')} onChange={ e=> this.onInputChange(e,'height') } />
            <InputNumber style={{width:'120px',margin:'10px 20px 0 0'}} defaultValue={rowHeight} addonBefore={React.createElement('span', {},'行高')} onChange={ e=> this.onInputChange(e,'rowHeight') } />
            <InputNumber style={{width:'120px',margin:'10px 20px 0 0'}} defaultValue={overscan} addonBefore={React.createElement('span', {},'偏移')} onChange={ e=> this.onInputChange(e,'overscan') } />
          </div>
          <AutoSizer disableHeight >
            {({ width }) => {
              console.log(18, width)
              if (width > 0) {
                return (
                  <List ref={el=>this.listRef} height={height} width={width} rowHeight={autoRowHeight ? this.getRowHeight :   rowHeight} rowCount={rowCount || users.length} noRowsRenderer={this.noRowsRender} rowRenderer={this.rowRender} scrollToIndex={ scrollIndex}>
  
                </List>
              ) 
              }
            }} 
          </AutoSizer>
        </div>
      </div>
    </div>
    )
  }
}


