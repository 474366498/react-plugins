import { Tabs } from "antd"
import { useState } from "react"
import PdfView from './components/pdf'
import ExcelView from "./components/excel"
import WordView from './components/word'
import PptxView from './components/pptx'

function FileView() {
  const fileList = [
    {index:1,key:'pdf',label:'pdf文件预览', children:<PdfView path='/files/node.pdf' /> , path:'/files/node.pdf'},
    {index:2,key:'xls',label:'xls文件预览', children:<ExcelView path='/files/a1.xls' /> , path:'/files/a1.xls'},
    {index:3,key:'xlsx',label:'xlsx文件预览', children:<ExcelView path='/files/a1.xlsx' /> , path:'/files/a1.xlsx'},
    {index:4,key:'doc',label:'doc文件预览', children:<WordView path='/files/b1.doc' /> , path:'/files/b1.doc'},
    {index:5,key:'docx',label:'docx文件预览', children:<WordView path='/files/b1.docx' /> , path:'/files/b1.docx'},
    {index:6,key:'pptx',label:'pptx文件预览', children:<PptxView path='/files/cc.pptx' /> , path:'/files/cc.pptx'},
  ]
  const [tabsKey, setTabsKey] = useState('pdf')
  
  return (
    <section className="flex flex-dir-c">
      <div> react-office-viewer 没有实例 没有文档 <a target='_blank' href="https://www.npmjs.com/package/react-office-viewer?activeTab=readme"> npm react-office-viewer </a> <a href="https://github.com/react-office-viewer/react-office-viewer ">git react-office-viewer</a> <em> react-pdf-js node sass 那一块要报错(应该是版本有差异)</em> </div>
      <Tabs activeKey={tabsKey} items={fileList} centered onChange={ k => setTabsKey(k)} />
    </section>
  )
}


export default FileView 
