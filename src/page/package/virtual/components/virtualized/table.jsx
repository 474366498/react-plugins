

import React , { PureComponent} from 'react'
import { InputNumber, Switch } from 'antd'
import { AutoSizer , Table , Column , SortDirection } from 'react-virtualized'
import { generateUsers } from '../../data'

export default class VirtualizedTable extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      useDynamicHeight  :false ,
      showIndex :true ,
      disableHeader: false,
      count: 1e3,
      scrollToIndex: undefined,
      listHeight: 300,
      rowHeight: 40,
      headerHeight: 50,
      overscan: 0,
      list: generateUsers(1E3),
      sortBy:'index',
      sortDirection: SortDirection.ASC,
    }
  }

  onSwitchChange(value,key) {
    this.setState({
      [key] : value 
    })
  }
  onInputChange(value, key) {
    if (key === 'count') {
      this.setState({
        [key]:value ,
        list : generateUsers(value)
      })
    } else {
      this.setState({
        [key]:value
      })
    }
  }
  getRowHeight({index}) {
    let item = this.state.list[index]
    return item.size
  }
  sort({ sortBy , sortDirection}) {
    console.log(48, 'sort' , sortBy , sortDirection)
    const sortedList = this.sortList({ sortBy, sortDirection })

    this.setState({
      sortBy,
      sortDirection,
      list : sortedList
    })
  }
  sortList({sortBy , sortDirection}) {
    const { list } = this.state 
    let _list = list.sort((p, n) => sortDirection === SortDirection.DESC ? n[sortBy] - p[sortBy] : p[sortBy] - n[sortBy] )
    // console.log(60 , _list , sortDirection)
    return _list
    // return list.sortBy(item => item[sortBy])
    // .update(list => sortDirection === SortDirection.DESC ? list.reverse() : list )
  }
  render() {
    let {
      useDynamicHeight ,
      showIndex ,
      disableHeader,
      count ,
      scrollToIndex ,
      listHeight ,
      rowHeight ,
      headerHeight ,
      overscan,
      sortDirection,
      sortBy ,
      list
    } = this.state
    const rowGetter = ({ index }) => this.state.list[index]
    return (
     <div className="flex flex-dir-c" style={{width:'800px'}}>
        <div> react-virtualized ~ table </div>
        <div>
          <Switch checkedChildren='Use dynamic row heights ON' unCheckedChildren='Use dynamic row heights OFF' defaultChecked={ useDynamicHeight } onChange={ e=> this.onSwitchChange(e,'useDynamicHeight') }></Switch>
          <Switch checkedChildren='Hide index ON' unCheckedChildren='Hide index OFF' defaultChecked={ showIndex } onChange={ e=> this.onSwitchChange(e,'showIndex') }></Switch>
          <Switch checkedChildren='Hide header ON' unCheckedChildren='Hide header OFF' defaultChecked={ disableHeader} onChange={ e=> this.onSwitchChange(e,'disableHeader') }></Switch>
        </div>
        <br />
        <div>
          <InputNumber defaultValue={count } addonBefore={React.createElement('span',null ,'行数')} onChange={e => this.onInputChange(e,'count') } /> 
          <InputNumber defaultValue={ scrollToIndex} addonBefore={React.createElement('span',null ,'滚动至')} onChange={e => this.onInputChange(e,'scrollToIndex') } /> 
          <InputNumber defaultValue={ listHeight} addonBefore={React.createElement('span',null ,'表高')} onChange={e => this.onInputChange(e,'listHeight') } /> 
          <InputNumber defaultValue={rowHeight } addonBefore={React.createElement('span',null ,'行高')} onChange={e => this.onInputChange(e,'rowHeight') } /> 
          <InputNumber defaultValue={headerHeight } addonBefore={React.createElement('span',null ,'表头高')} onChange={e => this.onInputChange(e,'headerHeight') } /> 
          <InputNumber defaultValue={ overscan} addonBefore={React.createElement('span',null ,'偏移')} onChange={e => this.onInputChange(e,'overscan') } /> 
        </div>
        <br /> 
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              ref={el => this.table = el}
              disableHeader={disableHeader}
              headerClassName='user-table-header flex flex-ai-c'
              headerStyle={{backgroundColor:'pink',lineHeight:headerHeight+'px'}}
              headerHeight={headerHeight}
              height={listHeight}
              noRowsRenderer={e => this.noRowsRender(e)}
              overscanRowCount={overscan}
              rowClassName='user-table-row flex flex-ai-c'
              rowHeight={useDynamicHeight ? e => this.getRowHeight(e) : rowHeight}
              rowStyle={{lineHeight : (useDynamicHeight ? e=>this.getRowHeight(e) : rowHeight)+'px',borderBottom:'1px solid pink'}}
              rowGetter={rowGetter}
              rowCount={count}
              scrollToIndex={scrollToIndex}
              sort={e => this.sort(e)}
              sortBy={sortBy}
              sortDirection={sortDirection}
              width={width}
            >
              {
                showIndex
                  ? (
                    <Column
                      label='Index'
                      cellDataGetter={({ rowData }) => rowData.index}
                      dataKey='index'
                      width={80}
                    >

                    </Column>
                  ) 
                  : null 
              }
              {/* return {
                  index: index + 1,
                  bgColor: toggleBg(index),
                  name: `${firstName.substr(0, 1)}~${lastName.substr(0, 1)}`,
                  initials: `${firstName.substr(0, 1)} ${lastName.substr(0, 1)}`,
                  jobTitle: faker.name.jobTitle(),
                  description: faker.lorem.sentence(10),
                  longText: faker.lorem.paragraphs(1),
                  size: SIZE_ARRAY[Math.floor(Math.random() * SIZE_ARRAY.length)]
                } */}
              
              <Column 
                dataKey='name'
                headerRenderer={e => this.headerRender(e)}
                width={120}
              ></Column>
              <Column label='bgColor' dataKey='bgColor' cellRenderer={({ cellData }) => cellData} width={ 80} />
              <Column label='item size' dataKey='size' cellRenderer={({ cellData }) => cellData} width={ 80} />
              <Column label='longText' dataKey='longText' cellRenderer={e => this.longTextRender(e)} width={ 440 } />    
            </Table>
          )}
        </AutoSizer>
      </div>
    )
  }
  headerRender(e) {
    console.log(127, e)
    return (<div> item ~ name </div>)
  }
  longTextRender(e) {
    let {rowHeight , useDynamicHeight } = this.state 
    // console.log(150, e)  e = {cellData dataKey columnIndex parent rowData rowIndex ... }
    let { cellData, dataKey, rowData, rowIndex } = e  
    let height = useDynamicHeight ? this.getRowHeight(rowIndex) : rowHeight
    // overflow: hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 3;
    // line - height: 20px;
    
    let style = {
      WebkitLineClamp: Math.floor(height / 20),
      webkitBoxOrient:'vertical',
      display: '-webkit-box',
      width:'300px',
      height: height + 'px',
      lineHeight:'20px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace:'normal'
    }
    return <div className={dataKey} style={{...style}}> { cellData} </div>
  }
}





