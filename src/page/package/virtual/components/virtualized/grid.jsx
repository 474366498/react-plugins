

import { InputNumber, Switch } from 'antd'
import React, { Component } from 'react'
import { AutoSizer , Grid} from 'react-virtualized'
import { generateUsers } from '../../data'

export default class VirtualizedGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: generateUsers(1e3),
      width : 8e2 ,
      height: 4e2,
      rowHeight : 6e1 ,
      rowCount : 1e3 ,
      columnCount : 1e1 ,
      overscanColumnCount : 0 ,
      overscanRowCount : 0 ,
      scrollToRow : undefined ,
      scrollToColumn: undefined,
      useDynamicRowHeight : false 
    }
    this.cellRender = this.cellRender.bind(this)
    this.getColumnWidth = this.getColumnWidth.bind(this)
    this.noContentRender = this.noContentRender.bind(this)
  }
  cellRender({ columnIndex, key, rowIndex, style }) {
    let {list} = this.state 
    let item = list[rowIndex] 

    console.log(31, item, columnIndex, key, rowIndex, style)
    if (columnIndex === 0) {
      style = {
        ...style,
        fontWeight:900,
        backgroundColor: rowIndex % 5 == 0
          ? 'red' 
          : rowIndex % 5 == 1 
            ? 'yellow' 
            : rowIndex % 5 == 2 
              ? 'skyblue' 
              : rowIndex % 5 == 3 
                ? 'pink' 
                : rowIndex % 5 == 4 
                  ? 'green'
                  : '#f5f5f5'
      }
      return <div key={key} style={style}> { rowIndex}:{ item.name } </div>
    } else {
      let content 
      // initials
      // jobTitle
      // description
      // longText
      switch (columnIndex) {
        case 1:
          content = item.jobTitle
          break;
        case 2:
          content = item.description
          break;
        case 3:
          content = item.longText
          style = {
            ...style,
            '-webkit-line-clamp': Math.ceil(parseInt(style.height) / 20),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: Math.ceil(parseInt(style.height) / 20),
            lineHeight: '20px'
          }
          break;
        default:
          content = `row:${rowIndex}, column:${columnIndex}`
          break;
      }
      style = {
        ...style,
        backgroundColor: rowIndex % 3 === 0
          ? '#f0f0f0'
          : rowIndex % 3 === 1 
            ? 'rgba(255,0,0,.2)'
            : 'white'
      }
      return <div key={key} style={style} > { content} </div>
    }
  }
  getColumnWidth ({index}) {
    switch (index) {
      case 0:
        return 60
      case 1:
        return 100
      case 2: 
        return 200
      case 3: 
        return 400
      default:
        return 80
    }
  }
  noContentRender () {
    return <div>没有数据</div>
  }
  getRowHeight({index}) {
    let item = this.state.list[index]
    return item.size < 80 ? item.size * 2.25 : item.size * 1.75
  }
  render() {
    const {
      height, 
      rowHeight,
      rowCount , 
      columnCount , 
      overscanColumnCount , 
      overscanRowCount , 
      scrollToRow , 
      scrollToColumn,
      useDynamicRowHeight
    } = this.state
    return (
      <div className='flex flex-dir-c' style={{width:'800px'}}>
        <div> react-virtualized ~ grid </div>
        <br />
        <div>
          <Switch defaultValue={useDynamicRowHeight} checkedChildren='dynamic row height ON' unCheckedChildren='dynamic row height OFF' onChange={ e=> this.setState({useDynamicRowHeight:e})}></Switch>
        </div>
        <br />

        <div>
          <InputNumber defaultValue={height} addonBefore={React.createElement('span', null, '高度')} onChange={ e=>this.setState({height:e}) } />
          <InputNumber defaultValue={rowHeight } addonBefore={React.createElement('span',null, '行高')} onChange={ e=>this.setState({rowHeight:e})} />
          <InputNumber defaultValue={rowCount} addonBefore={React.createElement('span', null, '行数')} onChange={e => {
            this.setState({ rowHeight: e , list: generateUsers(e)})
          }} />
          <InputNumber defaultValue={ columnCount} addonBefore={React.createElement('span',null, '列数')} onChange={ e=>this.setState({columnCount:e}) } />
          <InputNumber defaultValue={ overscanColumnCount} addonBefore={React.createElement('span',null, '列偏移')} onChange={ e=>this.setState({overscanColumnCount:e}) } />
          <InputNumber defaultValue={overscanRowCount } addonBefore={React.createElement('span',null, '行偏移')} onChange={ e=>this.setState({overscanRowCount:e}) } />
          <InputNumber defaultValue={scrollToRow } addonBefore={React.createElement('span',null, '行滚动到')} onChange={ e=>this.setState({scrollToRow:e}) } />
          <InputNumber defaultValue={ scrollToColumn} addonBefore={React.createElement('span',null, '列滚动到')} onChange={e=>this.setState({scrollToColumn:e}) } />
        </div>
        <br />
        <br />

        <AutoSizer disableHeight>
          {({ width }) => (
            <Grid
              width={width}
              height={height}
              rowCount={rowCount}
              columnCount={columnCount}
              overscanColumnCount={overscanColumnCount}
              overscanRowCount={overscanRowCount}
              scrollToRow={scrollToRow}
              scrollToColumn={scrollToColumn}
              rowHeight = { useDynamicRowHeight ? e=>this.getRowHeight(e) :  rowHeight}
              cellRenderer={ this.cellRender}
              columnWidth={ this.getColumnWidth}
              noContentRenderer={ this.noContentRender}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}


