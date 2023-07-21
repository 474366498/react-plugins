
import React, { useState } from 'react'

import { Switch, InputNumber } from "antd";

import { AutoSizer, Collection } from 'react-virtualized'
import { generateUsers } from '../../data';

const GUTTER_SIZE = 5, CELL_WIDTH = 75
var columnYMap = []
export default function VirtualizedCollection() {
  const [options, setOptions] = useState({
    users: generateUsers(1e3),
    placeholder: false,
    cellCount: 1e3,
    columnCount: null,
    scrollToCell: undefined,
    height: 400,
    horizontalOverscanSize: 0,
    verticalOverscanSize: 0,
  })

  const getColumnCount = (cellCount = 1e3) => {
    return Math.round(Math.sqrt(cellCount))
  }

  const onSwitchChange = (e, key) => {
    let _options = Object.assign({}, options, { [key]: e })
    console.log(20, _options)
    setOptions(_options)
  },
    onInputChange = (e, key) => {
      console.log(e, key)
      let _options = key === 'cellCount'
        ? Object.assign(
          {},
          options,
          {
            [key]: e,
            users: generateUsers(e),
            columnCount: getColumnCount(e)
          }
        )
        : Object.assign({}, options, { [key]: e })
      columnYMap = []

      setOptions(_options)
    }

  const cellRender = ({ index, isScrolling, key, style }) => {
    style.backgroundColor = index % 6 === 0
      ? 'red'
      : index % 6 === 1
        ? 'green'
        : index % 6 === 2
          ? 'yellow'
          : index % 6 === 3
            ? 'skyblue'
            : index % 6 === 4
              ? 'pink'
              : '#f5f5f5'
    return (
      <>
        {
          options.placeholder && isScrolling
            ? <div key={key} style={style}>加载...</div>
            : <div key={key} style={style}>{index} : {options.users[index].name}
            </div>
        }
      </>
    )
  },
    noContentRender = () => {
      return <p>就是没有数据 。。。。</p>
    },
    cellSizeAndPositionGetter = (item) => {
      // console.log(36, item)
      let index = item.index
      let columnCount = options.columnCount || getColumnCount(options.users.length)
      const columnPosition = index % (columnCount || 1)
      let user = options.users[index]

      const height = user.size,
        width = CELL_WIDTH,
        x = columnPosition * (CELL_WIDTH + GUTTER_SIZE),
        y = columnYMap[columnPosition] || 0

      columnYMap[columnPosition] = y + height + GUTTER_SIZE
      return {
        height,
        width,
        x,
        y
      }
    }
  // horizontalOverscanSize
  // verticalOverscanSize
  return (
    <div className="flex flex-dir-c">
      <div> react-virtualized ~ collection </div>
      <div className="flex flex-dir-c" style={{ width: '800px' }}>
        <div>
          <Switch checkedChildren='placeholder 开' unCheckedChildren='placeholder 关' onChange={e => onSwitchChange(e, 'placeholder')}></Switch>
        </div>
        <div>
          <InputNumber style={{ width: '120px', margin: '10px 20px 0 0' }} defaultValue={options.cellCount} addonBefore={React.createElement('span', {}, '条数')} onChange={e => onInputChange(e, 'cellCount')} />
          <InputNumber style={{ width: '120px', margin: '10px 20px 0 0' }} defaultValue={options.scrollToCell} addonBefore={React.createElement('span', {}, '滚动到')} onChange={e => onInputChange(e, 'scrollToCell')} />
          <InputNumber style={{ width: '120px', margin: '10px 20px 0 0' }} defaultValue={options.height} addonBefore={React.createElement('span', {}, '高度')} onChange={e => onInputChange(e, 'height')} />
          <InputNumber style={{ width: '120px', margin: '10px 20px 0 0' }} defaultValue={options.horizontalOverscanSize} addonBefore={React.createElement('span', {}, '偏移-h')} onChange={e => onInputChange(e, 'horizontalOverscanSize')} />
          <InputNumber style={{ width: '120px', margin: '10px 20px 0 0' }} defaultValue={options.verticalOverscanSize} addonBefore={React.createElement('span', {}, '偏移-v')} onChange={e => onInputChange(e, 'verticalOverscanSize')} />
        </div>
        <AutoSizer disableHeight >
          {item => {
            return (
              <Collection
                cellCount={options.cellCount}
                cellRenderer={cellRender}
                noContentRenderer={noContentRender}
                cellSizeAndPositionGetter={cellSizeAndPositionGetter}
                height={options.height}
                scrollToCell={options.scrollToCell}
                horizontalOverscanSize={options.horizontalOverscanSize}
                verticalOverscanSize={options.verticalOverscanSize}
                width={800}
              />
            )
          }}

        </AutoSizer>
      </div>
    </div>
  )
}

