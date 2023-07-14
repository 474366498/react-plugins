


import { useState } from 'react'
import { Button, Input , Tooltip  } from 'antd'
import { LeftOutlined , RightOutlined ,RedoOutlined, FullscreenOutlined, FullscreenExitOutlined , ZoomInOutlined , ZoomOutOutlined ,PlusCircleOutlined ,MinusCircleOutlined  } from '@ant-design/icons'
import { Document, Page, pdfjs } from 'react-pdf'

import UserPdf from './userPdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url 
).toString()

function PdfView(params) {
  const file = 'http://192.168.2.100:3000/' + params.path
  
  const [pageSize,setPageSize] = useState(1)
  const [pageNumber,setPageNumber] = useState(1)  // page 组件页码
  const [pagesNumber , setPagesNumber] = useState(null)  // 总页码
  const onDocumentLoadSuccess = (obj) => {
      console.log(111111, obj)
      setPagesNumber(obj.numPages)
  }
  
  const onInputPageNumber = (e) => {
      let p = Number(e.target.value)
      setPageNumber(p)
    },
    onChangePageNumber = flg => {
      if (flg) {
        if (pageNumber < pagesNumber) {
          let page = pageNumber + 1
          setPageNumber(page)
        }
      } else {
        if (pageNumber >= 2) {
          let page = pageNumber - 1
          setPageNumber(page)
        }
      }
    },
    onChangePageSize = flg => {
      if (flg) {
        let size = pageSize < 3 ? pageSize * 1.25 : 3
        setPageSize(size)
      } else {
        let size = pageSize > .5 ? pageSize * .85 : .5
        setPageSize(size)
      }
    },
    onResetPageSize = () => {
      setPageSize(1)
    }
  const onPageLoadSuccess = () => {
    console.log('page load success')
  }
  return (      
      <div className='flex flex-jc-sb'>
        <div className='flex flex-dir-c' >
          <h4> react-pdf <a href='https://www.npmjs.com/package/react-pdf' target='_blank'>npm 更多</a> <a target='_blank' href="http://www.manongjc.com/detail/41-qsfczsvmrbcvnpz.html">这个例子不停循环...</a></h4>
          <div className='flex flex-jc-c flex-ai-c pdf-opts'>
              <Button onClick={e=>onChangePageNumber(false)} icon={ <LeftOutlined /> }></Button> &nbsp;
              <Input style={{ display: 'inline-flex', width: '80px' }} value={pageNumber} maxLength='4' onChange={e => onInputPageNumber(e)} /> &nbsp;
              <span>&nbsp;{ pagesNumber } &nbsp;</span>
              <Button onClick={e=>onChangePageNumber(true)} icon={<RightOutlined />}></Button>&nbsp;
              <Button.Group>
                <Button onClick={e => onChangePageSize(true)} icon={< ZoomInOutlined />}></Button>
                <Button onClick={ onResetPageSize} icon={ <RedoOutlined /> }></Button>
                <Button onClick={e=>onChangePageSize(false)} icon={< ZoomOutOutlined />  }></Button>
              </Button.Group>
              &nbsp;
          </div>
          <div className='' style={{width:280*pageSize+'px',height:388 * pageSize+'px',overflow:'hidden',transformOrigin:'0 0',transform: 'scale('+pageSize+')'}}>
            <Document className='pdf-doc'   file={file} onLoadSuccess={onDocumentLoadSuccess} >
              <Page width={280 } height={388 } pageNumber={pageNumber} onLoadSuccess={ onPageLoadSuccess} />
            </Document>
          </div>
        </div>
        <div className='flex flex-dir-c'> 
          <UserPdf file={file} />
      </div>
    </div>
  )
}



export default PdfView

