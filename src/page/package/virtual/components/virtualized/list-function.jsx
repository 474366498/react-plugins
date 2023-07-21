import React , { Component , useEffect , useState , useMemo , useRef} from "react";
import { InputNumber, Switch } from "antd";

import {AutoSizer ,  List } from 'react-virtualized'

import {generateUsers} from '../../data' 

const users = generateUsers(1e3)

export default function VirtualizedListFunction () {
  const [autoRowHeight,setAutoRowHeight]= useState(false),
  [placeholder,setPlaceholder]= useState(false),
  [rowCount,setRowCount]= useState(1e3),
  [scrollIndex,setScrollIndex]= useState(0),
  [height,setHeight]= useState(400),
  [rowHeight,setRowHeight]= useState(50),
  [overscan, setOverscan] = useState(10),
  [users , setUsers] = useState(generateUsers(1e3))

  // const users = useMemo(()=>generateUsers(1e3), [])
  console.log(11,users.length)
  const listRef = useRef()

  useEffect(() => {
    
  }, [])
  
  const noRowsRender = () => { 
    return <p>没有数据</p>
  },
    rowRender = ({ key, index, style, isScrolling, isVisible }) => {
      // console.log(19999999,key,index,style,isScrolling,isVisible)
      return (<div key={key} style={style}>
        <span> This is Row {index} </span>
        <span>{ users[index].name}</span>
      </div>)
  }
  
  return (
    <div className="flex flex-dir-c">
      <div > react-virtualized ~ list function  </div>
      <div className="flex flex-jc-sa">
        <div className="flex flex-dir-c" style={{ width: '400px' }}>
          <div>
            <Switch checkedChildren='行高自动' unCheckedChildren='默认高度' onChange={e=>setAutoRowHeight(e)}></Switch>
            <Switch checkedChildren='placeholder 开' unCheckedChildren='placeholder 关' onChange={e=>setPlaceholder(e)}></Switch>
          </div>
          <div>
            <InputNumber style={{ width: '120px', margin: '10px 20px 0 0' }} defaultValue={rowCount} addonBefore={React.createElement('span', {}, '条数')} onChange={e => {
              if (e > 1e3) {
                setUsers(generateUsers(e))
              }
              setRowCount(e)
            }} />
            <InputNumber style={{width:'120px',margin:'10px 20px 0 0'}} defaultValue={scrollIndex} addonBefore={React.createElement('span', {},'滚动到')} onChange={ e=> setScrollIndex(e) } />
            <InputNumber style={{width:'120px',margin:'10px 20px 0 0'}} defaultValue={height} addonBefore={React.createElement('span', {},'高度')} onChange={ e=> setHeight(e) } />
            <InputNumber style={{width:'120px',margin:'10px 20px 0 0'}} defaultValue={rowHeight} addonBefore={React.createElement('span', {},'行高')} onChange={ e=> setRowHeight(e) } />
            <InputNumber style={{width:'120px',margin:'10px 20px 0 0'}} defaultValue={overscan} addonBefore={React.createElement('span', {},'偏移')} onChange={ e=> setOverscan(e) } />
          </div>
          <AutoSizer disableHeight >
            {({ width }) => {
              console.log(18, width)
              if (width > 0) {
                return (
                  <List ref={listRef} height={height} width={width} rowHeight={rowHeight} rowCount={rowCount || users.length} noRowsRenderer={noRowsRender} rowRenderer={rowRender} scrollIndex={ scrollIndex}>
  
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




