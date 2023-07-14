/* eslint-disable no-prototype-builtins */


import {useEffect  , useState} from 'react'
import * as XLSX from 'xlsx'
import { Table, Upload } from 'antd'
const {Dragger} = Upload


function ExcelView({ path }) {
  console.log(6, path)

  const [excelInfo, setExcelInfo] = useState([])
  
  
  useEffect(() => {
    const file = 'http://192.168.2.100:3000/' + path
    console.log(18, file)
    downloadFile(file)
    return () => {
      console.log('unload')
    }
  },[path])
   
  const downloadFile = (filepath) => {
    console.log(26,filepath)
    let type = /\.(xlsx?)/.exec(filepath)[0]
    console.log(27,type)
    let xhr = new XMLHttpRequest()
    xhr.open('get', filepath)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      console.log(xhr.response)
      let blob = new Blob([xhr.response])
      let file = new File([blob], 'cc' + type, { type: 'blob' })
      console.log(36, file)
      const ff = {file:file}
      onDraggerFile(ff)
    }
    xhr.send()
  }



  const onDraggerFile = (file) => {
    console.log(file)
    const fileReader = new FileReader() 
    fileReader.readAsBinaryString(file.file)
    fileReader.onload = function (event) {
      console.log(event)
      try {
        const { result } = event.target 
        const workbox = XLSX.read(result, { type: 'binary' })
        
        let excelData = {} , excelInfo = []

        for (const sheet in workbox.Sheets) {
          let tempData = [] 
          if (workbox.Sheets.hasOwnProperty(sheet)) {
            console.log(25, sheet)
            excelData[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbox.Sheets[sheet]))
          }
        }
        console.log(30, excelData)
        let keys = Object.keys(excelData) 

        /*
        if (keys.length < 2) {
          let key = keys[0]
          let data = excelData[key], header = [] 
          // 表头 可能是个空 去找第一个 全是非空的
          for (const headerAttr in data[0]) {
            const h = {
              title: headerAttr,
              dataIndex: headerAttr,
              key : headerAttr
            }
            header.push(h)
          }
          excelInfo.push({key , header:header,data:data})
        } else {
          for (let key of keys) {
            console.log(46, key)
            let data = excelData[key], header = [] 
            for (const headerAttr in data[0]) {
              const h = {
                title: headerAttr,
                dataIndex: headerAttr,
                key : headerAttr
              }
              header.push(h)
            }
            excelInfo.push({key , header,data})
          }
        }
        */
        for (let key of keys) {
          console.log(46, key)
          let { header , data } = createExcelHeader(excelData[key])
            // for (const headerAttr in data[0]) {
            //   const h = {
            //     title: headerAttr,
            //     dataIndex: headerAttr,
            //     key : headerAttr
            //   }
            //   header.push(h)
            // }
            excelInfo.push({key , header,data})
          }
        console.log(67, excelInfo)
        setExcelInfo(excelInfo)
      } catch (error) {
        console.log(error)
      }
    }
  }
  /* 
    生成 excel 表头 内容  __EMPTY (错误行列标识)
    items 分一行(excel中有两行-数据与表头) 与多行(数据与表头)
    一行的情况下 是一个数组 
    多行(n行)的情况下 是n-1个对象组成的数组
  */
  const createExcelHeader = (items) => {
    let header = [], data = [];
    let keysArray = items.map(item => Object.keys(item)),
      valuesArray = items.map(item => Object.values(item))
    console.log(77,items, keysArray, valuesArray)
    if (keysArray.length === 1) {
      console.log('一行数据')
      let l = keysArray[0].length
      for (let i = 0; i < l; i++) {
        let k = keysArray[0][i]
        let h = {
          title: k,
          dataIndex: i,
          key: k,
          fixed: i < 3 ? 'left' : i > l - 5 ? 'right' : '',
          width : k.length * 18
        }
        header.push(h)
      }
      data = items.map( item=> {
        let keys = Object.keys(item)
          for (let i = 0; i < keys.length; i++){
            let key = keys[i]
            let headerIndex = header.findIndex(h => h.title === key)
            item[i] = item[header[headerIndex].title]
          }
          return item
      })
    } else {  // 多行
      // 查找key 字段最全的那一个
      let maxColumn = keysArray[0] 
      for (let i = 1; i < keysArray.length; i++){
        if (maxColumn.length < keysArray[i].length) {
          maxColumn = keysArray[i]
        }
      }
      // 判断最长字段是不是最全字段
      let flg = keysArray.every(keys => {
        let f = keys.every(key=>  maxColumn.includes(key) && key.indexOf('__EMPTY') < 0 )
        return f
      })
      console.log(123, flg  )
      // 正确的表头
      if (flg) {
        console.log(88, maxColumn)
        let l = maxColumn.length 
        for (let i = 0; i < l; i++) {
          let k = maxColumn[i]
          let h = {
            title: k,
            dataIndex: i,
            key: i,
            fixed: i < 3 ? 'left' : i > l - 5 ? 'right' : '',
          width : k.length * 18
          }
          header.push(h)
        }

        data = items.map( item => {
          let keys = Object.keys(item)
          for (let i = 0; i < keys.length; i++){
            let key = keys[i]
            let headerIndex = header.findIndex(h => h.title === key)
            item[i] = item[header[headerIndex].title]
          }
          return item
        })
        console.log(130,header , data)
      } else {
        console.log(100, keysArray, valuesArray)
        let findIndex = valuesArray.findIndex(item => item.length > 2 && item.every(el => el.length < 10)),
          findItem = valuesArray[findIndex]
        console.log(112, findIndex, findItem)
        let l = findItem.length
        for (let i = 0; i < l; i++) {
          let k = findItem[i]
          let h = {
            title: k,
            dataIndex: i,
            key: i,
            fixed: i < 3 ? 'left' : i > l - 5 ? 'right' : '',
          width : k.length * 18
          }
          header.push(h)
        }
        for (let i = 0; i < valuesArray.length; i++){
          let dataItem = { key:i }
          if (i !== findIndex) {
            for (let j = 0; j < valuesArray[i].length; j++){
              // let val = items[i]
              dataItem[j] = valuesArray[i][j]
            }
            data.push(dataItem)
          }
        }
      }
    }
    
    console.log(91, header , data)
    return {header,data}
  }
  return (
    <div className='flex flex-dir-c '>
      <p> <em>react-file-viewer react 18 安装不了</em> <em>react-excel-viewer 什么都没有 全要去看源码</em> <a target='_blank' href="https://www.npmjs.com/package/xlsx">npm XLSX</a>  <a target='_blank' href="https://docs.sheetjs.com/docs/demos/"> 示例(React\vue\angular...) </a> </p>
      <div>
        <Dragger name='file' accept=".xls,.xlsx" maxCount={1} onChange={onDraggerFile} beforeUpload={e => { return false }} showUploadList={false}>
          <p>上传文件</p>
        </Dragger>
      </div>
      {
        excelInfo && excelInfo.length > 0
          ? excelInfo.map(excel => (
            <div title={excel.key} key={excel.key}>
              {/* dataSource={excel.data} */}
              <Table scroll={{y:500}} columns={excel.header}  dataSource={excel.data} /> 
          </div>
        ))
        : null   
      }
      excel view
    </div>
  )
}




export default ExcelView